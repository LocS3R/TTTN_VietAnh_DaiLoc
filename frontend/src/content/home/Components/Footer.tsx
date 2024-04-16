import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import imgUrl from "../../../assets/logo.svg";

const logoStyle = {
  width: "60px",
  height: "auto",
  marginLeft: "10px",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="http://capnuocthanhhoa.vn/">
        {" "}
        Công ty Cổ phần cấp nước Thanh Hóa&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img src={imgUrl} style={logoStyle} alt="logo of sitemark" />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Bản tin
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Đăng ký nhận bản tin của chúng tôi
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Địa chỉ email của bạn"
                inputProps={{
                  autocomplete: "off",
                  ariaLabel: "Enter your email address",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ flexShrink: 0 }}
              >
                Đăng ký
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={700}>
            Hoạt động
          </Typography>
          <Link color="text.secondary" href="#">
            Đảng
          </Link>
          <Link color="text.secondary" href="#">
            Công đoàn
          </Link>
          <Link color="text.secondary" href="#">
            Đoàn thanh niên
          </Link>
          <Link color="text.secondary" href="#">
            Sản xuất kinh doanh
          </Link>
          <Link color="text.secondary" href="#">
            Văn hóa - Thể thao
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={700}>
            Văn bản pháp quy
          </Typography>
          <Link color="text.secondary" href="#">
            Đầu tư - Xây dựng
          </Link>
          <Link color="text.secondary" href="#">
            Kỹ thuật - Môi trường
          </Link>
          <Link color="text.secondary" href="#">
            Lao động - Tiền lương
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Điều lệ, Quy chế
          </Typography>
          <Link color="text.secondary" href="#">
            Đổi mới doanh nghiệp
          </Link>
          <Link color="text.secondary" href="#">
            Công bố thông tin định kỳ
          </Link>
          <Link color="text.secondary" href="#">
            Công bố thông tin bất thường
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 2, sm: 4 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
          <Link display="block" color="text.secondary">
            Số điện thoại: 0373.852.966
          </Link>
          <Link display="block" color="text.secondary">
            Email: cnth@capnuocth.vn - Website: www.capnuocth.vn
          </Link>
          <Link display="block" color="text.secondary">
            Địa chỉ: 99 - Mật Sơn - Đông Vệ - Thanh Hóa
          </Link>
        </div>
      </Box>
    </Container>
  );
}
