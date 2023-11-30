import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import useAppointments from "../../hooks/useAppointments";
import BeatLoader from "react-spinners/BeatLoader";
import dayjs from "dayjs";
const ReportUpload = ({ report }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const presentDate = dayjs();
  const [, isPending, refetch] = useAppointments();
  const { id, testName, status, email,price } = report;
  const onDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await axiosPublic.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setUploadedUrl(response.data.url);
        const postData = {
          id,
          testName,
          status: status === "delivered",
          email,
          pdfUrl: response.data.url,
          delivery: presentDate,
          price
        };

        const postDataResponse = await axiosSecure.post("/reports", postData);
        console.log("Data posted:", postDataResponse.data);
        enqueueSnackbar("Report delivered successfully", {
          variant: "success",
        });
        refetch();
        setUploadStatus("Upload successful");
      } else {
        enqueueSnackbar("Opps! Something went wrong", { variant: "error" });
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      console.error("File upload error:", error);
      enqueueSnackbar("Opps! File is not uploaded", { variant: "error" });
      setUploadStatus("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      ".pdf, image/*, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
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
    <div>
      <div {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Button
          component="span"
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "orange",
            color: "#082f63",
          }}
        >
          Upload Report
        </Button>
      </div>
    </div>
  );
};

export default ReportUpload;
