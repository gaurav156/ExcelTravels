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
router.post(
  "/upload",
  upload.fields([
    { name: "startKMPhoto" },
    { name: "endKMPhoto" },
    { name: "customerSignature" },
  ]),
  async (req, res) => {
    try {
      const {
        dutySlipId,
        companyId,
        companyName,
        customerName,
        city,
        address,
        carBooked,
        phoneNumber,
        dutyType,
        driverName,
        carNumber,
        dateFrom,
        dateTo,
        tripRoute,
        startKM,
        endKM,
        createdAt,
      } = req.body;

      const newDutySlip = new DutySlip({
        dutySlipId,
        companyId,
        companyName,
        customerName,
        customerPhoneNumber,
        city,
        address,
        carBooked,
        phoneNumber,
        dutyType,
        driverName,
        carNumber,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
        tripRoute,
        startKM,
        startKMPhoto: req.files["startKMPhoto"]
          ? `/uploads/${req.files["startKMPhoto"][0].filename}`
          : "",
        endKM,
        endKMPhoto: req.files["endKMPhoto"]
          ? `/uploads/${req.files["endKMPhoto"][0].filename}`
          : "",
        customerSignature: req.files["customerSignature"]
          ? `/uploads/${req.files["customerSignature"][0].filename}`
          : "",
        createdAt: new Date(createdAt),
      });

      await newDutySlip.save();
      res.status(201).json(newDutySlip);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get All Duty Slips with pagination, filtering, and sorting
router.get("/", async (req, res) => {
  try {
    // Extract all possible query parameters
    let { 
      dateFrom, 
      dateTo,
      page = 1, 
      limit = 10, 
      sort = 'newest', 
      search = '',
      status // Add status filter parameter
    } = req.query;

    // Initialize filter object with date range if provided
    let filter = {};

    // Date range filtering (your existing logic)
    if (dateFrom && dateTo) {
      let start = new Date(dateFrom);
      let end = new Date(dateTo);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ 
          error: "Invalid date format. Use YYYY-MM-DD." 
        });
      }

      end.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lte: end };
    }

    // Add status filter if provided and not 'all'
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Add search filtering if provided
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;
    const total = await DutySlip.countDocuments(filter);

    // Determine sort order
    const sortOption = sort === 'newest' ? { createdAt: -1 } : { createdAt: 1 };

    // Execute query with pagination and sorting
    const dutySlips = await DutySlip.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      dutySlips,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New endpoint specifically for exports
router.get("/export", async (req, res) => {
  try {
    let { dateFrom, dateTo, status = "completed" } = req.query;
    let filter = {
      status: status 
    };

    if (dateFrom && dateTo) {
      let start = new Date(dateFrom);
      let end = new Date(dateTo);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ 
          error: "Invalid date format. Use YYYY-MM-DD." 
        });
      }

      end.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lte: end };
    }

    // Change sort order to ascending (oldest first)
    const dutySlips = await DutySlip.find(filter).sort({ createdAt: 1 }); // 1 for ascending
    res.status(200).json(dutySlips);
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
