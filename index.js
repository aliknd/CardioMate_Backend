import express from "express";
import fs from "fs";

import listings from "./routes/listings.js";
import feedbacks from "./routes/feedbacks.js";
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
import omronhg from "./routes/omronhg.js";

import omronAuth from "./routes/omronAuth.js";
import omronCallback from "./routes/omronCallback.js";
import omronDataFetch from "./routes/omronDataFetch.js";
import refreshAccessToken from "./routes/tokenRefresh.js";
import myDatabase from "./config/db.js";

import compression from "compression";
import config from "config";
import helmet from "helmet";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/listing", listing.router);
app.use("/api/listings", listings);
app.use("/api/feedbacks", feedbacks.router);
app.use("/api/questions", questions);
app.use("/api/records", records);
app.use("/api/gmessages", gmessages);
app.use("/api/user", user.router);
app.use("/api/users", users);
app.use("/api/auth", auth.router);
app.use("/api/my", my.router);
app.use("/api/expoPushTokens", expoPushTokens.router);
app.use("/api/messages", messages.router);
app.use("/api/omronhg", omronhg.router);

// OAuth and Data Fetching Routes
app.use("/auth/omron", omronAuth.router);
app.use("/", omronCallback.router);
app.use("/fetchdata", omronDataFetch.router);

// saving sensor data

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

// Periodic check for token expiry
setInterval(() => {
  const query = "SELECT user_id FROM omronuser_tokens WHERE expiry_time <= ?";
  const currentTimePlusBuffer = Date.now() + 5 * 60 * 1000; // Buffer time, e.g., 5 minutes

  myDatabase.pool.query(
    query,
    [currentTimePlusBuffer],
    async (err, results) => {
      if (err) {
        console.error("Error fetching tokens close to expiry:", err);
        return;
      }

      console.log(results);

      for (const row of results) {
        try {
          await refreshAccessToken(row.user_id);
          console.log(`Token refreshed for user_id: ${row.user_id}`);
        } catch (error) {
          console.error(
            `Error refreshing token for user_id: ${row.user_id}`,
            error
          );
        }
      }
    }
  );
}, 300000); // Interval for checking, e.g., every 5 minutes

// Start the server

const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
