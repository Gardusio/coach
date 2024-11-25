import React from "react";

const OutputDisplay = ({ recommendation }) => {
    return (
        <div>
            <h2>Generated Recommendation</h2>
            {recommendation ? (
                <pre>{JSON.stringify(recommendation, null, 2)}</pre>
            ) : (
                <p>No recommendation yet. Please generate one.</p>
            )}
        </div>
    );
};

export default OutputDisplay;
