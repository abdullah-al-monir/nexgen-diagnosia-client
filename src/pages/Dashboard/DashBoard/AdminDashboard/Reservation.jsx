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
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import ReportUpload from "../../../../components/ReportUpload/ReportUpload";
import BeatLoader from "react-spinners/BeatLoader";
const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingA, setLoadingA] = useState(false);
  useEffect(() => {
    setLoadingA(true);
    axiosSecure.get(`/appointments`).then((res) => {
      setLoadingA(false);
      setAppointments(res.data);
      window.scrollTo(0, 0);
    });
  }, [axiosSecure]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    if (newValue === "") {
      axiosSecure
        .get(`/appointments`, {
          withCredentials: true,
        })
        .then((res) => {
          setAppointments(res.data);
        });
    } else {
      axiosSecure.get(`/appointments?search=${newValue}`).then((res) => {
        setAppointments(res.data);
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axiosSecure.get(`/appointments?search=${search}`).then((res) => {
      setAppointments(res.data);
    });
  };

  const handleCancel = (id) => {
    axiosSecure.delete(`/appointments/${id}`).then((res) => {
      if (res.data.deletedCount) {
        enqueueSnackbar(`Appointment cancelled successfully`, {
          variant: "success",
          autoHideDuration: 1500,
        });
        const remaining = appointments.filter((m) => m._id !== id);
        setAppointments(remaining);
      }
    });
  };
  if (loadingA) {
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
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Typography variant="h3" sx={{ my: 5, color: "#082f63" }} align="center">
        Reservations
      </Typography>
      <form
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 0px",
        }}
        onSubmit={handleSearch}
      >
        <TextField
          size="small"
          label="Search by Email"
          variant="outlined"
          value={search}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="Submit">
          Search
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Patient Email </TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Report Status</TableCell>
              <TableCell align="center">Report</TableCell>
              <TableCell align="right" sx={{ pr: 4 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments?.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.testName}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell align="center">
                  {dayjs(appointment.date).format("YYYY-MM-DD")}
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
                <TableCell align="center">
                  {appointment.status === "pending" ? (
                    <>
                      <ReportUpload
                        report={{
                          id: appointment._id,
                          testName: appointment.testName,
                          status: appointment.status,
                          email: appointment.email,
                          price: appointment.price,
                        }}
                      />
                    </>
                  ) : (
                    <Button
                      disabled
                      size="small"
                      variant="contained"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#75E7B6",
                          color: "#082f63",
                        },
                      }}
                    >
                      Uploaded
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

export default Reservation;
