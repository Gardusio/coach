import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    TextField,
} from "@mui/material";

const PastRecommendations = ({ recommendations }) => {
    const [search, setSearch] = useState(""); // Search input state
    const [activeTab, setActiveTab] = useState(0); // Active tab for each card

    // Filter recommendations based on search input
    const filteredRecommendations = recommendations.filter((rec) =>
        rec.userId.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
                Recommendations database
            </Typography>

            {/* Search Bar */}
            <Box sx={{ marginTop: 2, marginBottom: 4 }}>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    label="Filter by User ID"
                    variant="outlined"
                    size="small"
                />
            </Box>

            {/* Recommendations List */}
            {filteredRecommendations.map((rec, index) => (
                <Card key={index} variant="outlined" sx={{ marginBottom: 4 }}>
                    <CardContent>
                        <Typography variant="h6">User {rec.userId}</Typography>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            sx={{ marginTop: 1, marginBottom: 2 }}
                        >
                            <Tab label="Final Recommendation" />
                            <Tab label="Thought Process" />
                        </Tabs>

                        {/* Tab Content */}
                        {activeTab === 0 && rec.final_recommendation && (
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Final Recommendation:</strong> {rec.final_recommendation.text}
                                </Typography>
                                <ReactMarkdown>
                                    {`**Explanation:** ${rec.final_recommendation.explanation}`}
                                </ReactMarkdown>
                            </Box>
                        )}
                        {activeTab === 1 && rec.ToT && (
                            <Box>
                                {Object.entries(rec.ToT).map(([key, value]) => (
                                    <Box key={key} sx={{ marginBottom: 2 }}>
                                        <Typography variant="h6">{key.toUpperCase()}</Typography>
                                        <Typography>
                                            <strong>Text:</strong> {value.text}
                                        </Typography>
                                        <Typography>
                                            <strong>Personalization Score:</strong>{" "}
                                            {value.validation.personalization_score}
                                        </Typography>
                                        <Typography>
                                            <strong>Groundness Score:</strong>{" "}
                                            {value.validation.groundness_score}
                                        </Typography>
                                        <Typography>
                                            <strong>Personalization Analysis:</strong>{" "}
                                            {value.validation.personalization_analysis}
                                        </Typography>
                                        <Typography>
                                            <strong>Groundness Analysis :</strong>{" "}
                                            {value.validation.groundness_analysis}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            ))
            }
        </Box >
    );
};

export default PastRecommendations;
