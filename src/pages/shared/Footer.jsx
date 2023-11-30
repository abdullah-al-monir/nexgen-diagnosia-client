import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import logo from "/nexgenlogo.png";

function Footer() {
  const axiosPublic = useAxiosPublic();
  const { data: footerDatas = [] } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/footer`);
      return res.data;
    },
  });

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#f0f0f0",
      }}
    >
      <Container component="main">
        {footerDatas.map((footerData) => (
          <Box key={footerData._id}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Box sx={{ display: "flex", mr: 1 }}>
                  <img style={{ height: "30px" }} src={logo} alt="" />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      ml: 1,
                      fontFamily: "monospace",
                      fontWeight: 900,
                      color: "#082f63",
                      textDecoration: "none",
                      fontSize: "20px",
                    }}
                  >
                    {footerData.companyName}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {footerData.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Phone: {footerData.phoneNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Email: {footerData.email}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {footerData.socialMedia.map((social, index) => (
                    <Link
                      key={index}
                      href={social.link}
                      color="inherit"
                      sx={{ mr: 2 }}
                    >
                      {social.name}
                    </Link>
                  ))}
                </Box>
              </Box>
              <Box maxWidth="sm">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "right" }}
                >
                  {footerData.about}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "right", mt: 2 }}
                >
                  {footerData.hoursOfOperation}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mt={3}
            >
              © {new Date().getFullYear()} {footerData.companyName}. All rights
              reserved.
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default Footer;
