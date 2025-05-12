"use client";
import React from "react";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <main className="flex-1 overflow-auto flex flex-col items-center justify-start">
      <MainContent onSendFirstMessage={() => {}} />
    </main>
  );
}
