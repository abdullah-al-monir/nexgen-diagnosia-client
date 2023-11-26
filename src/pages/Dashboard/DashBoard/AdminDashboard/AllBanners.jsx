import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useBanners from "../../../../hooks/useBanners";
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
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
const AllBanners = () => {
  const axiosSecure = useAxiosSecure();
  const [banners, refetch, isPending] = useBanners();
  const handleActiveBanner = (id) => {
    axiosSecure.patch(`/banner/${id}`).then((res) => {
      console.log(id);
      console.log(res.data);
      refetch();
      if (res.data.modifiedCount) {
        console.log("well done");
      }
    });
  };
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
  console.log(banners.map((b) => b.isActive));
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
        Homepage Banners
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#75E7B6" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Shortline</TableCell>
              <TableCell align="center">Coupon</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow
                key={banner._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {banner.title}
                </TableCell>
                <TableCell align="left">{banner.text}</TableCell>
                <TableCell align="center">{banner.couponCode}</TableCell>
                <TableCell align="center">{banner.discountRate}%</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleActiveBanner(banner._id)}
                    size="small"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#082f63",
                      color: "#75E7B6",
                    }}
                  >
                    {banner.isActive === true ? "Active" : "Inactive"}
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

export default AllBanners;
