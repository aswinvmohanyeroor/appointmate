import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      const response = await axios.post(
        "http://localhost:3001/api/register",
        userData
      );
      setMessage(response.data);
      console.log(firstName, lastName, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input--container">
        <label htmlFor="firstName">Full name</label>
        <input
          className="inner--shadow"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          id="firstName"
        />
      </div>
      <div className="input--container">
        <label htmlFor="lastName">User name</label>
        <input
          className="inner--shadow"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          id="lastName"
        />
      </div>

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
      <span className="error">{message}</span>
      <div>
        <button className="neo--btn" type="submit">
          Sign Up
        </button>
        <div className="vLine--wrapper">
          <div className="vLine"></div>
          <span>OR</span>
          <div className="vLine"></div>
        </div>
        <button className="neo--btn">
          <Link to="/company">login</Link>
        </button>
      </div>
    </form>
  );
};
