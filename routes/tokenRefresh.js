import axios from "axios";
import myDatabase from "../config/db.js"; // Adjust the import path as necessary
import dotenv from "dotenv";
dotenv.config();

async function refreshAccessToken(userId) {
  try {
    // Retrieve the refresh token for the user from the database
    const query =
      "SELECT refresh_token FROM omronuser_tokens WHERE user_id = ?";
    const [[{ refresh_token }]] = await myDatabase.pool.query(query, [userId]);

    const tokenResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/stg/connect/token", // Replace with actual URL
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const newAccessToken = tokenResponse.data.access_token;
    const newExpiresIn = tokenResponse.data.expires_in; // Directly access expires_in

    // Check if newExpiresIn is a number
    if (isNaN(newExpiresIn)) {
      throw new Error(
        "Invalid 'expires_in' value received from token response"
      );
    }

    const newExpiryTime = Date.now() + newExpiresIn * 1000; // Convert to milliseconds

    // Update the new token and expiry time in the database
    const updateQuery =
      "UPDATE omronuser_tokens SET access_token = ?, expiry_time = ? WHERE user_id = ?";
    await myDatabase.pool.query(updateQuery, [
      newAccessToken,
      newExpiryTime,
      userId,
    ]);
    console.log("Token data updated successfully");

    return newAccessToken; // Optionally return the new access token
  } catch (error) {
    console.error("Error in token refresh process:", error);
    throw error;
  }
}

export default refreshAccessToken;
