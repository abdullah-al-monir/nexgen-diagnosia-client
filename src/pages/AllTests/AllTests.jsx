import { Grid, Container, Pagination, Typography } from "@mui/material";
import useTests from "../../hooks/useTests";
import TestCard from "../../components/DashboardList/TestCard";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
const AllTests = () => {
  const [tests, isPending, refetch] = useTests();
  const [page, setPage] = useState(1);
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
        sx={{ my: 5, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        All Tests
      </Typography>
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
