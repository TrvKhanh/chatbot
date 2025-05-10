import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-sm text-sm break-words ${
          isUser
            ? 'bg-[#6666FF] text-white rounded-br-none'
            : 'bg-[#CC00FF] text-white rounded-bl-none'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage; 