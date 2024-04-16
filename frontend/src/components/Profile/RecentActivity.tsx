import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from "@mui/material";

// import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title="Thông tin sử dụng nước trong tháng"
        sx={{ textAlign: "center" }}
      />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <WaterDropIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">
            Tổng số m3 đã sử dụng trong tháng
          </Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                m3
              </Typography>
              <Typography variant="h2">4851293</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AttachMoneyIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Tổng tiền nước tháng này</Typography>
          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                vnd
              </Typography>
              <Typography variant="h2">64.000</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default RecentActivity;
