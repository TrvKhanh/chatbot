import React, { useState } from 'react';
import AboutContent from './AboutContent';

const BlogContent: React.FC = () => {
  const [tab, setTab] = useState<'home' | 'about'>('home');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* Header */}
      <div className="w-full flex items-center justify-between py-4 px-4 md:px-8 bg-white dark:bg-[#181818] select-none">
        <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center">
          &gt; /home/incenger
          <span className="ml-1 w-3 h-5 bg-pink-300 animate-pulse rounded-sm inline-block align-middle"></span>
        </div>
        <div className="flex gap-10 text-base">
          <button onClick={() => setTab('about')} className="text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline focus:outline-none">About</button>
          <a href="#" className="text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline">Posts</a>
          <a href="#" className="text-gray-700 dark:text-gray-200 font-bold hover:text-pink-500 transition no-underline">Tags</a>
        </div>

      </div>
      {/* Main content */}
      {tab === 'about' ? (
        <AboutContent />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100 mt-10">
            Hi! I'm Khanh
          </div>
          <div className="text-gray-500 dark:text-gray-300 text-center mb-8 text-lg">
            I write to think
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContent; 