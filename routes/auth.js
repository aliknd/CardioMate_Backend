import express from "express";
const router = express.Router();
import Joi from "joi";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import Jwt from "jsonwebtoken";
import validateWith from "../middleware/validation.js";
import usersStore from "../store/users.js";

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith.validateWith(schema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await usersStore.getUserByEmail(email);
    if (users.length === 0) {
      return res.status(400).send({ error: "Invalid email or password." });
    }

    const user = users[0];
    const secretKey = process.env.JWT_SECRET;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid email or password." });
    }

    const token = Jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email,
        badge: user.badge,
        preference: user.preference,
        access_type: user.access_type,
      },
      secretKey
    );
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default { router };
