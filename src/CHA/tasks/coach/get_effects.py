from task import BaseTask

class QueryCausalEffectsTask(BaseTask):
    def run(self):
        return self.get_causal_effects()

    @staticmethod
    def get_causal_effects():
       
        return {
            "Steps_on_Positive_Affect": 0.4,
            "Steps_on_Negative_Affect": -0.2,
            "Sleep_on_Positive_Affect": 0.3,
            "Stress_on_Negative_Affect": 0.5,
            "Calories_on_Anxiety": -0.1
        }
