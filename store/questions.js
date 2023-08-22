import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query("SELECT * FROM question");
var questions = result[0];

const getQuestions = questions;

export default { getQuestions };
