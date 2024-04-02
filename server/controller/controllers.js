import bcrypt from "bcryptjs";
import dontenv from "dotenv";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Student } from "../models/Students.model.js";
import { Teacher } from "../models/User.model.js";
import { Appointment } from "../models/appointment.model.js";
import { generatePassword, transporter } from "../utils/helper.js";
dontenv.config();


//ventor login
export async function ventorLogIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Teacher.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = {
      email: user.email,
      id: user._id, // It's better to use user id instead of password in the payload
    };

    //eslint-disable-next-line no-undef
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET);

    const userDetails = {
      accessToken: accessToken,
      userData: user,
    };

    res.send(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//get all ventors
export async function getAllVentors(req, res) {
  try {
    const users = await Teacher.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//test vendor details
export async function getVentors(req, res) {
  const userId = new ObjectId(req.params.id);
  console.log("userId:", userId);
  try {
    const user = await Teacher.findOne({ _id: userId });
    console.log("user:", user);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

//upload ventors details in the app
export async function createVendor(req, res) {
  try {
    const { name, email, category } = req.body;
    const password = generatePassword(); // Generate a random password

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newVendor = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      category,
    });

    // Send an email to the vendor with the password

    let mailOptions = {
      from: 'cyberfork2000@gmail.com',
      to: email,
      subject: 'Appointmate account password',
      text: `Hello ${name}, your apointmate password is ${password}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(newVendor);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
export async function editVendor(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      category,
      image,
      description,
      phone,
      updatePass = false, // Add updatePass field to the request body with a default value of false
    } = req.body;
    let password = null; // Initialize password variable

    let updateData = {
      name,
      email,
      category,
      image,
      description,
      phone,
    };

    if (updatePass) {
      password = generatePassword(); // Generate a random password

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the password field in the updateData object
      updateData.password = hashedPassword;

      let mailOptions = {
        from: 'cyberfork2000@gmail.com',
        to: email,
        subject: 'Appointmate updated password',
        text: `Hello ${name}, your updated appointmate is ${password} `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }




    await Teacher.findByIdAndUpdate(id, updateData);

    console.log(updateData);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
export async function deleteVendor(req, res) {
  try {
    const { id } = req.params;

    await Teacher.findByIdAndRemove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function sendMassMail(req, res) {
  try {
    const { recipients, tutor } = req.body; // assuming req.body is an array of objects


    const sendEmails = recipients.map(async ({ Name, Email }) => {
      const studentData = await Student.findOneAndUpdate(
        { Email },
        { Name, Email, tutor, dateSent: new Date() },
        { upsert: true, new: true, runValidators: true }
      );
      const mailOptions = {
        from: "cyberfork2000@gmail.com",
        to: Email,
        subject: `Sending Email using Node.js to ${Name}`,
        html: `
            <p>Hello ${Name},</p>
            <p>This is a mass email from the tutor ${tutor}. Please click on the link below to book an appointment with the tutor:</p>
            <a href="https://appointmate-three.vercel.app/appointments?id=${tutor}&std=${studentData._id}">Book Appointment</a>
        `,
      };




      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log("Email sent to " + Email + ": " + info.response);
            resolve(info);
          }
        });
      });
    });

    await Promise.all(sendEmails);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


//create appointment
export async function createAppointment(req, res) {
  try {
    const { date, medium, room, status, tutor } = req.body;
    const newAppointment = await Appointment.create({
      date,
      medium,
      room,
      status,
      tutor
    });
    res.json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export const updateAppointment = async (req, res) => {
  try {
    const { _id, date, medium, room, status, tutor } = req.body;
    const updateData = {
      date,
      medium,
      room,
      status,
      tutor,
    };
    await Appointment.findByIdAndUpdate(_id, updateData);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateAppointee = async (req, res) => {
  try {
    const { _id, appointed, student } = req.body;
    const updateData = {
      appointed,
      student,
    };
    await Appointment.findByIdAndUpdate(_id, updateData);
    res.sendStatus(204);
  }
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }

}


export async function getAppointments(req, res) {
  const { tutor = "", admin = false } = req.body;
  try {
    if (admin) {
      const appointments = await Appointment.find();
      res.json(appointments);
      return;
    }
    else {
      const appointments = await Appointment.find({ tutor });
      res.json(appointments);
    }

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.body;
    await Appointment.findByIdAndRemove(id);
    console.log(id, "deleted");
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function getStudent(req, res) {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ _id: id });
    res.json(student);
  }
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}