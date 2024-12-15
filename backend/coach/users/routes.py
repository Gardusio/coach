from flask import Blueprint, jsonify
from coach.utils import *
from coach.users.service import *


users_bp = Blueprint("users", __name__)


@users_bp.route("/<user_id>/profile", methods=["GET"])
def user_profile(user_id):
    profile = get_user_profile(user_id)
    return jsonify(profile)


@users_bp.route("/<user_id>/wearable", methods=["GET"])
def get_wearable_data(user_id):
    wearable_data = load_wearable_data(user_id)
    summary = preprocess_wearable_csv(wearable_data)
    summary = summary.reset_index().to_dict(orient="list")

    return jsonify({"records": summary})


@users_bp.route("/<user_id>/effects", methods=["GET"])
def get_causal_effects(user_id):
    wearable_data = load_wearable_data(user_id)
    effects = compute_causal_effects(wearable_data)
    return jsonify(effects)
