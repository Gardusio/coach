from flask import Flask, request, jsonify
from coach.utils import *
from coach.causal import compute_causal_effects
from coach.prompt_builder import build_recommendations_prompt
from coach.llm import generate_recommendation
import logging
import flask_cors


app = Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
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
        """
        logger.info(f"Loading profile for user {user_id}...\n")
        profile = load_user_profile(user_id)

        logger.info(f"Loading wearable data for user {user_id}...\n")
        wearable_data = load_wearable_data(user_id)
        logger.info(f"Extracting wearables summary...\n")
        wearable_summary = preprocess_wearable_csv(wearable_data)
        wearable_summary = wearable_summary.to_string()

        logger.info("Computing causal effects...\n")
        causal_effects = compute_causal_effects(wearable_data)

        logger.info("Building recommendation prompt..\n")
        prompt = build_recommendations_prompt(
            rec_type, profile, causal_effects, wearable_summary
        )
        logger.info("\nGenerating recommendation via GPT-4...\n")
        recommendation = generate_recommendation(prompt)
        """

        recommendation = json.loads(
            """
            {
                "ToT": {
                    "rec1": {
                        "text": "Increase your daily steps to at least 13000.",
                        "validation": {
                            "personalization_score": 9.5,
                            "groundness_score": 8.5,
                            "scores_explanation": "The positive effects of steps on your stress score (0.26) show that adding more steps into your day can improve your stress levels. This also aligns with scientific evidence that exercise is a powerful stress reliever. However, your recent daily average of steps (11921 from the last 7 days) is already quite high, therefore the room for improvement is lower."
                        }
                    },
                    "rec2": {
                        "text": "Try to reduce your sedentary minutes by incorporating more regular movement intervals into your day.",
                        "validation": {
                            "personalization_score": 10,
                            "groundness_score": 9.5,
                            "scores_explanation": "Your data shows a strong negative effect of sedentary minutes on your stress score (-0.66) making this a very personalized recommendation for you. This also aligns with literature showing the detrimental effects of sedentary behavior on psychological health. As your average daily sedentary minutes from the last 7 days is 669 minutes, there is room for improvement."
                        }
                    },
                    "rec3": {
                        "text": "Improve your sleep quality by integrating a consistent sleep routine which includes deep breathing or meditation before bed.",
                        "validation": {
                            "personalization_score": 8.5,
                            "groundness_score": 8.5,
                            "scores_explanation": "Your data shows a relatively high positive impact of deep sleep (0.51), light sleep (0.61), and REM sleep (0.53) on your stress score. Hence, improving sleep quality could likely positively affect your stress levels. General scientific literature also shows that good sleep is critical for maintaining a good stress level. However, your sleep ratios and duration show good values already, hence the room for improvement is not very high."
                        }
                    }
                },
                "final_recommendation": {
                    "text": "Try to reduce your sedentary minutes by incorporating more regular movement intervals into your day.",
                    "explanation": "Recently, you've been spending quite a bit of time seated, and this might be impacting your stress levels. When you sit for long periods of time, your body isn't as active as it could be, which can actually increase stress. To combat this, try to incorporate regular movement intervals into your day. This could be as simple as standing up and stretching every 30 minutes, or taking a short walk during your breaks. You might be surprised by how such a small change can make a big difference!"
                }
            }
        """
        )

        return jsonify({"recommendation": recommendation})

    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/user/<user_id>/profile", methods=["GET"])
def get_user_profile(user_id):
    profile = load_user_profile(user_id)
    return jsonify(profile)


@app.route("/user/<user_id>/wearable", methods=["GET"])
def get_wearable_data(user_id):
    wearable_data = load_wearable_data(user_id)
    summary = preprocess_wearable_csv(wearable_data)
    summary = summary.reset_index().to_dict(orient="list")
    return jsonify({"records": summary})


@app.route("/user/<user_id>/effects", methods=["GET"])
def get_causal_effects(user_id):
    wearable_data = load_wearable_data(user_id)
    effects = compute_causal_effects(wearable_data)
    return jsonify(effects)


if __name__ == "__main__":
    app.run(port=8080, debug=True)
