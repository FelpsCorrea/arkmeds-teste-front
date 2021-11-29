import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const calculateRangePageButton = (data) => {
  const range = [];

  var atualIndex = 0;
  while(atualIndex<data.length-1){
    if(atualIndex==0){
      range.push([atualIndex, atualIndex+10]);
      atualIndex += 10;
    }
    if(atualIndex+10>data.length-1){
      range.push([atualIndex, data.length-1]);
      atualIndex += 10;
    }
    else{
      range.push([atualIndex, atualIndex+10]);
      atualIndex += 10;
    }
  }
  return range;
};

const TableFooter = ({ range, setPage, page, slice, atualPageButton, setPageButton}) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage, atualPageButton, setPageButton]);

  var pagesButtons;

  if(range.length > 10){
    pagesButtons = calculateRangePageButton(range);
  }

  return (
    <div className={styles.tableFooter}>
      {range.length <= 10 ?
          <>
            { 
              range.map((el, index) => (
                <button
                  key={index}
                  className={`${styles.button} ${
                    page === el ? styles.activeButton : styles.inactiveButton
                  }`}
                  onClick={() => setPage(el)}
                >
                  {el}
                </button>
              ))
            }
          </>
          :
          <>
            {
              atualPageButton > 0 ?
              <button
                className={styles.inactiveButton}
                onClick={()=>{setPageButton(atualPageButton-=1);}}
              >{"<<"}</button> 
              : <></>
            }
            {
              range.slice(pagesButtons[atualPageButton][0], pagesButtons[atualPageButton][1]).map((el, index) => (
                <button
                  key={index}
                  className={`${styles.button} ${
                    page === el ? styles.activeButton : styles.inactiveButton
                  }`}
                  onClick={() => setPage(el)}
                >
                  {el}
                </button>
              ))
            }
            {
              atualPageButton < pagesButtons.length-1 ?
              <button
                className={styles.inactiveButton}
                onClick={()=>{
                  setPageButton(atualPageButton+=1);
                }
                }
              >{">>"}</button> 
              : <></>
            }
          </>
      }
    </div>
  );
};

export default TableFooter;
