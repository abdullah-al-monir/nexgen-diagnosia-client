import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import { enqueueSnackbar } from "notistack";
import useTests from "../../../../hooks/useTests";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
const AllTestsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [tests, refetch, isPending] = useTests();
  const handleDeleteTest = (id) => {
    axiosSecure.delete(`/test/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        enqueueSnackbar(`Test deleted successfully`, {
          variant: "success",
          autoHideDuration: 1500,
        });
      }
    });
  };
  if (isPending) {
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader style={{ color: "#082f63" }} />
    </div>;
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      {" "}
      <Typography variant="h3" sx={{ my: 5, color: "#082f63" }} align="center">
        Manage Tests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#75E7B6" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell align="center">Reservations</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test, idx) => (
              <TableRow
                key={test._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {test.testName}
                </TableCell>

                <TableCell align="center">{test.booked}</TableCell>
                <TableCell align="center">{test.date}</TableCell>
                <TableCell align="center">${test.price}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Update test" placement="top">
                    <Button
                      LinkComponent={Link}
                      to={`/dashboard/update/${test._id}`}
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#75E7B6",
                        color: "blue",
                      }}
                    >
                      <Edit />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete test" placement="top">
                    <Button
                      onClick={() => handleDeleteTest(test._id)}
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#75E7B6",
                        color: "red",
                      }}
                    >
                      <Delete />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllTestsAdmin;
