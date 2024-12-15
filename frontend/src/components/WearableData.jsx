import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const WearableData = (wearables) => {

    const label_map = {
        "1": "7D",
        "2": "14D",
        "3": "1M",
        "4": "3M",
        "5": "6M",
        "6": "1Y",
    }

    const renderTable = (data) => {
        data = data.wearables
        console.log(data)
        if (!data || Object.keys(data).length === 0) {
            return <Typography>No wearable data available.</Typography>;
        }

        // Extract columns and rows from data
        const columns = Object.keys(data).filter((key) => key !== "index");
        console.log(columns)
        const rows = data.index.map((metric, i) => {
            const row = { metric };
            columns.forEach((col) => {
                row[col] = data[col][i];
            });
            return row;
        });

        return (
            <TableContainer sx={{ border: "1px solid #eee" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#eee", border: "1px solid #eee" }}>
                        <TableRow>
                            <TableCell><strong>Metric</strong></TableCell>
                            {columns.map((col) => (
                                <TableCell key={label_map[col]}><strong>{label_map[col]}</strong></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row, index) => (
                            <TableRow key={index} >
                                <TableCell><strong>{row.metric}</strong></TableCell>
                                {columns.map((col) => (
                                    <TableCell key={col}>{row[col]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box>
            {wearables && renderTable(wearables)}
        </Box>
    );
};

export default WearableData;
