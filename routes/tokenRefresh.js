import axios from "axios";
import myDatabase from "../config/db.js"; // Adjust the import path as necessary
import dotenv from "dotenv";
dotenv.config();

async function refreshAccessToken(userId) {
  // Retrieve the refresh token for the user from the database
  const query = "SELECT refresh_token FROM user_tokens WHERE user_id = ?";
  const refreshToken = await new Promise((resolve, reject) => {
    myDatabase.pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching refresh token:", err);
        return reject(err);
      }
      resolve(results[0].refresh_token);
    });
  });

  try {
    const tokenResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/stg/connect/token", // Replace with actual URL
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const newAccessToken = tokenResponse.data.access_token;
    const newExpiresIn = tokenResponse.data.expires_in.value; // Adjust based on actual response
    const newExpiryTime = Date.now() + newExpiresIn * 1000; // Convert to milliseconds

    // Update the new token and expiry time in the database
    const updateQuery =
      "UPDATE user_tokens SET access_token = ?, expiry_time = ? WHERE user_id = ?";
    myDatabase.pool.query(
      updateQuery,
      [newAccessToken, newExpiryTime, userId],
      (err, results) => {
        if (err) {
          console.error("Error updating token data:", err);
          throw err;
        }
        console.log("Token data updated successfully", results);
      }
    );

    return newAccessToken; // Optionally return the new access token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export default refreshAccessToken;
