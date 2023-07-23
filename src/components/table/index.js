import PropTypes from "prop-types";
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  TableBody,
} from "@mui/material";

export default function Table({ 
  headers, 
  handleChangePage, 
  totalData,
  children,
  withPagination,
  pagination
}) {
  return (
    <TableContainer>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            {headers.map((header, key) => (
              <TableCell key={key}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </MuiTable>
      {withPagination && <Pagination
        count={Math.ceil(totalData / pagination.limit)}
        color="primary"
        shape="rounded"
        sx={{ marginTop: 2 }}
        page={pagination.page}
        onChange={handleChangePage}
      />}
    </TableContainer>
  );
}

Table.defaultProps = {
  headers: ["Header 1", "Header 2", "Header 3"],
  totalData: 0,
  withPagination: false,
  pagination: {
    page: 1,
    limit: 3
  }
};

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func,
  totalData: PropTypes.number,
  withPagination: PropTypes.bool,
  pagination: PropTypes.object,
};
