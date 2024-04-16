import { useRoutes } from "react-router-dom";
import router from "./routers/router";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { CssBaseline } from "@mui/material";
import { enUS } from "date-fns/locale";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  const content = useRoutes(router);

  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
}

export default App;
