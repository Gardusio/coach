import React, { useState, useEffect } from "react";
import WearableData from "../components/WearableData";
import Profile from "../components/Profile";
import Effects from "../components/Effects";

import {
    Box,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";

const DataExplorer = ({
    userProfile,
    wearableData,
    effects,
    onLoadUserInfo,
}) => {
    const [activeUserTab, setActiveUserTab] = useState(0); // Active tab for user selection
    const [activeDataTab, setActiveDataTab] = useState(0); // Active tab for user data (profile, wearables, effects)
    const [users, setUsers] = useState(["2de", "4ac", "564", "baa", "f1c"]); // List of user IDs
    const [userId, setUserId] = useState("2de"); // Selected user ID

    useEffect(() => {
        const fetchUsers = async () => {
            // Replace this with your actual backend/API call
            const fetchedUsers = ["2de", "4ac", "564", "baa", "f1c"]; // Example users
            setUsers(fetchedUsers);
        };
        fetchUsers();
        onLoadUserInfo(userId)
    }, []);

    // Load user info when switching user tabs
    const handleUserTabChange = async (event, newIndex) => {
        setActiveUserTab(newIndex);
        const userId = users[newIndex];
        setUserId(userId);
        await onLoadUserInfo(userId);
    };

    return (
        <Box width={"90%"} margin={"auto"}>
            <Typography textAlign={"center"} variant="h4" gutterBottom marginBottom={2}>
                Select user to explore
            </Typography>

            <Typography textAlign={"center"} variant="h6" gutterBottom marginBottom={2} color="#777">
                A {userId} user assesment may be here
            </Typography>

            {/* Tabs for switching between users */}
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                border={"1px solid #eee"}
                borderRadius={"8px"}
                width={"50%"}
                padding={1}
                margin="auto"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
                sx={{ backgroundColor: "#eee" }}
            >
                <Tabs
                    value={activeUserTab}
                    onChange={handleUserTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#1976d2", // Indicator color
                        },
                        "& .MuiTab-root": {
                            color: "#333", // Default text color
                        },
                        "& .Mui-selected": {
                            color: "#1976d2", // Selected tab text color
                            fontWeight: "bold", // Bold selected tab
                        },
                    }}
                >
                    {users.map((userId, index) => (
                        <Tab
                            key={index}
                            label={userId}
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Tabs for User Data: Profile, Wearable Data, Causal Effects */}
            <Box marginTop={4}>
                <Tabs
                    value={activeDataTab}
                    onChange={(e, newValue) => setActiveDataTab(newValue)}
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#1976d2",
                        },
                        "& .MuiTab-root": {
                            color: "#333", // Default text color
                        },
                        "& .Mui-selected": {
                            color: "#1976d2", // Selected tab text color
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Tab label="User profile" />
                    <Tab label="Wearable data" />
                    <Tab label="Causal effects" />
                </Tabs>
            </Box>

            {/* Render active data based on selected tab */}
            {activeDataTab === 0 && userProfile && <Profile profile={userProfile} />}
            {activeDataTab === 1 && wearableData && <WearableData wearables={wearableData} />}
            {activeDataTab === 2 && effects && <Effects effects={effects} />}
        </Box>
    );
};

export default DataExplorer;
