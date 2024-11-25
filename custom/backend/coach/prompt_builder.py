import logging

logger = logging.getLogger(__name__)


def build_recommendations_prompt(rec_type, profile, causal_effects, wearables_summary):
    """
    Builds a personalized prompt for generating fitness and wellbeing recommendations.

    Args:
    - rec_type (str): Recommendation type (daily, weekly, or monthly).
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
    Generate an actionable, grounded {rec_type.upper()} personalized recommendation to improve stress based on my data (NOTE: Higher stress score is better).
    
    - My user profile (age, gender, height, weight, bmi) is : 
    {profile_str}
    - My estimated causal effects are: 
    {effects_str}
    - The summary of my last 21 days wearable data:
    {wearables_summary}
    """

    logger.info("Prompt successfully built")
    return prompt
