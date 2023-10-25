import express from "express";
const router = express.Router();

import recordStore from "../store/records.js";
import auth from "../middleware/auth.js";

router.get("/", auth.auth, (req, res) => {
  const records = recordStore.getRecords;
  res.send(records);
});

export default { router };
