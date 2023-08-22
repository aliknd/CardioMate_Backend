import express from "express";
import fs from "fs";

import listings from "./routes/listings.js";
import listing from "./routes/listing.js";
import questions from "./routes/questions.js";
import records from "./routes/records.js";
import gmessages from "./routes/gmessages.js";
import users from "./routes/users.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import my from "./routes/my.js";
import messages from "./routes/messages.js";
import expoPushTokens from "./routes/expoPushTokens.js";

import compression from "compression";
import config from "config";
import helmet from "helmet";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/listing", listing.router);
app.use("/api/listings", listings.router);
app.use("/api/questions", questions.router);
app.use("/api/records", records.router);
app.use("/api/gmessages", gmessages.router);
app.use("/api/user", user.router);
app.use("/api/users", users.router);
app.use("/api/auth", auth.router);
app.use("/api/my", my.router);
app.use("/api/expoPushTokens", expoPushTokens.router);
app.use("/api/messages", messages.router);

// saving sensor data

app.use(express.json());

app.post("/save-sensor-data", (req, res) => {
  const { userId, timestamp, sensorType, data } = req.body;

  if (sensorType === "accelerometer") {
    const accelerometerCsvPath = `./sensor-data/accelerometer_${userId}.csv`;
    const accelerometerRecord = { timestamp, ...data };
    appendToCsvFile(accelerometerCsvPath, accelerometerRecord);
    console.log("Accelerometer data saved");
  }

  if (sensorType === "gyroscope") {
    const gyroscopeCsvPath = `./sensor-data/gyroscope_${userId}.csv`;
    const gyroscopeRecord = { timestamp, ...data };
    appendToCsvFile(gyroscopeCsvPath, gyroscopeRecord);
    console.log("Gyroscope data saved");
  }

  res.sendStatus(200);
});

function appendToCsvFile(filePath, record) {
  const recordString = Object.values(record).join(",");
  fs.appendFileSync(filePath, recordString + "\n");
}

// Start the server

const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
