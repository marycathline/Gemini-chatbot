import PropTypes from 'prop-types';
import { X, Plus } from 'react-feather';
import ChatHistoryItem from './ChatHistoryItem';

const Sidebar = ({
  chatHistory = [],
  onNewChat = () => {},
  onSelectChat = () => {},
  activeChatId = null,
  isDarkMode = false,
  isOpen = false,
  onClose = () => {},
  searchTerm = '',
  setSearchTerm = () => {},
}) => {
  // Filter chat history by search term
  const filteredHistory = Array.isArray(chatHistory)
    ? chatHistory.filter(
        (chat) =>
          chat.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (chat.messages && chat.messages.some((msg) =>
            msg.content?.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      )
    : [];

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } top-0 left-0 h-full lg:h-auto w-3/4 sm:w-64 lg:w-1/4 p-4 sm:p-6 z-50 ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        } transition-all duration-200 ease-in-out lg:transition-none shadow-lg lg:shadow-none overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Chats</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center mb-4 p-2 rounded-lg bg-fuchsia-800 text-white hover:bg-fuchsia-900 transition-colors font-semibold"
        >
          <Plus size={18} className="mr-2" /> New Chat
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chats..."
          className={`w-full mb-4 p-2 rounded-lg border focus:outline-none ${
            isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 border-gray-300'
          }`}
        />
        <nav>
          {filteredHistory.length === 0 ? (
            <div className="text-sm text-gray-400">No chats found.</div>
          ) : (
            filteredHistory.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                title={chat.title}
                timestamp={chat.timestamp}
                onClick={() => onSelectChat(chat.id)}
                isActive={chat.id === activeChatId}
                onDelete={() => chat.onDelete(chat.id)}
                onRename={(newTitle) => chat.onRename(chat.id, newTitle)}
              />
            ))
          )}
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  chatHistory: PropTypes.array.isRequired,
  onNewChat: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  activeChatId: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Sidebar;
