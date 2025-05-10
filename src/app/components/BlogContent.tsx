import React from 'react';

const socials = [
  { href: 'mailto:someone@example.com', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
  ) },
  { href: '#', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1.64a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.18 3.01 4.1 3.05A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0024 4.59a9.03 9.03 0 01-2.6.71z" /></svg>
  ) },
  { href: '#', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.87 8.82 8.71 9.72.64.12.87-.28.87-.62v-2.17c-3.54.77-4.29-1.71-4.29-1.71-.58-1.47-1.42-1.86-1.42-1.86-1.16-.8.09-.78.09-.78 1.28.09 1.95 1.32 1.95 1.32 1.14 1.95 2.99 1.39 3.72 1.06.12-.83.45-1.39.82-1.71-2.83-.32-5.8-1.41-5.8-6.28 0-1.39.5-2.53 1.32-3.42-.13-.32-.57-1.6.13-3.34 0 0 1.07-.34 3.5 1.31A12.1 12.1 0 0112 6.8c1.09.01 2.19.15 3.22.44 2.42-1.65 3.49-1.31 3.49-1.31.7 1.74.26 3.02.13 3.34.82.89 1.32 2.03 1.32 3.42 0 4.88-2.98 5.96-5.81 6.28.46.4.87 1.18.87 2.38v3.53c0 .34.23.74.88.62C20.13 20.82 24 16.84 24 12c0-5.52-4.48-10-10-10z" /></svg>
  ) },
  { href: '#', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm2 12a8 8 0 10-16 0h16z" /></svg>
  ) },
  { href: '#', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 015.636 18.364M15 9h.01M9 15h.01" /></svg>
  ) },
  { href: '#', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  ) },
];

const BlogContent: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full px-8 py-8">
    <div className="text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100 mt-20">
      Hi! I'm Tam Le
    </div>
    <div className="text-gray-500 dark:text-gray-300 text-center mb-8 text-lg">
      I write to think
    </div>
    <div className="flex gap-4 mb-8">
      {socials.map((s, idx) => (
        <a key={idx} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
          {s.icon}
        </a>
      ))}
    </div>
  </div>
);

export default BlogContent; 