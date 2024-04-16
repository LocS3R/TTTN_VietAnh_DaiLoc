import React from "react";
import {
  Box,
  CssBaseline,
  Divider,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import getLPTheme from "../../theme/getLPTheme";
import AppAppBar from "./Components/AppAppBar";
// import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../../contexts/AuthProvider";
// import TopContent from "./Components/TopContent";
import CardSlider from "./Components/CardSlider";
import Services from "./Components/Services";
import Intro from "./Components/Intro";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Pricing from "./Components/Pricing";
import FAQ from "./Components/FAQ";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Home: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const { user } = useAuth();
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });
  // const { user, isLoggedIn } = useAuth();
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {user?.roles.includes("ROLE_ADMIN") && <Navigate to={"/dash"} />}
      <AuthProvider>
        <ThemeProvider theme={LPtheme}>
          <CssBaseline />
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          {/* <img src="http://capnuocthanhhoa.vn/img/banner.png" alt="" /> */}
          <Box sx={{ bgcolor: "background.default" }} justifyContent={"center"}>
            <Hero />
            {/* <TopContent /> */}
            <Intro />
            <Divider />
            <CardSlider />
            <Divider />
            <Services />
            <Divider />
            <Pricing />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default Home;
