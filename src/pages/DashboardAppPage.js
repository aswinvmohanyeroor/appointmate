/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

// @mui
import { Grid, Container, Typography } from "@mui/material";
// redux
// import { useDispatch } from "react-redux";
// import { setData } from "../redux/slices/userSlice";

import { AppWidgetSummary } from "../sections/@dashboard/app";
import ExcelReader from "../components/excelAccept/excelPicker";
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const data = useSelector((state) => state.userObject.data);
  // const dispatch = useDispatch();

  // const [userData, setUserData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  // const getDashboard = async () => {
  //   try {
  //     const userId = Cookies.get("UserId");
  //     setIsLoading(true); // Set loading state to true
  //     const response = await axios.get(
  //       `https://appointmate-njp3.onrender.com/api/ventors/${userId}`
  //     );
  //     setUserData(response.data);
  //     dispatch(setData(response.data));
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false); // Set loading state to false
  //   }
  // };
  // useEffect(() => {
  //   const jwtToken = Cookies.get("jwtToken");
  //   const userId = Cookies.get("UserId");
  //   if (jwtToken) {
  //     axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  //   }
  //   if (!jwtToken) {
  //     navigate("/");
  //   }
  //   if (userId) {
  //     getDashboard();
  //   } else {
  //     navigate("/");
  //   }
  //   if (userId === "649dc9759013b48248c6ed54") {
  //     navigate("/admin");
  //   }
  // }, []);
  // function capitalizeString(str) {
  //   const words = str.toLowerCase().split(" ");
  //   const capitalizedWords = words.map(
  //     (word) => word.charAt(0).toUpperCase() + word.slice(1)
  //   );
  //   const capitalizedString = capitalizedWords.join(" ");

  //   return capitalizedString;
  // }

  const data = useSelector((state) => state.useApiData.data);

  return (
    <>
      <Helmet>
        <title> Dashboard | Appointmate </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {data.name && <span>Welcome {data.name} </span>}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Subscribers"
              total={710}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>
        </Grid>
        <Grid item xs={2} sm={6} md={3}>
          <ExcelReader />
        </Grid>
      </Container>
    </>
  );
}
