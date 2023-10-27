import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function getAccessToken(code) {
  try {
    const tokenResponse = await axios.post(
      "https://stg-oauth.ohiomron.com/connect/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return tokenResponse.data.access_token;
  } catch (error) {
    throw new Error("Error exchanging authorization code for token");
  }
}

export default { getAccessToken };
