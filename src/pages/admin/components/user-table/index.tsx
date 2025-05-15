import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useUserTable } from './hooks';

interface User {
  name: string;
  email: string;
  address: string;
}

interface Props {
  data: User[];
}

function globalFilterFn(row: any, _columnId: string, filterValue: string) {
  return ['name', 'email', 'address'].some((key) => {
    const value = row.getValue(key);
    return String(value).toLowerCase().includes(filterValue.toLowerCase());
  });
}

const UserTable: React.FC<Props> = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const { data: userTableData = [], isLoading } = useUserTable();

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: info => info.getValue(),
    },
  ], []);

  const table = useReactTable({
    data: userTableData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={styles.wrapper}>
      <h3>User Table</h3>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search name, email, or address"
        style={styles.input}
      />
      <table style={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={styles.th}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 6,
    width: 250,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 10,
  },
  th: {
    border: '1px solid #ccc',
    padding: 8,
    backgroundColor: '#f8f8f8',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ccc',
    padding: 8,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
};
