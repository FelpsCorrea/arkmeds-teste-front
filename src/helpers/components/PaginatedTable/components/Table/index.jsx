/** CÓDIGO ADAPTADO DO REPOSITÓRIO https://github.com/FranciscoMendes10866/table_pagination */

import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage, cols}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [atualPageButton, setPageButton] = useState(0);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            {cols.map((col)=>(
              <th className={styles.tableHeader}>{col.label}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              {cols.map((col)=>{
                if(col.accessor3){
                  return(<td className={styles.tableCell}>{el[col.accessor][col.accessor2][col.accessor3]}</td>);
                }
                else if(col.accessor2){
                  return(<td className={styles.tableCell}>{el[col.accessor][col.accessor2]}</td>);
                }
                else{
                  return(<td className={styles.tableCell}>{el[col.accessor]}</td>);
                }
              })
              }
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} atualPageButton={atualPageButton} setPageButton={setPageButton}/>
    </>
  );
};

export default Table;
