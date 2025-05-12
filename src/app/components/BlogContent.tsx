import React from 'react';
import AboutContent from './AboutContent';
import PostList from './PostList';

interface BlogContentProps {
  tab: 'about' | 'posts' | 'tags' | 'portfolio' | 'incenger';
}

const BlogContent: React.FC<BlogContentProps> = ({ tab }) => {
  if (tab === 'incenger') {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-[#363636]">
        <h1 className="text-5xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100 mt-2">Hi! I&apos;m Khanh</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300">I write to think</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-[#363636]">
      {tab === 'about' ? (
        <AboutContent />
      ) : tab === 'posts' ? (
        <PostList />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="text-5xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-100 mt-10">
            Tags
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* TODO: Render danh sách tag và số lượng bài viết ở đây */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContent; 