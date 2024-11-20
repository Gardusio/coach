from typing import Dict
from typing import Type

from CHA.planners import BasePlanner
from CHA.planners import PlannerType
from CHA.planners import TreeOfThoughtPlanner
from CHA.planners.react import ReActPlanner


PLANNER_TO_CLASS: Dict[PlannerType, Type[BasePlanner]] = {
    PlannerType.ZERO_SHOT_REACT_PLANNER: ReActPlanner,
    PlannerType.TREE_OF_THOUGHT: TreeOfThoughtPlanner,
}
