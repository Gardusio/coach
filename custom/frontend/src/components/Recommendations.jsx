import React, { useState } from "react";
import InputForm from "./InputForm";
import { generateRecommendation } from "../api";
import ReactMarkdown from "react-markdown"; // For rendering markdown

const Recommendations = () => {
    const [recommendation, setRecommendation] = useState(null);
    const [activeTab, setActiveTab] = useState("final"); // "final" or "thoughts"

    const handleGenerate = async (type, userId) => {
        const rec = await generateRecommendation(type, userId);
        setRecommendation(rec);
    };

    const renderFinalRecommendation = () => {
        if (!recommendation || !recommendation.final_recommendation) {
            return <p>No recommendation generated yet.</p>;
        }
        const { choosen_recommendation, user_explanation } =
            recommendation.final_recommendation;
        return (
            <div>
                <h3>Final Recommendation</h3>
                <ReactMarkdown>
                    {`**Chosen Recommendation:** ${choosen_recommendation}\n\n**Explanation:** ${user_explanation}`}
                </ReactMarkdown>
            </div>
        );
    };

    const renderThoughtProcess = () => {
        if (!recommendation || !recommendation.ToT) {
            return <p>No thought process available yet.</p>;
        }

        return (
            <div>
                <h3>Tree of Thought (ToT)</h3>
                {Object.entries(recommendation.ToT).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: "20px" }}>
                        <h4>{key.toUpperCase()}</h4>
                        <p>
                            <strong>Text:</strong> {value.text}
                        </p>
                        <p>
                            <strong>Personalization Score:</strong>{" "}
                            {value.validation.personalization_score}
                        </p>
                        <p>
                            <strong>Groundness Score:</strong>{" "}
                            {value.validation.groundness_score}
                        </p>
                        <p>
                            <strong>Scores Explanation:</strong>{" "}
                            {value.validation.scores_explanation}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Recommendations</h2>
            <InputForm onGenerate={handleGenerate} />

            {/* Tabs for Final Recommendation and Thought Process */}
            <div>
                <button
                    onClick={() => setActiveTab("final")}
                    style={{ marginRight: "10px" }}
                >
                    Final Recommendation
                </button>
                <button onClick={() => setActiveTab("thoughts")}>Thought Process</button>
            </div>

            {/* Render Active Tab */}
            <div style={{ marginTop: "20px" }}>
                {activeTab === "final" && renderFinalRecommendation()}
                {activeTab === "thoughts" && renderThoughtProcess()}
            </div>
        </div>
    );
};

export default Recommendations;
