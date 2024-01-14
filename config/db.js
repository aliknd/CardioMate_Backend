import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "cardio_user",
    password: "HawaiiHealthLab23#",
    database: "CardioMate_uh",
  })
  .promise();

export default { pool };
