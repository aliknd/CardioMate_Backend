import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import gmessageStore from "../store/gmessages.js";

router.get("/", auth.auth, (req, res) => {
  const gmessages = gmessageStore.getMessages;
  res.send(gmessages);
});

export default { router };
