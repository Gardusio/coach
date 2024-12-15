import pandas as pd
from sklearn.preprocessing import StandardScaler
from coach.users.repository import *


def get_user_profile(user_id):
    return load_user_profile(user_id)


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
            "1": "7D",
            "2": "14D",
            "3": "30D",
            "4": "90D",
            "5": "180D",
            "6": "365D",
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


correlation_pairs = {
    "steps effects on stress_score": ["steps", "stress_score"],
    "sleep_duration effects on stress_score": ["sleep_duration", "stress_score"],
    "sleep_points_percentage effects on stress_score": [
        "sleep_points_percentage",
        "stress_score",
    ],
    "rmssd effects on stress_score": ["rmssd", "stress_score"],
    "lightly_active_minutes effects on stress_score": [
        "lightly_active_minutes",
        "stress_score",
    ],
    "moderately_active_minutes effects on stress_score": [
        "moderately_active_minutes",
        "stress_score",
    ],
    "very_active_minutes effects on stress_score": [
        "very_active_minutes",
        "stress_score",
    ],
    "sedentary_minutes effects on stress_score": ["sedentary_minutes", "stress_score"],
    "sleep_deep_ratio effects on stress_score": ["sleep_deep_ratio", "stress_score"],
    "sleep_light_ratio effects on stress_score": ["sleep_light_ratio", "stress_score"],
    "sleep_rem_ratio effects on stress_score": ["sleep_rem_ratio", "stress_score"],
    "filteredDemographicVO2Max effects on stress_score": [
        "filteredDemographicVO2Max",
        "stress_score",
    ],
    "distance effects on stress_score": ["distance", "stress_score"],
    "bpm effects on stress_score": ["bpm", "stress_score"],
    "minutes_in_default_zone_1 effects on stress_score": [
        "minutes_in_default_zone_1",
        "stress_score",
    ],
    "minutes_below_default_zone_1 effects on stress_score": [
        "minutes_below_default_zone_1",
        "stress_score",
    ],
    "steps effects on sleep_points_percentage": ["steps", "sleep_points_percentage"],
    "sleep_duration effects on sleep_points_percentage": [
        "sleep_duration",
        "sleep_points_percentage",
    ],
    "rmssd effects on sleep_points_percentage": ["rmssd", "sleep_points_percentage"],
    "lightly_active_minutes effects on sleep_points_percentage": [
        "lightly_active_minutes",
        "sleep_points_percentage",
    ],
    "moderately_active_minutes effects on sleep_points_percentage": [
        "moderately_active_minutes",
        "sleep_points_percentage",
    ],
    "very_active_minutes effects on sleep_points_percentage": [
        "very_active_minutes",
        "sleep_points_percentage",
    ],
    "sedentary_minutes effects on sleep_points_percentage": [
        "sedentary_minutes",
        "sleep_points_percentage",
    ],
    "sleep_deep_ratio effects on sleep_points_percentage": [
        "sleep_deep_ratio",
        "sleep_points_percentage",
    ],
    "sleep_light_ratio effects on sleep_points_percentage": [
        "sleep_light_ratio",
        "sleep_points_percentage",
    ],
    "sleep_rem_ratio effects on sleep_points_percentage": [
        "sleep_rem_ratio",
        "sleep_points_percentage",
    ],
    "filteredDemographicVO2Max effects on sleep_points_percentage": [
        "filteredDemographicVO2Max",
        "sleep_points_percentage",
    ],
    "distance effects on sleep_points_percentage": [
        "distance",
        "sleep_points_percentage",
    ],
    "bpm effects on sleep_points_percentage": ["bpm", "sleep_points_percentage"],
    "minutes_in_default_zone_1 effects on sleep_points_percentage": [
        "minutes_in_default_zone_1",
        "sleep_points_percentage",
    ],
    "minutes_below_default_zone_1 effects on sleep_points_percentage": [
        "minutes_below_default_zone_1",
        "sleep_points_percentage",
    ],
}


def compute_causal_effects(df):
    """
    Computes correlation-based effects as proxies for causal relationships.

    Args:
    - df (pd.DataFrame): DataFrame containing daily wearable data.

    Returns:
    - dict: Dictionary of correlations, representing causal effects.
    """

    effects = {}
    df = df.select_dtypes(include="number")
    df = standardize_data(df)

    # Compute correlations for defined pairs
    for effect, [independent, dependent] in correlation_pairs.items():
        if independent in df.columns and dependent in df.columns:
            correlation = df[independent].corr(df[dependent])
            effects[effect] = round(correlation, 2) if pd.notnull(correlation) else None
        else:
            effects[effect] = None

    return effects


def get_wearables_and_effects(user_id):
    wearables = load_wearable_data(user_id)
    summary = preprocess_wearable_csv(wearables).to_string()
    effects = compute_causal_effects(wearables)
    return summary, effects
