import { React, useState } from "react";
import InputForm from "../components/InputForm";

import {
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import RecommendationCard from "../components/RecommendationCard";

const NewRecommendation = ({
    recommendation,
    onGenerate,
    loading,
}) => {

    const [chatHistories, setChatHistories] = useState({}); // Chat history map

    // Update chat history for a specific recommendation
    const updateChatHistory = (recId, newMessages) => {
        setChatHistories((prev) => ({
            ...prev,
            [recId]: newMessages,
        }));
    };

    const renderFinalRecommendation = () => {
        if (!recommendation || !recommendation.final_recommendation) {
            return <Typography>No recommendation generated yet.</Typography>;
        }
        return (
            <RecommendationCard
                rec={recommendation}
                chatMessages={chatHistories[recommendation.id] || []} // Pass specific chat history
                updateChatMessages={(newMessages) => updateChatHistory(recommendation.id, newMessages)} // Update chat history
            />
        );
    };

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography textAlign={"center"} variant="h4" gutterBottom>
                Generate a new recommendation
            </Typography>
            <Typography textAlign={"center"} variant="body" gutterBottom marginBottom={"3em"}>
                Currently, recommendation goals are <strong>inferred by the coach.</strong>
            </Typography>
            {/* Show Spinner While Loading */}
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 4,
                        marginBottom: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <InputForm onGenerate={onGenerate} />

                    {renderFinalRecommendation()}
                </>

            )}
        </Box>
    );
};

export default NewRecommendation;
