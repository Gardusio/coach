from flask import Blueprint, request, jsonify
from coach.utils import *
from coach.prompts.service import *
from coach.recommendations.service import *
from coach.users.service import *
from pprint import pprint
import logging

setup_logging()
logger = logging.getLogger(__name__)
recommendations_bp = Blueprint("recommendations", __name__)


@recommendations_bp.route("/generate-recommendation", methods=["GET"])
def generate_recommendation():
    user_id = request.args.get("user")
    rec_type = request.args.get("type")

    logger.info(f"Generating {rec_type} recommendation for user: {user_id}...\n")

    if rec_type not in ["daily", "weekly"]:
        logger.error(f"Invalid recommendation type: {rec_type}")
        return jsonify({"error": "Invalid recommendation type"}), 400

    try:
        json_rec = generate_and_store_recommendation(user_id, rec_type)

        return jsonify({"recommendation": json_rec})

    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500


@recommendations_bp.route("/recommendations", methods=["GET"])
def get_all_recommendations():
    """Fetch all stored recommendations."""
    try:
        recommendations = load_recommendations()
        return jsonify(recommendations)
    except Exception as e:
        logger.error(f"Error fetching recommendations: {e}")
        return jsonify({"error": str(e)}), 500
