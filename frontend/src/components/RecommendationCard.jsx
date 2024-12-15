import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Card, CardContent, Typography, Tabs, Tab } from "@mui/material";
import ThoughtProcess from "./ThoughtProcess";
import PromptCard from "./PromptCard";
import Chat from "./Chat";
import { getRecommendationChat, getAssistantResponse } from "../api";

const RecommendationCard = ({ rec, chatMessages, updateChatMessages }) => {
    const [activeTab, setActiveTab] = useState(0); // Active tab for each card
    const [currentMessage, setCurrentMessage] = useState(""); // Current user input
    const [isLoadingChat, setIsLoadingChat] = useState(false); // Chat loading state
    const [chatLoaded, setChatLoaded] = useState(false)

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (activeTab === 3 && chatMessages.length === 0) {
                // Fetch chat only if the Chat tab is active and no chat exists
                try {
                    setIsLoadingChat(true);
                    const chatHistory = await getRecommendationChat(rec.id);
                    updateChatMessages(chatHistory.messages || []);
                    setChatLoaded(true)
                } catch (error) {
                    console.error("Failed to fetch chat history:", error);
                } finally {
                    setIsLoadingChat(false);
                }
            }
        };

        fetchChatHistory();
    }, [activeTab, rec.id, chatLoaded]);

    const onTabChange = (e, newValue) => {
        setActiveTab(newValue);
    };

    const handleMessageChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (currentMessage.trim() === "") return;

        // Append user message to chat history
        const newMessage = { role: "user", content: currentMessage };
        const updatedMessages = [...chatMessages, newMessage];
        updateChatMessages(updatedMessages); // Update chat history

        setCurrentMessage(""); // Clear input

        // Add a loader message
        const loaderMessage = { role: "assistant", content: "Typing..." };
        updateChatMessages([...updatedMessages, loaderMessage]);

        try {
            const assistantResponse = await getAssistantResponse(rec.userId, currentMessage, rec.id);
            const finalMessages = [...updatedMessages, { role: "assistant", content: assistantResponse }];
            updateChatMessages(finalMessages);
        } catch (error) {
            console.error("Error during message handling:", error);
            updateChatMessages([
                ...updatedMessages,
                { role: "assistant", content: "An error occurred while generating a response." },
            ]);
        }
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 4, borderRadius: "8px", width: "100%", padding: 0 }}>
            <CardContent sx={{ padding: 0 }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box sx={{ padding: 2, backgroundColor: "#1976d2", color: "#fff", borderRadius: "" }}>
                        <Typography variant="body"><strong>{rec.userId}</strong></Typography>
                    </Box>

                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Tabs value={activeTab} onChange={onTabChange}>
                            <Tab label="Final Recommendation" />
                            <Tab label="Thought Process" />
                            <Tab label="Prompt" />
                            <Tab label="Chat" />
                        </Tabs>
                    </Box>
                </Box>
                <Box marginTop={1} marginBottom={0}>
                    {/* Tab Content */}
                    {activeTab === 0 && rec.final_recommendation && (
                        <Box padding={"1em 2em 0 2em"}>
                            <Typography variant="body1" gutterBottom>
                                {rec.final_recommendation.text}
                            </Typography>
                            <ReactMarkdown>
                                {`**Explanation:** ${rec.final_recommendation.explanation}`}
                            </ReactMarkdown>
                        </Box>
                    )}
                    {activeTab === 1 && rec.ToT && <ThoughtProcess ToT={rec.ToT} />}
                    {activeTab === 2 && rec.prompt && <PromptCard prompt={rec.prompt} />}
                    {activeTab === 3 && (
                        <Box>
                            {isLoadingChat ? (
                                <Typography padding={"1em 2em"}>Loading chat history...</Typography>
                            ) : (
                                <Chat
                                    chatMessages={chatMessages}
                                    currentMessage={currentMessage}
                                    onMessageChange={handleMessageChange}
                                    onSendMessage={handleSendMessage}
                                />
                            )}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecommendationCard;
