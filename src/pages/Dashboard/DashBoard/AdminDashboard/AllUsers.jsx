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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGetUsers from "../../../../hooks/useGetUsers";
import BeatLoader from "react-spinners/BeatLoader";
import InfoIcon from "@mui/icons-material/Info";
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
  if (isPending) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader style={{ color: "#082f63" }} />
      </div>
    );
  }
  console.log(users);
  return (
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
                  <Button size="small" style={{ color: "blue" }}>
                    {user.role}
                  </Button>
                ) : (
                  <Button size="small" disabled style={{ color: "orangered" }}>
                    {user.role}
                  </Button>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {user.role === "user" ? (
                  <>
                    {user.status === "active" ? (
                      <Button size="small" style={{ color: "#007200" }}>
                        {user.status}
                      </Button>
                    ) : (
                      <Button size="small" style={{ color: "red" }}>
                        {user.status}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button size="small" disabled style={{ color: "#007200" }}>
                    {user.status}
                  </Button>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Fab
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
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
