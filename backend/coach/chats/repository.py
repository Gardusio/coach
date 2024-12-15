import json
import os
from datetime import datetime

CHATS_FILE = "data/chats/chats.json"


def load_chats():
    """Load all chats from the JSON file."""
    if not os.path.exists(CHATS_FILE):
        return []
    with open(CHATS_FILE, "r") as file:
        return json.load(file)


def save_chats(chats):
    """Save chats back to the JSON file."""
    with open(CHATS_FILE, "w") as file:
        json.dump(chats, file, indent=4)


def add_chat_message(recId, userId, message, role="user"):
    """Append a message to an existing chat or create a new one."""
    chats = load_chats()

    chat = get_chat_by_recId(recId, chats)

    if not chat:
        # If no existing chat, create a new one
        chat = {
            "id": increment_id(chats),
            "recId": recId,
            "userId": userId,
            "timestamp": datetime.now().isoformat(),
            "messages": [],
        }
        chats.append(chat)

    # Append the new message
    chat["messages"].append({"role": role, "content": message})
    save_chats(chats)


def increment_id(chats):
    return chats[-1]["id"] + 1


def get_chat_by_recId(recId, chats=None):
    """Retrieve a specific chat by recId."""
    if not chats:
        chats = load_chats()
    return next((c for c in chats if c["recId"] == recId), None)
