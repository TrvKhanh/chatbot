import React, { useState } from 'react';

const features = [
  {
    title: 'Photo editing',
    desc: 'Easily edit your photos',
    icon: (
      <span className="text-3xl">🖼️</span>
    ),
    color: 'bg-yellow-50 dark:bg-yellow-900/30',
  },
  {
    title: 'Video generation',
    desc: 'Easily edit your photos',
    icon: (
      <span className="text-3xl">🎬</span>
    ),
    color: 'bg-purple-50 dark:bg-purple-900/30',
  },
  {
    title: 'Audio generation',
    desc: 'Easily edit your photos',
    icon: (
      <span className="text-3xl">🎵</span>
    ),
    color: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    title: 'Code generation',
    desc: 'Easily edit your photos',
    icon: (
      <span className="text-3xl">💻</span>
    ),
    color: 'bg-green-50 dark:bg-green-900/30',
  },
];

interface MainContentProps {
  onSendFirstMessage: (msg: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onSendFirstMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendFirstMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 py-8 bg-white dark:bg-[#363636]">
      <div className="text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100">
        May I help you?
      </div>
      <div className="text-gray-500 dark:text-gray-300 text-center mb-8 text-lg">
        Chat with the smartest AI – experience the power of AI with us
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition cursor-pointer ${f.color} text-gray-800 dark:text-gray-100`}
          >
            <div className="mb-4">{f.icon}</div>
            <div className="font-bold text-lg mb-1">{f.title}</div>
            <div className="text-gray-500 dark:text-gray-300 text-sm text-center">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center w-full max-w-2xl mt-10">
        <input
          type="text"
          placeholder="Ask something"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-700 dark:text-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white dark:bg-[#363636] shadow"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold shadow hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MainContent; 