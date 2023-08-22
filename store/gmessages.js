import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query("SELECT * FROM message");
var gmessages = result[0];

const getMessages = gmessages;

export default { getMessages };
