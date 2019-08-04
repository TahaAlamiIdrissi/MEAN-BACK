const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv/config");


//import the routes
const userRoutes = require('./routes/api/users');

//connect to database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, err =>
  err ? console.log(err) : console.log("CONNECTED SUCCESSFULY")
);
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users',userRoutes);


app.listen(PORT, () => console.log("Listening on PORT " + PORT));
