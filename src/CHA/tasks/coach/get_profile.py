from task import BaseTask


class QueryUserProfileTask(BaseTask):
    def run(self):
        return self.get_user_profile()

    @staticmethod
    def get_user_profile():
        # Mockup static profile data for 621e2fce67b776a240279baa (cleaned)
        return {
            "Age": "Below 30",
            "Gender": "Male",
            "Bmi": "24",
            "Height_cm": "183",
            "Weight_kg": "80",
        }
