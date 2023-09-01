const addUser = async (user) => {
  const name = user.name;
  const email = user.email;
  const genCategory = user.genCategory.label;
  const ageCategory = user.ageCategory.value;
  const raceCategory = user.raceCategory.label;
  const preference = user.preference.label;
  //const catDog = user.catDog.label;
  const password = user.password;
  await myDatabase.pool.query(
    "INSERT INTO user (name, email, genCategory, ageCategory, raceCategory, preference, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, email, genCategory, ageCategory, raceCategory, preference, password],
    function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    }
  );
};

import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query("SELECT * FROM user");
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
