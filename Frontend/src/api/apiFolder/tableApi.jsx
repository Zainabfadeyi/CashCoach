// tableApi.jsx
import { useSelector } from 'react-redux';
import axios from '../axios';

export const useFetchTransactions = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);

  const fetchTransactions = async () => {
    try {
      const apiUrl = `/transactions/`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  };

  return { fetchTransactions };
};

