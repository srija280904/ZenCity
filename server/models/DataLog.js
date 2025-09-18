import mongoose from 'mongoose';

const dataLogSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['traffic', 'air_quality', 'waste_level','energy'] },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  location: { 
    lat: { type: Number },
    lng: { type: Number }
  },
  timestamp: { type: Date, default: Date.now }
});

const DataLog = mongoose.model('DataLog', dataLogSchema);
export default DataLog;