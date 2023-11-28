import { makeStyles } from "@mui/styles";
import { Grid, Typography, Box, Paper } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    height : "100%",
    "&:not(:last-child)": {
      marginBottom: 6,
    },
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "48px",
    height: "48px",
    marginBottom: 7,
    color: "greenyellow",
    backgroundColor: "#082f63",
    borderRadius: "50%",
  },
}));

const BlogCard = ({ card }) => {
  const classes = useStyles();
  const { title, description, author } = card;
  return (
    <Grid item xs={12} lg={6}>
      <Paper elevation={3} className={classes.paper}>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box className={classes.iconWrapper}>
            <AutoAwesomeIcon sx={{ fontSize: "30px" }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            {author}
          </Typography>
        </Grid>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default BlogCard;
