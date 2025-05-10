"use client";
import React, { useState, useContext } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MainContent from "./components/MainContent";
import ChatBox from "./components/ChatBox";
import { ThemeContext } from "./ThemeProvider";

interface Session {
  id: string;
  title: string;
}

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const [firstMessage, setFirstMessage] = useState<string | null>(null);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Khi gửi tin nhắn đầu tiên, tạo session mới và chuyển giao diện
  const handleFirstMessage = (firstMsg: string) => {
    const newId = Date.now().toString();
    setSessions((prev) => [
      ...prev,
      { id: newId, title: firstMsg.slice(0, 20) + (firstMsg.length > 20 ? "..." : "") },
    ]);
    setCurrentSessionId(newId);
    setShowWorkspace(true);
    setFirstMessage(firstMsg);
    setShowChat(true);
  };

  // Khi chọn session khác
  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSessionId === id) {
      const next = sessions.find((s) => s.id !== id);
      if (next) setCurrentSessionId(next.id);
      else setShowWorkspace(false);
    }
  };

  const handleSendFirstMessage = (msg: string) => {
    setFirstMessage(msg);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar theme={theme} setTheme={setTheme} />
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
