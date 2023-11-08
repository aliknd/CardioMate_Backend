import express from "express";
const router = express.Router();

import recordStore from "../store/records.js";
import auth from "../middleware/auth.js";

router.get("/", auth.auth, async (req, res) => {
  try {
    const records = await recordStore.getRecords();
    res.send(records);
  } catch (error) {
    // Handle error, maybe send a 500 status code
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
