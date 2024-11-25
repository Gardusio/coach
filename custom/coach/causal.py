import logging
import pandas as pd
from coach.utils import standardize_data

logger = logging.getLogger(__name__)


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
    "sleep_points_percentage effects on sleep_points_percentage": [
        "sleep_points_percentage",
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
    try:
        # Compute correlations for defined pairs
        for effect, [independent, dependent] in correlation_pairs.items():
            if independent in df.columns and dependent in df.columns:
                correlation = df[independent].corr(df[dependent])
                effects[effect] = (
                    round(correlation, 2) if pd.notnull(correlation) else None
                )
            else:
                logger.warning(
                    f"Columns missing for {effect}: {independent}, {dependent}"
                )
                effects[effect] = None

        logger.info("Computed correlation-based effects")
        return effects

    except Exception as e:
        logger.error(f"Error computing causal effects: {e}")
        raise
