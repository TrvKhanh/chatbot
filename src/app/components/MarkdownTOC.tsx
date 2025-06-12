import React from 'react';
import type { Heading } from '../utils/markdownToc';

export default function MarkdownTOC({ headings }: { headings: Heading[] }) {
  if (!headings || !headings.length) return null;
  return (
    <nav className="mb-8">
      <div className="font-bold mb-2">Table of Contents</div>
      <ul className="ml-4 list-disc">
        {headings.map(h => (
          <li key={h.id} style={{ marginLeft: (h.level - 1) * 16 }}>
            <a href={`#${h.id}`} className="hover:underline">{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 