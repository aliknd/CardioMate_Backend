import myDatabase from "../config/db.js";

const getQuestions = async () => {
  const [questions] = await myDatabase.pool.query("SELECT * FROM question");
  return questions;
};

export default { getQuestions };
