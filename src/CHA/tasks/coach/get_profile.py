from CHA.tasks import BaseTask


class QueryUserProfileTask(BaseTask):
    def _execute(self, inputs) -> str:
        print("#" * 80)
        print("USER PROFILE INPUTS")
        print(inputs)
        print("#" * 80)
        return self.get_user_profile()

    @staticmethod
    def get_user_profile(self):
        # Mockup static profile data for 621e2fce67b776a240279baa (cleaned)
        return {
            "Age": "Below 30",
            "Gender": "Male",
            "Bmi": "24",
            "Height_cm": "183",
            "Weight_kg": "80",
        }
