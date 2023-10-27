import express from "express";
import axios from "axios"; // Import axios

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Assuming the access token is passed directly as a query parameter
    // after successful authentication and token exchange.
    const accessToken = req.query.access_token;

    if (!accessToken) {
      return res.status(401).send("Access token is required.");
    }

    const userData = await axios.get(
      "https://stg-oauth.ohiomron.com/stg/api/measurement",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { type: "bloodpressure", limit: "10" },
      }
    );
    res.json(userData.data);
  } catch (error) {
    res.status(500).send(`Error fetching data: ${error.message}`);
  }
});

export default { router };
