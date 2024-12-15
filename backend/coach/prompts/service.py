from coach.prompts.repository import *
import logging


logger = logging.getLogger(__name__)


def build_recommendations_prompt(rec_type, profile, causal_effects, wearables_summary):
    """
    Builds a personalized prompt for generating fitness and wellbeing recommendations.

    Args:
    - rec_type (str): Recommendation type (daily or weekly).
    - profile (dict): User profile containing static data.
    - causal_effects (dict): Estimated causal effects for the user.

    Returns:
    - str: Constructed prompt.
    """
    # Format profile into a readable string
    profile_str = f"""
    - Gender: {profile.get('gender', 'Unknown')}
    - Age: {profile.get('age', 'Unknown')}
    - Weight: {profile.get('weight', 'Unknown')} kg
    - Height: {profile.get('height', 'Unknown')} cm
    - BMI: {profile.get('bmi', 'Unknown')}
    """

    # Format causal effects into a readable string
    effects_str = "\n".join(
        [f"-- {key}: {value}" for key, value in causal_effects.items()]
    )

    # Build the full prompt
    prompt = f"""
    Hey coach! 
    Generate an actionable, grounded {rec_type.upper()} personalized recommendation to improve my health metrics.
    Perform an assesment of my data and suggest actionable plans to improve.
    
    Provide a schedule of activities I should engage in to improve.
    
    - My user profile (age, gender, height, weight, bmi) is : 
    {profile_str}
    - My estimated causal effects are: 
    {effects_str}
    - The summary of my wearables data (NOTE: Higher stress score is better):
    {wearables_summary}
    """

    return prompt


def get_sys_prompt():
    return read()


def update_sys_prompt(sys_prompt):
    return save(sys_prompt)
