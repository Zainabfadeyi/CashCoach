// import React, { useState } from 'react';
// import AddCategory from '../component/category/AddCategory';
// import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
// import { LuEqual } from 'react-icons/lu';
// import styles from '../../styles/category.module.css';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   const colors = ['#FFB6C1', '#B0E0E6', '#98FB98', '#FFD700', '#FF6347']; 

//   const handleAddCategory = (newCategory) => {
//     setCategories([...categories, newCategory]);
//   };

//   const getColor = (index) => colors[index % colors.length];

//   const incomeCategories = categories.filter(category => category.type === 'income');
//   const expenseCategories = categories.filter(category => category.type === 'expenses');

//   return (
//     <div className={styles.Categories}>
//       <div>
//         <AddCategory onAddCategory={handleAddCategory} />
//       </div>
//       <div style={{width:"75%"}}>
      
//       <div className={styles.IncExp}>
//         <div style={{ fontSize: '25px', marginBottom: '15px' }}>Income Categories</div>
//         {incomeCategories.map((category, index) => (
//           <div key={`income-${index}`} style={{ width: '100%' }}>
//             <div className={styles.IncExpCon}>
//               <div style={{ fontSize: '27px', color: '#c5c5c5', fontWeight: '700' }}>
//                 <LuEqual />
//               </div>
//               <div style={{ display: 'flex', width: '100%', alignItems: 'center', columnGap: '10px' }}>
//                 <div style={{ backgroundColor: getColor(index), height: '35px', padding: '15px', borderRadius: '15px', marginTop: '7px' }}>
//                   &nbsp;
//                 </div>
//                 <div className={styles.names}>
//                   <div style={{ color: '#c5c5c5', fontWeight: '500' }}>
//                     {category.name}
//                   </div>
//                   <div className={styles.icon}>
//                     <div
//                       style={{
//                         backgroundColor: '#E1E1F9',
//                         padding: '0px 10px 5px 10px',
//                         color: '#4C48DD',
//                       }}
//                     >
//                       <MdOutlineEdit />
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: '#FCECEC',
//                         padding: '0px 10px 5px 10px',
//                         color: '#DC3C4C',
//                       }}
//                     >
//                       <MdOutlineDelete />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ border: '1px solid #f5f5f5', width: '100%', marginTop: '10px', marginBottom: '10px' }}></div>
//           </div>
//         ))}
//         </div>

//         <div className={styles.IncExp}> 
        
//         <div style={{ fontSize: '25px', marginBottom: '15px'}}>Expense Categories</div>
//         {expenseCategories.map((category, index) => (
//           <div key={`expense-${index}`} style={{ width: '100%' }}>
//             <div className={styles.IncExpCon}>
//               <div style={{ fontSize: '27px', color: '#c5c5c5', fontWeight: '700' }}>
//                 <LuEqual />
//               </div>
//               <div style={{ display: 'flex', width: '100%', alignItems: 'center', columnGap: '10px' }}>
//                 <div style={{ backgroundColor: getColor(index), height: '35px', padding: '15px', borderRadius: '15px', marginTop: '7px' }}>
//                   &nbsp;
//                 </div>
//                 <div className={styles.names}>
//                   <div style={{ color: '#c5c5c5', fontWeight: '500' }}>
//                     {category.name}
//                   </div>
//                   <div className={styles.icon}>
//                     <div
//                       style={{
//                         backgroundColor: '#E1E1F9',
//                         padding: '0px 10px 5px 10px',
//                         color: '#4C48DD',
//                       }}
//                     >
//                       <MdOutlineEdit />
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: '#FCECEC',
//                         padding: '0px 10px 5px 10px',
//                         color: '#DC3C4C',
//                       }}
//                     >
//                       <MdOutlineDelete />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ border: '1px solid #f5f5f5', width: '100%', marginTop: '10px', marginBottom: '10px' }}></div>
//           </div>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useState } from 'react';
import AddCategory from '../component/category/AddCategory';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { LuEqual } from 'react-icons/lu';
import styles from '../../styles/category.module.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Define separate color arrays for income and expense categories
  const incomeColors = ['#FFB6C1', '#FF1493', '#FFFF00', '#DB7093',  '#AFEEEE','#FF7F50', '#00BFFF', '#FFE4B5','#FF4500', '#FFD700', '#FFA07A','#4682B4',  '#FFDAB9', '#FFDEAD', '#F0E68C'];
  const expenseColors = [
    '#FF69B4', // Pink
    '#FF6347', // Tomato
    '#FFA07A', // Light Salmon
    '#FF4500', // Orange Red
    '#FFD700', // Gold
    '#DAA520', // Goldenrod
    '#CD5C5C', // Indian Red
    '#F4A460', // Sandy Brown
    '#8B4513', // Saddle Brown
    '#D2691E', // Chocolate
    '#BC8F8F', // Rosy Brown
    '#A52A2A', // Brown
    '#FF8C00', // Dark Orange
    '#B22222', // Firebrick
    '#D2B48C'  // Tan
  ];
  

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // Function to get the color based on the index and type of category
  const getColor = (index, type) => {
    if (type === 'income') {
      return incomeColors[index % incomeColors.length];
    }
    return expenseColors[index % expenseColors.length];
  };

  // Filter categories by type
  const incomeCategories = categories.filter(category => category.type === 'income');
  const expenseCategories = categories.filter(category => category.type === 'expenses');

  return (
    <div className={styles.Categories}>
      <div style={{width:"30%"}}>
        <AddCategory onAddCategory={handleAddCategory} />
      </div>
      <div style={{ width: '70%' }}>
        <div className={styles.IncExp}>
          <div style={{ fontSize: '20px', marginBottom: '15px' }}>Income Categories</div>
          {incomeCategories.map((category, index) => (
            <div key={`income-${index}`} style={{ width: '100%' }}>
              <div className={styles.IncExpCon}>
                <div style={{ fontSize: '27px', color: '#c5c5c5', fontWeight: '700' }}>
                  <LuEqual />
                </div>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', columnGap: '10px' }}>
                  <div style={{ backgroundColor: getColor(index, 'income'), height: '35px', padding: '15px', borderRadius: '15px', marginTop: '7px' }}>
                    &nbsp;
                  </div>
                  <div className={styles.names}>
                    <div style={{ color: '#c5c5c5', fontWeight: '500' }}>
                      {category.name}
                    </div>
                    <div className={styles.icon}>
                      <div style={{ backgroundColor: '#E1E1F9', padding: '0px 10px 5px 10px', color: '#4C48DD' }}>
                        <MdOutlineEdit />
                      </div>
                      <div style={{ backgroundColor: '#FCECEC', padding: '0px 10px 5px 10px', color: '#DC3C4C' }}>
                        <MdOutlineDelete />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ border: '1px solid #f5f5f5', width: '100%', marginTop: '10px', marginBottom: '10px' }}></div>
            </div>
          ))}
        </div>

        <div className={styles.IncExp}>
          <div style={{ fontSize: '20px', marginBottom: '15px' }}>Expense Categories</div>
          {expenseCategories.map((category, index) => (
            <div key={`expense-${index}`} style={{ width: '100%' }}>
              <div className={styles.IncExpCon}>
                <div style={{ fontSize: '27px', color: '#c5c5c5', fontWeight: '700' }}>
                  <LuEqual />
                </div>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', columnGap: '10px' }}>
                  <div style={{ backgroundColor: getColor(index, 'expenses'), height: '35px', padding: '15px', borderRadius: '15px', marginTop: '7px' }}>
                    &nbsp;
                  </div>
                  <div className={styles.names}>
                    <div style={{ color: '#c5c5c5', fontWeight: '500' }}>
                      {category.name}
                    </div>
                    <div className={styles.icon}>
                      <div style={{ backgroundColor: '#E1E1F9', padding: '0px 10px 5px 10px', color: '#4C48DD' }}>
                        <MdOutlineEdit />
                      </div>
                      <div style={{ backgroundColor: '#FCECEC', padding: '0px 10px 5px 10px', color: '#DC3C4C' }}>
                        <MdOutlineDelete />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ border: '1px solid #f5f5f5', width: '100%', marginTop: '10px', marginBottom: '10px' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

