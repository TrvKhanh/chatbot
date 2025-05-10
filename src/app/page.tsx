"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MainContent from "./components/MainContent";
import ChatBox from "./components/ChatBox";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [firstMessage, setFirstMessage] = useState<string | null>(null);

  const handleSendFirstMessage = (msg: string) => {
    setFirstMessage(msg);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {!showChat ? (
            <MainContent onSendFirstMessage={handleSendFirstMessage} />
          ) : (
            <ChatBox initialMessage={firstMessage || undefined} />
          )}
        </main>
      </div>
    </div>
  );
}
