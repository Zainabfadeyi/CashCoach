import React from "react";
import { FaCloudDownloadAlt, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.mjs";

import styles from "../../../styles/table.module.css";

const DownloadBtn = ({ data = [], fileName }) => {
  const handleDownload = () => {
    const datas = data.length ? data : [];
    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
  };

  return (
    <button className={styles.DownloadBtn} onClick={handleDownload}>
      <FaDownload />
      
    </button>
  );
};

export default DownloadBtn;
