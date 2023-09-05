import bcrypt from "bcrypt";

const addUser = async (user) => {
  const name = user.name;
  const email = user.email;
  const genCategory = user.genCategory.label;
  const ageCategory = user.ageCategory.value;
  const raceCategory = user.raceCategory.label;
  const preference = user.preference.label;
  //const catDog = user.catDog.label;
  const password = user.password;
  //   await myDatabase.pool.query(
  //     "INSERT INTO user (name, email, genCategory, ageCategory, raceCategory, preference, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
  //     [name, email, genCategory, ageCategory, raceCategory, preference, password],
  //     function (err, result) {
  //       if (err) throw err;
  //       console.log("Number of records inserted: " + result.affectedRows);
  //     }
  //   );
  // };
  // Hash the password
  const saltRounds = 10; // Adjust the number of salt rounds as needed

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database with the hashed password
    await myDatabase.pool.query(
      "INSERT INTO user (name, email, genCategory, ageCategory, raceCategory, preference, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        genCategory,
        ageCategory,
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

import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query(
  "SELECT id, genCategory, ageCategory, raceCategory, preference, badge FROM user"
);
var users = result[0];

const getUsers = users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = async (email) =>
  await myDatabase.pool.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    function (err, result) {
      if (err) throw err;
      console.log("Successful");
    }
  );

export default { getUsers, getUserByEmail, getUserById, addUser };
