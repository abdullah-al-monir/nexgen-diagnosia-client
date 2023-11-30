import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Table,
  TableHead,
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import dayjs from "dayjs";
const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: reports = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["reports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?email=${user?.email}`);
      return res.data;
    },
  });
  const handleReportDownload = (pdf) => {
    window.open(pdf, "_blank");
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
        Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>

              <TableCell align="center">Delivery Date</TableCell>
              <TableCell align="center">Delivery Time</TableCell>
              <TableCell align="center">Price </TableCell>
              <TableCell align="center">Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports?.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.testName}</TableCell>
                <TableCell align="center">
                  {dayjs(report.delivery).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  {dayjs(report.delivery).format("HH:mm")}
                </TableCell>
                <TableCell align="center">{report.price || 50}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleReportDownload(report.pdfUrl)}
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "#082f63",
                      color: "#75E7B6",
                      "&:hover": {
                        backgroundColor: "#75E7B6",
                        color: "#082f63",
                      },
                    }}
                  >
                    Download
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

export default Reports;
