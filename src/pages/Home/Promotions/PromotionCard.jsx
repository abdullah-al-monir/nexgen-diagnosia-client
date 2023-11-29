import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const PromotionCard = ({ card }) => {
  const { id, title, description, image, startDate, endDate, like, comment } =
    card;
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "lg",
        padding: "24px",
        margin: "16px",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <CardContent>
        <Grid sx={{ marginBottom: "16px" }}>
          <CardMedia
            component="img"
            src={image}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              marginBottom: "16px",
              height: "300px",
              backgroundColor: "#eee",
            }}
          />
          <Typography
            variant="h6"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" style={{ color: "#888" }}>
            {description}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: "8px" }}
          >
            Starts from <strong>{startDate}</strong> to <strong>{endDate}</strong>
          </Typography>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="Share this post"
              style={{
                padding: "8px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              aria-label="Bookmark this post"
              style={{
                padding: "8px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <BookmarkIcon />
            </IconButton>
          </Grid>
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <Button
              startIcon={<CommentIcon />}
              style={{
                padding: "8px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              {comment}
            </Button>
            <Button
              startIcon={<ThumbUpIcon />}
              style={{
                padding: "8px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              {like}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
