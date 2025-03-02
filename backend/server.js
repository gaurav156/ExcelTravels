const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/dutySlipsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dutySlipSchema = new mongoose.Schema({
  DutySlipID: String,
  DutySlipDate: String,
  partyName: String,
  CustomerName: String,
  address: String,
  phone: Number,
  busNo: Number,
  time: String,
  dateFrom: Date,
  dateTo: Date,
  startKms: Number,
  closingKms: Number,
  startTime: String,
  closingTime: String,
  totalKms: Number,
  totalHours: Number,
  driverName: String,
  Advance: Number,
  Balance: Number,
  UptoKms: Number,
  ExtraKmsRs: Number,
  UptoHrs: Number,
  UptoHrsRs: Number,
  TaxRs: Number,
  TaxRsPerDay: Number,
  tripRoute: String,
  ClientSignature: String,
});

const DutySlip = mongoose.model("DutySlip", dutySlipSchema);

app.post("/dutyslips", async (req, res) => {
  try {
    const newSlip = new DutySlip(req.body);
    await newSlip.save();
    res.status(201).json({ message: "Duty Slip Saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch duty slips based on date range
app.get("/dutyslips", async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    // Ensure valid date range
    let start = startDate ? new Date(startDate) : new Date("1900-01-01");
    let end = endDate ? new Date(endDate) : new Date();

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

app.listen(5000, () => console.log("Server running on port 5000"));
