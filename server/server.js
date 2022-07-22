import cors from "cors";
import express from "express";
import { readdirSync } from "fs";
import mongoose from "mongoose";

const moragan = require("morgan");
require("dotenv").config();

const app = express();

//DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB is conneced!"))
  .catch((err) => {
    console.log(`DB connectio error:=> ${err}`);
    // process.exit(1);
  });

//middleware
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(moragan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

//Autoload routes
readdirSync("./routes/").map((r) => app.use("/api", require(`./routes/${r}`)));

// server listen
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
);
