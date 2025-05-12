import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { extractHeadings } from '../utils/markdownToc';
import MarkdownTOC from './MarkdownTOC';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const PostList: React.FC = () => {
  const [showPreview, setShowPreview] = useState<{id: string, title: string, content: string, date: string, tags?: string} | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [createdPosts, setCreatedPosts] = useState<{_id?: string, id: string, title: string, content: string, date: string, tags?: string}[]>([]);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [pendingAction, setPendingAction] = useState<null | 'edit' | 'delete'>(null);
  const [editingPost, setEditingPost] = useState<{_id?: string, id: string, title: string, content: string, date: string, tags?: string} | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCreatedPosts(data);
        } else {
          setCreatedPosts([]);
          // Optionally: console.error('API error:', data.error);
        }
      });
  }, []);

  // Helper: Nhóm bài viết theo năm
  const postsByYear = createdPosts.reduce((acc: Record<string, {_id?: string, id: string, title: string, content: string, date: string, tags?: string}[]>, post: {_id?: string, id: string, title: string, content: string, date: string, tags?: string}) => {
    let year: string | number = '';
    if (post.date) {
      const d = new Date(post.date);
      year = isNaN(d.getFullYear()) ? 'unknown' : d.getFullYear();
    } else {
      year = 'unknown';
    }
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

  if (showPasswordModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Password</h2>
          <input
            ref={passwordInputRef}
            type="password"
            className="border border-gray-300 rounded px-4 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-center bg-gray-50 dark:bg-[#18181b] text-lg"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCheckPassword(); }}
            autoFocus
          />
          {passwordError && <div className="text-red-500 mb-2 text-sm">{passwordError}</div>}
          <div className="flex gap-3 mt-2">
            <button
              className="px-4 py-1 rounded bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition"
              onClick={handleCheckPassword}
            >OK</button>
            <button
              className="px-4 py-1 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition"
              onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); setPendingAction(null); }}
            >Hủy</button>
          </div>
        </div>
      </div>
    );
  }

  if (showPreview) {
    const headings = extractHeadings(showPreview.content || '');
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center pt-6 pb-12 bg-gray-100 dark:bg-[#363636]">
        <div className="max-w-6xl w-full bg-white dark:bg-[#23232a] rounded-2xl shadow-lg p-8 sm:p-16 relative">
          <button
            onClick={() => setShowPreview(null)}
            className="absolute top-6 left-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Quay lại danh sách"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => {
              setPendingAction('edit');
              setShowPasswordModal(true);
            }}
            className="absolute top-6 right-16 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Chỉnh sửa bài viết"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 5.487a2.1 2.1 0 1 1 2.97 2.97L8.5 19.79l-4 1 1-4 13.362-13.303z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setPendingAction('delete');
              setShowPasswordModal(true);
            }}
            className="absolute top-6 right-6 p-2 rounded-full bg-red-200 dark:bg-red-700 text-red-700 dark:text-red-200 shadow hover:bg-red-300 dark:hover:bg-red-600 transition"
            aria-label="Xóa bài viết"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h2a1 1 0 011 1v3m-7 0v10a2 2 0 002 2h6a2 2 0 002-2V7" />
            </svg>
          </button>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{showPreview.title}</h1>
          </div>
          {showPreview.tags && (
            <div className="mb-2 flex flex-wrap gap-2">
              {typeof showPreview.tags === 'string'
                ? showPreview.tags.split(',').map(tag => (
                    <span key={tag} className="inline-block bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200 px-3 py-1 rounded-full text-xs font-semibold">#{tag.trim()}</span>
                  ))
                : (showPreview.tags as string[]).map((tag: string) => (
                    <span key={tag} className="inline-block bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200 px-3 py-1 rounded-full text-xs font-semibold">#{tag.trim()}</span>
                  ))}
            </div>
          )}
          <div className="text-sm text-gray-400 mb-4">{showPreview.date}</div>
          <MarkdownTOC headings={headings} />
          <div className="prose prose-xl dark:prose-invert max-w-none prose-li:my-1 prose-ol:list-[upper-roman] mx-auto">
            <ReactMarkdown 
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
            >{showPreview.content}</ReactMarkdown>
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
              <button onClick={() => { setShowEditor(false); setEditingPost(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-300 transition">Cancel</button>
              <button onClick={savePost} className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition">Save</button>
            </div>
          </div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề" className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
          <input
            type="text"
            value={Array.isArray(tags) ? tags.join(',') : tags}
            onChange={e => setTags(
              e.target.value
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean)
                .slice(0, 5)
            )}
           
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <MdEditor
            value={markdown}
            style={{ height: '500px' }}
            renderHTML={(text: string) => (
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >{text}</ReactMarkdown>
            )}
            onChange={({ text }: { text: string }) => setMarkdown(text)}
          />
        </div>
      </div>
    );
  }

  async function handleCheckPassword() {
    if (password === '05042003') {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      if (pendingAction === 'edit' && showPreview) {
        setShowEditor(true);
        setShowPreview(null);
        setTitle(showPreview.title);
        setMarkdown(showPreview.content);
        setEditingPost(showPreview as typeof showPreview);
        if (showPreview.tags) {
          if (Array.isArray(showPreview.tags)) setTags(showPreview.tags);
          else setTags(showPreview.tags.split(',').map((t: string) => t.trim()).filter(Boolean));
        } else setTags([]);
      } else if (pendingAction === 'delete' && showPreview) {
        await fetch('/api/posts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: showPreview.id })
        });
        setCreatedPosts(prev => prev.filter(post => post.id !== showPreview.id));
        setShowPreview(null);
      } else {
        // Trường hợp tạo mới bài viết
        setShowEditor(true);
        setTitle('');
        setMarkdown('');
        setTags([]);
      }
      setPendingAction(null);
    } else {
      setPasswordError('Sai mật khẩu!');
      setPassword('');
      passwordInputRef.current?.focus();
    }
  }

  async function savePost() {
    if (editingPost && editingPost.id) {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingPost.id,
          title,
          content: markdown,
          tags
        })
      });
      const updatedPost = await res.json();
      setCreatedPosts(prev =>
        prev.map(post =>
          post.id === editingPost.id ? updatedPost : post
        )
      );
      setEditingPost(null);
      setShowEditor(false);
      setShowPreview(updatedPost);
      setTitle('');
      setMarkdown('');
      setTags([]);
    } else {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: markdown, tags })
      });
      const newPost = await res.json();
      setCreatedPosts(prev => [...prev, newPost]);
      setShowEditor(false);
      setShowPreview(newPost);
      setTitle('');
      setMarkdown('');
      setTags([]);
    }
  }

  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-[#363636] py-20 px-4 mt-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white font-mono">Posts</h1>
          <button
            className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-sm shadow-2xl hover:from-pink-600 hover:to-purple-600 transition active:scale-95 active:shadow-xl border-b-4 border-pink-700"
            style={{ boxShadow: '0 10px 20px 0 rgba(0,0,0,0.25), 0 4px 16px 0 rgba(255,0,128,0.25), 0 0px 0px 4px rgba(236,72,153,0.15)' }}
            onClick={() => { setShowPasswordModal(true); setTags([]); }}
          >
           New Post
          </button>
        </div>
        {createdPosts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">Chưa có bài viết nào.</div>
        ) : (
          <div className="space-y-10">
            {sortedYears.map(year => (
              <div key={year !== 'unknown' ? year : `unknown-${Math.random()}`} className="flex gap-8">
                <div className="min-w-[70px] text-2xl font-bold text-gray-400 pt-2 text-right select-none font-sans">{year}</div>
                <ul className="flex-1 w-full">
                  {postsByYear[year].map((post) => (
                    <li
                      key={post._id ?? post.id ?? post.title + post.date}
                      className="flex items-center group cursor-pointer py-2 border-0 border-b border-dotted border-gray-300 dark:border-gray-700 transition"
                    >
                      <span
                        className="flex-1 text-base font-normal text-gray-800 dark:text-gray-100 group-hover:text-pink-600 transition truncate font-sans"
                        onClick={() => setShowPreview(post)}
                      >
                        {post.title}
                      </span>
                      <span className="text-sm text-gray-400 font-sans ml-4 min-w-[60px] text-right">{post.date ? new Date(post.date).toLocaleString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
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
