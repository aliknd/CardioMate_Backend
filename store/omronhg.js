import myDatabase from "../config/db.js";

// Define an async function to get messages
async function getOmronhg() {
  try {
    const result = await myDatabase.pool.query(
      "SELECT * FROM blood_pressure_readings"
    );
    return result[0]; // Assuming result[0] contains the messages
  } catch (error) {
    console.error("Failed to retrieve omron responses:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}

export default { getOmronhg };
