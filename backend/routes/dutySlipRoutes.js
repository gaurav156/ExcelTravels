import { Router } from "express";
import DutySlip from "../models/DutySlip";
// import { upload } from "../middlewares/upload";

const router = Router();

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
//   "/upload",
//   upload.fields([
//     { name: "startKMPhoto" },
//     { name: "endKMPhoto" },
//     { name: "customerSignature" },
//   ]),
//   async (req, res) => {
//     try {
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
//         dateFrom: new Date(dateFrom),
//         dateTo: new Date(dateTo),
//         tripRoute,
//         startKM,
//         startKMPhoto: req.files["startKMPhoto"]
//           ? `/uploads/${req.files["startKMPhoto"][0].filename}`
//           : "",
//         endKM,
//         endKMPhoto: req.files["endKMPhoto"]
//           ? `/uploads/${req.files["endKMPhoto"][0].filename}`
//           : "",
//         customerSignature: req.files["customerSignature"]
//           ? `/uploads/${req.files["customerSignature"][0].filename}`
//           : "",
//         createdAt: new Date(createdAt),
//       });

//       await newDutySlip.save();
//       res.status(201).json(newDutySlip);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }
// );

// Get All Duty Slips (with optional date range filtering)
router.get("/", async (req, res) => {
  try {
    let { dateFrom, dateTo } = req.query;
    let filter = {};

    if (dateFrom && dateTo) {
      let start = new Date(dateFrom);
      let end = new Date(dateTo);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Use YYYY-MM-DD." });
      }

      end.setHours(23, 59, 59, 999);

      filter.dateFrom = { $gte: start, $lte: end };
    }

    const dutySlips = await DutySlip.find(filter);
    res.status(200).json(dutySlips || []); // Always return an array, even if empty
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a unique dutySlipId
router.get("/generate-dutyslip-id", async (req, res) => {
  try {
    const dutySlipId = await generateUniqueDutySlipId();
    res.json({ dutySlipId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to generate a unique dutySlipId
async function generateUniqueDutySlipId() {
  try {
    const lastDutySlip = await DutySlip.findOne().sort({ dutySlipId: -1 });

    let nextIdNumber = 1;
    if (lastDutySlip && lastDutySlip.dutySlipId) {
      const lastIdNumber = parseInt(
        lastDutySlip.dutySlipId.replace("DS", ""),
        10
      );
      nextIdNumber = lastIdNumber + 1;
    }

    let nextId = `DS${String(nextIdNumber).padStart(3, "0")}`;

    const existingDutySlip = await DutySlip.findOne({ dutySlipId: nextId });
    if (existingDutySlip) {
      return await generateUniqueDutySlipId(nextIdNumber);
    }

    return nextId;
  } catch (err) {
    console.error("Error generating dutySlipId:", err.message);
    throw err;
  }
}

// Get a Single Duty Slip
router.get("/:dutySlipId", async (req, res) => {
  try {
    const { dutySlipId } = req.params;
    const dutySlip = await DutySlip.findOne({ dutySlipId });

    if (!dutySlip) return res.status(404).json({ error: "Not Found" });

    res.json(dutySlip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Duty Slip
router.put("/:dutySlipId", async (req, res) => {
  try {
    const { dutySlipId } = req.params;
    req.body.modifiedAt = new Date();
    const updatedDutySlip = await DutySlip.findOneAndUpdate(
      { dutySlipId },
      req.body,
      { new: true }
    );

    if (!updatedDutySlip) {
      return res.status(404).json({ error: "DutySlip not found" });
    }

    res.json(updatedDutySlip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Duty Slip
router.delete("/:dutySlipId", async (req, res) => {
  try {
    const { dutySlipId } = req.params;
    const deletedDutySlip = await DutySlip.findOneAndDelete({ dutySlipId });

    if (!deletedDutySlip) {
      return res.status(404).json({ error: "DutySlip not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
