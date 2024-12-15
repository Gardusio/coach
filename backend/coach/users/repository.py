import json
import os
import pandas as pd


def load_user_profile(user_id):
    filepath = f"data/profiles/{user_id}.json"
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Profile for user {user_id} not found.")
    with open(filepath, "r") as f:
        return json.load(f)


def load_wearable_data(user_id):
    filepath = f"data/wearables/{user_id}.csv"
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Wearable data for user {user_id} not found.")
    return pd.read_csv(filepath)
