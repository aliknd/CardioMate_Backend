import express from "express";
const router = express.Router();
import Joi from "joi";

import usersStore from "../store/users.js";
import auth from "../middleware/auth.js";
import validateWith from "../middleware/validation.js";

router.post(
  "/",
  [auth.auth, validateWith.validateWith({ token: Joi.string().required() })],
  (req, res) => {
    const user = usersStore.getUserById(req.user.userId);
    if (!user) return res.status(400).send({ error: "Invalid user." });

    user.expoPushToken = req.body.token;
    console.log("User registered for notifications: ", user);
    res.status(201).send();
  }
);

export default { router };
