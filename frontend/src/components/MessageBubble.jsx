import PropTypes from 'prop-types';
import { useState } from 'react';
import { Copy, Edit } from 'lucide-react';

const MessageBubble = ({
  role,
  content,
  timestamp,
  isDarkMode,
  isCard,
  onEdit,
  onCopy,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    typeof content === 'string' ? content : ''
  );
  const [copied, setCopied] = useState(false);

  // Replace asterisks with bullets for assistant
  const formatContent = (text) => {
    if (role === 'assistant') {
      return text.replace(/\*/g, '•');
    }
    return text;
  };

  const handleCopy = () => {
    const text = typeof content === 'string' ? content : '';
    navigator.clipboard.writeText(text);
    if (onCopy) onCopy(text);

    // show tooltip instead of alert
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (onEdit) onEdit(editValue);
  };

  return (
    <div
      className={`flex items-end mb-4 ${
        role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {role === 'assistant' && (
        <span className="mr-2 text-2xl select-none">🤖</span>
      )}
      {role === 'user' && (
        <span className="ml-2 text-2xl select-none">👤</span>
      )}

      <div
        className={`max-w-[70%] rounded-xl p-3 relative ${
          role === 'user'
            ? 'bg-fuchsia-800 text-white text-right'
            : isDarkMode
            ? 'bg-fuchsia-200 text-black text-left'
            : 'bg-fuchsia-100 text-black text-left'
        }`}
      >
        {isEditing ? (
          <div>
            <textarea
              className="w-full rounded p-2 text-black bg-white mb-2"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button
              className="px-2 py-1 rounded bg-fuchsia-800 text-white text-xs mr-2"
              onClick={handleSaveEdit}
            >
              Save &amp; Send
            </button>
            <button
              className="px-2 py-1 rounded bg-gray-300 text-black text-xs"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="whitespace-pre-line break-words">
            {isCard ? content : formatContent(content)}
          </div>
        )}

        {/* Assistant-only actions */}
        {role === 'assistant' && !isEditing && (
          <div className="flex space-x-2 mt-2 text-xs text-gray-600 relative">
            <div className="relative">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 hover:text-fuchsia-700"
              >
                <Copy size={14} /> <span>Copy</span>
              </button>
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-fuchsia-700 text-white text-xs px-2 py-0.5 rounded shadow-md opacity-100 transition-opacity duration-300">
                  Copied!
                </span>
              )}
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center space-x-1 hover:text-fuchsia-700"
            >
              <Edit size={14} /> <span>Edit</span>
            </button>
          </div>
        )}

        {/* timestamp for both user + assistant */}
        {timestamp && (
          <div className="text-xs text-gray-400 mt-2 text-right">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.node.isRequired,
  timestamp: PropTypes.string, // made optional
  isDarkMode: PropTypes.bool.isRequired,
  isCard: PropTypes.bool,
  onEdit: PropTypes.func,
  onCopy: PropTypes.func,
};

export default MessageBubble;
