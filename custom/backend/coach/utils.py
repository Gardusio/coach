import json
import pandas as pd
import os
import logging
from sklearn.preprocessing import StandardScaler


def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[logging.StreamHandler()],
    )


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


def preprocess_wearable_csv(df, days=21):
    """
    Preprocesses the wearable CSV data to extract a summary.

    Args:
    - file_path (str): Path to the wearable CSV file.
    - days (int): Number of recent days to include in the summary.

    Returns:
    - str: Processed string summarizing the wearable data.
    """
    try:
        df["date"] = pd.to_datetime(df["date"])
        recent_data = df.sort_values(by="date", ascending=False).head(days)

        # Format the data into a readable string (table-like)
        summary = recent_data.to_string(index=False)
        return f"{summary}"
    except Exception as e:
        raise ValueError(f"Error processing CSV file: {e}")


def standardize_data(df, columns=[]):
    """
    Standardizes selected columns of the DataFrame using z-scores.

    Args:
    - df (pd.DataFrame): Input DataFrame.
    - columns (list): List of column names to standardize.

    Returns:
    - pd.DataFrame: DataFrame with standardized columns.
    """

    scaler = StandardScaler()

    if columns == []:
        columns = df.columns
    df[columns] = scaler.fit_transform(df[columns])
    return df
