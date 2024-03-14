/* eslint-disable object-shorthand */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
// import { useAdminLoginMutation } from "../../../services/login-service";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3001/api/ventor",
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

      // Store the token in a cookie
      Cookies.set("jwtToken", token);
      Cookies.set("UserId", userId);

      // Set the token in the axios default headers
      // eslint-disable-next-line dot-notation
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/dashboard"); // or navigate to the desired page after successful login
    } catch (error) {
      console.log(error);
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
        style={{ backgroundColor: "#860003", color: "white" }}
      >
        Login
      </LoadingButton>
    </>
  );
}
