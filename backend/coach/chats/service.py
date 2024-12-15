from coach.llm import prompt_ai
from coach.chats.repository import *
from coach.recommendations.repository import *
from pprint import pprint


def generate_recommendation_answer(user_message, starting_rec_id):

    # json loaded starting recommendation
    recommendation = find_recommendation(starting_rec_id)
    timestamp = recommendation["timestamp"]
    history = get_chat_by_recId(starting_rec_id)

    sys_prompt = f"""
    You are an expert empathetic personal coach on fitness and wellbeing. 
    Your recommendations should drive behavior change and lead towards improvements of user health metrics.
    You outputs scheduled actionable recommendations in this format:
    {{
    "ToT": {{
        "user_assesment": "...", // a performed user assesment based on wearables data
        "rec1": {{ // a first plausible recommendation grounded in user data
            "text": "...",
            "validation": {{ // how much it aligns with scientific knowledge and user data
                "personalization_score": ..., 
                "groundness_score": ..., 
                "personalization_analysis": ...,
                "groundness_analysis": ...,
            }}
        }},
        "rec2": {{...}},
        "rec3": {{...}}, 
        "reasoning": "..." // your reasoning: it lead to the final choice
    }},
    "final_recommendation": {{
        "text": "...", // full text of the final recommendation, it includes a plan of activities.
        "explanation": "...", // a friendly non judgemental explanation for the user
        }}
    }}

    Analyzing user data, you've provided the following recommendation on date {timestamp} to the user:
    {recommendation['ToT']}
    {recommendation['final_recommendation']}
    
    
    You may have already conversated about this recommendation with the user, the following json contains past conversations if any:
    {history}
    
    The user can now query you about this recommendation, it's important you care about user context, preferences and needs.
    Note that you are now talking with the user, so output only normal text.
    """

    assistant_message = prompt_ai(sys_prompt, user_message, temp=0.7)
    return assistant_message


def get_chat_by_rec(rec_id):
    return get_chat_by_recId(int(rec_id))
