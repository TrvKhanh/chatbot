"use client";
import BlogHeader from "../../components/BlogHeader";
import BlogContent from "../../components/BlogContent";

export default function BlogTagsPage() {
  return (
    <>
      <BlogHeader tab="tags" onShowBlog={() => {}} />
      <BlogContent tab="tags" />
    </>
  );
} 