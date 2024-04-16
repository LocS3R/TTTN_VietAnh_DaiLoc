import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import CheckIcon from "@mui/icons-material/Check";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import DangerousIcon from "@mui/icons-material/Dangerous";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);
const ButtonSuccess = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.success.main};
     color: ${theme.palette.success.contrastText};

     &:hover {
        background: ${theme.colors.success.dark};
     }
    `
);
const ButtonWarn = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.warning.main};
     color: ${theme.palette.warning.contrastText};

     &:hover {
        background: ${theme.colors.warning.dark};
     }
    `
);

interface IProps {
  handleSuccessSelected: () => Promise<void>;
  handleFailedSelected: () => Promise<void>;
  handleReloadSelected: () => Promise<void>;
}

const BulkActions: React.FC<IProps> = ({
  handleSuccessSelected,
  handleFailedSelected,
  handleReloadSelected,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="h2">
            Kết quả kiểm đinh:
          </Typography>

          <ButtonSuccess
            sx={{ ml: 1 }}
            startIcon={<CheckIcon />}
            variant="contained"
            onClick={handleSuccessSelected}
          >
            Đạt
          </ButtonSuccess>
        </Box>
        <ButtonError
          sx={{ ml: 1 }}
          startIcon={<DangerousIcon />}
          variant="contained"
          onClick={handleFailedSelected}
        >
          Không đạt
        </ButtonError>
        <ButtonWarn
          sx={{ ml: 1 }}
          startIcon={<SyncProblemIcon />}
          variant="contained"
          onClick={handleReloadSelected}
        >
          Kiểm định lại
        </ButtonWarn>
      </Box>
    </>
  );
};

export default BulkActions;
