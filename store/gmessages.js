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

const updateMessageStatus = async (chatId, newStatus) => {
  await myDatabase.pool.query(
    "UPDATE message SET status = ? WHERE chat_id = ?",
    [newStatus, chatId],
    function (err, result) {
      if (err) throw err;
      console.log(
        "Updated Successfully! Rows affected: " + result.affectedRows
      );
    }
  );
};

const addMessage = async (data) => {
  await myDatabase.pool.query(
    "INSERT INTO message (chat_id, response_id, message_text, user_id, admin_id, status) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.chat_id,
      data.response_id,
      data.message_text,
      data.user_id,
      data.admin_id,
      data.status,
    ]
  );
  // Handle the result or error
};

export default { getMessages, updateMessageStatus, addMessage };
