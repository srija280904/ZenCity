import Alert from '../models/Alert.js';

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ acknowledged: false }).sort({ timestamp: -1 }).limit(10);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};