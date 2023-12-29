import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Fab,
  Button,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGetUsers from "../../../../hooks/useGetUsers";
import BeatLoader from "react-spinners/BeatLoader";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import CustomizedDialogs from "./userModal";
import { enqueueSnackbar } from "notistack";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#082f63",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#caf0f8",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, isPending, refetch] = useGetUsers();
  const [open, setOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  if (isPending) {
    return (
      <div
        style={{
          height: "100vh",
          widows: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader style={{ color: "#082f63" }} />
      </div>
    );
  }
  const handleUpdateUser = (id, name) => {
    axiosSecure.patch(`/user-role/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        enqueueSnackbar(`${name}'s role has been updated successfully`, {
          variant: "success",
          autoHideDuration: 1500,
        });
      }
    });
  };
  const handleChangeStatus = (id, name) => {
    axiosSecure.patch(`/user-status/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();

        enqueueSnackbar(`${name}'s status has been updated successfully`, {
          variant: "success",
          autoHideDuration: 1500,
        });
      }
    });
  };
  const handleClickOpen = (userEmail) => {
    setSelectedUserEmail(userEmail);
    setOpen(true);
  };
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Typography variant="h3" sx={{ my: 5, color: "#082f63" }} align="center">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="right">See info</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell
                  style={{ textTransform: "uppercase", fontWeight: 600 }}
                  component="th"
                  scope="row"
                >
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.role === "user" ? (
                    <Tooltip title="Make Admin" placement="top">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateUser(user._id, user.name)}
                        size="small"
                        style={{ color: "yellowgreen",backgroundColor: "#082f63" }}
                      >
                        {user.role}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled
                      style={{ color: "orange",backgroundColor: "#082f63" }}
                    >
                      {user.role}
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.role === "user" ? (
                    <>
                      {user.status === "active" ? (
                        <Tooltip title="Block User" placement="top">
                          <Button
                            variant="contained"
                            onClick={() =>
                              handleChangeStatus(user._id, user.name)
                            }
                            size="small"
                            style={{ color: "#75E7B6",backgroundColor: "#082f63" }}
                          >
                            {user.status}
                          </Button>{" "}
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unblock User" placement="top">
                          <Button
                            variant="contained"
                            onClick={() =>
                              handleChangeStatus(user._id, user.name)
                            }
                            size="small"
                            style={{ color: "red",backgroundColor: "#082f63" }}
                          >
                            {user.status}
                          </Button>{" "}
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled
                      style={{ color: "#75E7B6",backgroundColor: "#082f63" }}
                    >
                      {user.status}
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Tooltip
                    title={`View ${user.name.split(" ")[0]}'s profile`}
                    placement="top"
                  >
                    <Fab
                      onClick={() => handleClickOpen(user.email, user.name)}
                      size="small"
                      variant="extended"
                      sx={{
                        boxShadow: "none",
                        color: "#4361ee",
                        backgroundColor: "transparent",
                      }}
                    >
                      <InfoIcon />
                    </Fab>
                  </Tooltip>
                </StyledTableCell>
                <CustomizedDialogs
                  open={open}
                  setOpen={setOpen}
                  userEmail={selectedUserEmail}
                />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllUsers;
