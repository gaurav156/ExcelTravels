import { Router } from "express";
import Driver from "../models/Driver";

const router = Router();

// Create Driver
router.post("/", async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Drivers with pagination, filtering, and sorting
router.get("/", async (req, res) => {
  try {
    // Extract all possible query parameters
    let { 
      page = 1, 
      limit = 10, 
      search = '' 
    } = req.query;

    // Initialize filter object with date range if provided
    let filter = {};

    // Add search filtering if provided
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;
    const total = await Driver.countDocuments(filter);

    // Execute query with pagination and sorting
    const drivers = await Driver.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      drivers,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a unique driverId
router.get("/generate-driver-id", async (req, res) => {
  try {
    const driverId = await generateDriverId();
    res.json({ driverId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to generate a unique driverId
async function generateDriverId() {
  try {
    // Find the highest driverId in the database
    const lastDriver = await Driver.findOne().sort({ driverId: -1 });

    let nextIdNumber = 1; // Default starting number

    if (lastDriver && lastDriver.driverId) {
      // Extract the numeric part of the last driverId and increment it
      const lastIdNumber = parseInt(lastDriver.driverId.replace("D", ""), 10);
      nextIdNumber = lastIdNumber + 1;
    }

    // Generate the next driverId
    let nextId = `D${String(nextIdNumber).padStart(3, "0")}`;

    // Check if the generated ID already exists
    const existingDriver = await Driver.findOne({ driverId: nextId });

    // If the ID exists, increment and check again
    if (existingDriver) {
      return await generateUniqueDriverId(nextIdNumber); // Recursively find a unique ID
    }

    return nextId; // Return the unique ID
  } catch (err) {
    console.error("Error generating driverId:", err.message);
    throw err;
  }
}

// Helper function to recursively find a unique ID
async function generateUniqueDriverId(startingNumber) {
  let nextIdNumber = startingNumber + 1; // Increment the number
  let nextId = `D${String(nextIdNumber).padStart(3, "0")}`;

  // Check if the new ID exists
  const existingDriver = await Company.findOne({ driverId: nextId });

  if (existingDriver) {
    return await generateUniqueDriverId(nextIdNumber); // Recursively check again
  }

  return nextId; // Return the unique ID
}

// Get a Single Driver
router.get("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await Driver.findOne({ driverId });
    if (!driver) return res.status(404).json({ error: "Not Found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Driver
router.put("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverId },
      req.body,
      { new: true }
    );
    res.json(updatedDriver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Driver
router.delete("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;

    // Find and delete the company by driverId
    const deletedDriver = await Driver.findOneAndDelete({ driverId });

    // Check if the company was found and deleted
    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
