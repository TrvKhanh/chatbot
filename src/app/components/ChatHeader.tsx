import React from 'react';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="w-full px-6 py-4 bg-white border-b rounded-t-2xl flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 truncate">{title}</h1>
      {/* Có thể thêm các tab hoặc nút chức năng ở đây sau */}
    </div>
  );
};

export default ChatHeader; 