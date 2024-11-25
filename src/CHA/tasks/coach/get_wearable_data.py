import numpy as np
import pandas as pd
from typing import List, Any
from CHA.tasks import BaseTask


class QueryWearablesDataTask(BaseTask):
    name: str = "get_wearable"
    chat_name: str = "QueryWearablesDataTask"
    description: str = "Retrieves a csv with user wearable data"
    output_type: bool = False
    return_direct: bool = True
    dependencies: List[Any] = []
    inputs: List[str] = []
    output: List[str] = ["A np array containing user wearable data"]

    def _execute(self, inputs) -> str:
        return self.get_wearables_data()

    def get_wearables_data(self):
        # 621e2fce67b776a240279baa (cleaned): 59 days
        # Array of {col_name: row_val}
        return np.load("user_array.npy")
