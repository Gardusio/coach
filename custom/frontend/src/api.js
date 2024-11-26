import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

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
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/profile`);
    console.log(response)
    return response.data;
};

export const getWearableData = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/wearable`);
    console.log(response)
    return response.data.records;
};

export const getCausalEffects = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/effects`);
    console.log(response)
    return response.data;
};
