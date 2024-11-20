from typing import Dict
from typing import Type

from CHA.llms import AntropicLLM
from CHA.llms import BaseLLM
from CHA.llms import LLMType
from CHA.llms import OpenAILLM

LLM_TO_CLASS: Dict[LLMType, Type[BaseLLM]] = {
    LLMType.OPENAI: OpenAILLM,
    LLMType.ANTHROPIC: AntropicLLM,
}
