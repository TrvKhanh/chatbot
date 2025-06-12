export interface Heading {
  level: number;
  text: string;
  id: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];
  for (const line of lines) {
    const match = /^(#{1,6})\s+(.*)/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }
  }
  return headings;
} 