const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", CompanySchema);
