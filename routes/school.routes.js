const express = require("express");
const { body } = require("express-validator");
const {
  addSchool,
  listSchools
} = require("../controllers/school.controller");

const router = express.Router();

router.post(
  "/addSchool",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Valid latitude required"),
    body("longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Valid longitude required")
  ],
  addSchool
);

router.get("/listSchools", listSchools);

module.exports = router;