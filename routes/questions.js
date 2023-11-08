import express from "express";
const router = express.Router();

import questionStore from "../store/questions.js";
import auth from "../middleware/auth.js";

router.get("/", auth.auth, async (req, res) => {
  try {
    const questions = await questionStore.getQuestions();
    res.send(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
