import os
import sys
import shutil


def recreate_symlinks_safely():
    """
    Recreates the 'symlinks' directory at the project root.

    This script ensures that all created symbolic links point directly to the
    canonical, original files within the 'context' directory, resolving any
    intermediate symlinks that may exist in the source folder. It preserves
    the directory structure.
    """
    source_dir_rel = 'context'
    symlink_dir_rel = 'symlinks'
    workspace_root = os.getcwd()

    source_dir_abs = os.path.join(workspace_root, source_dir_rel)
    symlink_dir_abs = os.path.join(workspace_root, symlink_dir_rel)

    if not os.path.isdir(source_dir_abs):
        print(f"Error: Source directory '{source_dir_rel}' not found.", file=sys.stderr)
        sys.exit(1)

    if os.path.exists(symlink_dir_abs):
        print(f"Removing existing directory: {symlink_dir_rel}")
        shutil.rmtree(symlink_dir_abs)

    print(f"Creating fresh directory: {symlink_dir_rel}")
    os.makedirs(symlink_dir_abs)

    for root, dirs, files in os.walk(source_dir_abs, topdown=True, followlinks=False):
        # Exclude the 'symlinks' directory if it exists inside 'context'
        if 'symlinks' in dirs:
            dirs.remove('symlinks')

        for file in files:
            if file == '.DS_Store':
                continue

            source_file_abs = os.path.join(root, file)

            # Resolve the source file to its real, canonical path
            canonical_source_path = os.path.realpath(source_file_abs)

            # Determine the destination path for the link, preserving structure
            relative_path = os.path.relpath(source_file_abs, source_dir_abs)
            symlink_path_abs = os.path.join(symlink_dir_abs, relative_path)

            os.makedirs(os.path.dirname(symlink_path_abs), exist_ok=True)

            # Calculate the relative path from the link to the canonical target
            target_path_relative = os.path.relpath(
                canonical_source_path, os.path.dirname(symlink_path_abs))

            if os.path.lexists(symlink_path_abs):
                os.remove(symlink_path_abs)

            os.symlink(target_path_relative, symlink_path_abs)
            print(
                f"Linked: {
                    os.path.relpath(
                        symlink_path_abs,
                        workspace_root)} -> {target_path_relative}")

    print("\\nSymlink recreation process completed successfully.")


if __name__ == "__main__":
    recreate_symlinks_safely()
