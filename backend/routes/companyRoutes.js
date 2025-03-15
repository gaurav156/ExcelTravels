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
router.delete("/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find and delete the company by companyId
    const deletedCompany = await Company.findOneAndDelete({ companyId });

    // Check if the company was found and deleted
    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
