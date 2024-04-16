import {
  Autocomplete,
  //   Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { CustomerOrder } from "../../../../types/customer_order";
import CustomerService from "../../../../services/CustomerService";
import WaterMeterService from "../../../../services/WaterMeterService";
import { IWaterMeter } from "../../../../types/IWaterMeter";
import { CustomerOrder } from "../../../../types/customer_order";

const TestDialog: React.FC = () => {
  const { id } = useParams();
  //   console.log(id);
  //   const [customer, setCustomer] = useState<CustomerOrder>({} as CustomerOrder);
  // const CNTTValue: { [key: string]: string } = {
  //   CNBS: "Chi nhánh Bỉm Sơn",
  //   CNNTPTH: "Chi nhánh Nam Thành Phố Thanh Hóa",
  //   CNBTPTH: "Chi nhánh Bắc Thành Phố Thanh Hóa",
  // };

  const [cusName, setCusName] = useState<string>("");
  const [cusPhoneNumber, setCusPhoneNumber] = useState<string>("");
  const [cusAddress, setCusAddress] = useState<string>("");
  const [cusId, setCusId] = useState<string>("");
  const [cusReadBook, setCusReadBook] = useState<string>("");
  const [CNTT, setCNTT] = useState<string>("");
  const [listSerial, setListSerial] = useState<string[]>([]);
  const [currentSerial, setCurrentSerial] = useState<string | null>("");
  const [currentWaterMeter, setCurrentWaterMeter] =
    useState<IWaterMeter | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<CustomerOrder>(
    {} as CustomerOrder
  );
  const [oldWT, setOldWT] = useState<IWaterMeter | null>(null);
  //   const
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const customerObj = await CustomerService.getCustomerById("" + id);
        const listSerials = await WaterMeterService.getAllSerialsUnused();
        if (listSerials.data.length > 0) {
          setListSerial(listSerials.data.map((item) => item.split("-")[0]));
        }
        if (customerObj) {
          setCurrentCustomer(customerObj.data);
          // console.log(customerObj.data.waterMeter?.isActive);
          if (customerObj.data.waterMeterId) {
            const currWaterMeter = await WaterMeterService.getWaterMeterById(
              "" + customerObj.data.waterMeterId
            );
            console.log(currWaterMeter.data);
            if (currWaterMeter) {
              setCurrentWaterMeter(currWaterMeter.data);
              setCurrentSerial(currWaterMeter.data.wtserial);
              setOldWT(currWaterMeter.data);
              console.log(currWaterMeter.data.wtmSerial);
            }
          }
          setCusName(customerObj.data.customerName);
          setCusPhoneNumber(customerObj.data.customerPhoneNumber);
          setCusAddress(customerObj.data.customerAddress);
          setCusId(customerObj.data.customerId);
          setCusReadBook(customerObj.data.readBook);
          setCNTT(customerObj.data.customerId.split("_")[0]);
          console.log(customerObj.data.customerId.split("_")[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCustomer();
  }, [id]);

  const [openE, setOpenE] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpenE(false);
    navigate("/managements/customer");
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCNTT(event.target.value as string);
    setCusId(`${event.target.value}_${cusId.split("_")[1]}`);
    setCusReadBook(`${event.target.value}_${cusReadBook.split("_")[1]}`);
  };
  const updateWaterMeterStatus = async () => {
    const today = new Date();
    if (currentWaterMeter) {
      const waterMeterObj: IWaterMeter = {
        wtid: currentWaterMeter?.wtid,
        wtserial: currentWaterMeter?.wtserial,
        usedAt: today,
        isActive: true,
      };
      const responseUpdate = await WaterMeterService.updateWaterMeters(
        "" + currentWaterMeter.id!,
        waterMeterObj
      );
      console.log(responseUpdate);
    }
  };

  const updateUnactiveWT = async () => {
    // const today = new Date();
    if (oldWT) {
      const waterMeterObj: IWaterMeter = {
        wtid: oldWT?.wtid,
        wtserial: oldWT?.wtserial,
        usedAt: null,
        isActive: false,
      };
      const responseUpdate = await WaterMeterService.updateWaterMeters(
        "" + oldWT.id!,
        waterMeterObj
      );
      console.log(responseUpdate);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("submit on test dialog");
      const updateObj: CustomerOrder = {
        customerId: cusId,
        customerName: cusName,
        customerPhoneNumber: cusPhoneNumber,
        customerAddress: cusAddress,
        readBook: cusReadBook,
        waterMeter: currentWaterMeter,
      };
      await CustomerService.updateCustomer("" + id, updateObj).then(() => {
        if (currentWaterMeter?.id === currentCustomer.waterMeterId) {
          console.log("login success");
        } else {
          updateWaterMeterStatus();
          updateUnactiveWT();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentWaterMeter = async (serial: string) => {
    const waterMeter = await WaterMeterService.getWaterMetersBySerial(serial);
    if (waterMeter) {
      console.log(waterMeter.data);
      setCurrentWaterMeter(waterMeter.data);
    }
  };
  const handleSerialChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    console.log(event);
    console.log(newValue);
    setCurrentSerial(newValue);
    console.log(currentCustomer);
    console.log(currentWaterMeter?.id);
    if (newValue !== null) {
      getCurrentWaterMeter(newValue);
    }
  };

  return (
    <Dialog onClose={handleClose} open={openE} fullWidth={true} maxWidth={"md"}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Tạo khách hàng
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* <Button onClick={handleClickVariant("success","Heee")}>
          Show success snackbar
        </Button> */}
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{ borderRight: "1px solid black", paddingRight: "20px" }}
          >
            <Typography variant="h4" gutterBottom>
              Nhập thông tin khách hàng
            </Typography>
            <Grid container sx={{ marginTop: "10px" }} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Tên khách hàng"
                  variant="outlined"
                  value={cusName}
                  onChange={(e) => setCusName(e.target.value)}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  value={cusPhoneNumber}
                  onChange={(e) => setCusPhoneNumber(e.target.value)}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Địa chỉ"
                  value={cusAddress}
                  onChange={(e) => setCusAddress(e.target.value)}
                  variant="outlined"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Chọn chi nhánh trực thuộc
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={CNTT}
                    label="Chon chi nhanh truc thuoc"
                    onChange={handleChange}
                  >
                    <MenuItem value={"CNBS"}>Chi nhánh Bỉm Sơn</MenuItem>
                    <MenuItem value={"CNNTPTH"}>
                      Chi nhánh Nam Thành Phố Thanh Hóa
                    </MenuItem>
                    <MenuItem value={"CNBTPTH"}>
                      Chi nhánh Bắc Thành Phố Thanh Hóa
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Nhập thông tin đồng hồ lắp đặt
            </Typography>
            <Grid container sx={{ marginTop: "10px" }} spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  value={currentSerial}
                  onChange={handleSerialChange}
                  disablePortal
                  id="combo-box-demo"
                  options={listSerial}
                  sx={{ width: "auto" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn số serial đồng hồ" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Thông tin đồng hồ vừa chọn
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Cập nhật</Button>
        <Button onClick={handleClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestDialog;
