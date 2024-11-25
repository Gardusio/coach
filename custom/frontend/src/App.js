import React, { useState } from "react";
import InputForm from "./components/InputForm";
import OutputDisplay from "./components/OutputDisplay";
import DataExplorer from "./components/DataExplorer";
import HistorySidebar from "./components/HistorySidebar";
import { generateRecommendation } from "./api";

const App = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = async (type, userId) => {
    const rec = await generateRecommendation(type, userId);
    setRecommendation(rec);
    setHistory([...history, { type, timestamp: Date.now(), recommendation: rec }]);
  };

  const handleSelectHistory = (index) => {
    setRecommendation(history[index].recommendation);
  };

  return (
    <div>
      <InputForm onGenerate={handleGenerate} />
      <OutputDisplay recommendation={recommendation} />
      <DataExplorer userId={history[0]?.userId || ""} />
      <HistorySidebar history={history} onSelect={handleSelectHistory} />
    </div>
  );
};

export default App;
