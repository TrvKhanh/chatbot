import React from 'react';
import AboutContent from './AboutContent';
import PostList from './PostList';

interface BlogContentProps {
  tab: 'about' | 'posts' | 'tags';
}

const BlogContent: React.FC<BlogContentProps> = ({ tab }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {tab === 'about' ? (
        <AboutContent />
      ) : tab === 'posts' ? (
        <PostList />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100 mt-10">
            Hi! I&apos;m Khanh
          </div>
          <div className="text-gray-500 dark:text-gray-300 text-center mb-8 text-lg">
            I write to think
          </div>
          <div className="text-gray-400 dark:text-gray-400 text-center text-base">
            Welcome to my blog
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContent; 