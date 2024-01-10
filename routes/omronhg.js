import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import omronhgStore from "../store/omronhg.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const omronhg = await omronhgStore.getOmronhg();
    res.send(omronhg);
  } catch (error) {
    res.status(500).send("Server error occurred while fetching omron data.");
  }
});

export default router;
