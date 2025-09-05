import PropTypes from 'prop-types';

const TypingIndicator = ({ isDarkMode }) => (
  <div className="flex items-center space-x-2 px-4 py-2">
    <span className={`text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Assistant is typing</span>
    <span className="flex space-x-1">
      <span className={`block w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></span>
      <span className={`block w-2 h-2 rounded-full animate-bounce delay-100 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></span>
      <span className={`block w-2 h-2 rounded-full animate-bounce delay-200 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></span>
    </span>
  </div>
);

TypingIndicator.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default TypingIndicator;
