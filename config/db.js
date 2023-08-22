import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "methawareuser",
    password: "Methaware2023#",
    database: "methaware-uh",
  })
  .promise();

export default { pool };
