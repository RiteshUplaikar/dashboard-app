import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useStoreTable } from './hooks';

interface Store {
  name: string;
  email: string;
  address: string;
  rating: number;
}

function fuzzyFilter(row: any, _columnId: string, filterValue: string) {
  return ['name', 'email', 'address'].some((key) => {
    const value = row.getValue(key);
    return String(value).toLowerCase().includes(filterValue.toLowerCase());
  });
}

const StoreTable: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<any[]>([]);
  const { data: storeTableData = [], isLoading } = useStoreTable(); // ✅ default to empty array

  const columns = useMemo<ColumnDef<Store>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: info => info.getValue(),
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: info => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: info => info.getValue(),
      enableSorting: true,
    },
  ], []);

  const table = useReactTable({
    data: storeTableData,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return <div style={styles.wrapper}>Loading store data...</div>;
  }

  return (
    <div style={styles.wrapper}>
      <h3>Store Table</h3>
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
                <th
                  key={header.id}
                  style={styles.th}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {({
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null)}
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
    cursor: 'pointer',
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

export default StoreTable;
