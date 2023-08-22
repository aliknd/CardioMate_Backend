import express from "express";
const router = express.Router();

import gmessageStore from "../store/gmessages.js";

router.get("/", (req, res) => {
  const gmessages = gmessageStore.getMessages;
  res.send(gmessages);
});

export default { router };
