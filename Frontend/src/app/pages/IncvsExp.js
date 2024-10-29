import React, { useState, useEffect } from 'react';
import axios from '../../api/axios'; // Use axios to fetch API data
import OverallBar from '../component/analytics/OverallBar';
import styles from '../../styles/account.module.css';
import { SiDailydotdev } from 'react-icons/si';
import { MdOutlineDirectionsTransit } from 'react-icons/md';
import { TbTransformPointTopRight } from 'react-icons/tb';
import { CiExport } from 'react-icons/ci';
import { useSelector } from '../../api/hook';
import TanStackTable from '../component/mainpage/TanStackTable';
import LoadingSpinner from '../component/LoadingSpinner';
import { useFetchTransactions } from '../../api/apiFolder/tableApi';
import DownloadIncxExp from '../component/tables/DownloadIncxExp';

const IncvsExp = () => {
  const [overviewData, setOverviewData] = useState({
    daily_average: 0,
    total_categories: 0,
    total_transactions: 0,
  });
  const { AllTransactions } = useFetchTransactions();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);
  const [data, setData] = useState([]);



  const getData = async () => {
    try {
      const transactions = await AllTransactions(); 
      setData(transactions); 
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };
  useEffect(() => {
  getData();
}, []);
  // Fetch the API data
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get(`analytics-overview/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        setOverviewData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) {
    return <div> <LoadingSpinner message="Loading All data..." /></div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }


  return (
    <div>
      <div className={styles.TopContainer} style={{marginBottom:"10px"}}>
        <div className={styles.first}>
          <div className={styles.Analytics}>
            <div className={styles.icon} style={{ backgroundColor: "#2F2CD8" }}>
              <SiDailydotdev />
            </div>
            <div>
              <div>Daily Average</div>
              <h3 style={{ color: "#1F2C73", fontWeight: "500", lineHeight: "1.6", marginTop: "0" }}>
                ${overviewData.daily_average}
              </h3>
            </div>
          </div>
        </div>

        <div className={styles.first}>
          <div className={styles.Analytics}>
            <div className={styles.icon} style={{ backgroundColor: "#12A347" }}>
              <MdOutlineDirectionsTransit />
            </div>
            <div>
              <div>Total Transactions</div>
              <h3 style={{ color: "#1F2C73", fontWeight: "500", lineHeight: "1.6", marginTop: "0" }}>
                {overviewData.total_transactions}
              </h3>
            </div>
          </div>
        </div>

        <div className={styles.first}>
          <div className={styles.Analytics}>
            <div className={styles.icon} style={{ backgroundColor: "#DC2626" }}>
              <TbTransformPointTopRight />
            </div>
            <div>
              <div>Categories</div>
              <h3 style={{ color: "#1F2C73", fontWeight: "500", lineHeight: "1.6", marginTop: "0" }}>
                {overviewData.total_categories}
              </h3>
            </div>
          </div>
        </div>

        <div className={styles.second}>
          <div className={styles.section}>
            <div className={styles.plus}>
            <DownloadIncxExp data={data} fileName={"All Transactions"} />
            </div>
            <div style={{ fontWeight: '700' }}>Export Data</div>
          </div>
        </div>
      </div>

      <OverallBar />

      <div style={{width:"100%", marginTop:"20px"}}>
        <TanStackTable/>
        </div>   
    </div>
  );
};

export default IncvsExp;
