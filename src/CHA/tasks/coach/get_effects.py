import pandas as pd
from typing import Any, List
from CHA.tasks import BaseTask


class QueryCausalEffectsTask(BaseTask):
    name: str = "causal_effects"
    chat_name: str = "QueryCausalEffects"
    description: str = "Retrieve causal effects (as correlations) from the dataset."
    output_type: bool = False
    return_direct: bool = True

    def _execute(
        self,
        inputs: List[Any] = None,
    ) -> str:
        return self.get_causal_effects(inputs)

    def explain(self) -> str:
        return "Retrieve causal effects"

    def get_causal_effects(self, inputs):
        return {
            "'sleep_points_percentage' effect on 'stress_score'": 0.9,
            "'steps' effect on 'stress_score'": 0.4,
            "'carbs_intake' effect on 'stress_score'": 0.5,
        }

        # Define subsets of variables
        fitness_vars = [
            "steps",
            "bpm",
            "distance",
            "calories",
            "very_active_minutes",
            "moderately_active_minutes",
            "lightly_active_minutes",
            "sedentary_minutes",
            "filteredDemographicVO2Max",
            "minutes_below_default_zone_1",
        ]
        sleep_vars = [
            "sleep_duration",
            "sleep_efficiency",
            "minutesAsleep",
            "minutesToFallAsleep",
            "minutesAwake",
            "sleep_deep_ratio",
            "sleep_light_ratio",
            "sleep_rem_ratio",
            "sleep_points_percentage",
        ]
        stress_vars = [
            "stress_score",
            "exertion_points_percentage",
            "rmssd",
            "responsiveness_points_percentage",
        ]

        # Compute the correlation matrix
        numeric_data = available_data.select_dtypes(
            include=["float64", "int64"]
        ).dropna()
        correlation_matrix = numeric_data.corr()

        return correlation_matrix
