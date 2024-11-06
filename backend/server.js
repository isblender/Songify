const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const connectDB = require("./config/mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use('/', routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
