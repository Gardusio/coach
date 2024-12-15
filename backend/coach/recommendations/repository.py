import json
import os
from datetime import datetime

RECOMMENDATIONS_FILE = "./data/recommendations/recommendations.json"
if not os.path.exists(RECOMMENDATIONS_FILE):
    with open(RECOMMENDATIONS_FILE, "w") as f:
        json.dump([], f)


def increment_id():
    return load_recommendations()[-1]["id"] + 1


def load_recommendations():
    """Load all recommendations from the JSON file."""
    try:
        with open(RECOMMENDATIONS_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    except Exception as e:
        print(f"Error loading recommendations: {e}")
        return []


def save_recommendations(recommendations):
    """Save all recommendations to the JSON file."""
    try:
        with open(RECOMMENDATIONS_FILE, "w") as f:
            json.dump(recommendations, f, indent=4)
    except Exception as e:
        print(f"Error saving recommendations: {e}")


def add_recommendation(recommendation):
    """Add a new recommendation to the JSON file."""
    recommendations = load_recommendations()
    recommendation["timestamp"] = datetime.now().isoformat()
    recommendations.append(recommendation)
    save_recommendations(recommendations)


def find_recommendation(id):
    recommendations = load_recommendations()
    return next((r for r in recommendations if r["id"] == id), None)
