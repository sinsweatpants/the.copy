
# Chore: Project Structure Cleanup

This pull request removes unused files from the codebase based on a comprehensive static and dynamic analysis.

## Summary of Changes

The automated cleanup process has identified and marked for deletion a significant number of files that are no longer referenced or reachable from the application's entry points.

**Statistical Summary:**

*   **Files to be Deleted:** 147
*   **Total Size Reclaimed:** ~697 KB

This cleanup reduces the repository size, simplifies the project structure, and removes distracting clutter for developers.

## Evidence and Artifacts

All decisions are backed by evidence generated during the analysis. The following artifacts are available in the `cleanup/` directory for review:

*   `trash_report.jsonl`: A detailed line-by-line report for each file marked for deletion, including the rationale.
*   `cleanup.diff`: A diff-like summary of the files to be removed.
*   `deps.json`: The raw static dependency graph from `madge`.
*   `tsprune.txt`: The report on unused exports from `ts-prune`.
*   `dynamic_refs.txt`: A list of files containing dynamic import patterns.

## How to Apply

1.  Check out this branch.
2.  Review the artifacts in the `cleanup/` directory.
3.  To execute the deletion, run the following script:
    ```sh
    bash cleanup/apply_cleanup.sh --execute
    ```
    A backup of all deleted files will be created in `cleanup/_backup/`.

## Verification

After applying the changes, project integrity can be verified by following the steps in `cleanup/verification.md`. This includes running type checks, linting, tests, and a full production build.

## Rollback

To revert the changes, you can either:

1.  Run `git revert HEAD` to create a new commit that undoes the deletion.
2.  Restore the backup by extracting the `cleanup/_backup/backup.tar.gz` archive in the project root.
