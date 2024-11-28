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

const Profile = (profile) => {

    const renderTable = (data) => {
        data = data.profile
        if (!data || Object.keys(data).length === 0) {
            return <Typography>No data available.</Typography>;
        }

        // Convert the object into an array of rows
        const rows = Object.entries(data);

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{typeof value === "object" ? JSON.stringify(value) : value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box>
            {profile && renderTable(profile)}
        </Box>
    );
};

export default Profile;
