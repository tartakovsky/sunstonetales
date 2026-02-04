#!/usr/bin/env python3
import re
import sys


def count_words(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove HTML comments
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)

    # Remove headers (lines starting with #)
    text = re.sub(r'^#+.*$', '', text, flags=re.MULTILINE)

    # Remove horizontal rules
    text = re.sub(r'^---+$', '', text, flags=re.MULTILINE)

    # Count words
    words = text.split()
    print(len(words))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python wordcount.py <file.md>")
        sys.exit(1)
    count_words(sys.argv[1])
