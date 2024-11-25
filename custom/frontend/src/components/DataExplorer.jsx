import React, { useState } from "react";
import { getUserProfile, getWearableData, getCausalEffects } from "../api";

const DataExplorer = () => {
    const [userId, setUserId] = useState(""); // User ID input state
    const [profile, setProfile] = useState(null);
    const [wearableData, setWearableData] = useState(null);
    const [effects, setEffects] = useState(null);

    const handleLoadProfile = async () => {
        if (!userId) {
            alert("Please enter a User ID first!");
            return;
        }
        const data = await getUserProfile(userId);
        setProfile(data);
    };

    const handleLoadWearable = async () => {
        if (!userId) {
            alert("Please enter a User ID first!");
            return;
        }
        const data = await getWearableData(userId);
        setWearableData(data);
    };

    const handleLoadEffects = async () => {
        if (!userId) {
            alert("Please enter a User ID first!");
            return;
        }
        const data = await getCausalEffects(userId);
        setEffects(data);
    };

    return (
        <div>
            <h2>Data Explorer</h2>

            {/* User ID Input */}
            <label>
                Enter User ID:{" "}
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                />
            </label>

            {/* Buttons to Load Data */}
            <button onClick={handleLoadProfile}>Load User Profile</button>
            <button onClick={handleLoadWearable}>Load Wearable Data</button>
            <button onClick={handleLoadEffects}>Load Causal Effects</button>

            {/* Display Loaded Data */}
            {profile && (
                <div>
                    <h3>User Profile</h3>
                    <pre>{JSON.stringify(profile, null, 2)}</pre>
                </div>
            )}
            {wearableData && (
                <div>
                    <h3>Wearable Data</h3>
                    <pre>{JSON.stringify(wearableData, null, 2)}</pre>
                </div>
            )}
            {effects && (
                <div>
                    <h3>Causal Effects</h3>
                    <pre>{JSON.stringify(effects, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DataExplorer;
