import React from 'react';
import { useTable } from 'react-table';

const Table = ({ columns, data, tableHeader }) => {
  const {
    headerGroups,
    getTableProps,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    }
  )

  return (
    <>
      <table {...getTableProps()}>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table;
