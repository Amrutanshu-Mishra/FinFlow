require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDB = require("./config/db");

const app=express();
const authRoutes=require("./routes/authRoutes.js")
const incomeRoutes=require("./routes/incomeRoutes.js")
//Middleware to handle CORS
app.use(
     cors({
          origin:process.env.CLIENT_URL || '*',
          methods:["GET", "POST", "PUT", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization"],
     })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));