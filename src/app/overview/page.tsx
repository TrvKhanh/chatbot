"use client";
import MainContent from "../components/MainContent";
import { useRouter } from "next/navigation";

export default function OverviewPage() {
  const router = useRouter();
  return (
    <MainContent
      onSendFirstMessage={msg => {
        if (msg && msg.trim()) {
          router.push(`/chat?msg=${encodeURIComponent(msg)}`);
        }
      }}
    />
  );
} 