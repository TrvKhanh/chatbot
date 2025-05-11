import React from 'react';
import AboutContent from './AboutContent';
import PostList from './PostList';

interface BlogContentProps {
  tab: 'about' | 'posts' | 'tags' | 'portfolio';
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