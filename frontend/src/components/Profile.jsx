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
            <TableContainer >
                <Table>
                    <TableHead sx={{ backgroundColor: "#eee", border: "1px solid #eee" }}>
                        <TableRow>
                            {rows.map(([key]) => (
                                <TableCell key={key}>
                                    <strong>{key}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {rows.map(([_, value]) => (
                                <TableCell key={value}>
                                    {typeof value === "object"
                                        ? JSON.stringify(value)
                                        : value}
                                </TableCell>
                            ))}
                        </TableRow>
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
