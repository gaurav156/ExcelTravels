const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Create Company
router.post("/", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Single Company
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Not Found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Company
router.put("/:id", async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Company
router.delete("/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
