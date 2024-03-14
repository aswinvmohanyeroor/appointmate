import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import store from "./redux/store/store";
import { MsalProvider } from "@azure/msal-react";
// ----------------------------------------------------------------------

export default function App({ instance }) {
  return (
    <Provider store={store}>
      <MsalProvider instance={instance}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </MsalProvider>
    </Provider>
  );
}
