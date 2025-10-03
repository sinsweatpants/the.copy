
import json
import os
import subprocess
import re

def get_git_files():
    """Returns a list of all files tracked by Git."""
    try:
        result = subprocess.run(['git', 'ls-files'], capture_output=True, text=True, check=True)
        return result.stdout.strip().split('\n')
    except (subprocess.CalledProcessError, FileNotFoundError):
        # Fallback for non-git environments, though the prompt implies a git repo
        return [os.path.join(r, f) for r, _, fs in os.walk('.') for f in fs]

def parse_madge_output(deps_file):
    """Parses the JSON output from madge to get the dependency graph."""
    try:
        with open(deps_file, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def parse_dynamic_refs(dynamic_refs_file):
    """Parses the grep output to find files with dynamic references."""
    refs = set()
    try:
        with open(dynamic_refs_file, 'r') as f:
            for line in f:
                match = re.match(r'([^:]+):', line)
                if match:
                    refs.add(match.group(1))
    except FileNotFoundError:
        return set()
    return refs

def get_file_kind(file_path):
    """Categorizes the file based on its path and extension."""
    if 'test' in file_path.lower():
        return 'test'
    if any(d in file_path for d in ['docs/', 'documentation/']):
        return 'doc'
    if file_path.endswith(('.css', '.scss', '.sass')):
        return 'style'
    if file_path.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')):
        return 'asset'
    if file_path.endswith(('.sh', '.py', '.ps1')):
        return 'script'
    return 'file'

def is_protected(file_path, protected_patterns):
    """Check if a file is protected based on a list of patterns."""
    return any(re.search(pattern, file_path) for pattern in protected_patterns)

def main():
    """Main function to generate the cleanup report."""
    all_files = set(get_git_files())
    deps_graph = parse_madge_output('cleanup/deps.json')
    dynamic_refs = parse_dynamic_refs('cleanup/dynamic_refs.txt')

    # Define entry points and protected files/patterns as per instructions
    entry_points = {
        'index.html',
        'src/main.tsx',
        'vite.config.ts',
        'tailwind.config.js',
        'postcss.config.js'
    }

    protected_patterns = [
        r'^\.git', r'^\.github', r'^\.vscode', r'^\.idea',
        r'config\.js', r'\.json$', r'\.md$', r'^scripts/',
        r'^public/', r'^docs/', r'vite', r'eslint', r'tsconfig',
        r'\.lock$', r'\.nvmrc', r'\.env'
    ]

    # --- Build the set of used/reachable files ---
    reachable_files = set()
    queue = list(entry_points)

    # Add all dynamically referenced files and protected files to the queue
    queue.extend(list(dynamic_refs))
    for f in all_files:
        if is_protected(f, protected_patterns):
            reachable_files.add(f)

    processed = set()
    while queue:
        current_file = queue.pop(0)
        if current_file in processed or not current_file:
            continue
        
        processed.add(current_file)
        reachable_files.add(current_file)

        # Add dependencies from the graph to the queue
        if current_file in deps_graph:
            for dep in deps_graph[current_file]:
                if dep not in processed:
                    queue.append(dep)

    # --- Identify unused files and generate report ---
    unused_files = all_files - reachable_files

    with open('cleanup/trash_report.jsonl', 'w') as f:
        for file_path in sorted(list(unused_files)):
            try:
                stat = os.stat(file_path)
                report_item = {
                    "path": file_path,
                    "kind": get_file_kind(file_path),
                    "size_bytes": stat.st_size,
                    "last_modified": stat.st_mtime,
                    "detectors": ["static-analysis"],
                    "refs_inbound": [],
                    "refs_outbound": [],
                    "first_seen_commit": None, # Placeholder
                    "duplicate_of": None, # Placeholder
                    "decision": "remove",
                    "rationale": "File is not reachable from any entry points, is not a protected configuration file, and is not referenced dynamically.",
                    "risk": "low"
                }
                f.write(json.dumps(report_item) + '\n')
            except FileNotFoundError:
                continue

if __name__ == "__main__":
    main()
