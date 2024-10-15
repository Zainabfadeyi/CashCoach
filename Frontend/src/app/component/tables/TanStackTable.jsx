// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useState, useEffect } from "react";
// import DebouncedInput from "./DebouncedInput";
// import { CiSearch } from "react-icons/ci";
// import styles from "../../../styles/table.module.css";
// // import { useFetchTransactions } from "../../../api/apiFolder/tableApi";
// import { useSelector } from "../../../api/hook";

// const TanStackTable = () => {
//   const { fetchTransactions } = useFetchTransactions();
//   const columnHelper = createColumnHelper();
//   const userId = useSelector((state) => state.auth.user?.id);

//   const columns = [
//     columnHelper.accessor("transaction_date", { // Adjusted to match API response
//       header: "Transaction Date",
//       cell: (info) => <span>{info.getValue()}</span>,
//     }),
//     columnHelper.accessor("id", { // Adjusted to match API response
//       header: "Transaction ID",
//       cell: (info) => <span>{info.getValue()}</span>,
//     }),
//     columnHelper.accessor("description", {
//       header: "Description",
//       cell: (info) => <span>{info.getValue()}</span>,
//     }),
   
//     columnHelper.accessor("amount", {
//       header: "Amount",
//       cell: (info) => {
//         const value = info.getValue();
//         const amount = parseFloat(value);
//         return <span>${isNaN(amount) ? '0.00' : amount.toFixed(2)}</span>; // Default to '0.00' if NaN
//       },
//     }),
//     columnHelper.accessor("category", {
//       header: "Category",
//       cell: (info) => <span>{info.getValue()}</span>,
//     }),
//     columnHelper.accessor("actions", {
//       header: "Actions",
//       cell: (info) => (
//         <div>
//           <button className={styles.textBlue}>View</button>
//           <button className={styles.textRed}>Delete</button>
//         </div>
//       ),
//     }),
//   ];

//   const [data, setData] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState("");

//   // useEffect(() => {
//   //   const getData = async () => {
//   //     try {
//   //       const transactions = await fetchTransactions(userId); 
//   //       setData(transactions); 
//   //     } catch (error) {
//   //       console.error("Failed to fetch transactions", error);
//   //     }
//   //   };
//   //   getData();
//   // }, []); // Fetch data whenever userId changes

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//     },
//     getFilteredRowModel: getFilteredRowModel(),
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });
//   return (
//     <div className={styles.tableContainer}>
//       <div className={styles.tableHeader}>
//         <div className={styles.searchContainer}>
//           {/* <CiSearch /> */}
//           <DebouncedInput
//             value={globalFilter ?? ""}
//             onChange={(value) => setGlobalFilter(String(value))}
//           />
//         </div>
//       </div>
//       <table className={styles.table}>
//         <thead className={styles.tableHeader}>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} className={styles.tableHeaderCell}>
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length ? (
//             table.getRowModel().rows.map((row, i) => (
//               <tr
//                 key={row.id}
//                 className={
//                   i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
//                 }
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className={styles.tableCell}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr className={styles.noRecordRow}>
//               <td colSpan={columns.length}>No Record Found!</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {/* pagination */}
//       <div className={styles.paginationContainer}>
//         <button
//           onClick={() => {
//             table.previousPage();
//           }}
//           disabled={!table.getCanPreviousPage()}
//           className={styles.paginationButton}
//         >
//           {"<"}
//         </button>
//         <button
//           onClick={() => {
//             table.nextPage();
//           }}
//           disabled={!table.getCanNextPage()}
//           className={styles.paginationButton}
//         >
//           {">"}
//         </button>

//         <span className={styles.pageInfo}>
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className={styles.goToPageContainer}>
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className={styles.pageInput}
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//           className={styles.pageSizeSelect}
//         >
//           {[10, 20, 30, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default TanStackTable;
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DebouncedInput from "./DebouncedInput";
import { CiSearch } from "react-icons/ci";
import styles from "../../../styles/table.module.css";
import { TRANSACTIONS } from "../../data"; // Adjust the import based on your file structure
import ActionsDropdown from "../mainpage/ActionDropdown";

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("transaction_date", {
      header: "Date",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => {
        const value = info.getValue();
        const amount = parseFloat(value);
        return <span>${isNaN(amount) ? '0.00' : amount.toFixed(2)}</span>;
      },
    }),
    columnHelper.accessor("category", {
      header: "Category Name",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("category_type", {
      header: "Category Type",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <ActionsDropdown
        onView={() => handleView(info.row.original)}
        onDelete={() => handleDelete(info.row.original)}
      />
      ),
    }),
  ];
  
  const [data] = useState(TRANSACTIONS);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  
const handleView = (transaction) => {
  console.log('View transaction:', transaction);
};

const handleDelete = (transactionId) => {
  
};

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.searchContainer}>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
          />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHeaderCell}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={
                  i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.noRecordRow}>
              <td colSpan={columns.length}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className={styles.paginationContainer}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={styles.paginationButton}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={styles.paginationButton}
        >
          {">"}
        </button>

        <span className={styles.pageInfo}>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className={styles.goToPageContainer}>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className={styles.pageInput}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className={styles.pageSizeSelect}
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
