import React from 'react'
import styles from '../../../styles/account.module.css'

const Footer = () => {
  return (
    <div className={styles.Footer}>
        <div className={styles.footerContainer}>
           <div style={{fontWeight:"600"}}>Summary</div> 
            <div className={styles.summary}>
                <div style={{display:"flex", columnGap:"10px"}}>
                <div className={styles.footerFirst}>
                    Transaction
                   <div  style={{fontSize:'22px', fontWeight:"600"}}>69</div> 
                </div>
                <div className={styles.line}></div>
                </div>
                <div style={{display:"flex", columnGap:"10px"}}>
                <div className={styles.footerFirst}>
                    Total spent 
                   <div style={{fontSize:'22px', fontWeight:"600"}}>340k</div> 
                </div>
                <div className={styles.line}></div>
                </div>
                <div style={{display:"flex", columnGap:"10px"}}>
                <div className={styles.footerFirst}>
                    Total Earned
                   <div  style={{fontSize:'22px', fontWeight:"600"}}>165k</div> 
                </div>
                <div className={styles.line}></div>
                </div>
                <div style={{display:"flex", marginRight:"15px"}}>
                <div className={styles.footerFirst}>
                    Budget
                    <div  style={{fontSize:'22px', fontWeight:"600"}}>71%</div>
                </div>
                </div>
            </div>
        
        <div>
            
        </div>
        </div>
        <div>
            <div className={styles.upgrade}>
                <div className={styles.planned}>
                Enjoy deeper insights and advanced features with PRO
                </div>
                <div className={styles.upgradePlan}>
                Upgrade to a higher plan
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer