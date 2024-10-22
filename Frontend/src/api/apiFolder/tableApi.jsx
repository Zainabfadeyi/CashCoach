// tableApi.jsx
import { useSelector } from 'react-redux';
import axios from '../axios';

export const useFetchTransactions = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);

  const analyticsTransactions = async () => {
    try {
      const apiUrl = `dashboard/monthly-income-expense/`;
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

  const fetchTransactions = async () => {
    try {
      const apiUrl = `income-transactions/`;
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
  const fetchExpTransactions = async () => {
    try {
      const apiUrl = `expenses-transactions/`;
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


  const AllTransactions = async () => {
    try {
      const apiUrl = `transactions/?user_id=${userId}`;
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
  return { fetchTransactions,AllTransactions, fetchExpTransactions,analyticsTransactions };
};

