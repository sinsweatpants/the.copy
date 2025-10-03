#!/bin/bash

# --- Project Structure Cleanup Script ---
# This script safely removes unused files identified in the trash_report.jsonl.
# It performs a backup before deleting any files.

set -e

DRY_RUN=false
CLEANUP_DIR="$(dirname "$0")"
TRASH_REPORT="$CLEANUP_DIR/trash_report.jsonl"
BACKUP_DIR="$CLEANUP_DIR/_backup"

# --- Check for dry-run flag ---
if [[ "$1" == "--dry-run" || $# -eq 0 ]]; then
    DRY_RUN=true
    echo "Performing a DRY RUN. No files will be deleted."
fi

# --- Ensure trash report exists ---
if [ ! -f "$TRASH_REPORT" ]; then
    echo "Error: Trash report not found at $TRASH_REPORT" >&2
    exit 1
fi

# --- Extract file paths from the report ---
# Using jq is robust, but using grep as a fallback for wider compatibility.
if command -v jq &> /dev/null; then
    FILES_TO_DELETE=$(jq -r '.path' "$TRASH_REPORT")
else
    FILES_TO_DELETE=$(grep -o '"path":"[^"]*"' "$TRASH_REPORT" | cut -d '"' -f 4)
fi

if [ -z "$FILES_TO_DELETE" ]; then
    echo "No files marked for deletion in the report."
    exit 0
fi

# --- Execute the cleanup ---
if [ "$DRY_RUN" = true ]; then
    echo "The following files would be backed up and deleted:"
    echo "$FILES_TO_DELETE"
    echo "Run with --execute to perform the deletion."
else
    echo "Starting cleanup..."

    # 1. Create backup directory
    echo "Creating backup directory at $BACKUP_DIR..."
    mkdir -p "$BACKUP_DIR"

        # 2. Create backup archive
        echo "Creating backup archive at $BACKUP_DIR/backup.tar.gz..."
        echo "$FILES_TO_DELETE" | tar -czf "$BACKUP_DIR/backup.tar.gz" -T - 
    # 3. Delete files
    echo "Deleting files..."
    echo "$FILES_TO_DELETE" | xargs -d '\n' rm -rf

    # 4. Add changes to git
    echo "Staging changes..."
    git add .

    echo "Cleanup complete. Backup created in $BACKUP_DIR."
    echo "Please review the changes with 'git status' and commit them."
fi

exit 0
