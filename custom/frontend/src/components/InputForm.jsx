import React, { useState } from "react";

const InputForm = ({ onGenerate }) => {
    const [type, setType] = useState("daily");
    const [userId, setUserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(type, userId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Recommendation Type:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </label>
            <label>
                User ID:
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    required
                />
            </label>
            <button type="submit">Generate Recommendation</button>
        </form>
    );
};

export default InputForm;
