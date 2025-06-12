"use client";
import React, { useState } from "react";
import BlogHeader from "../components/BlogHeader";
import BlogContent from "../components/BlogContent";

export default function BlogPage() {
  const [tab] = useState<'about' | 'posts' | 'tags' | 'portfolio' | 'incenger'>('incenger');
  return (
    <>
      <BlogHeader tab={tab} onShowBlog={() => {}} />
      <BlogContent tab={tab} />
    </>
  );
} 