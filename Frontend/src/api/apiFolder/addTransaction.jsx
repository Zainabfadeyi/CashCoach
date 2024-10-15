import axios from "../axios";
import { useSelector } from "../hook";

export const useAddTransaction = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.user.id);
  
    const addTransaction = async (transactionData) => {
      try {
        const apiUrl = `/transactions/`; // Adjust this URL based on your backend
        const response = await axios.post(apiUrl, transactionData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; // Return the response data (new transaction)
      } catch (error) {
        console.error("Error adding transaction:", error);
        throw error; // Rethrow the error for further handling
      }
    };
  
    return { addTransaction };
  };