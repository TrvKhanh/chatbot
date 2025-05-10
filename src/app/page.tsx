"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MainContent from "./components/MainContent";
import ChatBox from "./components/ChatBox";
import BlogContent from "./components/BlogContent";
import BlogHeader from "./components/BlogHeader";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [firstMessage, setFirstMessage] = useState<string | null>(null);
  const [blogTab, setBlogTab] = useState<'about' | 'posts' | 'tags'>('about');

  const handleSendFirstMessage = (msg: string) => {
    setFirstMessage(msg);
    setShowChat(true);
    setShowBlog(false);
  };

  return (
    <div className="min-h-screen h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar
        onShowChat={() => {
          setShowChat(true);
          setShowBlog(false);
        }}
        onShowOverview={() => {
          setShowChat(false);
          setShowBlog(false);
        }}
        onShowBlog={() => {
          setShowBlog(true);
          setShowChat(false);
        }}
      />
      <div className="flex-1 flex flex-col h-full">
        <Topbar />
        <main className="flex-1 overflow-auto flex flex-col items-center justify-start">
          {showBlog ? (
            <>
              <BlogHeader tab={blogTab} setTab={setBlogTab} />
              <BlogContent tab={blogTab} />
            </>
          ) : !showChat ? (
            <MainContent onSendFirstMessage={handleSendFirstMessage} />
          ) : (
            <ChatBox initialMessage={firstMessage || undefined} />
          )}
        </main>
      </div>
    </div>
  );
}
