import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DriverSchema = new mongoose.Schema({
  driverId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  emergencyName: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  branch: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  panNumber: { type: String, required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String },
  profilePic: { type: String }, // Add this line for profile picture URL
});

// Hash password before saving
DriverSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.password === null || !this.password) {
    try {
      // Extract last 5 digits of driver's contact
      if (this.contact) {
        const driverContact = this.contact;
        const lastFiveDigits = driverContact.slice(-5);
        this.password = lastFiveDigits;
      } else {
        this.password = this.contact;
      }
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next(); 
  }
});

// Compare password
DriverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Driver", DriverSchema);
