import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import mresponseStore from "../store/mresponses.js";

import { Expo } from "expo-server-sdk"; // Import Expo SDK
const expo = new Expo(); // Create a new Expo SDK instance
import usersStore from "../store/users.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const mresponses = await mresponseStore.getmResponses();
    res.send(mresponses);
  } catch (error) {
    res.status(500).send("Server error occurred while fetching messages.");
  }
});

router.post("/updateStatusByChat/:chatId", async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const newStatus = req.body.status;

    await mresponseStore.updatemResponseStatus(chatId, newStatus);

    res.status(200).send("Response status updated successfully for chat");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract data from request body
    const { chat_id, message_id, admin_id, user_id, response_text, status } =
      req.body;
    console.log(req.body);

    // Insert data into the database
    await mresponseStore.addMessageResponse({
      chat_id,
      message_id,
      admin_id,
      user_id,
      response_text,
      status,
    });

    // Fetch the user's notification token
    const user = await usersStore.getUserById(admin_id);
    if (user && Expo.isExpoPushToken(user.notification_token)) {
      // Create a message for the push notification
      const message = {
        to: user.notification_token,
        sound: "default",
        title: "New Response",
        body: "You have a new response in the chat.",
        data: { chatId: chat_id }, // Optionally you can add additional data
      };

      // Send the push notification
      await expo.sendPushNotificationsAsync([message]);
    }

    res.status(201).send("Response added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
