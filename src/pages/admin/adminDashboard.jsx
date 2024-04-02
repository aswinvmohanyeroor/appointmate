import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "./adminDashboard.scss";
import Cookies from "js-cookie";
import Links from "../links/links";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [vendors, setVendors] = useState([]);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editedVendorName, setEditedVendorName] = useState("");
  const [editedVendorEmail, setEditedVendorEmail] = useState("");
  const [editedVendorPassword, setEditedVendorPassword] = useState("");
  const [editedVendorCategory, setEditedVendorCategory] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        // password,
        category,
      };
      const response = await axios.post(
        "https://appointmate-njp3.onrender.com/api/admin",
        userData
      );
      console.log(response);
      setName("");
      setEmail("");
      // setPassword("");
      setCategory("");
      setVendors([...vendors, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get("https://appointmate-njp3.onrender.com/api/ventors").then((response) => {
        console.log(response);
        setVendors(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    const userId = Cookies.get("UserId");
    if (userId !== "65f30e24a35308c77cdb18b4") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteVendor = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        await axios.delete(`https://appointmate-njp3.onrender.com/api/ventors/${id}`);
        setVendors(vendors.filter((vendor) => vendor._id !== id));
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const editVendor = async (id) => {
    try {
      const confirmed = window.confirm("New password will be sent to the registered email.");
      if (confirmed) {
        const editedVendorData = {
          name: editedVendorName,
          email: editedVendorEmail,
          password: editedVendorPassword,
          category: editedVendorCategory,
          updatePass: true,
        };
        await axios.put(
          `https://appointmate-njp3.onrender.com/api/ventors/${id}`,
          editedVendorData
        );
        setEditingVendorId(null);
      }
    } catch (error) {
      console.error("Error editing company:", error);
    }
  };

  const startEditingVendor = (id, name, email, password, category) => {
    setEditingVendorId(id);
    setEditedVendorName(name);
    setEditedVendorEmail(email);
    setEditedVendorPassword(password);
    setEditedVendorCategory(category);
  };

  return (
    <div className="admin--dashboard">
      <form className="form--container" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        {/* <TextField
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        /> */}
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
      <div className="table--container">
        <h1>Teachers</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                {/* <TableCell>Password</TableCell> */}
                <TableCell>Phone</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => (
                <TableRow key={vendor._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      style={{ width: 50, borderRadius: "50%" }}
                      src={vendor.image}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    {editingVendorId === vendor._id ? (
                      <TextField
                        value={editedVendorName}
                        onChange={(e) => setEditedVendorName(e.target.value)}
                      />
                    ) : (
                      vendor.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingVendorId === vendor._id ? (
                      <TextField
                        value={editedVendorEmail}
                        onChange={(e) => setEditedVendorEmail(e.target.value)}
                      />
                    ) : (
                      vendor.email
                    )}
                  </TableCell>
                  {/* <TableCell>
                    {editingVendorId === vendor._id ? (
                      <TextField
                        value={editedVendorPassword}
                        onChange={(e) =>
                          setEditedVendorPassword(e.target.value)
                        }
                      />
                    ) : (
                      vendor.password
                    )}
                  </TableCell> */}
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>
                    {(editingVendorId === vendor._id && vendor.category !== "admin") ? (
                      <FormControl>
                        <Select
                          value={editedVendorCategory}
                          onChange={(e) =>
                            setEditedVendorCategory(e.target.value)
                          }
                        >
                          <MenuItem value="Teacher">Teacher</MenuItem>
                          <MenuItem value="Staff">Staff</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      vendor.category
                    )}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {vendor.description}
                  </TableCell>
                  <TableCell>
                    {editingVendorId === vendor._id ? (
                      <div className="spacing">
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ color: "white" }}
                          onClick={() => editVendor(vendor._id)}
                        >
                          Save
                        </Button>

                        <Button
                          variant="contained"
                          onClick={() => setEditingVendorId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 5 }}>
                        <Button
                          variant="contained"
                          color="error"
                          disabled={vendor.category === "admin"}
                          onClick={() => deleteVendor(vendor._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() =>
                            startEditingVendor(
                              vendor._id,
                              vendor.name,
                              vendor.email,
                              vendor.password,
                              vendor.category
                            )
                          }
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />
      <div className="table--container">
        <h1>Appointments</h1>
        <Links isAdmin={true} />
      </div>
    </div>
  );
};

export default AdminDashboard;
