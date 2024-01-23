import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  //console.log(req);
  const accessToken = req.query.access_token;
  // console.log(accessToken);
  if (!accessToken) {
    return res.status(401).send("Access token is required.");
  }

  try {
    const userData = await axios.post(
      "https://prd-oauth.ohiomron.com/prd/api/measurement",
      new URLSearchParams({
        //type: "bloodpressure+activity+weight+temperature+oxygen+openid+offline_access",
        since: "09-01-23",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    //console.log(response);
    //console.log(userData.data);
    res.json(userData.data);
  } catch (error) {
    res
      .status(error.response.status)
      .send(`Error fetching data: ${error.response.data}`);
  }
});

export default { router };
