import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

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
}

const BulkActions: React.FC<IProps> = ({
  handleDeleteSelectedCustomerOrders,
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
            Xóa các phản hồi đã chọn
          </ButtonError>
        </Box>
      </Box>
    </>
  );
};

export default BulkActions;
