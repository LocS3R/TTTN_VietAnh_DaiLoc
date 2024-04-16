import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import OutputIcon from "@mui/icons-material/Output";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface IProps {
  handleDeleteSelectedCustomerOrders: () => Promise<void>;
  handleShipSelectedCustomerOrders: () => void;
}

const BulkActions: React.FC<IProps> = ({
  handleDeleteSelectedCustomerOrders,
  handleShipSelectedCustomerOrders,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleDeleteSelectedCustomerOrders}
          >
            Xóa các dòng đã chọn
          </ButtonError>
        </Box>
        <Button
          sx={{ ml: 1 }}
          startIcon={<OutputIcon />}
          variant="contained"
          onClick={handleShipSelectedCustomerOrders}
        >
          Xuất kho
        </Button>
      </Box>
    </>
  );
};

export default BulkActions;
