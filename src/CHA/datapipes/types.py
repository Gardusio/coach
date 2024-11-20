from typing import Dict
from typing import Type

from CHA.datapipes import DataPipe
from CHA.datapipes import DatapipeType
from CHA.datapipes import Memory


DATAPIPE_TO_CLASS: Dict[DatapipeType, Type[DataPipe]] = {
    DatapipeType.MEMORY: Memory
}
