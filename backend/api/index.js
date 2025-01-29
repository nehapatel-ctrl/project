const express = require('express');
const app = express();



const bodyParser = require("body-parser");
const cors = require("cors");
let dotenv = require("dotenv").config({path:'../.env'});
console.log(dotenv);

const authRoutes = require('./routes/authroutes');
const coursesRoutes = require("./routes/courseroute");

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.NEXT_PUBLIC_PORT;

//routes
app.use("/courses", coursesRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });

module.exports = app
