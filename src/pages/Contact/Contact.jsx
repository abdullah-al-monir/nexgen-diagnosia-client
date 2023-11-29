import { makeStyles } from "@mui/styles";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const useStyles = makeStyles({
  form: {
    marginTop: "20px",
  },
});

const Contact = () => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    enqueueSnackbar("Thanks for contact us", { variant: "info" });
    e.target.reset();
  };

  return (
    <Box maxWidth="1280px" sx={{ m: "50px auto", p:5 }}>
      <Typography
        variant="h3"
        sx={{ mb: 10, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        Contact Us
      </Typography>
      <Grid sx={{ alignItems: "center", mx:"auto" }} container spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            style={{ width: "75%", mx:"auto" }}
            src="https://omenterprisesgroup.in/wp-content/uploads/2020/06/contact_anim.gif"
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography color= "#082f63" fontWeight="500" variant="h4">
              Send a Message
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              required
            />
            <Button
              sx={{
                my: 3,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
              variant="contained"
              type="submit"
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
