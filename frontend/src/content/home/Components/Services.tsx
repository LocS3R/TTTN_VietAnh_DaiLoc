import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import EditNoteIcon from "@mui/icons-material/EditNote";

const items = [
  {
    icon: <WaterDropIcon />,
    title: "Giá nước",
    description: `Thông báo giá nước sạch áp dụng từ ngày 01/08/2018`,
  },
  {
    icon: <CalendarMonthIcon />,
    title: "Lịch tạm dừng cấp nước",
    description: "Thông báo lịch tạm dừng cấp nước",
  },
  {
    icon: <EditNoteIcon />,
    title: "Thủ tục lắp đặt mới",
    description:
      "Quy trình thực hiện thay thế đồng hồ định kỳ và Thủ tục lắp đặt mới đồng hồ nước",
  },
  {
    icon: <MiscellaneousServicesIcon />,
    title: "Dịch vụ công",
    description: "Dịch vụ công",
  },
  {
    icon: <HeadsetMicIcon />,
    title: "Đường dây nóng",
    description: "Đường dây nóng 0373.852.966",
  },
  {
    icon: <ContactSupportIcon />,
    title: "Hỏi đáp",
    description: "Mọi thắc mắc liên hệ cho đường dây nóng",
  },
];

export default function Services() {
  return (
    <Box
      id="services"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h2">
            Dịch vụ
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
