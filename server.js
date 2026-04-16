const express = require("express");
const cors = require("cors");
require("dotenv").config();

const schoolRoutes = require("./routes/school.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});