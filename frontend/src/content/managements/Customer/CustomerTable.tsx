import React, { FC, ChangeEvent, useState } from "react";
import PropTypes from "prop-types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  useTheme,
  CardHeader,
  SelectChangeEvent,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  CustomerOrder,
  CustomerWithWaterMeterStatus,
} from "../../../types/customer_order";
import Label from "../../../components/Label";
import BulkActions from "./BulkActions";
import CustomerService from "../../../services/CustomerService";
import DialogCreateCustomer from "./dialog/DialogCreateCustomer";
// import DialogEditCustomer from "./dialog/DialogEditCustomer";
// import WrapperDialog from "./dialog/WrapperDialog";
import { NavLink, Outlet } from "react-router-dom";

interface RecentOrdersTableProps {
  className?: string;
  customerOrders: CustomerOrder[];
  updateCustomerOrders: (updatedOrders: CustomerOrder[]) => void;
}

interface Filters {
  status?: CustomerWithWaterMeterStatus;
}

const getStatusLabel = (
  customerOrderStatus: CustomerWithWaterMeterStatus
): JSX.Element => {
  const map = {
    failed: {
      text: "Chưa lắp đặt",
      color: "error",
    },
    completed: {
      text: "Đã lắp đặt",
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

const applyFilters = (
  customerOrder: CustomerOrder[],
  filters: Filters
): CustomerOrder[] => {
  return customerOrder.filter((customerOrder) => {
    let matches = true;
    const customerStatus = customerOrder.waterMeterId ? "completed" : "failed";

    if (filters.status && customerStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CustomerOrder[],
  page: number,
  limit: number
): CustomerOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const CustomerTable: FC<RecentOrdersTableProps> = ({
  customerOrders,
  updateCustomerOrders,
}) => {
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<
    string[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectedBulkActions = selectedCustomerOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });
  const [sortBy, setSortBy] = useState<string>(""); // Track column to sort
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Track sort order
  const [open, setOpen] = useState<boolean>(false);
  // const [customerOrderInfo, setCustomerOrderInfo] =
  //   useState<CustomerOrder | null>(null);
  // const [openE, setOpenE] = useState<boolean>(false);
  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "Đã lắp đặt",
    },
    {
      id: "pending",
      name: "Đang lắp đặt",
    },
    {
      id: "failed",
      name: "Chưa lắp đặt",
    },
  ];

  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    let value: CustomerWithWaterMeterStatus | undefined = undefined;

    if (e.target.value !== "all") {
      value = e.target.value as CustomerWithWaterMeterStatus;
    }
    setFilters((prevFilters) => ({
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
        ? customerOrders.map((customerOder) => "" + customerOder.id)
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

  const filteredCustomerOrders = customerOrders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhoneNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.readBook.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCustomerOrders = [...filteredCustomerOrders].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy as keyof CustomerOrder]! <
        b[sortBy as keyof CustomerOrder]!
        ? -1
        : 1;
    } else {
      return a[sortBy as keyof CustomerOrder]! >
        b[sortBy as keyof CustomerOrder]!
        ? -1
        : 1;
    }
  });

  const filteredCryptoOrders = applyFilters(sortedCustomerOrders, filters);

  const paginatedCustomerOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCustomerOrders.length > 0 &&
    selectedCustomerOrders.length < customerOrders.length;
  const selectedAllCryptoOrders =
    selectedCustomerOrders.length === customerOrders.length;
  const theme = useTheme();
  const handleDeleteSelectedCustomerOrders = async (): Promise<void> => {
    try {
      // Lặp qua danh sách các đơn hàng được chọn và gọi phương thức xóa
      await Promise.all(
        selectedCustomerOrders.map(async (id) => {
          await CustomerService.deleteCustomer(id);
        })
      );

      // Cập nhật danh sách đơn hàng sau khi đã xóa
      const updatedCustomerOrders = customerOrders.filter(
        (order) => !selectedCustomerOrders.includes("" + order.id)
      );

      // Cập nhật danh sách các đơn hàng được chọn
      setSelectedCustomerOrders([]);

      // Cập nhật giao diện người dùng
      updateCustomerOrders(updatedCustomerOrders);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            handleDeleteSelectedCustomerOrders={
              handleDeleteSelectedCustomerOrders
            }
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Danh sách khách hàng"
        />
      )}
      <Divider />

      <Box m={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <DialogCreateCustomer
            open={open}
            setOpen={setOpen}
            updateCustomerOrders={updateCustomerOrders}
            // customerOrderInfo={customerOrderInfo}
            // setCustomerOrderInfo={setCustomerOrderInfo}
          />
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: "500px" }}
            />
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setOpen(true)}
            >
              Tạo mới khách hàng
            </Button>
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
              <TableCell
                onClick={() => handleSort("customerName")}
                sx={{ cursor: "pointer" }}
              >
                Tên khách hàng
              </TableCell>
              <TableCell
                onClick={() => handleSort("customerAddress")}
                sx={{ cursor: "pointer" }}
              >
                Địa chỉ
              </TableCell>
              <TableCell
                onClick={() => handleSort("customerPhoneNumber")}
                sx={{ cursor: "pointer" }}
              >
                Số điện thoại
              </TableCell>
              <TableCell
                align="right"
                onClick={() => handleSort("readBook")}
                sx={{ cursor: "pointer" }}
              >
                Sổ đọc
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Trạng thái lắp đặt
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          {paginatedCustomerOrders.length > 0 ? (
            <TableBody sx={{ overflowY: "scroll" }}>
              {paginatedCustomerOrders.map((customerOrder) => {
                const isCryptoOrderSelected = selectedCustomerOrders.includes(
                  "" + customerOrder.id
                );
                const handleDeleteCustomerOrder = async (
                  id: string | number
                ): Promise<void> => {
                  try {
                    // Gọi phương thức xóa từ Service
                    await CustomerService.deleteCustomer(id);
                    console.log("Delete success");

                    // Cập nhật giao diện người dùng
                    const updatedCustomerOrders = customerOrders.filter(
                      (order) => order.id !== id
                    );
                    setSelectedCustomerOrders((prevSelected) =>
                      prevSelected.filter((selectedId) => selectedId !== id)
                    );
                    updateCustomerOrders(updatedCustomerOrders);
                  } catch (err) {
                    console.log(err);
                  }
                };
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
                        {customerOrder.customerName}
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
                        {customerOrder.customerAddress}
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
                        {customerOrder.customerPhoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customerOrder.readBook}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {customerOrder.waterMeterId
                        ? getStatusLabel("completed")
                        : getStatusLabel("failed")}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Order" arrow>
                        <Button
                          disableRipple
                          component={NavLink}
                          to={`/managements/customer/edit/${customerOrder.id}`}
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
                            // onClick={() => editCustomerOrder(customerOrder)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete Order" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.error.lighter,
                            },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() =>
                            handleDeleteCustomerOrder(customerOrder.id!)
                          }
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>Empty</TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
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

CustomerTable.propTypes = {
  customerOrders: PropTypes.array.isRequired,
};

CustomerTable.defaultProps = {
  customerOrders: [],
};

export default CustomerTable;
