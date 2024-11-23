import numpy as np
from CHA.tasks import BaseTask


class QueryWearablesDataTask(BaseTask):
    def _execute(self, inputs) -> str:
        print("#" * 80)
        print("USER WEARABLES INPUTS")
        print(inputs)
        print("#" * 80)
        return self.get_wearables_data()

    @staticmethod
    def get_wearables_data(self):
        # 621e2fce67b776a240279baa (cleaned): 59 days
        # Array of {col_name: row_val}
        return np.load("user_array.npy")
