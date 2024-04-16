import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Logo from "../../components/Logo";
import { LoadingButton } from "@mui/lab";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  sx?: object;
}

type TProps = IProps &
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "ref"
  >;
function Copyright(props: TProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        By Company
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function LoginPage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { loginUser, isLoggedIn, user } = useAuth();
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const UserRequest = {
      username: String(data.get("username")),
      password: String(data.get("password")),
    };
    try {
      const res = loginUser(UserRequest.username, UserRequest.password);
      res
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          handleOpenDialog();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation();

  return (
    <>
      {isLoggedIn() && user?.roles.includes("ROLE_ADMIN") ? (
        <Navigate to={"/dash"} state={{ from: location }} replace />
      ) ? isLoggedIn() && user?.roles.includes("ROLE_ADMIN"):(
        <Navigate to={"/home"} state={{ from: location }} replace />
      ): (
        <>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Đăng nhập thất bại"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tên đăng nhập hoặc mật khẩu không đúng
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Đã hiểu
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(http://capnuocth.vn/wp-content/uploads/2015/12/DSC_0015.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "#1976D2",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Logo />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Tên đăng nhập"
                    name="username"
                    // autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button> */}
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    loadingPosition="start"
                    loadingIndicator="Logging......"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {!loading && <span>Đăng nhập</span>}
                  </LoadingButton>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
