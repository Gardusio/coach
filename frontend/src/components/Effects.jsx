import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    MenuItem,
    Select,
    Chip,
    InputLabel,
    OutlinedInput,
    Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const Effects = ({ effects }) => {
    const [sortOrder, setSortOrder] = useState("desc"); // State to track sorting order
    const [selectedEffectOf, setSelectedEffectOf] = useState([]); // Selected "Effects of" values
    const [selectedEffectOn, setSelectedEffectOn] = useState(["stress_score"]); // Selected "On" values

    const handleSortToggle = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const sortRows = (rows, sortOrder) => {
        return rows.sort((a, b) => {
            const valA = typeof a.value === "number" ? Math.abs(a.value) : Math.abs(parseFloat(a.value)) || 0;
            const valB = typeof b.value === "number" ? Math.abs(b.value) : Math.abs(parseFloat(b.value)) || 0;

            return sortOrder === "asc" ? valA - valB : valB - valA;
        });
    };

    const getFilteredAndSortedRows = () => {
        // Convert the object into an array of rows
        const rows = Object.entries(effects).map(([key, value]) => {
            const splitKey = key.split(" effects on ");
            return {
                effectOf: splitKey[0] || "Unknown",
                effectOn: splitKey[1] || "Unknown",
                value,
            };
        });

        // Apply filtering for multiple selections
        const filteredRows = rows.filter((row) => {
            const matchesEffectOf =
                selectedEffectOf.length === 0 || selectedEffectOf.includes(row.effectOf);
            const matchesEffectOn =
                selectedEffectOn.length === 0 || selectedEffectOn.includes(row.effectOn);

            return matchesEffectOf && matchesEffectOn;
        });

        // Sort the filtered rows by absolute value
        return sortRows(filteredRows, sortOrder);
    };

    const renderTable = () => {
        const rows = getFilteredAndSortedRows();

        if (rows.length === 0) {
            return <Typography>No data available.</Typography>;
        }

        return (
            <TableContainer sx={{ border: "1px solid #eee" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#eee", border: "1px solid #eee" }}>
                        <TableRow>
                            <TableCell><strong>Effects of</strong></TableCell>
                            <TableCell><strong>On</strong></TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={true}
                                    direction={sortOrder}
                                    onClick={handleSortToggle}
                                >
                                    <strong>Value</strong>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.effectOf}</TableCell>
                                <TableCell>{row.effectOn}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const getUniqueValues = (data, column) => {
        if (!data) return [];
        const rows = Object.entries(data).map(([key]) => {
            const splitKey = key.split(" effects on ");
            return {
                effectOf: splitKey[0] || "Unknown",
                effectOn: splitKey[1] || "Unknown",
            };
        });

        return [...new Set(rows.map((row) => row[column]))];
    };

    const effectsOfOptions = getUniqueValues(effects, "effectOf");
    const effectsOnOptions = getUniqueValues(effects, "effectOn");

    return (
        <Box >
            {/* Multi-Select Filters */}
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        marginBottom: 1,
                        alignItems: "center",
                        width: "45%"
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <InputLabel sx={{ fontSize: "12px", color: "7a7a7a" }}>Independent variables</InputLabel>
                        <Select
                            multiple
                            placeholder="Filter"
                            value={selectedEffectOf}
                            onChange={(e) => setSelectedEffectOf(e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            fullWidth
                            size="small"
                        >
                            {effectsOfOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <DeleteIcon
                        sx={{ cursor: "pointer", color: "#7e7e7e", marginTop: 1.25 }}
                        onClick={() => setSelectedEffectOf([])}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        marginBottom: 1,
                        alignItems: "center",
                        width: "45%"
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <InputLabel sx={{ fontSize: "12px", color: "7a7a7a" }}>Dependent variables (On)</InputLabel>
                        <Select
                            multiple
                            labelId="dependent"
                            value={selectedEffectOn}
                            onChange={(e) => setSelectedEffectOn(e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            fullWidth
                            size="small">
                            {effectsOnOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <DeleteIcon
                        sx={{ cursor: "pointer", color: "#7e7e7e", marginTop: 1.25 }}
                        onClick={() => setSelectedEffectOn([])}
                    />
                </Box>
            </Box>
            {/* Render Table */}
            {effects && renderTable()}
        </Box >
    );
};

export default Effects;
