const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

var corsOptions = {
    origin: "*"
};
  
app.use(cors(corsOptions));
  
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.json({ message: "Welcome to pachaqtec application." });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
