from CHA import openCHA
from src.CHA.tasks import TaskType

# Define the tasks required for our POC
available_tasks = [
    TaskType.QUERY_USER_PROFILE,  # Custom task for fetching user profile
    TaskType.QUERY_WEARABLES_DATA,  # Custom task for fetching wearables data
    TaskType.COMPUTE_CAUSAL_EFFECTS,  # Custom task for fetching causal effects
]

# Prefix prompts
response_generator_prefix_prompt = (
    "You are a professional fitness and wellbeing coach."
    "Your goal is to provide extremely personalized, actionable and grounded recommendations on fitness and wellbeing."
    "You are going to ground your recommendation in personal user data"
    "User data contains:"
    "\nStatic user profile (age, gender..),"
    "\nAn array of wearables measures, it's lenght is variable (from 30 days and more)"
    "\nA personal causal model for the user in the form of an array of METRIC -> ESTIMATED EFFECT ON OTHER METRIC"
    "\nAn example is [(sleep_duration, stress_score, -3), (very_active_minutes, positive_affect, 3) ...]"
    "Using the following user data, generate personal DAILY recommendation for today:\n"
    "Include: \n"
    "1. A primary focus area for the day.\n"
    "2. Supporting suggestions for improving fitness and mental wellbeing.\n"
    "3. Specific advice tailored to the user's profile, wearables data, and causal effects.\n\n"
    "4. Explanations of your suggestions, grounded in user data.\n\n"
    "User Profile: {user_profile}\n"
    "Wearables Data: {wearables_data}\n"
    "Causal Effects: {causal_effects}\n\n"
    "Recommendations:\n"
)

planner_prefix = (
    "First, query the data sources (profile, wearables, and causal effects). "
    "Then analyze briefly the retrieve data and make a mental model of the user fitness and wellbeing state and profile."
    "Then, generate daily recommendations based on the retrieved information."
)

# OpenCHA instance
cha = openCHA()

# Example query
user_query = "Generate my daily fitness and wellbeing recommendations."

# Run openCHA pipeline
response = cha.run(
    planner_prefix + user_query,
    available_tasks=available_tasks,
    response_generator_prefix_prompt=response_generator_prefix_prompt,
)

# Print response
print("\n------\n" + response + "\n------\n")
