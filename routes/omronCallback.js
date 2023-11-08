import express from "express";
const router = express.Router();

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Function to exchange the authorization code for an access token
async function getAccessToken(code) {
  try {
    const tokenResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/stg/connect/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    //console.log(tokenResponse);
    return tokenResponse.data.access_token;
  } catch (error) {
    throw new Error(
      `Error exchanging authorization code for token: ${error.message}`
    );
  }
}

// Callback route to handle the response from Omron's OAuth service
router.get("/", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Authorization code is missing.");
  }

  try {
    const accessToken = await getAccessToken(code);
    // Here you can redirect the user or send the access token to the client
    // For example, redirecting to a data fetch route:
    res.redirect(`/fetchdata?access_token=${accessToken}`);
    // Or, you might want to send the token to the client for further use
    // res.json({ accessToken });
  } catch (error) {
    res.status(500).send(`Error in token exchange: ${error.message}`);
  }
});

export default { router };
