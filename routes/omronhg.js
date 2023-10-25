import express from "express";
const router = express.Router();
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

router.get("/", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send(
      "No code provided. Please go through the Omron OAuth flow."
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/connect/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        scope: "bloodpressure activity openid offline_access",
      })
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch the data using the access token
    const dataResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/stg/api/measurement",
      new URLSearchParams({
        type: "bloodpressure",
        limit: "10",
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(dataResponse.data);
  } catch (error) {
    res.status(500).send(`Error: ${error.response?.data || error.message}`);
  }
});

export default { router };
