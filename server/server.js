import express from "express";
// import mongoose from "mongoose";
// const { connect, connection, Schema, model } = mongoose;
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import { connect } from "./database/connection.js";
dotenv.config();
const app = express();
const PORT = 3001;
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use("/api", router);

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });
