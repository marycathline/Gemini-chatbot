// src/App.jsx
import './index.css';
import useChat from './hooks/useChat';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import ProviderSelector from './components/ProviderSelector';
import { useState, useEffect } from 'react';

const App = () => {
  const {
    isDarkMode,
    messages,
    setMessages,
    isLoading,
    input,
    sendMessage,
    setInput,
    messagesEndRef,
    toggleDarkMode,
    selectedProvider,
    setSelectedProvider,
    availableProviders,
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Save current chat to history when messages change
  useEffect(() => {
    if (messages.length === 0) return;
    const title = messages[0]?.content?.slice(0, 30) || 'New Chat';
    const timestamp = messages[0]?.timestamp || new Date().toISOString();
    if (!activeChatId) {
      // New chat
      const id = Date.now().toString();
      setActiveChatId(id);
      setChatHistory((prev) => [
        { id, title, timestamp, messages },
        ...prev,
      ]);
    } else {
      // Update existing chat
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId ? { ...chat, messages } : chat
        )
      );
    }
  }, [messages, activeChatId]);

  // Start a new chat
  const handleNewChat = () => {
    setMessages([]);
    setActiveChatId(null);
    setInput('');
  };

  // Select a chat from history
  const handleSelectChat = (id) => {
    const chat = chatHistory.find((c) => c.id === id);
    if (chat) {
      setMessages(chat.messages);
      setActiveChatId(id);
    }
    setIsSidebarOpen(false);
  };

  // Delete a chat from history
  const handleDeleteChat = (id) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setMessages([]);
      setActiveChatId(null);
    }
  };

  // Rename a chat in history
  const handleRenameChat = (id, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-200`}
    >
      <Sidebar
        chatHistory={chatHistory.map(chat => ({
          ...chat,
          onDelete: handleDeleteChat,
          onRename: handleRenameChat,
        }))}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
        isDarkMode={isDarkMode}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Content */}
      <div className="flex-grow flex flex-col w-full lg:w-3/4">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <ProviderSelector
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          availableProviders={availableProviders}
          isDarkMode={isDarkMode}
        />

        <ChatArea
          messages={messages}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default App;
