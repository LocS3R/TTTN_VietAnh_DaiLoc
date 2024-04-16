import React, { FC, ChangeEvent, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
  SelectChangeEvent,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { CustomerWithWaterMeterStatus } from "../../../../../types/customer_order";
import Label from "../../../../../components/Label";
// import BulkActions from "./BulkActions";
import BulkActionsDKD from "./BulkActionsDKD";
import { Outlet } from "react-router-dom";
import { nameBrandFilters } from "../../../../../types/IKhoCoty";
import { IKhoCNDH } from "../../../../../types/IKhoCNDH";
import KhoCNDHService from "../../../../../services/KhoCNDHService";

interface RecentOrdersTableProps {
  className?: string;
  dataTables: IKhoCNDH[];
  updateDataTable: (updatedOrders: IKhoCNDH[]) => void;
  // handleClickOpen: () => void;
}

interface brandFilters {
  status?: nameBrandFilters;
}
const getStatusLabel = (
  customerOrderStatus: CustomerWithWaterMeterStatus
): JSX.Element => {
  const map = {
    failed: {
      text: "Chưa kiểm định",
      color: "error",
    },
    completed: {
      text: "Đã kiểm định",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: { text: string; color: string } =
    map[customerOrderStatus];

  return (
    <Label
      color={
        color as
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning"
          | "black"
          | undefined
      }
    >
      {text}
    </Label>
  );
};

const applyBrandFilters = (
  dataTable: IKhoCNDH[],
  filters: brandFilters
): IKhoCNDH[] => {
  return dataTable.filter((customerOrder) => {
    let matches = true;
    const customerStatus = customerOrder.wtid.substring(0, 3).toUpperCase();

    if (filters.status && customerStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: IKhoCNDH[],
  page: number,
  limit: number
): IKhoCNDH[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const MDKDDataTable: FC<RecentOrdersTableProps> = ({
  dataTables,
  updateDataTable,
  // handleClickOpen,
}) => {
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<
    string[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectedBulkActions = selectedCustomerOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [filters, setFilters] = useState<Filters>({
  //   status: undefined,
  // });
  const [brandFilters, setBrandFilters] = useState<brandFilters>({
    status: undefined,
  });
  const [sortBy, setSortBy] = useState<string>(""); // Track column to sort
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Track sort order
  const brandFiltersOption = [
    {
      id: "all",
      name: "Tất cả",
    },
    {
      id: "BAY",
      name: "Bay lan",
    },
    {
      id: "ZEN",
      name: "Zenner",
    },
    {
      id: "ACT",
      name: "Actaris",
    },
    {
      id: "ACT.C",
      name: "Actaris cap C",
    },
    {
      id: "BLU",
      name: "Blue Metter",
    },
  ];
  const handleBrandChange = (e: SelectChangeEvent<string>): void => {
    let value: nameBrandFilters | undefined = undefined;

    if (e.target.value !== "all") {
      value = e.target.value as nameBrandFilters;
    }
    setBrandFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCustomerOrders(
      event.target.checked
        ? dataTables.map((customerOder) => "" + customerOder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    console.log(event);
    if (!selectedCustomerOrders.includes(cryptoOrderId)) {
      setSelectedCustomerOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCustomerOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ): void => {
    console.log(event);
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredCustomerOrders = dataTables.filter(
    (order) =>
      order.result?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.groupCheck?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.result?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.wtid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCustomerOrders = [...filteredCustomerOrders].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy as keyof IKhoCNDH]! < b[sortBy as keyof IKhoCNDH]!
        ? -1
        : 1;
    } else {
      return a[sortBy as keyof IKhoCNDH]! > b[sortBy as keyof IKhoCNDH]!
        ? -1
        : 1;
    }
  });

  // const filteredCryptoOrders = applyFilters(sortedCustomerOrders, filters);
  const fileredBrand = applyBrandFilters(sortedCustomerOrders, brandFilters);
  const paginatedCustomerOrders = applyPagination(fileredBrand, page, limit);
  const selectedSomeCryptoOrders =
    selectedCustomerOrders.length > 0 &&
    selectedCustomerOrders.length < dataTables.length;
  const selectedAllCryptoOrders =
    selectedCustomerOrders.length === dataTables.length;
  // const theme = useTheme();
  //   const handleDeleteSelectedCustomerOrders = async (): Promise<void> => {
  //     try {
  //       // Lặp qua danh sách các đơn hàng được chọn và gọi phương thức xóa
  //       await Promise.all(
  //         selectedCustomerOrders.map(async (id) => {
  //           await KhoCoTyService.deleteKhoCoty(id);
  //         })
  //       );

  //       // Cập nhật danh sách đơn hàng sau khi đã xóa
  //       const updatedDataTable = dataTables.filter(
  //         (order) => !selectedCustomerOrders.includes("" + order.id)
  //       );

  //       // Cập nhật danh sách các đơn hàng được chọn
  //       setSelectedCustomerOrders([]);

  //       // Cập nhật giao diện người dùng
  //       updateDataTable(updatedDataTable);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const handleShipSelectedCustomerOrders = async (): Promise<void> => {
  //     try {
  //       // Lặp qua danh sách các đơn hàng được chọn và gọi phương thức xóa
  //       await KhoCoTyService.moveDataToCNDH(selectedCustomerOrders);

  //       // Cập nhật danh sách đơn hàng sau khi đã xóa
  //       const updatedDataTable = dataTables.filter(
  //         (order) => !selectedCustomerOrders.includes("" + order.id)
  //       );

  //       // Cập nhật danh sách các đơn hàng được chọn
  //       setSelectedCustomerOrders([]);

  //       // Cập nhật giao diện người dùng
  //       updateDataTable(updatedDataTable);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // const handleSuccessSelected = async (): Promise<void> => {
  //   try {
  //     await Promise.all(
  //       selectedCustomerOrders.map(async (id) => {
  //         await KhoCNDHService.updateSuccess(id);
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleFailedSelected = async (): Promise<void> => {
  //   // try {
  //   //   await Promise.all(
  //   //     selectedCustomerOrders.map(async (id) => {
  //   //       await KhoCNDHService.updateSuccess(id);
  //   //     })
  //   //   );
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };
  // const handleReloadSelected = async (): Promise<void> => {
  //   // try {
  //   //   await Promise.all(
  //   //     selectedCustomerOrders.map(async (id) => {
  //   //       await KhoCNDHService.updateSuccess(id);
  //   //     })
  //   //   );
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };
  const [CNTT, setCNTT] = useState<string>();
  const [openDialog, setOpenDialog] = useState(false);
  // const [openDialogOne, setOpenDialogOne] = useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setCNTT(event.target.value as string);
  };
  const handleCloseDia = () => {
    setOpenDialog(false);
  };
  // const handleCloseDiaOne = () => {
  //   setOpenDialogOne(false);
  // };
  const handleTranferSelected = async () => {
    try {
      await KhoCNDHService.moveDataToCNCN(selectedCustomerOrders, "" + CNTT);
      const updatedDataTable = dataTables.filter(
        (order) => !selectedCustomerOrders.includes("" + order.id)
      );
      // Cập nhật danh sách các đơn hàng được chọn
      setSelectedCustomerOrders([]);
      // Cập nhật giao diện người dùng
      updateDataTable(updatedDataTable);
      setOpenDialog(false);
    } catch (err) {
      setOpenDialog(false);
      console.log(err);
    }
  };
  // const handleTranferOneSelected = async (id: string[]) => {
  //   try {
  //     await KhoCNDHService.moveDataToCNCN(id, "" + CNTT);
  //     const updatedDataTable = dataTables.filter(
  //       (order) => !selectedCustomerOrders.includes("" + order.id)
  //     );
  //     // Cập nhật danh sách các đơn hàng được chọn
  //     setSelectedCustomerOrders([]);
  //     // Cập nhật giao diện người dùng
  //     updateDataTable(updatedDataTable);
  //     setOpenDialog(false);
  //   } catch (err) {
  //     setOpenDialog(false);
  //     console.log(err);
  //   }
  // };
  return (
    <Card>
      <Dialog
        // onClose={handleClose}
        open={openDialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Chọn kho nhập
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Chọn kho muốn nhập
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={CNTT}
                  label="Chon chi nhanh truc thuoc"
                  onChange={handleChange}
                >
                  <MenuItem value={"CNBS"}>Chi nhánh cấp nước Bỉm Sơn</MenuItem>
                  <MenuItem value={"CNNTPTH"}>
                    Chi nhánh cấp nước Nam Thành Phố Thanh Hóa
                  </MenuItem>
                  <MenuItem value={"CNBTPTH"}>
                    Chi nhánh cấp nước Bắc Thành Phố Thanh Hóa
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTranferSelected}>Xuất</Button>
          <Button onClick={handleCloseDia}>Hủy</Button>
        </DialogActions>
      </Dialog>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActionsDKD
            setOpenDia={setOpenDialog}
            handleTranferSelected={handleTranferSelected}
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tên hiệu</InputLabel>
                <Select
                  value={brandFilters.status || "all"}
                  onChange={handleBrandChange}
                  label="Tên hiệu"
                  autoWidth
                >
                  {brandFiltersOption.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title=""
        />
      )}
      <Divider />
      <Box m={2}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <TextField
              label="Tìm kiếm"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: "500px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell sx={{ cursor: "pointer" }}>#</TableCell>
              <TableCell
                onClick={() => handleSort("wtid")}
                sx={{ cursor: "pointer" }}
              >
                Mã đồng hồ
              </TableCell>

              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Trạng thái ĐH
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Ngày kiểm định
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Lô kiểm định
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Hiệu lực kiểm định
              </TableCell>
              {/* <TableCell align="center" sx={{ cursor: "pointer" }}>
                Thao tác
              </TableCell> */}
            </TableRow>
          </TableHead>
          {paginatedCustomerOrders.length > 0 ? (
            <TableBody>
              {paginatedCustomerOrders.map((customerOrder, index) => {
                const isCryptoOrderSelected = selectedCustomerOrders.includes(
                  "" + customerOrder.id
                );
                // const handleUpdateSuccess = async (id: string) => {
                //   console.log("update :" + id);
                //   try {
                //     // Lặp qua danh sách các đơn hàng được chọn và gọi phương thức xóa
                //     await KhoCNDHService.updateSuccess(id);

                //     // Cập nhật danh sách đơn hàng sau khi đã xóa
                //     const updatedDataTable = dataTables.filter(
                //       (order) => !selectedCustomerOrders.includes("" + order.id)
                //     );

                //     // Cập nhật danh sách các đơn hàng được chọn
                //     setSelectedCustomerOrders([]);

                //     // Cập nhật giao diện người dùng
                //     updateDataTable(updatedDataTable);
                //   } catch (err) {
                //     console.log(err);
                //   }
                // };
                return (
                  <TableRow
                    hover
                    key={customerOrder.id}
                    selected={isCryptoOrderSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneCryptoOrder(
                            event,
                            "" + customerOrder.id
                          )
                        }
                        value={isCryptoOrderSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customerOrder.wtid}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel("completed")}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {/* {"CNDH_" + customerOrder.status} */}
                        {customerOrder.dateToCheck
                          ? customerOrder.dateToCheck.toLocaleString()
                          : "chua ro"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customerOrder.groupCheck}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customerOrder.expCheck
                          ? customerOrder.expCheck.toLocaleString()
                          : "chua ro"}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="center">
                      <Tooltip title="Xuất lẻ" arrow>
                        <Button
                          disableRipple
                          // component={NavLink}
                          // to={`/managements/customer/edit/${customerOrder.id}`}
                        >
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.primary.lighter,
                              },
                              color: theme.palette.primary.main,
                            }}
                            color="inherit"
                            size="small"
                            // onClick={() =>
                            //   handleShipOneCustomerOrders([customerOrder.id!])
                            // }
                          >
                            <OutputIcon fontSize="small" />
                          </IconButton>
                        </Button>
                      </Tooltip>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody></TableBody>
          )}
        </Table>
      </TableContainer>
      {paginatedCustomerOrders.length <= 0 && (
        <Box p={2} textAlign={"center"}>
          Không có dữ liệu
        </Box>
      )}
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCustomerOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Outlet />
    </Card>
  );
};

MDKDDataTable.propTypes = {
  dataTables: PropTypes.array.isRequired,
};

MDKDDataTable.defaultProps = {
  dataTables: [],
};

export default MDKDDataTable;
