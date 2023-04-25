import mysql from "mysql";
import "dotenv/config";

// node
console.log();
const connection = mysql.createConnection({
  host: "localhost",
  user: "we2code",
  password: "we2code",
  database: "nurseryDB",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
