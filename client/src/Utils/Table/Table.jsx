import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "../../Graphql/Mutations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LOAD_USERS } from "../../Graphql/Queries";
import { useNavigate } from "react-router-dom";

const StickyHeadTable = ({ columns, rows, Edit }) => {
  const [page, setPage] = React.useState(0);
  const nevigation = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(rows);
  const [RowId, setRowId] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUserHandler = (id) => {
    // console.log(id, "id");
    deleteUser({
      variables: {
        id: id,
      },
    });
    setRowId(id);
    const newUserRows = rows.filter((user) => user.id !== id);
    setUsers(newUserRows);
    if (!error) {
      setOpen(true);
    }
  };
  const editUserHandler = (id, row) => {
    nevigation(`add-user/${id}`, { state: { name: "Update User", row: row } });
  };

  const chatHandler = (username, id) => {
    return nevigation("chat", { state: { username: username, id: id } });
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.FirstName}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(users?.length > 0 ? users : rows)
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                          {column.id === "edit" && (
                            <CreateOutlinedIcon
                              color="primary"
                              onClick={() => editUserHandler(row.id, row)}
                            />
                          )}
                          {column.id === "delete" && (
                            <DeleteOutlinedIcon
                              color="primary"
                              onClick={() => deleteUserHandler(row.id)}
                            />
                          )}
                          {column.id === "chat" && (
                            <Button
                              variant="contained"
                              onClick={() => chatHandler(row.firstname, row.id)}
                            >
                              Chat
                            </Button>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"User Deleted!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`User with id ${RowId} deleted`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default StickyHeadTable;
