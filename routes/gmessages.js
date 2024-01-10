import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import gmessageStore from "../store/gmessages.js";

import { Expo } from "expo-server-sdk"; // Import Expo SDK
const expo = new Expo(); // Create a new Expo SDK instance
import usersStore from "../store/users.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const gmessages = await gmessageStore.getMessages();
    res.send(gmessages);
  } catch (error) {
    res.status(500).send("Server error occurred while fetching messages.");
  }
});

router.post("/updateStatusByChat/:chatId", async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const newStatus = req.body.status;

    await gmessageStore.updateMessageStatus(chatId, newStatus);

    res.status(200).send("Message status updated successfully for chat");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract data from request body
    const { chat_id, response_id, message_text, user_id, admin_id, status } =
      req.body;

    // Insert data into the database
    await gmessageStore.addMessage({
      chat_id,
      response_id,
      message_text,
      user_id,
      admin_id,
      status,
    });

    // Fetch the user's notification token
    const user = await usersStore.getUserById(user_id);
    if (user && Expo.isExpoPushToken(user.notification_token)) {
      // Create a message for the push notification
      const message = {
        to: user.notification_token,
        sound: "default",
        title: "New Message",
        body: "You have a new message in the chat.",
        data: { chatId: chat_id }, // Optionally you can add additional data
      };

      // Send the push notification
      await expo.sendPushNotificationsAsync([message]);
    }

    res.status(201).send("Message added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
