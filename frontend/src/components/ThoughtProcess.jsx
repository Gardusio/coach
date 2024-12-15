import React from "react";
import { Box, Typography } from "@mui/material";

const ThoughtProcess = ({ ToT }) => {
    console.log(ToT)
    if (!ToT) {
        return <Typography>No thought process available.</Typography>;
    }

    const reasoning = (
        <Box
            sx={{ marginBottom: 2, padding: 2 }}
            border={"1px solid #eee"}
            borderRadius={"8px"}
            backgroundColor={"#e9f9fa"}
        >
            <Typography variant="h6">
                <strong>Reasoning</strong>
            </Typography>
            <Typography>{ToT.reasoning}</Typography>
        </Box>
    );

    const assesment = (
        <Box
            sx={{ marginBottom: 2, padding: 2 }}
            border={"1px solid #eee"}
            borderRadius={"8px"}
            backgroundColor={"#e9f9fa"}
        >
            <Typography variant="h6">
                <strong>User assesment</strong>
            </Typography>
            <Typography>{ToT.user_assesment}</Typography>
        </Box>
    );

    const scoreCircle = (score, text) => (

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box
                sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#282828",
                    borderRadius: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    padding: 0.5
                }}
            >
                {score}
            </Box>
            <Typography fontSize={"12px"} color={"#282828"}>
                <strong>{text}</strong>
            </Typography>
        </Box >
    )

    const recommendations = Object.entries(ToT)
        .filter(([key]) => key.includes("rec"))
        .map(([key, value], index) => (
            <Box
                key={key}
                sx={{
                    marginBottom: 2,
                    padding: 2,
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    background: "#FAFAFA"
                }}
            >
                {/* Header with Title and Scores */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 2,
                        borderBottom: "1px solid #ddd",
                        paddingBottom: 1,
                    }}
                >
                    <Typography variant="h6">
                        <strong>Recommendation Hypothesis {index + 1}</strong>
                    </Typography>

                    {/* Scores */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {scoreCircle(value.validation.personalization_score, "Personalization")}
                        {scoreCircle(value.validation.groundness_score, "Groundness")}
                    </Box>
                </Box>
                <Box padding={"0 8px"}>
                    {/* Content Below Header */}
                    <Typography>{value.text}</Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Personalization Analysis:</strong> {value.validation.personalization_analysis}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Groundness Analysis: </strong> {value.validation.groundness_analysis}</Typography>
                </Box>
            </Box >
        ));

    return (
        <Box sx={{ padding: "1em" }}>
            {assesment}
            {recommendations}
            {reasoning}
        </Box>
    );
};

export default ThoughtProcess;
