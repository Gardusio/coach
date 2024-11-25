import React from "react";

const HistorySidebar = ({ history, onSelect }) => {
    return (
        <div>
            <h2>Session History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index} onClick={() => onSelect(index)}>
                        {item.type} - {new Date(item.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistorySidebar;
