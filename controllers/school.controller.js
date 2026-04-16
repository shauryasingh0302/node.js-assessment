const { validationResult } = require("express-validator");
const pool = require("../config/config.db");
const calculateDistance = require("../utils/distance.util");

exports.addSchool = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      schoolId: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
        success: false,
        message: "Valid latitude and longitude are required"
      });
    }

    const [schools] = await pool.execute("SELECT * FROM schools");

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        )
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: sortedSchools.length,
      schools: sortedSchools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};