"use client";
import ChatBox from "../components/ChatBox";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageInner />
    </Suspense>
  );
}

function ChatPageInner() {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("msg") || undefined;
  return <ChatBox initialMessage={initialMessage} />;
} 