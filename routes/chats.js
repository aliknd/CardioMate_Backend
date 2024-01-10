import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import chats from "../store/chats.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const chat = await chats.getChats();
    res.send(chat);
  } catch (error) {
    res.status(500).send("Server error occurred while fetching messages.");
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract data from request body
    const { admin_id, user_id, title } = req.body;

    // Insert data into the database
    await chats.addChats({
      title,
      admin_id,
      user_id,
    });

    res.status(201).send("Response added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
