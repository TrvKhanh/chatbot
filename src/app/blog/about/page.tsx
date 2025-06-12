"use client";
import BlogHeader from "../../components/BlogHeader";
import BlogContent from "../../components/BlogContent";

export default function BlogAboutPage() {
  return (
    <>
      <BlogHeader tab="about" onShowBlog={() => {}} />
      <BlogContent tab="about" />
    </>
  );
} 