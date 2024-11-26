import React, { useState } from "react";
import { getUserProfile, getWearableData, getCausalEffects } from "../api";
import WearableData from "./WearableData";
import Profile from "./Profile";
import Effects from "./Effects";

import {
    Box,
    Button,
    Tab,
    Tabs,
    Typography,
    TextField
} from "@mui/material";

const DataExplorer = () => {
    const [userId, setUserId] = useState(""); // User ID input state
    const [userProfile, setUserProfile] = useState(null);
    const [wearableData, setWearableData] = useState(null);
    const [effects, setEffects] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleLoad = async () => {
        if (!userId) {
            alert("Please enter a User ID first!");
            return;
        }
        const effects = await getCausalEffects(userId);
        setEffects(effects);
        const wearables = await getWearableData(userId);
        setWearableData(wearables);
        const profile = await getUserProfile(userId);
        setUserProfile(profile);
    };


    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Data Explorer
            </Typography>

            {/* User ID Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2, marginTop: 2 }}>
                <TextField
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    label="User ID"
                    variant="outlined"
                    size="small"
                    required
                />
                <Button variant="contained" color="info" onClick={handleLoad}>
                    Load User info
                </Button>
            </Box>
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ marginBottom: 2, marginTop: 2 }}
            >
                <Tab label="User profile" />
                <Tab label="Wearable data" />
                <Tab label="Causal effects" />

            </Tabs>

            {activeTab === 0 && userProfile && <Profile profile={userProfile} />}
            {activeTab === 1 && wearableData && <WearableData wearables={wearableData} />}
            {activeTab === 2 && effects && <Effects effects={effects} />}

        </Box>
    );
};

export default DataExplorer;
