import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatBoxProps {
  onFirstMessage?: (msg: string) => void;
  sessionId?: string;
  initialMessage?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onFirstMessage, sessionId, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSentFirst, setHasSentFirst] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setInput('');
    setHasSentFirst(false);
    messageCounterRef.current = 0;
    if (initialMessage) {
      sendMessage(initialMessage);
    }
    // eslint-disable-next-line
  }, [sessionId]);

  const generateMessageId = () => {
    messageCounterRef.current += 1;
    return `msg-${messageCounterRef.current}`;
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
          message: content,
          sessionId: sessionId || 'default',
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
    <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.content} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="flex justify-start my-2">
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm text-sm">
              <span className="animate-pulse">Đang trả lời...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2 p-2 pb-4 border-t">
        <textarea
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          rows={2}
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox; 