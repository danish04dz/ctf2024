const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//cookie-parser - what is this and why we need this ?

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());


require("./config/database").connect();

//add client sidde link 
const cors = require("cors")


const allowedOrigins =[
   // "http://127.0.0.1:5500"

    "https://ctf2024.netlify.app"
];


// CORS options to handle allowed origins
const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  // Enable cookies and other credentials
  };
  
  // Apply CORS middleware with options
  app.use(cors(corsOptions));
  
  // Middleware to parse JSON
  app.use(express.json());
//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

//actuivate

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
})
