import {
  Autocomplete,
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
import { CustomerOrder } from "../../../../types/customer_order";
import WaterMeterService from "../../../../services/WaterMeterService";
import { IWaterMeter } from "../../../../types/IWaterMeter";
import CustomerService from "../../../../services/CustomerService";

interface IProps {
  openE: boolean;
  setOpenE: React.Dispatch<React.SetStateAction<boolean>>;
  customerOrderInfo: CustomerOrder;
  // setCustomerOrderInfo: React.Dispatch<
  //   React.SetStateAction<CustomerOrder | null>
  // >;
  updateCustomerOrders: (updatedOrders: CustomerOrder[]) => void;
}

const DialogEditCustomer: React.FC<IProps> = ({
  openE,
  setOpenE,
  customerOrderInfo,
  // setCustomerOrderInfo,
  updateCustomerOrders,
}) => {
  console.log(customerOrderInfo);
  const CNTTValue: { [key: string]: string } = {
    CNBS: "Chi nhánh Bỉm Sơn",
    CNNTPTH: "Chi nhánh Nam Thành Phố Thanh Hóa",
    CNBTPTH: "Chi nhánh Bắc Thành Phố Thanh Hóa",
  };
  // const [openD, setOpenD] = useState(open);
  const [CNTT, setCNTT] = useState<string>(
    CNTTValue[customerOrderInfo.customerId.split("_")[0]]
  );
  const [cusId, setCusId] = useState<string>(customerOrderInfo.customerId);
  const [cusName, setCusName] = useState<string>(
    customerOrderInfo.customerName
  );
  const [cusPhoneNumber, setCusPhoneNumber] = useState<string>(
    customerOrderInfo.customerPhoneNumber
  );
  const [cusAddress, setCusAddress] = useState<string>(
    customerOrderInfo.customerAddress
  );
  const [cusReadBook, setCusReadBook] = useState<string>(
    customerOrderInfo.readBook
  );
  const [listSerial, setListSerial] = useState<string[]>([]);
  const [currentSerial, setCurrentSerial] = useState<string | null>("");
  const [currentWaterMeter, setCurrentWaterMeter] =
    useState<IWaterMeter | null>(null);

  // const [];
  console.log(currentSerial);
  useEffect(() => {
    const getListSerial = async () => {
      const list = await WaterMeterService.getAllSerialsUnused();
      if (list) {
        setListSerial(list.data.map((item) => item.split("-")[0]));
      }
      if (customerOrderInfo.waterMeterId) {
        const waterMeter = await WaterMeterService.getWaterMeterById(
          customerOrderInfo.waterMeterId!
        );
        if (waterMeter) {
          setCurrentWaterMeter(waterMeter.data);
        }
      }
    };
    getListSerial();
  }, []);
  const resetInput = () => {
    setCusName("");
    setCusPhoneNumber("");
    setCusAddress("");
    setCNTT("");
    // setCustomerOrderInfo(null);
  };
  const getCurrentWaterMeter = async (serial: string) => {
    const waterMeter = await WaterMeterService.getWaterMetersBySerial(serial);
    if (waterMeter) {
      console.log(waterMeter.data);
      setCurrentWaterMeter(waterMeter.data);
    }
  };
  const handleClose = () => {
    // onClose(selectedValue);
    setOpenE(false);
    resetInput();
  };
  // console.log(open);
  const handleChange = (event: SelectChangeEvent) => {
    setCNTT(event.target.value as string);
    if (event.target.value !== customerOrderInfo.customerId.split("_")[0]) {
      setCusId(
        `${event.target.value}_${customerOrderInfo.customerId.split("_")[1]}`
      );
      setCusReadBook(
        `${event.target.value}_${customerOrderInfo.readBook.split("_")[1]}`
      );
    }
  };

  const handleSerialChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    console.log(event);
    console.log(newValue);
    setCurrentSerial(newValue);
    if (newValue !== null) {
      getCurrentWaterMeter(newValue);
    }
  };

  const handleSubmit = async () => {
    if (
      cusName.trim().length === 0 ||
      cusPhoneNumber.trim().length === 0 ||
      cusAddress.trim().length === 0
    ) {
      return;
    }

    const reqObj: CustomerOrder = {
      customerId: cusId,
      customerName: cusName,
      customerPhoneNumber: cusPhoneNumber,
      customerAddress: cusAddress,
      readBook: cusReadBook,
      waterMeter: currentWaterMeter,
    };
    // console.log(reqObj.waterMeter);

    try {
      const response = await CustomerService.createCustomers(reqObj);
      console.log(response);
      // const reqAllObj: CustomerOrder = {
      //   ...response.data,
      //   waterMeterId: "" + currentWaterMeter?.id,
      // };
      setOpenE(false);
      const dataUpdate = await CustomerService.getAllCustomers();
      updateCustomerOrders(dataUpdate.data);
      const today = new Date();
      if (currentWaterMeter) {
        // if(currentWaterMeter.id !== customerOrderInfo.waterMeterId)
        const waterMeterObj: IWaterMeter = {
          wtid: currentWaterMeter!.wtid,
          wtserial: currentWaterMeter!.wtserial,
          usedAt: today,
          isActive: true,
        };
        const responseUpdate = await WaterMeterService.updateWaterMeters(
          "" + currentWaterMeter!.id,
          waterMeterObj
        );
        console.log(responseUpdate);

        // const changeCurrentId = await
      }
      resetInput();
      // window.location.reload();
    } catch (e) {
      console.log(e);
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
                  // value={currentSerial}
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
        <Button onClick={handleSubmit}>Tạo mới khách hàng</Button>
        <Button onClick={handleClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditCustomer;
