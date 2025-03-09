const mongoose = require("mongoose");

const DutySlipSchema = new mongoose.Schema({
  dutySlipId: { type: String, required: true, unique: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  companyName: { type: String, required: true },
  customerName: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  carBooked: { type: String },
  phoneNumber: { type: String },
  dutyType: { type: String },
  driverName: { type: String },
  carNumber: { type: String },
  dateFrom: { type: Date },
  dateTo: { type: Date },
  tripRoute: { type: String },
  startKM: { type: Number },
  startKMPhoto: { type: String }, // URL to Firebase or storage
  endKM: { type: Number },
  endKMPhoto: { type: String }, // URL to Firebase or storage
  customerSignature: { type: String }, // URL to Firebase or storage
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DutySlip", DutySlipSchema);
