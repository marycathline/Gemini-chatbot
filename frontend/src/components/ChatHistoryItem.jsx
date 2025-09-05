import PropTypes from 'prop-types';

import { useState } from 'react';
import { Trash2, Edit2, Save } from 'lucide-react';

const ChatHistoryItem = ({ title, timestamp, onClick, isActive, onDelete, onRename }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  return (
    <div className={`w-full mb-2 rounded-lg transition-all duration-200 font-medium text-sm ${isActive ? 'bg-fuchsia-800 text-white' : 'hover:bg-fuchsia-100 text-gray-800'}`}>
      <div className="flex items-center justify-between">
        <button className="flex-1 text-left p-3" onClick={onClick}>
          {isRenaming ? (
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="rounded px-2 py-1 text-black text-xs"
            />
          ) : (
            <span>{title}</span>
          )}
        </button>
        <div className="flex items-center space-x-2 pr-2">
          {isRenaming ? (
            <button onClick={() => { onRename(newTitle); setIsRenaming(false); }} className="text-xs px-1 py-0.5 rounded bg-fuchsia-700 text-white"><Save size={14} /></button>
          ) : (
            <button onClick={() => setIsRenaming(true)} className="text-xs px-1 py-0.5 rounded text-black"><Edit2 size={14} /></button>
          )}
          <button onClick={onDelete} className="text-xs px-1 py-0.5 rounded text-black"><Trash2 size={14} /></button>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-1 pl-3">{timestamp}</div>
    </div>
  );
};

ChatHistoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ChatHistoryItem;
