import express from "express";
const router = express.Router();
import Joi from "joi";

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
  console.log("=============");
  console.log(user);
  console.log("=============");
  if (!user || user.password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = Jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email,
      badge: user.badge,
      catdog: user.catdog,
    },
    "jwtPrivateKey"
  );
  res.send(token);
  console.log(token);
});

export default { router };
