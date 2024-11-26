import React, { useState } from "react";
import InputForm from "../components/InputForm";
import ReactMarkdown from "react-markdown";
import {
    Box,
    Tab,
    Tabs,
    Typography,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";

const Recommendations = ({
    recommendation,
    recommendationUser,
    onGenerate,
    loading, // Pass loading state as a prop
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const renderFinalRecommendation = () => {
        if (!recommendation || !recommendation.final_recommendation) {
            return <Typography>No recommendation generated yet.</Typography>;
        }
        const { text, explanation } = recommendation.final_recommendation;
        return (
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6">
                        Final Recommendation for {recommendationUser}
                    </Typography>
                    <ReactMarkdown>
                        {`**Recommendation:** ${text}\n\n**Explanation:** ${explanation}`}
                    </ReactMarkdown>
                </CardContent>
            </Card>
        );
    };

    const renderThoughtProcess = () => {
        if (!recommendation || !recommendation.ToT) {
            return <Typography>No thought process available yet.</Typography>;
        }

        return (
            <Box>
                {Object.entries(recommendation.ToT).map(([key, value]) => (
                    <Card key={key} variant="outlined" sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{key.toUpperCase()}</Typography>
                            <Typography>
                                <strong>Text:</strong> {value.text}
                            </Typography>
                            <Typography>
                                <strong>Personalization:</strong>{" "}
                                {value.validation.personalization_analysis}
                            </Typography>
                            <Typography>
                                <strong>Groundness:</strong>{" "}
                                {value.validation.groundness_analysis}
                            </Typography>

                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Recommendations
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

                    {/* Tabs for Final Recommendation and Thought Process */}
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        sx={{ marginBottom: 2, marginTop: 2 }}
                    >
                        <Tab label="Final Recommendation" />
                        <Tab label="Thought Process" />
                    </Tabs>

                    {/* Render Active Tab */}
                    {activeTab === 0 && renderFinalRecommendation()}
                    {activeTab === 1 && renderThoughtProcess()}
                </>
            )}
        </Box>
    );
};

export default Recommendations;
