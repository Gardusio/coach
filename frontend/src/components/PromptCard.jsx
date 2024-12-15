import React from "react";
import { Box, TextareaAutosize } from "@mui/material";
import ReactMarkdown from "react-markdown";

const PromptCard = ({ prompt }) => {

    const rm_prompt = <ReactMarkdown>
        {prompt}
    </ReactMarkdown>
    return (
        <Box display={"flex"} alignItems={"center"} padding={"1em"}>
            <TextareaAutosize
                value={prompt}

                readOnly
                style={{
                    width: "100%",
                    padding: "1em",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    border: "1px solid #FAFAFA",
                    borderRadius: "8px",
                    margin: "auto",
                    backgroundColor: "#FAFAFA"
                }}

            />
        </Box>
    );
};

export default PromptCard;
