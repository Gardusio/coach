import pandas as pd
from typing import Any, List
from CHA.tasks import BaseTask


class QueryCausalEffectsTask(BaseTask):
    name: str = "causal_effects"
    chat_name: str = "QueryCausalEffects"
    description: str = (
        "This tool is used to retrieve user personal causal effects. Causal effects will drive the personalization of recommendations. No inputs required"
    )
    output_type: bool = True
    return_direct: bool = False
    dependencies: List[Any] = []
    inputs: List[str] = []
    output: List[str] = [
        "An object containing causal effects scores in the form of 'effects of X on Y: VALUE' entries."
    ]

    def _execute(
        self,
        inputs: List[Any] = None,
    ) -> str:
        return self.get_causal_effects(inputs)

    def explain(self) -> str:
        return "Retrieves user causal effects"

    def get_causal_effects(self, inputs):
        return {
            "sleep_points_percentage on stress_score": 0.8,
            "distance_walked (meters) on stress_score": 0.6,
            "lightly_active_minutes on stress_score": 0.6,
            "very_active_minutes on stress_score": 0.2,
            "carbs_intake (% of all nutritional intake) on stress_score": 0.2,
            "protein_intake (% of all nutritional intake) on stress_score": -0.3,
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
