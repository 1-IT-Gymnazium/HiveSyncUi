import { BrowserRouter } from "react-router";
import {
  ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactRoutes from "./routes/Routes";

import theme from "./theme";
import ApiContextProvider from "./context/api/ApiContextProvider";
import DocumentMetaContextProvider from "./context/documentMeta/DocumentMetaContextProvider";
import Alerts from "./components/layout/Alerts";

function App() {
  return (
    <ApiContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <DocumentMetaContextProvider>
            <BrowserRouter>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ReactRoutes />
              </LocalizationProvider>
            </BrowserRouter>
            <Alerts />
          </DocumentMetaContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
