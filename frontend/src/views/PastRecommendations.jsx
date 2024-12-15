import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import RecommendationCard from "../components/RecommendationCard";

const PastRecommendations = ({ recommendations }) => {
    const [activeUserTab, setActiveUserTab] = useState(0); // Active tab for user selection
    const [users, setUsers] = useState([]); // List of user IDs
    const [chatHistories, setChatHistories] = useState({}); // Chat history map

    // Extract unique user IDs from recommendations
    useEffect(() => {
        const uniqueUsers = [...new Set(recommendations.map((rec) => rec.userId))];
        setUsers(uniqueUsers);
    }, [recommendations]);

    // Filter recommendations for the currently selected user
    const filteredRecommendations = recommendations.filter(
        (rec) => rec.userId === users[activeUserTab]
    );

    // Update chat history for a specific recommendation
    const updateChatHistory = (recId, newMessages) => {
        setChatHistories((prev) => ({
            ...prev,
            [recId]: newMessages,
        }));
    };

    return (
        <Box width={"90%"} margin={"auto"}>
            <Typography variant="h4" textAlign={"center"} gutterBottom marginBottom={2}>
                Recommendations Database
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
                    onChange={(e, newIndex) => setActiveUserTab(newIndex)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#1976d2",
                        },
                        "& .MuiTab-root": {
                            color: "#333",
                        },
                        "& .Mui-selected": {
                            color: "#1976d2",
                            fontWeight: "bold",
                        },
                    }}
                >
                    {users.map((userId, index) => (
                        <Tab key={index} label={userId} />
                    ))}
                </Tabs>
            </Box>

            {/* Recommendations List for Selected User */}
            <Box sx={{ marginTop: 4 }}>
                {filteredRecommendations.reverse().map((rec, index) => (
                    <Box key={index}>
                        <RecommendationCard
                            rec={rec}
                            chatMessages={chatHistories[rec.id] || []} // Pass specific chat history
                            updateChatMessages={(newMessages) => updateChatHistory(rec.id, newMessages)} // Update chat history
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PastRecommendations;
