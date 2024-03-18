import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from "axios";
import dayjs from 'dayjs';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Links = ({ isAdmin = false }) => {
  const [application, setApplication] = useState("Offline");
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [room, setRoom] = useState("ME12");
  const [SnackbarShow, setSnackbarShow] = useState(false);

  const handleSelect = (event) => {
    setApplication(event.target.value);
  };
  const handleSelectRoom = (event) => {
    setRoom(event.target.value);
  };

  const handleToggleStatus = (index) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      const itemIndex = updatedFormData.findIndex((obj) => obj._id === index);

      if (itemIndex !== -1) {
        const updatedStatus = !updatedFormData[itemIndex].status;
        updatedFormData[itemIndex].status = updatedStatus;
      }
      return updatedFormData;
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleRemove = async (id) => {

    await axios.post("https://appointmate-njp3.onrender.com/api/deleteAppointment", { id: id }).then((response) => {
      console.log(response);
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        const index = updatedFormData.findIndex((item) => item._id === id);
        if (index !== -1) {
          updatedFormData.splice(index, 1);
        }
        return updatedFormData;
      });
    });

  };

  const handleSave = (id) => {
    console.log(formData);
    //update the appointment
    const data = formData.find((item) => item._id === id);
    console.log(data);
    axios.put("https://appointmate-njp3.onrender.com/api/appointment", data).then((response) => {
      console.log(response);
    });

    setEditingIndex(-1);
  };

  const tutor = Cookies.get("UserEmail");
  const [loading, setLoading] = useState(false);

  //set initial data
  const getAppointments = async () => {
    try {
      setLoading(true);
      axios.post(
        "https://appointmate-njp3.onrender.com/api/getAppointments", { tutor: tutor, admin: isAdmin }
      ).then((response) => {
        console.log(response.data);
        setFormData(response.data);
        setLoading(false);
      });
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    //sent user data to server https://appointmate-njp3.onrender.com/api/mailer
    getAppointments();
  }, []);

  const [loaderSubmit, setLoaderSubmit] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      date: date.format('MM/DD/YYYY hh:mm A'),
      medium: application,
      room: room,
      status: true,
      tutor: tutor,
    };
    //sent data to db here
    try {
      setLoaderSubmit(true);
      await axios.post("https://appointmate-njp3.onrender.com/api/appointment", data).then((response) => {
        console.log(response);
      });
      setFormData([...formData, data]);
      setSnackbarShow(true);
      setLoaderSubmit(false);
    }
    catch (err) {
      setLoaderSubmit(false);
      console.log(err, "error")
    }
  };

  const [date, setDate] = useState(dayjs());
  console.log(date.format('YYYY-MM-DDTHH:mm'));
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="links--container">
      <Snackbar
        open={SnackbarShow}
        autoHideDuration={1000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setSnackbarShow(false)}
        >
          Appointment created successfully
        </Alert>
      </Snackbar>
      {loading && <p>Loading...</p>}
      {!isAdmin && <form className="links--form" onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Controlled picker"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="demo-simple-select-label">Medium</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={application}
            label="Age"
            onChange={handleSelect}
          >
            {/* <MenuItem value="Meet">Meet</MenuItem> */}
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Teams">Teams</MenuItem>
            {/* <MenuItem value="Whatsapp">Whatsapp</MenuItem> */}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          {/* <InputLabel id="demo-simple-select-label">Room</InputLabel> */}

          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={room}
            label="Age"
            onChange={handleSelectRoom}
          >
            <MenuItem value="ME12">ME12</MenuItem>
            <MenuItem value="ME13">ME13</MenuItem>
          </Select> */}
          <TextField placeholder="Enter Room details" value={room} onChange={(e) => setRoom(e.target.value)} />
        </FormControl>

        <Button variant="outlined" type="submit" sx={{ width: 150 }}>
          {loaderSubmit ? "Loading..." : "Submit"}

        </Button>
      </form>}
      <br />
      <TextField
        id="search"
        label="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {formData.length > 0 && (
        <TableContainer sx={{ marginTop: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {isAdmin && <TableCell>Id</TableCell>}
                {isAdmin && <TableCell>Appointor</TableCell>}
                <TableCell>Appointee</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {formData.filter(item => item.tutor.toLowerCase().includes(searchTerm.toLowerCase()) || item.student?.Name.toLowerCase().includes(searchTerm.toLowerCase())).map((item,) => ( */}
              {formData.filter(item => {
                const date = new Date(item.date).toLocaleDateString();
                const searchTermDate = new Date(searchTerm).toLocaleDateString();

                return item.tutor.toLowerCase().includes(searchTerm.toLowerCase())
                  || item.student?.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  || date === searchTermDate
                  || item._id.includes(searchTerm)
                  || item.medium.toLowerCase().includes(searchTerm.toLowerCase())
                  || item.room.toLowerCase().includes(searchTerm.toLowerCase());
              }).map((item,) => (

                <TableRow key={item._id}>
                  <TableCell>
                    {/* {editingIndex === item._id ? (
                      <TextField
                        value={item.date}
                        onChange={(e) => {
                          setFormData((prevFormData) => {
                            const updatedFormData = [...prevFormData];
                            const index = updatedFormData.findIndex((obj) => obj._id === item._id);

                            if (index !== -1) {
                              //check if the formate is 04/17/2022 03:30 PM if not reject it 
                              const date = e.target.value;
                              const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2} ([0-1][0-9]|2[0-3]):([0-5][0-9]) (AM|PM)$/;
                              if (dateRegex.test(date)) {
                                updatedFormData[index].date = e.target.value;
                              }
                            }
                            // updatedFormData[item._id].date = e.target.value;
                            return updatedFormData;
                          });
                        }}
                      />
                    ) : ( */}
                    {item.date}
                    {/* )} */}
                  </TableCell>
                  {
                    isAdmin && <TableCell>
                      {item._id}
                    </TableCell>
                  }
                  {isAdmin && <TableCell>
                    {item.tutor}
                  </TableCell>}
                  <TableCell>
                    <Tooltip title={
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <span>Email :{item.student ? item.student.Email : "Not appointed"}</span>
                        <span>Booked: {item.student ? dayjs(item.student.dateAccepted).format('YYYY-MM-DD hh:mm A') : "Not appointed"}</span>
                      </div>

                    }
                      disableHoverListener={item.appointed ? false : true}
                      placement="top"
                      arrow >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <span>{item.student ? item.student.Name : "Not appointed"}</span>
                      </div>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    {editingIndex === item._id ? (
                      <FormControl sx={{ width: 150 }}>
                        <InputLabel id="demo-simple-select-label">
                          Medium
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.medium}
                          onChange={(e) => {
                            setFormData((prevFormData) => {
                              const updatedFormData = [...prevFormData];
                              const index = updatedFormData.findIndex((obj) => obj._id === item._id);

                              if (index !== -1) {
                                updatedFormData[index].medium = e.target.value;
                              }
                              // updatedFormData[item._id].medium =
                              // e.target.value;
                              return updatedFormData;
                            });
                          }}
                        >
                          <MenuItem value="Offline">Offline</MenuItem>
                          <MenuItem value="Teams">Teams</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      item.medium
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === item._id ? (
                      <FormControl sx={{ width: 150 }}>
                        {/* <InputLabel id="demo-simple-select-label">
                          Room
                        </InputLabel> */}
                        {/* <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.room}
                          onChange={(e) => {
                            setFormData((prevFormData) => {
                              const updatedFormData = [...prevFormData];
                              const index = updatedFormData.findIndex((obj) => obj._id === item._id);

                              if (index !== -1) {
                                updatedFormData[index].room = e.target.value;
                              }
                              return updatedFormData;
                            });
                          }}
                        >
                          <MenuItem value="ME12">ME12</MenuItem>
                          <MenuItem value="ME13">ME13</MenuItem>
                        </Select> */}
                        <TextField placeholder="Enter Room details" value={item.room} onChange={(e) => {
                          setFormData((prevFormData) => {
                            const updatedFormData = [...prevFormData];
                            const index = updatedFormData.findIndex((obj) => obj._id === item._id);

                            if (index !== -1) {
                              updatedFormData[index].room = e.target.value;
                            }
                            return updatedFormData;
                          });
                        }} />
                      </FormControl>
                    ) : (
                      item.room
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === item._id ? (
                      <Switch
                        checked={item.status}
                        onChange={() => handleToggleStatus(item._id)}
                        color="primary"
                      />
                    ) : item.status ? (
                      <span className="status">Active</span>
                    ) : (
                      <span className="status f">Inactive</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === item._id ? (
                      <Button onClick={() => { handleSave(item._id) }}>Save</Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(item._id)}>Edit</Button>
                        <Button onClick={() => handleRemove(item._id)}>
                          Remove
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
      }
    </div >
  );
};

export default Links;
