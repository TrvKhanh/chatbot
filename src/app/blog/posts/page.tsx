"use client";
import BlogHeader from "../../components/BlogHeader";
import BlogContent from "../../components/BlogContent";

export default function BlogPostsPage() {
  return (
    <>
      <BlogHeader tab="posts" onShowBlog={() => {}} />
      <BlogContent tab="posts" />
    </>
  );
} 