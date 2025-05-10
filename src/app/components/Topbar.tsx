import React, { useState, useEffect } from 'react';

const Topbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, mounted]);

  return (
    <div className="flex items-center px-20 py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10 group">
      <div className="flex-1 flex items-center">
        <div className="font-bold font-sans">
          <h1 className="text-2xl bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-3xl">⚡</span>bigK, the all-powerful AI!
          </h1>
        </div>
      </div>
      {mounted && (
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="ml-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.438-9.165a.75.75 0 01.908.325.75.75 0 01-.062.954A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.636-3.938.75.75 0 01.954-.062.75.75 0 01.325.908z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
          )}
        </button>
      )}
      <div className="dark:bg-red-500">Test dark</div>
    </div>
  );
};

export default Topbar; 