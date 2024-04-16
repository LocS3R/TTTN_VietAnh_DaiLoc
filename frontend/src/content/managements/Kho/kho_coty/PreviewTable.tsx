import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState, MouseEvent, ChangeEvent } from "react";

interface IProps {
  previewData: never[];
  openDrag: boolean;
  handleCloseDrag: () => void;
  handleSubmit: () => void;
}
const PreviewTable: React.FC<IProps> = ({
  previewData,
  openDrag,
  handleCloseDrag,
  handleSubmit,
}) => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Dialog
        open={openDrag}
        onClose={handleCloseDrag}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">{"Xem trước"}</DialogTitle>

        <DialogContent>
          {previewData.length > 0 ? (
            <Grid item xs={12}>
              <Card>
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(previewData[0]).map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {previewData.map((data, index) => (
                        <TableRow key={index}>
                          {Object.keys(data).map((key) => (
                            <TableCell key={key}>{data[key]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box p={2}>
                  <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </Card>
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDrag}>Hủy</Button>
          <Button onClick={handleSubmit} autoFocus>
            Nhập kho
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PreviewTable;
