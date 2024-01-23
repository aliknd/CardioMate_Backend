import myDatabase from "../config/db.js";
import axios from "axios";

async function getUsers() {
  try {
    const [users] = await myDatabase.pool.query(
      "SELECT DISTINCT user_id FROM omronuser_tokens"
    );
    return users;
  } catch (error) {
    console.error("Error fetching user IDs from omronuser_tokens:", error);
    throw error;
  }
}

async function getCurrentAccessToken(userId) {
  try {
    const [[tokenData]] = await myDatabase.pool.query(
      "SELECT access_token FROM omronuser_tokens WHERE user_id = ?",
      [userId]
    );
    return tokenData.access_token;
  } catch (error) {
    console.error(`Error fetching access token for user ${userId}:`, error);
    throw error;
  }
}

async function fetchBloodPressureData(accessToken) {
  try {
    const userData = await axios.post(
      "https://prd-oauth.ohiomron.com/prd/api/measurement",
      new URLSearchParams({
        since: "09-01-23",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Assuming the structure of the response is similar, adjust this based on the actual structure
    const finalData = userData.data.result.bloodPressure;
    console.log(finalData);
    return userData.data.result.bloodPressure;
  } catch (error) {
    console.error("Error fetching blood pressure data:", error);
    throw error;
  }
}

async function storeBloodPressureData(userId, bloodPressureData) {
  try {
    // Fetch all existing reading IDs for this user
    const [existingReadings] = await myDatabase.pool.query(
      "SELECT reading_id FROM blood_pressure_readings WHERE user_id = ?",
      [userId]
    );
    const existingReadingIds = existingReadings.map(
      (reading) => reading.reading_id
    );

    // Filter out readings that are already stored
    const newReadings = bloodPressureData.filter(
      (reading) => !existingReadingIds.includes(reading.id)
    );

    if (newReadings.length === 0) {
      console.log(
        `No new blood pressure readings to store for user_id: ${userId}`
      );
      return;
    }

    // Store new readings
    for (const reading of newReadings) {
      await myDatabase.pool.query(
        "INSERT INTO blood_pressure_readings (user_id, reading_id, datetime, datetime_local, systolic, diastolic, pulse, device_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          reading.id,
          reading.dateTime,
          reading.dateTimeLocal,
          reading.systolic,
          reading.diastolic,
          reading.pulse,
          reading.deviceType,
        ]
      );
    }

    console.log(`Stored new blood pressure readings for user_id: ${userId}`);
  } catch (error) {
    console.error(
      `Error storing blood pressure data for user ${userId}:`,
      error
    );
  }
}

async function fetchAndStoreBloodPressureReadings() {
  const users = await getUsers();

  for (const user of users) {
    try {
      const accessToken = await getCurrentAccessToken(user.user_id);
      const bloodPressureData = await fetchBloodPressureData(accessToken);

      if (bloodPressureData && bloodPressureData.length > 0) {
        await storeBloodPressureData(user.user_id, bloodPressureData);
      } else {
        console.log(
          `No blood pressure data available for user_id: ${user.user_id}`
        );
      }
    } catch (error) {
      console.error(`Error processing user ${user.user_id}:`, error);
    }
  }
}

export { fetchAndStoreBloodPressureReadings };
