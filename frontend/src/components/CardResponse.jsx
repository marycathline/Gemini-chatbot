import PropTypes from 'prop-types';

const CardResponse = ({ title, description, buttons, isDarkMode }) => (
  <div className={`rounded-xl shadow-md p-4 mb-2 max-w-[70%] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="mb-3 text-sm">{description}</p>
    {buttons && buttons.length > 0 && (
      <div className="flex space-x-2 mt-2">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded bg-fuchsia-800 text-white hover:bg-fuchsia-900 transition-colors text-xs font-semibold`}
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

CardResponse.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.array,
  isDarkMode: PropTypes.bool.isRequired,
};

export default CardResponse;
