import React, { useState, useEffect } from "react";
import NewRecommendation from "./views/NewRecommendation.jsx";
import PastRecommendations from "./views/PastRecommendations";
import DataExplorer from "./views/DataExplorer";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { getCausalEffects, getUserProfile, getWearableData, generateRecommendation, fetchPastRecommendations } from "./api.js"
import "./App.css";
import Settings from "./views/Settings.jsx";

const App = () => {
  const [activeView, setActiveView] = useState("recommendations"); // View state
  const [userId, setUserId] = useState("2de"); // User ID
  const [userProfile, setUserProfile] = useState(null); // Shared state for user profile
  const [wearableData, setWearableData] = useState(null); // Shared state for wearable data
  const [effects, setEffects] = useState(null); // Shared state for causal effects
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendationUser, setRecommendationUser] = useState(null);
  const [pastRecommendations, setPastRecommendations] = useState([]); // Lifted state for recommendations

  // Fetch past recommendations on mount
  useEffect(() => {
    const loadRecommendations = async () => {
      const data = await fetchPastRecommendations();
      setPastRecommendations(data);
    };
    loadRecommendations();
  }, []);

  const handleLoadUserInfo = async (id) => {
    const profile = await getUserProfile(id);
    const wearables = await getWearableData(id);
    const effectsData = await getCausalEffects(id);

    setUserId(id);
    setUserProfile(profile);
    setWearableData(wearables);
    setEffects(effectsData);
  };

  const handleGenerate = async (type, userId) => {
    setLoading(true);
    const rec = await generateRecommendation(type, userId);
    setRecommendationUser(userId);
    setRecommendation(rec);

    setPastRecommendations((prev) => [...prev, { ...rec, userId }]);
    setLoading(false)
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "96px" }}>

      {/* Header with Navigation */}
      <AppBar position="static" sx={{ backgroundColor: "#282828", padding: 1, marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Coach Testing Interface
          </Typography>
          <Button
            color="inherit"
            onClick={() => setActiveView("recommendations")}
          >
            Generate
          </Button>
          <Button color="inherit" onClick={() => setActiveView("data-explorer")}>
            Data Explorer
          </Button>
          <Button color="inherit" onClick={() => setActiveView("past-recommendations")}>
            Database
          </Button>
          <Button color="inherit" onClick={() => setActiveView("settings")}>
            Settings
          </Button>
        </Toolbar>

      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 4, width: "90%", margin: "auto" }}>
        {activeView === "recommendations" && (
          <NewRecommendation
            recommendation={recommendation}
            recommendationUser={recommendationUser}
            onGenerate={handleGenerate}
            loading={loading} // Pass loading state
          />
        )}
        {activeView === "data-explorer" && (
          <DataExplorer
            userId={userId}
            setUserId={setUserId}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            wearableData={wearableData}
            setWearableData={setWearableData}
            effects={effects}
            setEffects={setEffects}
            onLoadUserInfo={handleLoadUserInfo}
          />
        )}
        {activeView === "past-recommendations" && (
          <PastRecommendations
            recommendations={pastRecommendations}
            setRecommendations={setPastRecommendations}
          />
        )}
        {activeView === "settings" && (
          <Settings />
        )}
      </Box>
    </Box>
  );
};

export default App;
