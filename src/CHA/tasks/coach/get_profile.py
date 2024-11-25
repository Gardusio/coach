from CHA.tasks import BaseTask
from typing import List, Any


class QueryUserProfileTask(BaseTask):
    name: str = "get_profile"
    chat_name: str = "QueryUserProfileTask"
    description: str = (
        "Retrieves user static information like age, gender, weight and height"
    )
    output_type: bool = False
    return_direct: bool = True
    dependencies: List[Any] = []
    inputs: List[str] = []
    output: List[str] = [
        "An object containing user infos like age, gender, weight and height"
    ]

    def _execute(self) -> str:
        return self.get_user_profile()

    def get_user_profile(self):
        return {
            "Age": "27",
            "Gender": "Male",
            "Height in cm": "173",
            "Weight in kg": "65",
        }
