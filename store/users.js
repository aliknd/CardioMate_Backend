import bcrypt from "bcrypt";
import myDatabase from "../config/db.js";

const addUser = async (user) => {
  const name = user.name;
  const email = user.email;
  const genCategory = user.genCategory.label;
  const birthdate = user.birthdate;
  let birthdateObj;
  if (typeof birthdate === "string") {
    birthdateObj = new Date(birthdate);
  } else {
    birthdateObj = birthdate; // assuming birthdate is already a Date object
  }
  const formattedBirthdate = birthdateObj.toISOString().split("T")[0];
  const raceCategory = user.raceCategory.label;
  const preference = user.preference.label;
  const password = user.password;
  const saltRounds = 10; // Adjust the number of salt rounds as needed

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database with the hashed password
    await myDatabase.pool.query(
      "INSERT INTO user (name, email, genCategory, birthdate, raceCategory, preference, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        genCategory,
        formattedBirthdate,
        raceCategory,
        preference,
        hashedPassword,
      ],
      function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      }
    );
  } catch (error) {
    // Handle any errors that occurred during password hashing or database insertion
    console.error("Error:", error);
  }
};

const getUsers = async () => {
  const [users] = await myDatabase.pool.query(
    "SELECT id, name, email, genCategory, birthdate, raceCategory, preference, badge, access_type FROM user"
  );
  return users;
};

const getUserById = async (id) => {
  const [user] = await myDatabase.pool.query(
    "SELECT * FROM user WHERE id = ?",
    [id]
  );
  return user[0];
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await myDatabase.pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    return rows; // This should return an array of users
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error; // Make sure to throw the error so you can catch it in the calling function
  }
};

export default { getUsers, getUserByEmail, getUserById, addUser };
