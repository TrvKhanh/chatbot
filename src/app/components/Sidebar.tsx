"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const aiFeatures = [
  "Photo editing",
  "Video generation",
  "Audio generation",
  "Code generation",
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [selectedAIFeature, setSelectedAIFeature] = useState(aiFeatures[0]);
  const router = useRouter();

  if (!open) {
    return (
      <button
        className="fixed top-6 left-2 z-50 p-1 rounded-full bg-white dark:bg-[#1C1C1C] shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-[#1C1C1C] border-r border-gray-200 dark:border-gray-700 flex flex-col relative transition-all duration-300">
      <button
        className="absolute -right-3 top-6 z-50 p-1 rounded-full bg-white dark:bg-[#1C1C1C] shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={() => setOpen(false)}
        aria-label="Close sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-4">
          {/* Dashboard Section */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
              Main
            </h2>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => router.push('/overview')}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push('/blog')}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM7 3v4m10-4v4M7 13h10M7 17h6" />
                  </svg>
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* AI Section */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
              AI Tools
            </h2>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setShowAIFeatures(v => !v)}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  AI Dashboard
                  <svg className={`w-4 h-4 ml-auto transition-transform ${showAIFeatures ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {showAIFeatures && (
                  <div className="mt-2 px-3 space-y-2">
                    {aiFeatures.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSelectedAIFeature(f)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition font-medium text-sm
                          ${selectedAIFeature === f ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 dark:bg-[#363636] text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push('/chat')}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Chat
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              User Name
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 