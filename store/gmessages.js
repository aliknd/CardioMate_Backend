import myDatabase from "../config/db.js";

// Define an async function to get messages
async function getMessages() {
  try {
    const result = await myDatabase.pool.query("SELECT * FROM message");
    return result[0]; // Assuming result[0] contains the messages
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}

export default { getMessages };
