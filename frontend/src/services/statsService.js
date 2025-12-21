const API_URL = 'http://localhost:5000/api';

/**
 * Fetch platform statistics from the backend
 * @returns {Promise<Array>} Array of stats objects
 */
export const fetchStats = async () => {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch stats');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};
