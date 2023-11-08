import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import gmessageStore from "../store/gmessages.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const gmessages = await gmessageStore.getMessages();
    res.send(gmessages);
  } catch (error) {
    res.status(500).send("Server error occurred while fetching messages.");
  }
});

export default router;
