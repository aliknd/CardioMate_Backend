import express from "express";
const router = express.Router();
import Joi from "joi";

import usersStore from "../store/users.js";
import auth from "../middleware/auth.js";
import validateWith from "../middleware/validation.js";
import myDatabase from "../config/db.js";

router.post(
  "/",
  [auth.auth, validateWith.validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    const user = usersStore.getUserById(req.user.userId);
    if (!user) return res.status(400).send({ error: "Invalid user." });

    user.expoPushToken = req.body.token;
    //console.log("here is the token", req.body.token.data);
    console.log("User registered for notifications: ", user);

    const updateQuery = "UPDATE user SET notification_token = ? WHERE id = ?";
    await myDatabase.pool.query(updateQuery, [
      req.body.token.data,
      req.user.userId,
    ]);

    res.status(201).send();
  }
);

export default { router };
