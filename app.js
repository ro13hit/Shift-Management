require("dotenv").config()

const mongoose = require("mongoose");
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//routes import
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee")

const router = require("./routes/auth");

//db connection
mongoose
    .connect(process.env.DATABASE)
    .then(()=>{
        console.log("Database Connected");
    })

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use("/api", authRoutes);
app.use("/api", employeeRoutes);

//server start
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`App running at ${port}`);
})
 