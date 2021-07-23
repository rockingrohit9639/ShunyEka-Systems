const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

const PORT =  process.env.PORT || 8001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// connecting to mongodb
require("./db/connection");

// using router
app.use(require("./routes/routes"));


app.listen(PORT, () =>
{
    console.log("Server running on port " + PORT);
});