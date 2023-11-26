import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const userId = req.query.user_id; // Capture the user_id from the query parameter
  const state = encodeURIComponent(userId); // URL-encode the user_id

  const authUrl =
    `https://stg-oauth-website.ohiomron.com/connect/authorize?` +
    `client_id=${process.env.CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${process.env.REDIRECT_URI}&` +
    `scope=bloodpressure&` +
    `state=${state}`; // Include user_id in state parameter
  res.redirect(authUrl);
});

export default { router };
