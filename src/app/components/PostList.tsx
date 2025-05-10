import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

const PostList: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [createdPosts, setCreatedPosts] = useState<{title: string, content: string, date: string}[]>([]);
  const [showPreview, setShowPreview] = useState<{title: string, content: string, date: string} | null>(null);
  const [title, setTitle] = useState('');

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
              }} className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition">Savet</button>
            </div>
          </div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề" className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
          <input type="text" placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!" className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
          <MdEditor
            value={markdown}
            style={{ height: '500px' }}
            renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setMarkdown(text)}
          />
        </div>
      </div>
    );
  }

  if (showPreview) {
    return (
      <div className="max-w-2xl mx-auto mt-8 px-4 w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold">{showPreview.title}</h1>
            <button onClick={() => setShowPreview(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-300 transition">Quay lại danh sách</button>
          </div>
          <div className="text-sm text-gray-400 mb-4">{showPreview.date}</div>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{showPreview.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 w-full">
      <div className="w-full">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-[Bahnschrift_SemiBold] text-center">Posts</h1>
          <button className="ml-4 px-5 py-2 bg-pink-500 text-white rounded-full font-semibold shadow hover:bg-pink-600 transition flex items-center gap-2" onClick={() => setShowEditor(true)}>
            <span className="text-xl font-bold">+</span> New Post
          </button>
        </div>
        {createdPosts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-10">Chưa có bài viết</div>
        ) : (
          <ul>
            {createdPosts.map((post, idx) => (
              <li
                key={post.title + idx}
                className="flex items-center justify-between py-2 border-b border-dotted border-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => setShowPreview(post)}
              >
                <span className="text-base text-gray-800 dark:text-gray-100">{post.title}</span>
                <span className="text-base text-gray-400">{post.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostList; 