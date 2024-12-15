import json
from datetime import datetime

RECOMMENDATIONS_FILE = "recommendations.json"
SYSTEM_PROMPT_FILE = "system_prompt.txt"


def load():
    try:
        # Read the recommendations from the JSON file
        with open(RECOMMENDATIONS_FILE, "r") as file:
            recommendations = json.load(file)
        return recommendations
    except Exception as e:
        print(f"Failed to read the recommendations file: {e}")
        return


def write(recommendations):
    try:
        # Write the updated recommendations back to the JSON file
        with open(RECOMMENDATIONS_FILE, "w") as file:
            json.dump(recommendations, file, indent=4)
    except Exception as e:
        print(f"Failed to update the recommendations file: {e}")
        return


def update_recommendations_with_prompt():
    try:
        # Read the system prompt from the text file
        with open(SYSTEM_PROMPT_FILE, "r") as file:
            system_prompt = file.read().strip()
    except Exception as e:
        print(f"Failed to read the system prompt: {e}")
        return

    recommendations = load()

    # Update each recommendation with the "prompt" key
    for recommendation in recommendations:
        recommendation["prompt"] = system_prompt

    write(recommendations)

    print("Recommendations updated successfully!")


def update_with_prog_ids():
    recommendations = load()
    id = 0
    for recommendation in recommendations:
        recommendation["id"] = id
        id += 1
    write(recommendations)


def update_with_timestamps():
    recommendations = load()
    for recommendation in recommendations:
        recommendation["timestamp"] = datetime.now().isoformat()
    write(recommendations)


def update_with_user_prompts():
    user_prompt = """
    Hey coach! 
    Generate an actionable, grounded {rec_type.upper()} personalized recommendation to improve stress based on my data (NOTE: Higher stress score is better).
    Provide a schedule of activities I should engage in to improve.
        
    - My user profile (age, gender, height, weight, bmi) is : 
    __profile_str__
    - My estimated causal effects are: 
    __effects_str__
    - The summary of my last 21 days wearable data:
    __wearables_summary__
    """

    recommendations = load()
    for recommendation in recommendations:
        recommendation["user_prompt"] = user_prompt
    write(recommendations)


# Call the function to perform the update
# update_recommendations_with_prompt()
# update_with_prog_ids()
update_with_user_prompts()
