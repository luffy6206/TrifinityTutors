#!/usr/bin/env python3
from pathlib import Path
import re
import os
root = Path('frontend/src')
exts = ['.jsx','.js','.tsx','.ts']
# build mapping from lowercase import-key -> cased import-key (no ext)
mapping = {}
for p in root.rglob('*'):
    if p.suffix.lower() in exts:
        rel = p.relative_to(root)
        # if file is index, key is parent path
        if p.stem.lower() == 'index':
            key = str(rel.parent).replace('\\','/')
        else:
            key = str(rel.with_suffix('')).replace('\\','/')
        lower = key.lower()
        if lower not in mapping:
            mapping[lower] = key

# helper to find mapping for a requested import path key

def find_mapping_for(key):
    k = key.replace('\\','/').lstrip('/')
    return mapping.get(k.lower())

changed_files = []
changes = []
for file in root.rglob('*'):
    if file.suffix.lower() not in exts:
        continue
    text = file.read_text(encoding='utf-8')
    new = text
    made_change = False
    for m in re.finditer(r"['\"]([^'\"]+)['\"]", text):
        imp = m.group(1)
        original = imp
        new_imp = None
        if imp.startswith('@/'):
            key = imp[2:]
            mapped = find_mapping_for(key)
            if mapped and mapped != key:
                new_imp = '@/'+mapped
        elif imp.startswith('./') or imp.startswith('../'):
            try:
                # resolve symbolic path relative to project root frontend/src
                abs_candidate = (file.parent / imp).resolve()
                root_abs = (Path.cwd() / 'frontend' / 'src').resolve()
                if str(abs_candidate).startswith(str(root_abs)):
                    tgt_rel = abs_candidate.relative_to(root_abs)
                    key = str(tgt_rel).replace('\\','/')
                else:
                    key = None
            except Exception:
                key = None
            if key:
                mapped = find_mapping_for(key)
                if mapped and mapped != key:
                    abs_target = Path.cwd() / 'frontend' / 'src' / mapped
                    relpath = os.path.relpath(abs_target, file.parent)
                    relpath = relpath.replace('\\','/')
                    if not relpath.startswith('.'):
                        relpath = './' + relpath
                    new_imp = relpath
        else:
            if imp.startswith('components/'):
                mapped = find_mapping_for(imp)
                if mapped and mapped != imp:
                    new_imp = mapped
        if new_imp and new_imp != original:
            span = m.span(1)
            new = new[:span[0]] + new_imp + new[span[1]:]
            made_change = True
            # record using posix-style path relative to repo root
            changes.append((str(file).replace('\\','/'), original, new_imp))
            text = new
    if made_change:
        file.write_text(new, encoding='utf-8')
        changed_files.append(str(file).replace('\\','/'))

print('Changed files:')
for f in changed_files:
    print(f)
print('\nDetailed changes:')
for f,o,n in changes:
    print(f"{f}: '{o}' -> '{n}'")

print(f"\nTotal files changed: {len(changed_files)}")
print(f"Total replacements: {len(changes)}")
