import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import FeedBackService from "../../services/FeedBackService";
import { IFeedBackRequest, IFeedBackResponse } from "../../types/IFeedBack";
import FeedTable from "./FeedTable";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import CustomerService from "../../services/CustomerService";

// import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

interface IProps {
  cusId: string | number | undefined;
}
const Feed: React.FC<IProps> = ({ cusId }) => {
  const [listFeedBack, setListFeedBack] = useState<IFeedBackResponse[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<string>("");
  const handleClose = () => {
    setOpen(false);
  };
  const updateListFeedBackOrders = (updatedOrders: IFeedBackResponse[]) => {
    setListFeedBack(updatedOrders);
  };

  const getAllFeedBack = async () => {
    if (cusId) {
      const res = await FeedBackService.getAllFeedBack("" + cusId);
      if (res.data) {
        setListFeedBack(res.data);
      }
    }
  };
  useEffect(() => {
    getAllFeedBack();
  }, [cusId]);

  const handleSubmit = async () => {
    // const response = await FeedBackService.createFeedBack
    // const reqObj: IFeedBackRequest = {
    //   details: detail,
    //   status:"pending",
    //   customer:
    // };
    // try {
    console.log("cusId" + cusId);
    const customerR = await CustomerService.getCustomerById("" + cusId);
    if (customerR.data) {
      const reqObj: IFeedBackRequest = {
        details: detail,
        status: "pending",
        customer: customerR.data,
      };
      console.log("submit");
      console.log(reqObj);
      const res = await FeedBackService.createFeedBack(reqObj);
      if (res.data) {
        getAllFeedBack();
        setOpen(false);
        setDetail("");
      }
    }
    // } catch (error) {
    // console.log(error);
    // }
  };
  return (
    <Card sx={{ position: "relative" }}>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle id="alert-dialog-title">
            {"Mô tả vấn đề của bạn"}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Mô tả vấn đề"
              variant="outlined"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmit}>Gửi phản hồi</Button>
          </DialogActions>
        </Dialog>
      )}
      <Box sx={{ position: "absolute", right: 10, top: 10 }}>
        <Button size="small" variant="contained" onClick={() => setOpen(true)}>
          Phản hồi
        </Button>
      </Box>
      <CardHeader title="Danh sách phản hồi" />
      <Divider />
      <FeedTable
        listFeedBacks={listFeedBack}
        updateListFeedBackOrders={updateListFeedBackOrders}
      />
    </Card>
  );
};

export default Feed;
