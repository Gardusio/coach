from flask import Flask, request, jsonify
from coach.utils import *
from coach.causal import compute_causal_effects
from coach.prompt_builder import build_recommendations_prompt
from coach.llm import generate_recommendation
import logging

app = Flask(__name__)
setup_logging()
logger = logging.getLogger(__name__)


@app.route("/coach/generate-recommendation", methods=["GET"])
def get_recommendation():

    user_id = request.args.get("user")
    rec_type = request.args.get("type")

    logger.info(f"Generating {rec_type} recommendation for user: {user_id}...\n")

    if rec_type not in ["daily", "weekly", "monthly"]:
        logger.error(f"Invalid recommendation type: {rec_type}")
        return jsonify({"error": "Invalid recommendation type"}), 400

    try:
        logger.info(f"Loading profile for user {user_id}...\n")
        profile = load_user_profile(user_id)

        logger.info(f"Loading wearable data for user {user_id}...\n")
        wearable_data = load_wearable_data(user_id)
        logger.info(f"Extracting wearables summary...\n")
        wearable_summary = preprocess_wearable_csv(wearable_data)

        logger.info("Computing causal effects...\n")
        causal_effects = compute_causal_effects(wearable_data)

        logger.info("Building recommendation prompt..\n")
        prompt = build_recommendations_prompt(
            rec_type, profile, causal_effects, wearable_summary
        )
        logger.info("\nGenerating recommendation via GPT-4...\n")
        recommendation = generate_recommendation(prompt)

        return jsonify({"recommendation": recommendation})

    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8080)
