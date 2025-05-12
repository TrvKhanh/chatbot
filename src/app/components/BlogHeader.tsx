"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface BlogHeaderProps {
  tab: 'about' | 'posts' | 'tags' | 'portfolio' | 'incenger';
  onShowBlog?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ tab, onShowBlog }) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between py-4 px-4 md:px-8 bg-white dark:bg-[#181818] select-none sticky top-30 z-20">
      <div
        className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center cursor-pointer"
        onClick={() => {
          router.push('/blog/incenger');
          if (onShowBlog) onShowBlog();
        }}
      >
        &gt; /home/bigK
        <span className="ml-1 w-3 h-5 bg-pink-300 animate-pulse rounded-sm inline-block align-middle"></span>
      </div>
      <div className="absolute left-2/3 top-1/2 -translate-y-1/2 flex gap-4">
        <button
          onClick={() => router.push('/blog/about')}
          className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'about' ? 'text-pink-500' : ''}`}
        >
          About
        </button>
        <button
          onClick={() => router.push('/blog/posts')}
          className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'posts' ? 'text-pink-500' : ''}`}
        >
          Posts
        </button>
        <button
          onClick={() => router.push('/blog/tags')}
          className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'tags' ? 'text-pink-500' : ''}`}
        >
          Tags
        </button>
        <a
          href="https://tranvankhanh.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none ${tab === 'portfolio' ? 'text-pink-500' : ''}`}
        >
          Portfolio
        </a>
      </div>
    </div>
  );
};

export default BlogHeader; 