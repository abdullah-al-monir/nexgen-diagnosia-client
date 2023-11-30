import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import BeatLoader from "react-spinners/BeatLoader";
const UserAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: appointments = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["appointments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments?email=${user?.email}`);
      return res.data;
    },
  });
  const handleCancel = (id) => {
    axiosSecure.delete(`/appointments/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        enqueueSnackbar(`Appointment cancelled successfully`, {
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
      <Typography variant="h3" sx={{ my: 5, color: "#082f63" }} align="center">
        Upcoming Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right" sx={{ pr: 4 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.testName}</TableCell>
                <TableCell align="center">
                  {dayjs(appointment.date).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {dayjs(appointment.date).format("HH:mm")}
                </TableCell>
                <TableCell align="center">
                  {appointment.status === "pending" ? (
                    <Button
                      disabled
                      size="small"
                      variant="contained"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#082f63",
                          color: "orange",
                        },
                      }}
                    >
                      Pending
                    </Button>
                  ) : (
                    <Button
                      disabled
                      size="small"
                      variant="contained"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#082f63",
                          color: "#75E7B6",
                        },
                      }}
                    >
                      Delivered
                    </Button>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleCancel(appointment._id)}
                    sx={{
                      color: "red",
                      borderColor: "red",
                      "&:hover": {
                        borderColor: "darkred",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserAppointments;
