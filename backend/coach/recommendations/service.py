import json
from coach.recommendations.repository import *
from coach.users.service import *
from coach.prompts.service import *
from coach.llm import prompt_ai


def build_prompts_with_data(user_id, rec_type):
    profile = get_user_profile(user_id)
    wearable_summary, causal_effects = get_wearables_and_effects(user_id)

    system_prompt = get_sys_prompt()
    user_prompt = build_recommendations_prompt(
        rec_type, profile, causal_effects, wearable_summary
    )

    return system_prompt, user_prompt


def generate_and_store_recommendation(user_id, rec_type):
    system_prompt, user_prompt = build_prompts_with_data(user_id, rec_type)

    recommendation = prompt_ai(system_prompt, user_prompt)

    json_rec = json.loads(recommendation)
    json_rec["userId"] = user_id
    json_rec["prompt"] = system_prompt
    json_rec["user_prompt"] = user_prompt
    json_rec["id"] = increment_id()

    add_recommendation(json_rec)
    return json_rec


def get_final_recommendation(rec_id):
    recommendation = find_recommendation(rec_id)
    fr = recommendation["final_recommendation"]
    return fr["text"] + "\n" + fr["explanation"]
