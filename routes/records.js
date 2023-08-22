import express from "express";
const router = express.Router();

import recordStore from "../store/records.js";

router.get("/", (req, res) => {
  const records = recordStore.getRecords;
  res.send(records);
});

export default { router };
