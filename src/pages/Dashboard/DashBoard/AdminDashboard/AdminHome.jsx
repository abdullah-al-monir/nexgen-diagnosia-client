import { Grid, Paper, Typography, Box } from "@mui/material";
import useGetUsers from "../../../../hooks/useGetUsers";
import useTests from "../../../../hooks/useTests";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BiotechIcon from "@mui/icons-material/Biotech";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DashBoardBarChart from "../../../../components/DashboardList/DashboardBarChart";
import DashboardPeiChart from "../../../../components/DashboardList/DashboardPeiChart";

const AdminHome = () => {
  const [users] = useGetUsers();
  const [tests] = useTests();
  const revenue = 5000;
  const deliveredReports = 100;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ bgcolor: "#FF5722", color: "white", p: 2 }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" align="center">
                {users.length}
              </Typography>
              <GroupIcon sx={{ fontSize: "50px" }} />
            </Grid>
            <Typography variant="h6" align="center">
              Users
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ bgcolor: "#ff3d00", color: "white", p: 2 }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" align="center">
                {revenue}
              </Typography>
              <AttachMoneyIcon sx={{ fontSize: "50px" }} />
            </Grid>
            <Typography variant="h6" align="center">
              Revenue
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ bgcolor: "#cddc39", color: "white", p: 2 }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" align="center">
                {tests.length}
              </Typography>
              <BiotechIcon sx={{ fontSize: "50px" }} />
            </Grid>
            <Typography variant="h6" align="center" gutterBottom>
              Tests
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ bgcolor: "#9c27b0", color: "white", p: 2 }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" align="center">
                {deliveredReports}
              </Typography>
              <SummarizeIcon sx={{ fontSize: "50px" }} />
            </Grid>
            <Typography variant="h6" align="center" gutterBottom>
              Delivered Reports
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          my: 10,
        }}
      >
        <DashBoardBarChart />
        <DashboardPeiChart />
      </Box>
    </Box>
  );
};

export default AdminHome;
