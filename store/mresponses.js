import myDatabase from "../config/db.js";

// Define an async function to get messages
async function getmResponses() {
  try {
    const result = await myDatabase.pool.query(
      "SELECT * FROM message_response"
    );
    return result[0]; // Assuming result[0] contains the messages
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}

const updatemResponseStatus = async (chatId, newStatus) => {
  await myDatabase.pool.query(
    "UPDATE message_response SET status = ? WHERE chat_id = ?",
    [newStatus, chatId],
    function (err, result) {
      if (err) throw err;
      console.log(
        "Updated Successfully! Rows affected: " + result.affectedRows
      );
    }
  );
};

const addMessageResponse = async (data) => {
  await myDatabase.pool.query(
    "INSERT INTO message_response (chat_id, message_id, admin_id, user_id, response_text, status) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.chat_id,
      data.message_id,
      data.admin_id,
      data.user_id,
      data.response_text,
      data.status,
    ]
  );
  // Handle the result or error
};

export default { getmResponses, updatemResponseStatus, addMessageResponse };
