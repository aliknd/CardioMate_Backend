import express from "express";
const router = express.Router();

import questionStore from "../store/questions.js";
import auth from "../middleware/auth.js";

router.get("/", auth.auth, (req, res) => {
  const questions = questionStore.getQuestions;
  res.send(questions);
});

export default { router };
