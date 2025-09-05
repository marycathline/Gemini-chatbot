import PropTypes from 'prop-types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import CardResponse from './CardResponse';

// Format timestamp nicely with timezone (e.g., 02:33 PM EAT)
const formatTimestamp = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short', // adds local timezone abbreviation
  }).format(date);
};

const ChatArea = ({ messages, isLoading, isDarkMode, messagesEndRef, onEditMessage }) => {
  return (
    <div className="flex-grow flex flex-col">
      <div
        className={`flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        {/* Empty chat placeholder */}
        {messages.length === 0 && !isLoading && (
          <div className="text-gray-500 text-center mt-10">
            Start a new chat to begin...
          </div>
        )}

        {/* Loop messages */}
        {messages.map((message, index) => {
          // Detect card-style assistant responses
          let isCard = false;
          let cardProps = null;
          if (message.role === 'assistant' && typeof message.content === 'string') {
            try {
              const json = JSON.parse(message.content);
              if (json.type === 'card') {
                isCard = true;
                cardProps = {
                  title: json.title,
                  description: json.description,
                  buttons: json.buttons,
                  isDarkMode,
                };
              }
            } catch {
              // Not JSON, fallback to plain text
            }
          }

          return (
            <MessageBubble
              key={index}
              role={message.role}
              content={isCard ? <CardResponse {...cardProps} /> : message.content}
              timestamp={message.timestamp ? formatTimestamp(message.timestamp) : null}
              isDarkMode={isDarkMode}
              onEdit={() => onEditMessage && onEditMessage(message)}
              onCopy={() => {
                const textToCopy = isCard
                  ? JSON.stringify(cardProps, null, 2)
                  : message.content;
                navigator.clipboard.writeText(textToCopy);
                // Tooltip handled in MessageBubble
              }}
            />
          );
        })}

        {/* Show typing dots when loading */}
        {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

ChatArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      timestamp: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  messagesEndRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  onEditMessage: PropTypes.func,
};

export default ChatArea;
