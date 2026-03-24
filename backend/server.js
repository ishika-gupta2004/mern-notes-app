const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const noteRoute = require("./routes/notesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/notesapp")    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))


app.use("/api/auth/", authRoutes);
app.use("/api/notes", noteRoute);
console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    console.log("server Running")
});