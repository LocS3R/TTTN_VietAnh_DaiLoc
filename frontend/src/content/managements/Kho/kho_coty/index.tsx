import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import uploadImg from "../../../../assets/cloud-upload-regular-240.png";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "./styles.css";
import PreviewTable from "./PreviewTable";
import axios from "axios";
import { IKhoCoty } from "../../../../types/IKhoCoty";
import KhoCotyData from "./KhoCotyData";
import KhoCoTyService from "../../../../services/KhoCotyService";
import { Helmet } from "react-helmet-async";
// import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

const KhoCoTy = () => {
  const [open, setOpen] = React.useState(false);
  const [openDrag, setOpenDrag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<never[]>([]);
  const [dataTable, setDataTable] = useState<IKhoCoty[]>([]);

  const updateDataTable = (updatedOrders: IKhoCoty[]) => {
    setDataTable(updatedOrders);
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    previewFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const getAllKhoCotyData = async () => {
    const response = await KhoCoTyService.getAllKhoCoty();
    if (response.data) {
      setDataTable(response.data);
    }
  };
  useEffect(() => {
    getAllKhoCotyData();
  }, []);

  const previewFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData: never[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      setPreviewData(excelData);
    };
    reader.readAsArrayBuffer(file);
    setOpenDrag(true);
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDrag = () => {
    setOpenDrag(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios
          .post("http://localhost:8080/api/excel/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then(() => {
            setOpenDrag(false);
            setLoading(false);
            getAllKhoCotyData();
          })
          .catch(() => {
            setLoading(false);
          });
        console.log("submit");
        // setOpenDrag(false);
        // console.log(response.data);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };
  //   useEffect(() => {
  //     console.log(isDragActive);
  //   }, [isDragActive]);

  return (
    <>
      <Helmet>
        <title>Kho công ty</title>
      </Helmet>
      {/* <button onClick={handleClickOpen}>Hello</button> */}{" "}
      <Dialog
        open={loading}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
          open={loading}
          // onClick={() => setLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h3" textAlign={"center"} id="alert-dialog-title">
          {"Tải lên file Excel"}
        </DialogTitle>
        <DialogContent>
          <div
            className={`drop-file-input ${isDragActive ? "dragover" : ""}`}
            {...getRootProps()}
          >
            <div className="drop-file-input__label">
              {isDragActive ? (
                "Thả"
              ) : (
                <div>
                  <img src={uploadImg} alt="" />
                  <p>Kéo và thả file vào đây</p>
                  <p>hoặc</p>
                  <p>Click vào đây</p>
                </div>
              )}
            </div>
            <input {...getInputProps()} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      <PreviewTable
        previewData={previewData}
        openDrag={openDrag}
        handleCloseDrag={handleCloseDrag}
        handleSubmit={handleSubmit}
      />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <KhoCotyData
              dataTables={dataTable}
              updateDataTable={updateDataTable}
              handleClickOpen={handleClickOpen}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default KhoCoTy;
