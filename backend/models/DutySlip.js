const mongoose = require("mongoose");

const DutySlipSchema = new mongoose.Schema({
  dutySlipId: { type: String, required: true, unique: true },
  companyId: { type: String, required: true },
  companyName: { type: String, required: true },
  driverId: { type: String, required: true },
  customerName: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  carBooked: { type: String },
  phoneNumber: { type: String },
  dutyType: { type: String },
  driverName: { type: String },
  carNumber: { type: String },
  pickupTime: { type: String },
  dateFrom: { type: Date },
  dateTo: { type: Date },
  tripRoute: { type: String },
  startKM: { type: Number },
  startKMPhoto: { type: String }, // URL to Firebase or storage
  endKM: { type: Number },
  endKMPhoto: { type: String }, // URL to Firebase or storage
  startTime: { type: String },
  endTime: { type: String },
  customerSignature: { type: String }, // URL to Firebase or storage
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date },
});

module.exports = mongoose.model("DutySlip", DutySlipSchema);
