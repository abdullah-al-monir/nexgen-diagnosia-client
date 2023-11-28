import { Grid, Container, Pagination, Typography } from "@mui/material";
import useTests from "../../hooks/useTests";
import TestCard from "../../components/DashboardList/TestCard";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const AllTests = () => {
  const presentDate = dayjs();
  const axiosPublic = useAxiosPublic();
  const [date, setDate] = useState(presentDate);
  const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
  const [page, setPage] = useState(1);
  const [cleared, setCleared] = useState(false);
  const {
    data: tests = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["tests", date],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests?date=${formattedDate}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  const testsPerPage = 9;
  const handleChangePage = (event, newPage) => {
    refetch();
    setPage(newPage);
  };

  const initialIndex = (page - 1) * testsPerPage;
  const totalPage = page * testsPerPage;
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
  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="h3"
        sx={{ mt: 5, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        All Tests
      </Typography>
      <Grid sx={{ mr: "auto", my: 5, width: "50%" }}>
        <Typography variant="h6">Filter by Date</Typography>
        <DatePicker
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
          minDate={dayjs()}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.30)",
            borderRadius: 2,
            border: "1px solid transparent",
            width: "350px",
          }}
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </Grid>
      <Grid container spacing={2}>
        {tests.slice(initialIndex, totalPage).map((test, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <TestCard test={test} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(tests.length / testsPerPage)}
          page={page}
          onChange={handleChangePage}
          size="large"
          shape="rounded"
          sx={{ mt: 2, alignItems: "center", justify: "center" }}
          variant="outline"
        />
      </Grid>
    </Container>
  );
};

export default AllTests;
