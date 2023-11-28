import {
  Typography,
  IconButton,
  DialogContent,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";
const UserDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: 2,
  },
  "& .MuiDialogActions-root": {
    padding: 1,
  },
}));
export default function CustomizedDialogs({ userEmail, open, setOpen }) {
  const axiosSecure = useAxiosSecure();
  console.log(userEmail);
  const { data: userData = [], isPending } = useQuery({
    queryKey: ["userData", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${userEmail}`);
      return res.data;
    },
  });
  const {
    photoURL,
    district,
    upazila,
    division,
    bloodGroup,
    name,
    email,
    status,
  } = userData;
  const handleClose = () => {
    setOpen(false);
  };
  if (isPending) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
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
    <>
      <UserDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          Profile Info
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ m: 5, mt: 0 }} dividers>
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <img src={photoURL} style={{ height: "100px" }} />
          </Box>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Blood Group:</strong> {bloodGroup}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {upazila},{district},{division}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {status}
          </Typography>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </UserDialog>
    </>
  );
}
