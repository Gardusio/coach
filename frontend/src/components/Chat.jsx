import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Chat = ({ chatMessages, currentMessage, onMessageChange, onSendMessage }) => {
    return (
        <Box padding={"1em 2em"} display="flex" flexDirection="column" height="300px">
            {/* Chat History */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "0.5em",
                    marginBottom: "1em",
                }}
            >
                {chatMessages.map((message, index) => (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent={message.role === "user" ? "flex-end" : "flex-start"}
                        marginBottom="0.5em"
                    >
                        <Box
                            sx={{
                                padding: "0.5em 1em",
                                borderRadius: "8px",
                                backgroundColor:
                                    message.role === "user" ? "#d1e7fd" : "#e8e8e8",
                                maxWidth: "70%",
                            }}
                        >
                            <Typography variant="body2">{message.content}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* Input Field */}
            <Box display="flex" gap="0.5em">
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Type your message..."
                    fullWidth
                    value={currentMessage}
                    onChange={onMessageChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevent new line
                            onSendMessage();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSendMessage}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
