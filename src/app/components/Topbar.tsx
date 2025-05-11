import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface TopbarProps {
  onNewChat?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onNewChat }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center px-20 py-4 bg-white dark:bg-[#1C1C1C] border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10 group">
      <div className="flex-1 flex items-center">
        <div className="font-bold font-sans">
          <h1 className="text-2xl bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-3xl">⚡</span>bigK, the all-powerful AI!
          </h1>
        </div>
      </div>
      <button
        className="ml-5 px-1 py-1 rounded-full bg-[#FF3399] text-white font-semibold shadow-lg hover:shadow-1xl transition-all duration-300 focus:outline-none ring-2 ring-pink-200 hover:ring-4 active:scale-95"
        style={{ boxShadow: '0 2px 24px 0 rgba(255,51,153,0.4)' }}
        aria-label="New chat"
        onClick={onNewChat}
      >
        New Chat
      </button>
      <button
        onClick={toggleTheme}
        className="ml-5 p-1 rounded-full bg-gradient-to-br from-yellow-300 via-white to-blue-400 dark:from-gray-700 dark:via-gray-900 dark:to-blue-900 shadow-lg hover:shadow-2xl ring-2 ring-white dark:ring-blue-900 transition-all duration-300 focus:outline-none"
        aria-label="Toggle dark mode"
        style={{ boxShadow: theme === 'dark' ? '0 3px 15px 0 rgba(0, 60, 255, 0.5)' : '0 3px 15px 0 rgba(255, 200, 0, 0.5)' }}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-300 drop-shadow-[0_0_8px_rgba(0,60,255,0.5)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.438-9.165a.75.75 0 01.908.325.75.75 0 01-.062.954A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.636-3.938.75.75 0 01.954-.062.75.75 0 01.325.908z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,200,0,0.5)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Topbar; 