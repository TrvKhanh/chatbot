import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const PostList: React.FC = () => {
  const [showPreview, setShowPreview] = useState<{title: string, content: string, date: string} | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [createdPosts, setCreatedPosts] = useState<{title: string, content: string, date: string}[]>([]);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');

  // Helper: Nhóm bài viết theo năm
  const postsByYear = createdPosts.reduce((acc: Record<string, {title: string, content: string, date: string}[]>, post: {title: string, content: string, date: string}) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});
  const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  useEffect(() => {
    if (showPreview) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showPreview]);

  if (showPreview) {
    return (
      <div className="blog-preview-container max-w-4xl mx-auto px-10 w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold">{showPreview.title}</h1>
            <button
              onClick={() => setShowPreview(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-300 transition"
            >
              Quay lại danh sách
            </button>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-4">{showPreview.date}</div>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-li:my-1 prose-ol:list-[upper-roman]">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{showPreview.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showEditor) {
    return (
      <div className="max-w-2xl mx-auto mt-8 px-4 w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold">Tạo bài viết mới</h1>
            <div className="flex gap-2">
              <button onClick={() => setShowEditor(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-300 transition">Cancel</button>
              <button onClick={() => {
                const now = new Date().toLocaleString();
                setCreatedPosts(prev => [...prev, { title, content: markdown, date: now }]);
                setShowEditor(false);
                setShowPreview({ title, content: markdown, date: now });
                setTitle('');
                setMarkdown('');
              }} className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition">Save</button>
            </div>
          </div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề" className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
          <input type="text" placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!" className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
          <MdEditor
            value={markdown}
            style={{ height: '500px' }}
            renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }: { text: string }) => setMarkdown(text)}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23232a] py-16 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white">Blog Posts</h1>
          <button
            className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
            onClick={() => setShowEditor(true)}
          >
            + New Post
          </button>
        </div>
        {createdPosts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">Chưa có bài viết nào.</div>
        ) : (
          <div className="space-y-12">
            {sortedYears.map(year => (
              <div key={year}>
                <div className="text-3xl font-bold text-gray-300 dark:text-gray-500 mb-4 pl-2">{year}</div>
                <ul className="divide-y divide-dotted divide-gray-300 dark:divide-gray-700 bg-white dark:bg-[#23232a] rounded-2xl shadow-md">
                  {postsByYear[year].map((post) => (
                    <li
                      key={post.title + post.date}
                      className="flex items-center justify-between px-6 py-5 group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#18181b] transition"
                      onClick={() => setShowPreview(post)}
                    >
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-100 group-hover:text-pink-600 transition truncate max-w-[70%]">{post.title}</span>
                      <span className="text-base text-gray-400 font-mono tracking-wide">{new Date(post.date).toLocaleString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <button className="mt-16 mx-auto block rounded-full px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-[#23232a] dark:to-[#18181b] text-gray-700 dark:text-gray-200 font-bold shadow hover:from-gray-300 hover:to-gray-400 dark:hover:from-[#18181b] dark:hover:to-[#23232a] transition text-lg">
          Older posts &rarr;
        </button>
      </div>
    </section>
  );
};

export default PostList;
