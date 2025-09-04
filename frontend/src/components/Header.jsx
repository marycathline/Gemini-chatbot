import { Menu, Sun, Moon } from "lucide-react";
import PropTypes from "prop-types";

const Header = ({ isDarkMode, toggleDarkMode, onMenuClick }) => {
  return (
    <div
      className={`w-full flex justify-between items-center px-4 py-3 sm:px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } border-b border-gray-200 dark:border-gray-700 transition-colors`}
    >
      {/* Mobile Menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        AI Chat Assistant
      </h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-all duration-200"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun size={22} className="text-fuchsia-600 transition-all" />
        ) : (
          <Moon size={22} className="text-fuchsia-600 transition-all" />
        )}
      </button>
    </div>
  );
};

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
