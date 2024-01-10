import myDatabase from "../config/db.js";

// Define an async function to get messages
async function getChats() {
  try {
    const result = await myDatabase.pool.query("SELECT * FROM chat");
    return result[0]; // Assuming result[0] contains the messages
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}

const addChats = async (data) => {
  await myDatabase.pool.query(
    "INSERT INTO chat (title, admin_id, user_id) VALUES (?, ?, ?)",
    [data.title, data.admin_id, data.user_id]
  );
  // Handle the result or error
};

export default { getChats, addChats };
