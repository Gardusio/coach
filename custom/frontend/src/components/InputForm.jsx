import React, { useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

const InputForm = ({ onGenerate }) => {
    const [type, setType] = useState("daily");
    const [userId, setUserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(type, userId);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
                <TextField
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    label="User ID"
                    variant="outlined"
                    size="small"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Generate
                </Button>
            </Box>
        </Box>
    );
};

export default InputForm;
