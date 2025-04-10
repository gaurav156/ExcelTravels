import { Router } from "express";
import Company from "../models/Company";

const router = Router();

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

// Generate a unique companyId
router.get("/generate-company-id", async (req, res) => {
  try {
    const companyId = await generateCompanyId();
    res.json({ companyId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to generate a unique companyId
async function generateCompanyId() {
  try {
    // Find the highest companyId in the database
    const lastCompany = await Company.findOne().sort({ companyId: -1 });

    let nextIdNumber = 1; // Default starting number

    if (lastCompany && lastCompany.companyId) {
      // Extract the numeric part of the last companyId and increment it
      const lastIdNumber = parseInt(lastCompany.companyId.replace("C", ""), 10);
      nextIdNumber = lastIdNumber + 1;
    }

    // Generate the next companyId
    let nextId = `C${String(nextIdNumber).padStart(3, "0")}`;

    // Check if the generated ID already exists
    const existingCompany = await Company.findOne({ companyId: nextId });

    // If the ID exists, increment and check again
    if (existingCompany) {
      return await generateUniqueCompanyId(nextIdNumber); // Recursively find a unique ID
    }

    return nextId; // Return the unique ID
  } catch (err) {
    console.error("Error generating companyId:", err.message);
    throw err;
  }
}

// Helper function to recursively find a unique ID
async function generateUniqueCompanyId(startingNumber) {
  let nextIdNumber = startingNumber + 1; // Increment the number
  let nextId = `C${String(nextIdNumber).padStart(3, "0")}`;

  // Check if the new ID exists
  const existingCompany = await Company.findOne({ companyId: nextId });

  if (existingCompany) {
    return await generateUniqueCompanyId(nextIdNumber); // Recursively check again
  }

  return nextId; // Return the unique ID
}

// Get a Single Company
router.get("/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findOne({ companyId });

    if (!company) return res.status(404).json({ error: "Not Found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Company
router.put("/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const updatedCompany = await Company.findOneAndUpdate(
      { companyId },
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
