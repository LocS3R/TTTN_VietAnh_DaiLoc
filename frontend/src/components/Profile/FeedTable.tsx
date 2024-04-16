import React, { FC, ChangeEvent, useState } from "react";
import PropTypes from "prop-types";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
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
  Grid,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { IFeedBackResponse, feedBackStatus } from "../../types/IFeedBack";
import Label from "../Label";
import FeedBackService from "../../services/FeedBackService";
import BulkActions from "../../content/managements/Customer/BulkActions";

interface RecentOrdersTableProps {
  className?: string;
  listFeedBacks: IFeedBackResponse[];
  updateListFeedBackOrders: (updatedOrders: IFeedBackResponse[]) => void;
}

interface Filters {
  status?: feedBackStatus;
}

const getStatusLabel = (customerOrderStatus: feedBackStatus): JSX.Element => {
  const map = {
    completed: {
      text: "Đã xử lý thành công",
      color: "success",
    },
    pending: {
      text: "Đang chờ xử lý",
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
  listFeedBack: IFeedBackResponse[],
  filters: Filters
): IFeedBackResponse[] => {
  return listFeedBack.filter((listFeed) => {
    let matches = true;
    const customerStatus = listFeed.status;

    if (filters.status && customerStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  listFeedBacks: IFeedBackResponse[],
  page: number,
  limit: number
): IFeedBackResponse[] => {
  return listFeedBacks.slice(page * limit, page * limit + limit);
};

const FeedTable: FC<RecentOrdersTableProps> = ({
  listFeedBacks,
  updateListFeedBackOrders,
}) => {
  const [selectedFeedBackOrders, setSelectedFeedBackOrders] = useState<
    string[]
  >([]);
  const selectedBulkActions = selectedFeedBackOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });
  //   const [open, setOpen] = useState<boolean>(false);
  const statusOptions = [
    {
      id: "all",
      name: "Tất cả",
    },
    {
      id: "completed",
      name: "Đã xử lý",
    },
    {
      id: "pending",
      name: "Đang xử lý",
    },
  ];

  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    let value: feedBackStatus | undefined = undefined;

    if (e.target.value !== "all") {
      value = e.target.value as feedBackStatus;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllFeedBackOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedFeedBackOrders(
      event.target.checked
        ? listFeedBacks.map((listFeed) => "" + listFeed.id)
        : []
    );
  };

  const handleSelectOneFeedBackOrder = (
    event: ChangeEvent<HTMLInputElement>,
    feedBackOrderId: string
  ): void => {
    console.log(event);
    if (!selectedFeedBackOrders.includes(feedBackOrderId)) {
      setSelectedFeedBackOrders((prevSelected) => [
        ...prevSelected,
        feedBackOrderId,
      ]);
    } else {
      setSelectedFeedBackOrders((prevSelected) =>
        prevSelected.filter((id) => id !== feedBackOrderId)
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

  const filteredFeedBackOrders = applyFilters(listFeedBacks, filters);

  const paginatedFeedBackOrders = applyPagination(
    filteredFeedBackOrders,
    page,
    limit
  );
  const selectedSomeFeedBackOrders =
    selectedFeedBackOrders.length > 0 &&
    selectedFeedBackOrders.length < listFeedBacks.length;
  const selectedAllCryptoOrders =
    setSelectedFeedBackOrders.length === listFeedBacks.length;
  const theme = useTheme();
  const handleDeleteSelectedFeedBackOrders = async (): Promise<void> => {
    try {
      // Lặp qua danh sách các đơn hàng được chọn và gọi phương thức xóa
      await Promise.all(
        selectedFeedBackOrders.map(async (id) => {
          await FeedBackService.deleteFeedBack(id);
        })
      );

      // Cập nhật danh sách đơn hàng sau khi đã xóa
      const updatedFeedBackOrders = listFeedBacks.filter(
        (order) => !selectedFeedBackOrders.includes("" + order.id)
      );

      // Cập nhật danh sách các đơn hàng được chọn
      setSelectedFeedBackOrders([]);

      // Cập nhật giao diện người dùng
      updateListFeedBackOrders(updatedFeedBackOrders);
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
              handleDeleteSelectedFeedBackOrders
            }
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Trang thai"
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
          //   title="Danh sách khách hàng"
        />
      )}

      <Divider />
      <Box m={2}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        ></Grid>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeFeedBackOrders}
                  onChange={handleSelectAllFeedBackOrders}
                />
              </TableCell>
              <TableCell sx={{ cursor: "pointer" }}>#</TableCell>
              <TableCell sx={{ cursor: "pointer" }}>Mô tả</TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Trạng thái
              </TableCell>
              <TableCell align="right" sx={{ cursor: "pointer" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          {paginatedFeedBackOrders.length > 0 ? (
            <TableBody>
              {paginatedFeedBackOrders.map((feedBackOrder) => {
                const isFeedBackOrderSelected = selectedFeedBackOrders.includes(
                  "" + feedBackOrder.id
                );
                const handleDeleteFeedBackOrder = async (
                  id: string | number
                ): Promise<void> => {
                  try {
                    // Gọi phương thức xóa từ Service
                    await FeedBackService.deleteFeedBack("" + id);
                    console.log("Delete success");

                    // Cập nhật giao diện người dùng
                    const updatedFeedBackOrders = listFeedBacks.filter(
                      (order) => order.id !== id
                    );
                    setSelectedFeedBackOrders((prevSelected) =>
                      prevSelected.filter((selectedId) => selectedId !== id)
                    );
                    updateListFeedBackOrders(updatedFeedBackOrders);
                  } catch (err) {
                    console.log(err);
                  }
                };
                return (
                  <TableRow
                    hover
                    key={feedBackOrder.id}
                    selected={isFeedBackOrderSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isFeedBackOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneFeedBackOrder(
                            event,
                            "" + feedBackOrder.id
                          )
                        }
                        value={isFeedBackOrderSelected}
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
                        {feedBackOrder.id}
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
                        {feedBackOrder.details}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      {feedBackOrder.status === "completed"
                        ? getStatusLabel("completed")
                        : getStatusLabel("pending")}
                      {/* {getStatusLabel(feedBackOrder.status)} */}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Hủy phản hồi" arrow>
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
                            handleDeleteFeedBackOrder(feedBackOrder.id!)
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
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                Empty
              </Grid>
            </Grid>
          )}
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredFeedBackOrders.length}
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

FeedTable.propTypes = {
  listFeedBacks: PropTypes.array.isRequired,
};

FeedTable.defaultProps = {
  listFeedBacks: [],
};

export default FeedTable;
