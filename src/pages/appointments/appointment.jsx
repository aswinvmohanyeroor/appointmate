import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loginRequest } from '../../utils/auth-config';
import Cookies from "js-cookie";

import './appointment.scss';
const Appointment = () => {

    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();



    //how to get the query parameters
    const query = useLocation().search;
    const params = new URLSearchParams(query);
    const id = params.get("id");
    const studentID = params.get("std");
    console.log(studentID);

    //set the id and std in cookies
    if (id) {
        Cookies.set('id', id);
    }
    if (studentID) {
        Cookies.set('std', studentID);
    }

    //get msal authentication token
    const getToken = async () => {
        const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: activeAccount
        });
        console.log(response);
        return response.accessToken;
    }


    const [appointments, setAppointments] = useState([]);
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState({});




    const getAppointments = async () => {
        const id = Cookies.get('id');
        try {
            const response = await fetch("https://appointmate-njp3.onrender.com/api/getAppointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tutor: id }),
            });
            const data = await response.json();
            console.log(data);
            setAppointments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getStudent = async () => {
        try {
            const studentID = Cookies.get('std');
            const response = await fetch(`https://appointmate-njp3.onrender.com/api/student${studentID}`);
            const data = await response.json();
            setStudent(data);
            console.log(data, student);
        }
        catch (error) {
            console.error(error);
        }
    }


    const createOutlookEvent = async (appointment) => {
        const tocken = await getToken();
        const payload = {
            subject: "Appointment",
            body: {
                content: `Appointment with tutor ${appointment.tutor} in room ${appointment.room} `,
                contentType: "HTML"
            },
            start: {
                dateTime: new Date(appointment.date).toISOString(),
                timeZone: "Pacific Standard Time"
            },
            end: {
                dateTime: new Date(appointment.date).toISOString(),
                timeZone: "Pacific Standard Time"
            },
            location: {
                displayName: appointment.room
            },
        };
        await fetch("https://graph.microsoft.com/v1.0/me/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tocken}`
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const handleSelect = async (id) => {
        //post the appointment id to the server
        setLoading(prevState => ({ ...prevState, [id]: true }));
        const payload = {
            _id: id,
            appointed: true,
            student: { ...student, dateAccepted: new Date().toISOString() }
        }


        await createOutlookEvent(appointments.find(appointment => appointment._id === id));

        await fetch("https://appointmate-njp3.onrender.com/api/updateAppointee", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoading(prevState => ({ ...prevState, [id]: false }));
            })
            .catch((error) => {
                console.error(error);
                setLoading(prevState => ({ ...prevState, [id]: false }));
                return error;
            });
        //refresh the page
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    useEffect(() => {
        //get appointments from the server
        getAppointments();
        getStudent();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRedirect = () => {
        instance.loginRedirect(
            {
                ...loginRequest,
                prompt: 'create'
            }
        ).catch(e => {
            console.error(e);
        });
    }

    return (
        <div className='appointment-container' style={{ padding: 40, }}>
            <AuthenticatedTemplate>
                {activeAccount ? <h1>Welcome {activeAccount.name}</h1> : null}
                <h1>Appointments</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {appointments?.map((appointment) => {
                        if (!appointment.appointed) {
                            return (
                                <div key={appointment._id} className="card" >
                                    <p><strong>Date:</strong> {appointment.date.split(" ")[0]}</p>
                                    <p><strong>Time:</strong> {appointment.date.split(' ')[1]} {appointment.date.split(' ')[2]}</p>
                                    <p><strong>Room:</strong> {appointment.room}</p>
                                    <p><strong>Status:</strong> {appointment.status ? 'Active' : 'Inactive'}</p>
                                    <button className='select-button' onClick={() => handleSelect(appointment._id)}>{loading[appointment._id] ? 'Assigning...' : 'Select'}</button>
                                </div>
                            );
                        }

                    })}
                    {
                        appointments.length === 0 || appointments.filter((appointment) => appointment.appointed).length === appointments.length ? <h1 style={{ width: 'max-content' }}>No slots available</h1> : null
                    }
                </div>
                <h1>Upcomming appointments for you</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {appointments?.map((appointment) => {
                        const studentID = Cookies.get('std');

                        //filter the appointments that have student object with an id equal to the student id
                        if (appointment.appointed && appointment.student._id === studentID) {
                            return (
                                <div key={appointment._id} className="card" >
                                    <p><strong>Date:</strong> {appointment.date.split(" ")[0]}</p>
                                    <p><strong>Time:</strong> {appointment.date.split(' ')[1]} {appointment.date.split(' ')[2]}</p>
                                    <p><strong>Room:</strong> {appointment.room}</p>
                                    <p><strong>Status:</strong> {appointment.status ? 'Active' : 'Inactive'}</p>
                                </div>
                            );
                        }

                    })}
                    {
                        appointments.length === 0 || appointments.filter((appointment) => appointment.appointed).length === 0 ? <h1>No appointments available</h1> : null
                    }
                </div>
            </AuthenticatedTemplate >
            <UnauthenticatedTemplate>
                <h1>Appointments</h1>
                <h1>Please login to view appointments</h1>
                <button onClick={handleRedirect}>Login</button>
            </UnauthenticatedTemplate>
        </div >
    )
}

export default Appointment