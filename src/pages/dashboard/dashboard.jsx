import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertBase64(file);
        setImage(base64);
        console.log(base64);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        description,
        phone,
        image,
      };
      const userId = Cookies.get("UserId");
      console.log(userId);
      await axios.put(
        `http://localhost:3001/api/ventors/${userId}`,
        formData
      );
      console.log(formData);
      // Clear the form fields
      setDescription("");
      setPhone("");
      setImage(null);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" className="edit--profile">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Edit Profile
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {image && (
            <img
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
              }}
              src={image}
              alt=""
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={handlePhoneChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Button
              variant="contained"
              component="label"
              sx={{ padding: "15px 20px" }}
              startIcon={
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/50/upload--v1.png"
                  alt="upload--v1"
                />
              }
            >
              Upload Image
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImage}
              />
            </Button>
            <FormHelperText>Select an image file</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ padding: "15px 20px" }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
