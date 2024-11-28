import json
import os
import logging
import pandas as pd
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


def preprocess_wearable_csv(df):
    """
    Aggregates (mean) wearable metrics over time and formats it for tabular display.
    """
    try:
        df["date"] = pd.to_datetime(df["date"])
        df = df.sort_values(by="date", ascending=False)
        df.set_index("date", inplace=True)
        df["sleep_duration"] = df["sleep_duration"] / 60

        # Aggregation periods
        periods = {
            "7d": "7D",
            "14d": "14D",
            "1m": "30D",
            "3m": "90D",
            "6m": "180D",
            "1y": "365D",
        }

        # Create a DataFrame to store the aggregated results
        aggregated_data = pd.DataFrame()
        df = df.select_dtypes(include="number")  # Include only numeric columns
        for period_label, period_duration in periods.items():
            # Calculate the rolling mean for each period
            rolling_agg = df.rolling(period_duration).mean()

            # Collect the latest value for each period
            aggregated_data[period_label] = rolling_agg.iloc[-1]

        # Return the data as a dictionary (rows are metrics, columns are periods)
        aggregated_data = aggregated_data.round(2)

        aggregated_data.to_csv("test.csv")
        return aggregated_data
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
