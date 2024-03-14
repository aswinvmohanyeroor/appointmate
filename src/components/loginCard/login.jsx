import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and password

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    try {
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
      // Store the token in a cookie
      Cookies.set("jwtToken", token);
      Cookies.set("UserId", userId);

      // Set the token in the axios default headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/ventor"); // or navigate to the desired page after successful login
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

    if (jwtToken) {
      // Set the token in the axios default headers if it exists in the cookie
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input--container">
        <label htmlFor="email">Email</label>
        <input
          className="inner--shadow"
          type="email"
          value={email}
          onChange={handleEmailChange}
          id="email"
        />
      </div>
      <div className="input--container">
        <label htmlFor="password">Password</label>
        <input
          className="inner--shadow"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          id="password"
        />
      </div>
      <div className="error-message">{errorMessage}</div>
      <div>
        <button className="neo--btn" type="submit">
          Login
        </button>
        <div className="vLine--wrapper">
          <div className="vLine"></div>
          <span>OR</span>
          <div className="vLine"></div>
        </div>
        <button className="neo--btn">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </form>
  );
};
