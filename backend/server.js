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
  ClientSignature: String
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

app.listen(5000, () => console.log("Server running on port 5000"));