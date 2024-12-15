from coach.utils import *

SYSTEM_PROMPT_FILE = "./coach/prompts/system_prompt.txt"


def save(system_prompt):
    with open(SYSTEM_PROMPT_FILE, "w") as file:
        file.write(system_prompt)


def read():
    with open(SYSTEM_PROMPT_FILE, "r") as file:
        system_prompt = file.read()
    return system_prompt
