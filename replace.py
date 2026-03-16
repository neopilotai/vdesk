import os
import argparse
import shutil

TEXT_EXTENSIONS = {
    ".py",".js",".ts",".jsx",".tsx",".html",".css",".scss",
    ".json",".md",".txt",".yaml",".yml",".env",".toml",".ini"
}

def is_text_file(path):
    ext = os.path.splitext(path)[1].lower()
    return ext in TEXT_EXTENSIONS


def process_file(file_path, find_text, replace_text, dry_run=False, backup=False):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        if find_text not in content:
            return False

        new_content = content.replace(find_text, replace_text)

        print(f"[MATCH] {file_path}")

        if dry_run:
            return True

        if backup:
            shutil.copy(file_path, file_path + ".bak")

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        return True

    except Exception as e:
        print(f"[ERROR] {file_path} -> {e}")
        return False


def find_replace(root_dir, find_text, replace_text, dry_run=False, backup=False):
    changed = 0

    for root, dirs, files in os.walk(root_dir):

        # skip heavy build folders
        dirs[:] = [d for d in dirs if d not in {".git","node_modules",".next","dist","build"}]

        for file in files:
            file_path = os.path.join(root, file)

            if not is_text_file(file_path):
                continue

            if process_file(file_path, find_text, replace_text, dry_run, backup):
                changed += 1

    print(f"\nDone. Modified files: {changed}")


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    parser.add_argument("find")
    parser.add_argument("replace")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--backup", action="store_true")

    args = parser.parse_args()

    find_replace(
        args.directory,
        args.find,
        args.replace,
        args.dry_run,
        args.backup
    )