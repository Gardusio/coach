import json
import os
from coach.llm import generate_recommendation

RECOMMENDATIONS_FILE = "./data/recommendations/recommendations.json"
if not os.path.exists(RECOMMENDATIONS_FILE):
    with open(RECOMMENDATIONS_FILE, "w") as f:
        json.dump([], f)


def generate_and_store_recommendation(prompt, user_id):
    recommendation = generate_recommendation(prompt)
    json_rec = json.loads(recommendation)
    json_rec["userId"] = user_id
    add_recommendation(json_rec)
    return json_rec


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
    recommendations.append(recommendation)
    save_recommendations(recommendations)
