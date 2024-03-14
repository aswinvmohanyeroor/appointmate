import { Login } from "../../components/loginCard/login";
// import { Register } from "../../components/registerCard/register";
import "./home.scss";
// import { useState } from "react";

const Home = () => {
//   const [toggle, setToggle] = useState(true);

//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

  return (
    <div className="home--container">
      <div className="form--container">
        <Login />
      </div>
    </div>
  );
};

export default Home;
