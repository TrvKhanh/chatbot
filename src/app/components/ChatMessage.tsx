import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
    <div className={`px-4 py-2 rounded-2xl shadow-sm text-base 
      ${isUser 
        ? 'bg-[#CC00FF] text-white rounded-br-none' 
        : 'bg-[#006666] text-white rounded-bl-none'}
    `}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  </div>
);

export default ChatMessage; 