const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/users", userRoute);


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Express server listening on PORT ${process.env.PORT}`);
});
