import { Post } from '../types';

const API_URL = '/api';

export const fetchPosts = async (page: number, limit: number) => {
  const res = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const createPost = async (post: Omit<Post, '_id'>) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
};

export const updatePost = async (post: Post) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}; 