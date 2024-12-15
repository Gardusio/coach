from flask import Blueprint, request, jsonify
from coach.utils import *
from coach.prompts.service import *

prompts_bp = Blueprint("prompts", __name__)


@prompts_bp.route("/system-prompt", methods=["POST"])
def update_system_prompt():
    data = request.get_json()

    if "system_prompt" not in data:
        return jsonify({"error": "Missing 'system_prompt' in the request body"}), 400

    system_prompt = data["system_prompt"]

    # Write the new system prompt to the file
    try:
        update_sys_prompt(system_prompt)
    except Exception as e:
        return jsonify({"error": f"Failed to update the system prompt: {e}"}), 500

    return jsonify({"message": "System prompt updated successfully!"}), 200


@prompts_bp.route("/system-prompt", methods=["GET"])
def get_system_prompt():
    try:
        system_prompt = get_sys_prompt()
    except Exception as e:
        return jsonify({"error": f"Failed to read the system prompt: {e}"}), 500

    return jsonify({"system_prompt": system_prompt}), 200
