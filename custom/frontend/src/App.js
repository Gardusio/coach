import React, { useState } from "react";
import Recommendations from "./components/Recommendations";
import DataExplorer from "./components/DataExplorer";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState("recommendations"); // "recommendations" or "data-explorer"

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header with Navigation */}
      <AppBar position="static" sx={{ backgroundColor: "#282828", padding: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Coach Testing Interface
          </Typography>
          <Button
            color="inherit"
            onClick={() => setActiveView("recommendations")}
          >
            Recommendations
          </Button>
          <Button color="inherit" onClick={() => setActiveView("data-explorer")}>
            Data Explorer
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 4 }}>
        {activeView === "recommendations" && <Recommendations />}
        {activeView === "data-explorer" && <DataExplorer />}
      </Box>
    </Box>
  );
};

export default App;
