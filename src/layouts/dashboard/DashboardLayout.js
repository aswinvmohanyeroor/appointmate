import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { setData } from "../../redux/slices/userSlice";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const getUser = async () => {
    try {
      const userId = Cookies.get("UserId");
      const response = await axios.get(
        `https://appointmate-njp3.onrender.com/api/ventors/${userId}`
      );
      dispatch(setData(response.data));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    const userId = Cookies.get("UserId");
    if (jwtToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    }
    if (!jwtToken) {
      navigate("/");
    }
    if (userId) {
      getUser();
    } else {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
