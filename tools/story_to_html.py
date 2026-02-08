#!/usr/bin/env python3
"""
Convert a markdown story with inline images into a two-column HTML picture book.
Designed for reading aloud on a Pixel Fold (or any wide-screen device).

Usage:
    python story_to_html.py path/to/story.md [-o output.html]

The markdown should have images as ![alt](images/file.png).
Text between images is grouped with the NEXT image to form a "spread".
"""

import argparse
import base64
import mimetypes
import re
import sys
from pathlib import Path


def parse_markdown(md_text: str):
    """Split markdown into a sequence of (type, content) blocks.
    Types: 'text', 'image'
    """
    blocks = []
    text_buf = []

    for line in md_text.split('\n'):
        img_match = re.match(r'!\[.*?\]\((.+?)\)', line.strip())
        if img_match:
            # Flush text buffer
            text = '\n'.join(text_buf).strip()
            if text:
                blocks.append(('text', text))
            text_buf = []
            blocks.append(('image', img_match.group(1)))
        else:
            text_buf.append(line)

    # Flush remaining text
    text = '\n'.join(text_buf).strip()
    if text:
        blocks.append(('text', text))

    return blocks


def blocks_to_spreads(blocks):
    """Group blocks into spreads. Each spread = {image, text}.
    Strategy: text AFTER an image belongs to that image's spread.
    Leading text before the first image merges into the first spread.
    """
    spreads = []
    current = None  # {'image': path|None, 'parts': [str]}

    for btype, content in blocks:
        if btype == 'image':
            if current is not None:
                spreads.append(current)
            current = {'image': content, 'parts': []}
        elif btype == 'text':
            if current is None:
                current = {'image': None, 'parts': [content]}
            else:
                current['parts'].append(content)

    if current is not None:
        spreads.append(current)

    # Merge leading text-only spread into the first image spread
    if len(spreads) > 1 and spreads[0]['image'] is None:
        spreads[1]['parts'] = spreads[0]['parts'] + spreads[1]['parts']
        spreads.pop(0)

    for s in spreads:
        s['text'] = '\n\n'.join(s['parts'])
        del s['parts']

    return spreads


def md_to_html_simple(text: str) -> str:
    """Minimal markdown to HTML: paragraphs, bold, italic, em-dash, scene breaks."""
    # Remove HTML comments
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)
    # Remove heading markers
    text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)
    # Scene break
    text = re.sub(r'^---+\s*$', '<div class="scene-break">* * *</div>', text, flags=re.MULTILINE)
    # Bold
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # Split into paragraphs
    paragraphs = re.split(r'\n\s*\n', text.strip())
    html_parts = []
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
        if p.startswith('<div class="scene-break"'):
            html_parts.append(p)
        else:
            # Join lines within a paragraph
            p = re.sub(r'\n', ' ', p)
            html_parts.append(f'<p>{p}</p>')
    return '\n'.join(html_parts)


def image_to_base64(img_path: Path) -> str:
    """Read image and return base64 data URI."""
    mime, _ = mimetypes.guess_type(str(img_path))
    if not mime:
        mime = 'image/png'
    data = img_path.read_bytes()
    b64 = base64.b64encode(data).decode('ascii')
    return f'data:{mime};base64,{b64}'


def generate_html(spreads, md_dir: Path, title: str) -> str:
    """Generate the full HTML picture book."""
    pages_html = []

    for i, spread in enumerate(spreads):
        text_html = md_to_html_simple(spread['text'])

        if spread['image']:
            img_path = md_dir / spread['image']
            if img_path.exists():
                img_src = image_to_base64(img_path)
            else:
                print(f"Warning: image not found: {img_path}", file=sys.stderr)
                img_src = ''

            pages_html.append(f'''
    <div class="spread" id="page-{i}">
      <div class="spread-image">
        <img src="{img_src}" alt="">
      </div>
      <div class="spread-text">
        {text_html}
      </div>
    </div>''')
        else:
            pages_html.append(f'''
    <div class="spread text-only" id="page-{i}">
      <div class="spread-text full">
        {text_html}
      </div>
    </div>''')

    pages_joined = '\n'.join(pages_html)
    total = len(spreads)

    return f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>{title}</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}

  html, body {{
    height: 100%;
    background: #1a1a1a;
    color: #e8e0d4;
    font-family: Georgia, 'Times New Roman', serif;
    overflow: hidden;
    /* Kill Chrome Android font boosting */
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }}

  .spread {{
    display: none;
    height: 100dvh;
    width: 100vw;
    padding: 1rem 1rem 2.5rem 1rem;
    gap: 1rem;
  }}

  .spread.active {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }}

  .spread.text-only.active {{
    grid-template-columns: 1fr;
    justify-items: center;
  }}

  .spread-image {{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 0;
  }}

  .spread-image img {{
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }}

  .spread-text {{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 1.2rem;
    font-size: 18px;
    line-height: 1.65;
    min-height: 0;
    /* Prevent Chrome font boosting in scrollable containers */
    max-height: 999999px;
  }}

  .spread-text.full {{
    max-width: 40rem;
  }}

  .spread-text p {{
    margin-bottom: 0.75em;
  }}

  .scene-break {{
    text-align: center;
    margin: 1em 0;
    color: #666;
    letter-spacing: 0.3em;
  }}

  /* Bottom bar: nav + indicator */
  .bottom-bar {{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background: rgba(26,26,26,0.9);
    z-index: 20;
    -webkit-tap-highlight-color: transparent;
  }}

  .bottom-bar button {{
    background: none;
    border: none;
    color: #777;
    font-size: 1.3rem;
    padding: 0 1rem;
    cursor: pointer;
    line-height: 2.2rem;
  }}
  .bottom-bar button:active {{ color: #ccc; }}

  .bottom-bar .indicator {{
    color: #555;
    font-size: 0.75rem;
    min-width: 3rem;
    text-align: center;
  }}

  /* Portrait / narrow screens */
  @media (max-aspect-ratio: 1/1) {{
    .spread.active {{
      grid-template-columns: 1fr;
      grid-template-rows: 40% 1fr;
    }}
    .spread-text {{
      font-size: 16px;
      padding: 0.5rem 0.8rem;
    }}
  }}
</style>
</head>
<body>

{pages_joined}

<div class="bottom-bar">
  <button id="btn-prev">&larr;</button>
  <span class="indicator" id="indicator"></span>
  <button id="btn-next">&rarr;</button>
</div>

<script>
const total = {total};
let current = 0;

function show(n) {{
  document.querySelectorAll('.spread').forEach(s => s.classList.remove('active'));
  const page = document.getElementById('page-' + n);
  if (page) {{
    page.classList.add('active');
    // Reset scroll on the text column
    const txt = page.querySelector('.spread-text');
    if (txt) txt.scrollTop = 0;
  }}
  document.getElementById('indicator').textContent = (n + 1) + ' / ' + total;
  current = n;
}}

document.getElementById('btn-prev').addEventListener('click', () => {{
  if (current > 0) show(current - 1);
}});
document.getElementById('btn-next').addEventListener('click', () => {{
  if (current < total - 1) show(current + 1);
}});

// Swipe on image side only (don't fight with text scroll)
let startX = 0, startY = 0;
document.addEventListener('touchstart', e => {{
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}}, {{ passive: true }});

document.addEventListener('touchend', e => {{
  // Skip if touch was inside a scrollable text column
  if (e.target.closest('.spread-text')) return;
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  // Only trigger if horizontal movement dominates
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {{
    if (dx < 0 && current < total - 1) show(current + 1);
    if (dx > 0 && current > 0) show(current - 1);
  }}
}}, {{ passive: true }});

// Keyboard
document.addEventListener('keydown', e => {{
  if (e.key === 'ArrowRight' || e.key === ' ') {{ if (current < total - 1) show(current + 1); }}
  if (e.key === 'ArrowLeft') {{ if (current > 0) show(current - 1); }}
}});

show(0);
</script>

</body>
</html>'''


def main():
    parser = argparse.ArgumentParser(description='Convert markdown story to HTML picture book')
    parser.add_argument('markdown', help='Path to the markdown file')
    parser.add_argument('-o', '--output', help='Output HTML file (default: same name .html)')
    args = parser.parse_args()

    md_path = Path(args.markdown)
    if not md_path.exists():
        print(f"Error: {md_path} not found", file=sys.stderr)
        sys.exit(1)

    md_text = md_path.read_text(encoding='utf-8')
    md_dir = md_path.parent

    # Extract title from first heading
    title_match = re.search(r'^#\s+(.+)', md_text, re.MULTILINE)
    title = title_match.group(1) if title_match else md_path.stem

    blocks = parse_markdown(md_text)
    spreads = blocks_to_spreads(blocks)

    html = generate_html(spreads, md_dir, title)

    if args.output:
        out_path = Path(args.output)
    else:
        out_path = md_path.with_suffix('.html')

    out_path.write_text(html, encoding='utf-8')
    print(f"Generated: {out_path} ({len(spreads)} spreads)")


if __name__ == '__main__':
    main()
