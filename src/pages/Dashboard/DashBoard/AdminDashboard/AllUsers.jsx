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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGetUsers from "../../../../hooks/useGetUsers";
import BeatLoader from "react-spinners/BeatLoader";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import CustomizedDialogs from "./userModal";

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

  const handleUpdateUser = (id) => {
    console.log(id);
    axiosSecure.patch(`/user-role/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        // Swal.fire({
        //   title: "Confirmed!",
        //   text: "Selected user's role has been updated successfully.",
        //   icon: "success",
        // });
      }
    });
  };
  const handleChangeStatus = (id) => {
    axiosSecure.patch(`/user-status/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        // Swal.fire({
        //   title: "Confirmed!",
        //   text: "Selected user's role has been updated successfully.",
        //   icon: "success",
        // });
      }
    });
  };
  const handleClickOpen = (userEmail) => {
    setSelectedUserEmail(userEmail);
    setOpen(true);
  };
  return (
    <>
      {" "}
      <Typography variant="h3" sx={{ my: 5, color: "#082f63" }} align="center">
        Homepage Banners
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
                        onClick={() => handleUpdateUser(user._id)}
                        size="small"
                        style={{ color: "blue" }}
                      >
                        {user.role}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      size="small"
                      disabled
                      style={{ color: "orangered" }}
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
                            onClick={() => handleChangeStatus(user._id)}
                            size="small"
                            style={{ color: "#007200" }}
                          >
                            {user.status}
                          </Button>{" "}
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unblock User" placement="top">
                          <Button
                            onClick={() => handleChangeStatus(user._id)}
                            size="small"
                            style={{ color: "red" }}
                          >
                            {user.status}
                          </Button>{" "}
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <Button size="small" disabled style={{ color: "#007200" }}>
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
                      onClick={() => handleClickOpen(user.email)}
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
    </>
  );
};

export default AllUsers;
