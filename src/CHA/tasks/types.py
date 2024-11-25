from typing import Dict
from typing import Type

from CHA.tasks import BaseTask
from CHA.tasks.common import AskUser
from CHA.tasks.common import ExtractText
from CHA.tasks.common import GoogleSearch
from CHA.tasks.common import GoogleTranslate
from CHA.tasks.common import RunPythonCode
from CHA.tasks.common import SerpAPI
from CHA.tasks.common import TaskType
from CHA.tasks.common import TestFile
from CHA.tasks.affect import ActivityAnalysis
from CHA.tasks.affect import ActivityGet
from CHA.tasks.affect import PPGAnalysis
from CHA.tasks.affect import PPGGet
from CHA.tasks.affect import SleepAnalysis
from CHA.tasks.affect import SleepGet
from CHA.tasks.affect import StressAnalysis
from CHA.tasks.nutritionix import (
    CalculateFoodRiskFactor,
)
from CHA.tasks.nutritionix import QueryNutritionix
from CHA.tasks.coach import (
    QueryCausalEffectsTask,
    QueryUserProfileTask,
    QueryWearablesDataTask,
)


TASK_TO_CLASS: Dict[TaskType, Type[BaseTask]] = {
    TaskType.SERPAPI: SerpAPI,
    TaskType.EXTRACT_TEXT: ExtractText,
    TaskType.AFFECT_SLEEP_GET: SleepGet,
    TaskType.AFFECT_ACTIVITY_GET: ActivityGet,
    TaskType.AFFECT_SLEEP_ANALYSIS: SleepAnalysis,
    TaskType.AFFECT_ACTIVITY_ANALYSIS: ActivityAnalysis,
    TaskType.GOOGLE_TRANSLATE: GoogleTranslate,
    TaskType.ASK_USER: AskUser,
    TaskType.TEST_FILE: TestFile,
    TaskType.RUN_PYTHON_CODE: RunPythonCode,
    TaskType.PPG_GET: PPGGet,
    TaskType.PPG_ANALYSIS: PPGAnalysis,
    TaskType.STRESS_ANALYSIS: StressAnalysis,
    TaskType.QUERY_NUTRITIONIX: QueryNutritionix,
    TaskType.CALCULATE_FOOD_RISK_FACTOR: CalculateFoodRiskFactor,
    TaskType.GOOGLE_SEARCH: GoogleSearch,
    TaskType.COMPUTE_CAUSAL_EFFECTS: QueryCausalEffectsTask,
    TaskType.QUERY_WEARABLES_DATA: QueryWearablesDataTask,
    TaskType.QUERY_USER_PROFILE: QueryUserProfileTask,
}
