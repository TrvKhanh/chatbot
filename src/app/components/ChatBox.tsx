import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatBoxProps {
  onFirstMessage?: (msg: string) => void;
  initialMessage?: string;
  externalMessage?: string | null;
  onExternalMessageHandled?: () => void;
  onInitialMessageHandled?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onFirstMessage, initialMessage, externalMessage, onExternalMessageHandled, onInitialMessageHandled }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSentFirst, setHasSentFirst] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);
  const hasSentInitialRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!initialMessage) {
      setMessages([]);
    }
    setInput('');
    setHasSentFirst(false);
    messageCounterRef.current = 0;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (externalMessage) {
      sendMessage(externalMessage);
      if (onExternalMessageHandled) onExternalMessageHandled();
    }
    // eslint-disable-next-line
  }, [externalMessage]);

  useEffect(() => {
    if (initialMessage && !hasSentInitialRef.current) {
      console.log('Initial message:', initialMessage);
      // Thêm tin nhắn người dùng vào khung chat và reset messages
      const userMsg: Message = {
        id: generateMessageId(),
        content: initialMessage,
        isUser: true,
      };
      setMessages([userMsg]); // Reset messages chỉ với tin nhắn đầu tiên của user
      setLoading(true);

      // Gửi request đến backend
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: initialMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              content: data.response,
              isUser: false,
            },
          ]);
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
              isUser: false,
            },
          ]);
        })
        .finally(() => setLoading(false));

      if (onInitialMessageHandled) onInitialMessageHandled();
      hasSentInitialRef.current = true;
    }
    // eslint-disable-next-line
  }, [initialMessage]);

  const generateMessageId = () => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}`;
  };

  const sendMessage = async (msg?: string) => {
    const content = typeof msg === 'string' ? msg : input;
    if (!content.trim()) return;

    const userMsg: Message = {
      id: generateMessageId(),
      content,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (!hasSentFirst && onFirstMessage) {
      onFirstMessage(userMsg.content);
      setHasSentFirst(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: data.response,
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-[#363636] rounded-2xl">
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.content} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="flex justify-start my-2">
            <div className="bg-gray-100 dark:bg-[#363636] text-gray-900 dark:text-gray-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm text-sm">
              <AnimatedDotsLoading />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2 p-2 pb-4 border-t">
        <input
          type="text"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#363636] text-gray-900 dark:text-gray-100 shadow-md"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex items-center justify-center bg-blue-500 text-white w-10 h-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-blue-600 active:scale-95 transition disabled:opacity-50"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          aria-label="Gửi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6-9 6-9-6zm0 0v6a9 9 0 009 9 9 9 0 009-9v-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AnimatedDotsLoading = () => {
  return (
    <div className="flex items-center justify-center h-6">
      <span className="inline-block w-2 h-2 mx-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="inline-block w-2 h-2 mx-1 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
      <span className="inline-block w-2 h-2 mx-1 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
    </div>
  );
};

export default ChatBox; 