import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const generateRecommendation = async (type, userId) => {
    const response = await axios.get(`${API_BASE_URL}/coach/generate-recommendation`, {
        params: { type, user: userId },
    });
    console.log(response)
    return response.data.recommendation
};

export const fetchPastRecommendations = async () => {
    const response = await axios.get(`${API_BASE_URL}/coach/recommendations`);
    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/profile`);
    return response.data;
};

export const getWearableData = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/wearable`);
    console.log("WEARABLES, ", response)
    return response.data.records;
};

export const getCausalEffects = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/effects`);
    return response.data;
};


export const updateSystemPrompt = async (newPrompt) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/settings/system-prompt`, {
            system_prompt: newPrompt,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating system prompt:", error);
        throw error;
    }
};

export const getSystemPrompt = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/settings/system-prompt`);
        return response.data;
    } catch (error) {
        console.error("Error retrieving system prompt:", error);
        throw error;
    }
};


/**
 * Sends a message to the backend and retrieves the assistant's response.
 * @param {string} message - The user's message.
 * @param {string} recId - The recommendation ID.
 * @returns {Promise<string>} The assistant's response.
 */
export const getAssistantResponse = async (userId, message, recId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chats/chat`, {
            userId,
            message,
            recId,
        });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        return response.data.response;
    } catch (error) {
        console.error("Error fetching assistant response:", error);
        throw error;
    }
};

export const getRecommendationChat = async (recId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/chats/chat/${recId}`);

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching chat for ${recId}:", error);
        throw error;
    }
}
