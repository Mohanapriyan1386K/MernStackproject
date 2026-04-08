import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  showSerialNumber?: boolean;
  maxHeight?: number;
}

function CustomTable<T extends { _id?: string }>({
  columns,
  data,
  totalCount,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  showSerialNumber = true,
  maxHeight = 400,
}: CustomTableProps<T>) {
  const showPagination =
    typeof onPageChange === "function" &&
    typeof onRowsPerPageChange === "function";

  return (
    <Paper
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      {/* ✅ Scrollable Table Area */}
      <TableContainer
        sx={{
          maxHeight: maxHeight,
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {showSerialNumber && (
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
              )}

              {columns.map((col, i) => (
                <TableCell key={i} sx={{ fontWeight: "bold" }}>
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => {
                const serialNumber = page * rowsPerPage + rowIndex + 1;

                return (
                  <TableRow
                    key={row._id || rowIndex}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#e3f2fd" },
                    }}
                  >
                    {showSerialNumber && (
                      <TableCell>{serialNumber}</TableCell>
                    )}

                    {columns.map((col, colIndex) => {
                      const value =
                        typeof col.key === "string"
                          ? (row as any)[col.key]
                          : row[col.key];

                      return (
                        <TableCell key={colIndex}>
                          {col.render
                            ? col.render(value, row, rowIndex)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showSerialNumber ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Fixed Pagination */}
      {showPagination && (
        <Box sx={{ borderTop: "1px solid #eee" }}>
          <TablePagination
            component="div"
            count={typeof totalCount === "number" ? totalCount : data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => onPageChange?.(newPage)}
            onRowsPerPageChange={(event) =>
              onRowsPerPageChange?.(Number(event.target.value))
            }
            rowsPerPageOptions={[2, 5, 10, 25, 50]}
          />
        </Box>
      )}
    </Paper>
  );
}

export default CustomTable;