import { Box, Button } from "@mui/material";

import OutputIcon from "@mui/icons-material/Output";

interface IProps {
  handleTranferSelected: () => void;
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkActionsDKD: React.FC<IProps> = ({
  setOpenDia,
  // handleTranferSelected,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {/* <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            // onClick={handleDeleteSelectedCustomerOrders}
          ></ButtonError> */}
        </Box>
        <Button
          sx={{ ml: 1 }}
          startIcon={<OutputIcon />}
          variant="contained"
          onClick={() => setOpenDia(true)}
        >
          Xuất kho
        </Button>
      </Box>
    </>
  );
};

export default BulkActionsDKD;
