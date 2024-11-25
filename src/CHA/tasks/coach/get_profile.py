from CHA.tasks import BaseTask
from typing import List, Any


class QueryUserProfileTask(BaseTask):
    name: str = "get_profile"
    chat_name: str = "QueryUserProfileTask"
    description: str = (
        "Retrieves user static information like age, gender, weight and height. No inputs required."
    )
    output_type: bool = True
    return_direct: bool = False
    dependencies: List[Any] = []
    inputs: List[str] = []
    output: List[str] = [
        "An object containing user infos like age, gender, weight and height"
    ]

    def _execute(self, inputs) -> str:
        return self.get_user_profile()

    def get_user_profile(self, inputs):
        return {
            "Age": "27",
            "Gender": "Male",
            "Height in cm": "173",
            "Weight in kg": "65",
        }
