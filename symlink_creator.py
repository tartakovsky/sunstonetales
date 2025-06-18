"""
symlink_creator.py

Purpose: Create symlinks in a specified directory for multiple source files provided as command-line arguments (supports drag-and-drop in terminal).

Input:
  - One or more source file paths (positional arguments)
  - Optional: --dest DEST_DIR (destination directory for symlinks)
  - If --dest is not provided, prompt user interactively

Output:
  - For each source file, creates a symlink in DEST_DIR with the same basename
  - Overwrites existing symlinks if present
  - Prints summary of actions

Position: Standalone utility script, no project dependencies
Key dependencies: argparse, pathlib, sys
"""

import argparse
import sys
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(
        description="Create symlinks for files in a target directory.")
    parser.add_argument(
        'files',
        nargs='+',
        help='Source files to link (drag-and-drop supported)')
    parser.add_argument(
        '--dest',
        '-d',
        type=str,
        help='Destination directory for symlinks')
    args = parser.parse_args()

    if args.dest:
        dest_dir = Path(args.dest).expanduser().resolve()
    else:
        dest_input = input('Enter destination directory for symlinks: ').strip()
        dest_dir = Path(dest_input).expanduser().resolve()

    if not dest_dir.exists() or not dest_dir.is_dir():
        print(
            f"Error: Destination directory '{dest_dir}' does not exist or is not a directory.")
        sys.exit(1)

    actions = []
    for file_path in args.files:
        src = Path(file_path).expanduser().resolve()
        if not src.exists():
            actions.append((src, None, 'Source does not exist'))
            continue
        link_name = dest_dir / src.name
        if link_name.exists() or link_name.is_symlink():
            try:
                link_name.unlink()
            except Exception as e:
                actions.append((src, link_name, f'Failed to remove existing: {e}'))
                continue
        try:
            link_name.symlink_to(src)
            actions.append((src, link_name, 'Symlinked'))
        except Exception as e:
            actions.append((src, link_name, f'Failed: {e}'))

    print(f"\nSymlink creation summary (destination: {dest_dir}):")
    for src, link, status in actions:
        print(f"{src} -> {link if link else '-'} : {status}")


if __name__ == '__main__':
    main()
