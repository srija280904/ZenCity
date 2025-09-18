import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  timestamp: { type: Date, default: Date.now },
  acknowledged: { type: Boolean, default: false }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;