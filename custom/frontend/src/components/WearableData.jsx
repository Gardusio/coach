import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const WearableData = (wearables) => {

    const renderTable = (data) => {
        data = data.wearables
        if (!data || Object.keys(data).length === 0) {
            return <Typography>No wearable data available.</Typography>;
        }

        // Extract columns and rows from data
        const columns = Object.keys(data).filter((key) => key !== "index");
        const rows = data.index.map((metric, i) => {
            const row = { metric };
            columns.forEach((col) => {
                row[col] = data[col][i];
            });
            return row;
        });

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Metric</TableCell>
                            {columns.map((col) => (
                                <TableCell key={col}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.metric}</TableCell>
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
