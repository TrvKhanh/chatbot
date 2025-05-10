import React from 'react';

interface BlogHeaderProps {
  tab: 'about' | 'posts' | 'tags';
  setTab: (tab: 'about' | 'posts' | 'tags') => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ tab, setTab }) => (
  <div className="w-full flex items-center justify-between py-4 px-4 md:px-8 bg-white dark:bg-[#181818] select-none sticky top-30 z-20">
    <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center">
      &gt; /home/incenger
      <span className="ml-1 w-3 h-5 bg-pink-300 animate-pulse rounded-sm inline-block align-middle"></span>
    </div>
    <div className="absolute left-2/3 top-1/2 -translate-y-1/2 flex gap-4">
      <button
        onClick={() => setTab('about')}
        className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'about' ? 'text-pink-500' : ''}`}
      >
        About
      </button>
      <button
        onClick={() => setTab('posts')}
        className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'posts' ? 'text-pink-500' : ''}`}
      >
        Posts
      </button>
      <button
        onClick={() => setTab('tags')}
        className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'tags' ? 'text-pink-500' : ''}`}
      >
        Tags
      </button>
    </div>
  </div>
);

export default BlogHeader; 