import os
import sys


def fix_symlinks_at_root():
    """
    Creates a 'symlinks' directory at the project root and populates it with
    relative symbolic links to all files found in the 'context' directory,
    preserving the original directory structure. This script is intended to
    fix any previously broken symlinks.
    """
    source_dir_rel = 'context'
    symlink_dir_rel = 'symlinks'
    workspace_root = os.getcwd()

    source_dir_abs = os.path.join(workspace_root, source_dir_rel)
    symlink_dir_abs = os.path.join(workspace_root, symlink_dir_rel)

    if not os.path.isdir(source_dir_abs):
        print(
            f"Error: Source directory '{source_dir_rel}' not found in the workspace.",
            file=sys.stderr)
        sys.exit(1)

    os.makedirs(symlink_dir_abs, exist_ok=True)
    print(f"Ensured directory exists: {symlink_dir_rel}")

    for root, dirs, files in os.walk(source_dir_abs, topdown=True):
        if 'symlinks' in dirs:
            # Prevent recursion into any 'symlinks' directory
            dirs.remove('symlinks')

        for file in files:
            if file == '.DS_Store':
                continue

            source_file_abs = os.path.join(root, file)
            relative_path_from_context = os.path.relpath(
                source_file_abs, source_dir_abs)
            symlink_path_abs = os.path.join(symlink_dir_abs, relative_path_from_context)

            os.makedirs(os.path.dirname(symlink_path_abs), exist_ok=True)

            target_path_relative = os.path.relpath(
                source_file_abs, os.path.dirname(symlink_path_abs))

            # If a broken or incorrect link exists, remove it before creating a new one.
            if os.path.lexists(symlink_path_abs):
                os.remove(symlink_path_abs)

            os.symlink(target_path_relative, symlink_path_abs)
            print(
                f"Created/Replaced symlink: {os.path.relpath(symlink_path_abs, workspace_root)}")

    print("\\nSymlink recreation process completed.")


if __name__ == "__main__":
    fix_symlinks_at_root()
