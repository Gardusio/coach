import numpy as np
from task import BaseTask


class QueryWearablesDataTask(BaseTask):
    def run(self):
        return self.get_wearables_data()

    @staticmethod
    def get_wearables_data():
        # 621e2fce67b776a240279baa (cleaned): 59 days
        # Array of {col_name: row_val}
        return np.load("user_array.npy")
        
