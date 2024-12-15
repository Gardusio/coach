import openai
import os
import logging
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise EnvironmentError("OpenAI API key not found in environment variables")
openai.api_key = OPENAI_API_KEY


logger = logging.getLogger(__name__)

# TODO SET TEMPERATURE AND MODEL SETTINGS VIA API
# TODO: The user can then query you on generated recommendations to modify suggested plans or to ask clarifications.
# TODO: The user can ask you


def prompt_ai(system_prompt, user_prompt, temp=0.7, max_tokens=8000):
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=temp,
            max_completion_tokens=max_tokens,
        )
        rec = response.choices[0].message.content
        return rec
    except Exception as e:
        logger.error(f"Error during GPT-4 API call: {e}")
        raise
