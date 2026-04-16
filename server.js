const express = require("express");
const cors = require("cors");
require("dotenv").config();

const schoolRoutes = require("./routes/school.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5000;

const pool = require("./src/config/db");

async function createTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `);
  console.log("Schools table ready");
}

createTable();

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});