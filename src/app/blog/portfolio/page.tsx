"use client";
import BlogHeader from "../../components/BlogHeader";
import BlogContent from "../../components/BlogContent";

export default function BlogPortfolioPage() {
  return (
    <>
      <BlogHeader tab="portfolio" onShowBlog={() => {}} />
      <BlogContent tab="portfolio" />
    </>
  );
} 