import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const authUrl =
    `https://stg-oauth-website.ohiomron.com/connect/authorize?` +
    `client_id=${process.env.CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${process.env.REDIRECT_URI}&` +
    `scope=bloodpressure`;
  res.redirect(authUrl);
});

export default { router };
