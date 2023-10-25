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
  const user_received = await usersStore.getUserByEmail(email);
  const user = user_received[0][0];
  const secretKey = process.env.JWT_SECRET;
  //console.log("=============");
  //console.log(user);
  //console.log("=============");
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Invalid email or password." });

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
  console.log(token);
});

export default { router };
