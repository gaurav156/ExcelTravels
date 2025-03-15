const express = require("express");
const router = express.Router();
const DutySlip = require("../models/DutySlip");
const upload = require("../middlewares/upload");

// Create Duty Slip
router.post("/", async (req, res) => {
  try {
    const newDutySlip = new DutySlip(req.body);
    await newDutySlip.save();
    res.status(201).json(newDutySlip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create Duty Slip with File Upload
// router.post(
//   "/",
//   upload.fields([{ name: "startKMPhoto" }, { name: "endKMPhoto" }, { name: "customerSignature" }]),
//   async (req, res) => {
//     try {
//       //   const { driverName, vehicleNumber, dutyDate, startKM, endKM } = req.body;

//       //   const newDutySlip = new DutySlip({
//       //     driverName,
//       //     vehicleNumber,
//       //     dutyDate,
//       //     startKM,
//       //     endKM,
//       //     kmPhoto: req.files["kmPhoto"] ? `/uploads/${req.files["kmPhoto"][0].filename}` : "",
//       //     driverSignature: req.files["driverSignature"] ? `/uploads/${req.files["driverSignature"][0].filename}` : "",
//       //   });

//       const {
//         dutySlipId,
//         companyId,
//         companyName,
//         customerName,
//         city,
//         address,
//         carBooked,
//         phoneNumber,
//         dutyType,
//         driverName,
//         carNumber,
//         dateFrom,
//         dateTo,
//         tripRoute,
//         startKM,
//         endKM,
//         createdAt,
//       } = req.body;

//       const newDutySlip = new DutySlip({
//         dutySlipId,
//         companyId,
//         companyName,
//         customerName,
//         city,
//         address,
//         carBooked,
//         phoneNumber,
//         dutyType,
//         driverName,
//         carNumber,
//         dateFrom,
//         dateTo,
//         tripRoute,
//         startKM,
//         startKMPhoto: req.files["startKMPhoto"]
//           ? `/uploads/${req.files["startKMPhoto"][0].filename}`
//           : "",
//         endKM,
//         endKMPhoto: req.files["endKMPhoto"]
//           ? `/uploads/${req.files["endKMPhoto"][0].filename}`
//           : "",
//         customerSignature: req.files["driverSignature"]
//           ? `/uploads/${req.files["driverSignature"][0].filename}`
//           : "",
//         createdAt,
//       });

//       await newDutySlip.save();
//       res.status(201).json(newDutySlip);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }
// );

// Get All Duty Slips
router.get("/", async (req, res) => {
  try {
    const dutySlips = await DutySlip.find();
    res.json(dutySlips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a unique dutySlipId
router.get("/generate-dutyslip-id", async (req, res) => {
  try {
    const dutySlipId = await generateDutySlipId();
    res.json({ dutySlipId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to generate a unique dutySlipId
async function generateDutySlipId() {
  try {
    // Find the highest dutySlipId in the database
    const lastDutySlip = await DutySlip.findOne().sort({ dutySlipId: -1 });

    let nextIdNumber = 1; // Default starting number

    if (lastDutySlip && lastDutySlip.dutySlipId) {
      // Extract the numeric part of the last dutySlipId and increment it
      const lastIdNumber = parseInt(lastDutySlip.dutySlipId.replace("DS", ""), 10);
      nextIdNumber = lastIdNumber + 1;
    }

    // Generate the next dutySlipId
    let nextId = `DS${String(nextIdNumber).padStart(3, "0")}`;

    // Check if the generated ID already exists
    const existingDutySlip = await DutySlip.findOne({ dutySlipId: nextId });

    // If the ID exists, increment and check again
    if (existingDutySlip) {
      return await generateUniqueDutySlipId(nextIdNumber); // Recursively find a unique ID
    }

    return nextId; // Return the unique ID
  } catch (err) {
    console.error("Error generating dutySlipId:", err.message);
    throw err;
  }
}

// Helper function to recursively find a unique ID
async function generateUniqueDutySlipId(startingNumber) {
  let nextIdNumber = startingNumber + 1; // Increment the number
  let nextId = `C${String(nextIdNumber).padStart(3, "0")}`;

  // Check if the new ID exists
  const existingDutySlip = await DutySlip.findOne({ dutySlipId: nextId });

  if (existingDutySlip) {
    return await generateUniqueDutySlipId(nextIdNumber); // Recursively check again
  }

  return nextId; // Return the unique ID
}

// Get a Single Duty Slip
router.get("/:id", async (req, res) => {
  try {
    const dutySlip = await DutySlip.findById(req.params.id);
    if (!dutySlip) return res.status(404).json({ error: "Not Found" });
    res.json(dutySlip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Duty Slip
router.put("/:id", async (req, res) => {
  try {
    const updatedDutySlip = await DutySlip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDutySlip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete DutySlip
router.delete("/:dutySlipId", async (req, res) => {
  try {
    const { dutySlipId } = req.params;

    // Find and delete the company by companyId
    const deletedDutySlip = await DutySlip.findOneAndDelete({ dutySlipId });

    // Check if the company was found and deleted
    if (!deletedDutySlip) {
      return res.status(404).json({ error: "DutySlip not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch duty slips based on date range
router.get("/", async (req, res) => {
  try {
    let { dateFrom, dateTo } = req.query;

    // Ensure valid date range
    let start = dateFrom ? new Date(dateFrom) : new Date("1900-01-01");
    let end = dateTo ? new Date(dateTo) : new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    const dutySlips = await DutySlip.find({
      DutySlipDate: {
        $gte: start.toISOString().split("T")[0],
        $lte: end.toISOString().split("T")[0],
      },
    });

    res.status(200).json(dutySlips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
