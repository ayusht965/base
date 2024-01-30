import React from 'react';

const Badge = ({ text, onClose }) => {
    const handleOnClick = () => {
        onClose();
    };

    return (
        <div className="badge text-white bg-indigo-600 flex items-center justify-between px-2 py-1 rounded-lg w-min my-1">
            <span className="badge-text">{text}</span>
            <button className="badge-close pl-1" onClick={handleOnClick}>
                X
            </button>
        </div>
    );
};

export default Badge;
