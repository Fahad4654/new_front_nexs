import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel, useMediaQuery, useTheme, Box, Card, CardContent, Stack, Typography, Chip } from '@mui/material';

export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any, index?: number) => React.ReactNode;
  responsive?: 'always' | 'tablet' | 'desktop';
}

export interface DataTableProps {
  columns: Column[];
  data: any[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  isMobile?: boolean;
  mobileCardRender?: (row: any, index: number) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  isMobile = false,
  mobileCardRender,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState(columns[0]?.id || '');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const column = columns.find(col => col.id === property);
    if (!column?.sortable) return;

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === 'boolean') {
      return order === 'asc' ? (aValue ? 1 : -1) : (aValue ? -1 : 1);
    }
    return 0;
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0 }}>
      {isMobile && mobileCardRender ? (
        // Mobile Card View
        <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ flex: 1, overflowY: 'auto' }}>
          {paginatedData.map((row, index) => (
            <Box key={index}>
              {mobileCardRender(row, index)}
            </Box>
          ))}
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      ) : (
        // Desktop/Tablet Table View
        <>
          <TableContainer component={Paper} sx={{ boxShadow: 2, flex: 1, overflowY: 'auto' }}>
            <Table sx={{ minWidth: isTablet ? 900 : 1200 }}>
              <TableHead sx={{ backgroundColor: 'hsl(211 51% 55%)', position: 'sticky', top: 0, zIndex: 10 }}>
                <TableRow>
                  {columns.map((column) => {
                    const hideOnTablet = column.responsive === 'desktop' && isTablet;
                    if (hideOnTablet) return null;

                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          color: 'hsl(0 0% 100%)',
                          fontWeight: 'bold',
                          fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem', lg: '1rem' },
                        }}
                      >
                        {column.sortable ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={() => handleRequestSort(column.id)}
                            sx={{ color: 'inherit!important' }}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          column.label
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: 'hsl(206 67% 90%)' } }}>
                    {columns.map((column) => {
                      const hideOnTablet = column.responsive === 'desktop' && isTablet;
                      if (hideOnTablet) return null;

                      return (
                        <TableCell
                          key={column.id}
                          sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem', lg: '1rem' } }}
                        >
                          {column.render ? column.render(row[column.id], row, index) : row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default DataTable;