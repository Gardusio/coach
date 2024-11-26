import React, { useState } from "react";
import Recommendations from "./components/Recommendations";
import DataExplorer from "./components/DataExplorer";

const App = () => {
  const [activeView, setActiveView] = useState("recommendations"); // "recommendations" or "data-explorer"

  return (
    <div>
      <header>
        <h1>Personal Coach Testing Interface</h1>
        <nav>
          <button onClick={() => setActiveView("recommendations")}>
            Recommendations
          </button>
          <button onClick={() => setActiveView("data-explorer")}>
            Data Explorer
          </button>
        </nav>
      </header>

      <main style={{ marginTop: "20px" }}>
        {activeView === "recommendations" && <Recommendations />}
        {activeView === "data-explorer" && <DataExplorer />}
      </main>
    </div>
  );
};

export default App;
