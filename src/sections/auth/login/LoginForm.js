/* eslint-disable object-shorthand */
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Alert from '@mui/material/Alert';
// import { useAdminLoginMutation } from "../../../services/login-service";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleClick = async () => {
    try {
      setLoader(true);
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://appointmate-njp3.onrender.com/api/ventor",
        userData
      );
      console.log(response);
      const token = response.data.accessToken;
      const userId = response.data.userData._id;
      console.log(userId);
      console.log(token);
      const userEmail = response.data.userData.email;
      console.log(userEmail);
      Cookies.set("UserEmail", userEmail);
      const userCategory = response.data.userData.category;

      // Store the token in a cookie
      Cookies.set("jwtToken", token);
      Cookies.set("UserId", userId);

      // Set the token in the axios default headers
      // eslint-disable-next-line dot-notation
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoader(false);
      if (userCategory === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard"); // or navigate to the desired page after successful login
      }
      navigate("/dashboard"); // or navigate to the desired page after successful login
    } catch (error) {
      setLoader(false);
      console.log(error);
      setOpenSnack(true);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        loading={loader}
        style={{ backgroundColor: "#860003", color: "white" }}
        loadingIndicator={<CircularProgress style={{ color: "#fff" }} thickness={5} size={26} />}
      >
        Login
      </LoadingButton>

      <div>
        <Snackbar
          open={openSnack}
          autoHideDuration={1000}
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() => setOpenSnack(false)}
          >
            Invalid email or password
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
