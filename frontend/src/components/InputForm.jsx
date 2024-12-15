import React, { useState } from "react";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";

const InputForm = ({ onGenerate }) => {
    const [type, setType] = useState("daily");
    const [userId, setUserId] = useState("2de");

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(type, userId);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                <InputLabel>Rec. period</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                </Select>

                <InputLabel>User</InputLabel>
                <Select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="2de">2de: 22, Female</MenuItem>
                    <MenuItem value="4ac">4ac: 35, Female</MenuItem>
                    <MenuItem value="564">564: 27, Male</MenuItem>
                    <MenuItem value="baa">baa: 40, Male</MenuItem>
                    <MenuItem value="f1c">f1c: 50, Male</MenuItem>
                </Select>

                <Button type="submit" variant="contained" color="primary">
                    Generate
                </Button>
            </Box>
        </Box>
    );
};

export default InputForm;
