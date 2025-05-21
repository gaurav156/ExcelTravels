const express = require("express");
const router = express.Router();
const DutySlip = require("../models/DutySlip");
const multer = require("multer");
const { storage } = require("../config/firebase");
const path = require("path");

// Configure multer for memory storage with file filtering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."),
        false
      );
    }
  },
});

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

// GET duty slip by ID
router.get("/check/:id", async (req, res) => {
  try {
    const dutySlip = await DutySlip.findOne({
      dutySlipId: { $regex: new RegExp(`^${req.params.id}$`, "i") }, // 👈 regex for case-insensitive exact match
    })
      .select("-__v -createdAt -modifiedAt")
      .lean();

    if (!dutySlip) {
      return res.status(404).json({ message: "Duty slip not found" });
    }

    if (dutySlip.status === "completed") {
      return res
        .status(400)
        .json({ message: "Duty slip is already completed" });
    }

    const responseData = {
      id: dutySlip.dutySlipId,
      party: dutySlip.customerName,
      customerPhoneNumber: dutySlip.customerPhoneNumber,
      address: `${dutySlip.address}, ${dutySlip.city}`,
      contact: dutySlip.phoneNumber,
      category: dutySlip.carBooked,
      pickupTime: dutySlip.pickupTime,
      driverName: dutySlip.driverName,
      driverId: dutySlip.driverId,
      carNumber: dutySlip.carNumber,
      tripRoute: dutySlip.tripRoute,
      status: dutySlip.status, // Include status in response
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching duty slip:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST trip completion (with Firebase Storage URLs)
router.post("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      manualStartKm,
      manualEndKm,
      startKmImageUrl,
      endKmImageUrl,
      customerSignatureUrl,
      tollFees = 0,
      parkingFees = 0,
      startTime, // Add startTime parameter
      endTime, // Add endTime parameter
    } = req.body;

    // Validate required fields
    if (!manualStartKm || !manualEndKm || !startKmImageUrl || !endKmImageUrl) {
      return res
        .status(400)
        .json({ message: "Missing required fields or image URLs" });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (startTime && !timeRegex.test(startTime)) {
      return res
        .status(400)
        .json({
          message: "Invalid start time format. Use HH:MM (24-hour format)",
        });
    }
    if (endTime && !timeRegex.test(endTime)) {
      return res
        .status(400)
        .json({
          message: "Invalid end time format. Use HH:MM (24-hour format)",
        });
    }

    // Check if duty slip exists and isn't already completed
    const existingSlip = await DutySlip.findOne({ dutySlipId: id });
    if (!existingSlip) {
      return res.status(404).json({ message: "Duty slip not found" });
    }
    if (existingSlip.status === "completed") {
      return res
        .status(400)
        .json({ message: "Duty slip is already completed" });
    }

    // Update the duty slip with completion data
    const updatedSlip = await DutySlip.findOneAndUpdate(
      { dutySlipId: id },
      {
        $set: {
          startKM: manualStartKm,
          startKMPhoto: startKmImageUrl,
          endKM: manualEndKm,
          endKMPhoto: endKmImageUrl,
          customerSignature: customerSignatureUrl || null,
          tollFees: parseFloat(tollFees),
          parkingFees: parseFloat(parkingFees),
          startTime: startTime || null, // Store start time
          endTime: endTime || null, // Store end time
          modifiedAt: new Date(),
          status: "completed",
        },
      },
      { new: true }
    );

    res.json({
      message: "Trip completed and saved successfully",
      dutySlip: {
        id: updatedSlip.dutySlipId,
        status: updatedSlip.status,
        startKM: updatedSlip.startKM,
        endKM: updatedSlip.endKM,
        startTime: updatedSlip.startTime, // Include in response
        endTime: updatedSlip.endTime, // Include in response
        completedAt: updatedSlip.modifiedAt,
      },
    });
  } catch (error) {
    console.error("Error completing trip:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Image upload endpoint
router.post("/:dutySlipId/image", upload.single("image"), async (req, res) => {
  try {
    const { dutySlipId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the duty slip's current data
    const dutySlip = await DutySlip.findOne({ dutySlipId });
    if (!dutySlip) {
      return res.status(404).json({ error: "Duty slip not found" });
    }

    // Prevent uploading images for completed slips
    if (dutySlip.status === "completed") {
      return res
        .status(400)
        .json({ error: "Cannot upload images for completed duty slips" });
    }

    // Create consistent filename
    const fileExtension = path.extname(req.file.originalname) || ".jpg";
    let newFileName = req.file.originalname.replaceAll("_", "/");
    if (req.file.originalname.includes("start-km")) {
      newFileName = `duty-slips/${dutySlipId}/start-km${fileExtension}`;
    } else if (req.file.originalname.includes("end-km")) {
      newFileName = `duty-slips/${dutySlipId}/end-km${fileExtension}`;
    } else if (req.file.originalname.includes("signature")) {
      newFileName = `duty-slips/${dutySlipId}/signature${fileExtension}`;
    }

    const fileRef = storage.bucket().file(newFileName);

    // Upload metadata
    const metadata = {
      contentType: req.file.mimetype,
      cacheControl: "public, max-age=31536000", // 1 year cache
    };

    // Upload the file
    await fileRef.save(req.file.buffer, {
      metadata,
      public: true,
    });

    // Get the public URL
    const downloadURL = `https://storage.googleapis.com/${
      storage.bucket().name
    }/${fileRef.name}`;

    res.json({
      message: "Image uploaded successfully",
      image: downloadURL,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// GET completed duty slips
router.get("/history/completed", async (req, res) => {
  try {
    const { driverId } = req.query;
    // const { startDate, endDate, driverId } = req.query;

    // Build query
    const query = { status: "completed" };

    // if (startDate && endDate) {
    //   query.dateFrom = {
    //     $gte: new Date(startDate),
    //     $lte: new Date(endDate)
    //   };
    // }

    if (driverId) {
      query.driverId = driverId;
    }

    const completedTrips = await DutySlip.find(query)
      .sort({ dateFrom: -1 }) // Sort by date descending (newest first)
      .select(
        "dutySlipId dateFrom dateTo startTime endTime tripRoute dutyType startKM endKM driverName carNumber"
      )
      .lean();

    // Calculate duration for each trip
    const tripsWithDuration = completedTrips.map((trip) => {
      let duration = "N/A";
      if (trip.startTime && trip.endTime) {
        const [startH, startM] = trip.startTime.split(":").map(Number);
        const [endH, endM] = trip.endTime.split(":").map(Number);

        let totalMinutes = endH * 60 + endM - (startH * 60 + startM);
        if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        duration = `${hours}h ${minutes}m`;
      }

      return {
        ...trip,
        duration,
      };
    });

    res.json(tripsWithDuration);
  } catch (error) {
    console.error("Error fetching completed trips:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;