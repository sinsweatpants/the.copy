
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function getGitFiles() {
    try {
        return new Set(execSync('git ls-files').toString().trim().split('\n'));
    } catch (e) {
        console.error("Failed to run git ls-files. Make sure git is installed and you're in a git repository.", e);
        return new Set();
    }
}

function parseMadgeOutput(depsFile) {
    try {
        return JSON.parse(fs.readFileSync(depsFile, 'utf-8'));
    } catch (e) {
        return {};
    }
}

function parseDynamicRefs(dynamicRefsFile) {
    const refs = new Set();
    try {
        const content = fs.readFileSync(dynamicRefsFile, 'utf-8');
        const lines = content.split('\n');
        for (const line of lines) {
            const match = line.match(/^([^:]+):/);
            if (match) {
                refs.add(match[1]);
            }
        }
    } catch (e) {
        // ignore
    }
    return refs;
}

function getFileKind(filePath) {
    if (filePath.toLowerCase().includes('test')) return 'test';
    if (['docs/', 'documentation/'].some(d => filePath.includes(d))) return 'doc';
    if (filePath.match(/\.(css|scss|sass)$/)) return 'style';
    if (filePath.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'asset';
    if (filePath.match(/\.(sh|py|ps1|mjs|js|ts)$/)) return 'script';
    return 'file';
}

function isProtected(filePath, protectedPatterns) {
    return protectedPatterns.some(pattern => new RegExp(pattern).test(filePath));
}

function main() {
    const allFiles = getGitFiles();
    const depsGraph = parseMadgeOutput('cleanup/deps.json');
    const dynamicRefs = parseDynamicRefs('cleanup/dynamic_refs.txt');

    const entryPoints = new Set([
        'index.html',
        'src/main.tsx',
        'vite.config.ts',
        'tailwind.config.js',
        'postcss.config.js'
    ]);

    const protectedPatterns = [
        '^\.git', '^\.github', '^\.vscode', '^\.idea',
        'config\.js', '\.json$', '\.md$', '^scripts/',
        '^public/', '^docs/', 'vite', 'eslint', 'tsconfig',
        '\.lock$', '\.nvmrc', '\.env', '^analysis/', '^.claude/',
        '\.kilocode', 'kilocodemodes', 'qoderignore', '^patches/',
        '\.mcp', 'CHANGELOG.md', 'GEMINI.md', 'CLAUDE.md', 'SUMMARY_OF_CHANGES.md',
        'TESTING_PLAN.md', 'SECURITY_NOTES.md', 'PRODUCTION_READINESS_REPORT.md',
        'AssumptionsLog.md', 'DOCUMENTATION.md', 'README.md'
    ];

    const reachableFiles = new Set();
    const queue = [...entryPoints];

    dynamicRefs.forEach(ref => queue.push(ref));
    allFiles.forEach(f => {
        if (isProtected(f, protectedPatterns)) {
            reachableFiles.add(f);
        }
    });

    const processed = new Set();
    while (queue.length > 0) {
        const currentFile = queue.shift();
        if (!currentFile || processed.has(currentFile)) {
            continue;
        }

        processed.add(currentFile);
        reachableFiles.add(currentFile);

        if (depsGraph[currentFile]) {
            for (const dep of depsGraph[currentFile]) {
                if (!processed.has(dep)) {
                    queue.push(dep);
                }
            }
        }
    }

    const unusedFiles = new Set([...allFiles].filter(f => !reachableFiles.has(f)));
    
    const reportStream = fs.createWriteStream('cleanup/trash_report.jsonl');
    [...unusedFiles].sort().forEach(filePath => {
        try {
            const stat = fs.statSync(filePath);
            const reportItem = {
                path: filePath,
                kind: getFileKind(filePath),
                size_bytes: stat.size,
                last_modified: stat.mtime.toISOString(),
                detectors: ["static-analysis"],
                refs_inbound: [],
                refs_outbound: [],
                first_seen_commit: null,
                duplicate_of: null,
                decision: "remove",
                rationale: "File is not reachable from any entry points, is not a protected configuration file, and is not referenced dynamically.",
                risk: "low"
            };
            reportStream.write(JSON.stringify(reportItem) + '\n');
        } catch (e) {
            // File might have been deleted during the process, ignore.
        }
    });
    reportStream.end();
    console.log(`Generated cleanup/trash_report.jsonl with ${unusedFiles.size} candidates for deletion.`);
}

main();
