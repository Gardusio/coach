import React, { useState, useEffect } from "react";
import { updateSystemPrompt, getSystemPrompt } from "../api";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";


const Settings = () => {
    const [currentPrompt, setCurrentPrompt] = useState("");
    const [newPrompt, setNewPrompt] = useState("");

    const userPrompt = `
        Hey coach! 
        Generate an actionable, grounded __rec_type__ personalized recommendation 
        with the goal to improve stress based on my data (NOTE: Higher stress score is better).
        Provide a schedule of activities I should engage in to improve.
        
        - My user profile(age, gender, height, weight, bmi) is:
        __profile_str__
        - My estimated causal effects are:
        __effects_str__
        - The summary of my last 21 days wearable data:
        __wearables_summary__
        `

    useEffect(() => {
        const fetchPrompt = async () => {
            try {
                const data = await getSystemPrompt();
                setCurrentPrompt(data.system_prompt);
                setNewPrompt(data.system_prompt);
            } catch (error) {
                console.error("Failed to load system prompt:", error);
            }
        };

        fetchPrompt();
    }, []);

    const handleUpdatePrompt = async () => {
        try {
            await updateSystemPrompt(newPrompt);
            setCurrentPrompt(newPrompt);
            alert("System prompt updated successfully!");
        } catch (error) {
            alert("Failed to update system prompt. Check the console for more details.");
        }
    };

    return (
        <Box width={"100%"} margin={"auto"} padding={2} display={"flex"} flexDirection={"column"}>
            <Typography textAlign={"center"} variant="h4" gutterBottom marginBottom={4}>
                System Prompt Editor
            </Typography>

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
                <TextField
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    multiline
                    rows={20}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter system prompt here..."

                    sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
                    }}
                />

                <Button onClick={handleUpdatePrompt} variant="contained" color="primary">
                    Update System Prompt
                </Button>
            </Box>

            <Typography marginTop={8} textAlign={"center"} variant="h4" gutterBottom marginBottom={2}>
                Current user prompt
            </Typography>
            <Box sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
            }}>
                <Typography>
                    <ReactMarkdown>
                        {userPrompt}
                    </ReactMarkdown>
                </Typography>
            </Box>
        </Box>
    );
};

export default Settings;
