from flask import Blueprint, request, jsonify
from coach.chats.service import *
from coach.recommendations.service import *
from pprint import pprint


chats_bp = Blueprint("chat", __name__)


@chats_bp.route("/chat", methods=["POST"])
def new_message():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Missing 'message' in the request body"}), 400

    try:
        user_message = data["message"]
        starting_rec_id = data["recId"]
        user_id = data["userId"]

        assistant_message = generate_recommendation_answer(
            user_message, starting_rec_id
        )

        add_chat_message(starting_rec_id, user_id, user_message, role="user")
        add_chat_message(starting_rec_id, user_id, assistant_message, role="assistant")

        return jsonify({"response": assistant_message})

    except Exception as e:
        print("Error during OpenAI API call:", str(e))
        return jsonify({"error": str(e)}), 500


@chats_bp.route("/chat/<rec_id>", methods=["GET"])
def get_recommendation_chat(rec_id):
    try:
        chat = get_chat_by_rec(rec_id)
        pprint(chat)
        return jsonify(chat)

    except Exception as e:
        print(f"Error retrieving chat for recommendation {rec_id}:", str(e))
        return jsonify({"error": str(e)}), 500
