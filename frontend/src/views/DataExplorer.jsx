import React, { useState } from "react";
import WearableData from "../components/WearableData";
import Profile from "../components/Profile";
import Effects from "../components/Effects";

import {
    Box,
    Button,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";


const DataExplorer = ({
    userId,
    setUserId,
    userProfile,
    wearableData,
    effects,
    onLoadUserInfo,
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleLoad = async () => {
        if (!userId) {
            alert("Please enter a User ID first!");
            return;
        }
        await onLoadUserInfo(userId);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Data Explorer
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                    marginTop: 2,
                }}
            >
                <TextField
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    label="User ID"
                    variant="outlined"
                    size="small"
                    required
                />
                <Button variant="contained" color="info" onClick={handleLoad}>
                    Load User Info
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
