import DataLog from '../models/DataLog.js';
//old
// export const getDashboardData = async (req, res) => {
//   try {
//     const traffic = await DataLog.findOne({ type: 'traffic' }).sort({ timestamp: -1 });
//     const airQuality = await DataLog.findOne({ type: 'air_quality' }).sort({ timestamp: -1 });
//     const wasteLevel = await DataLog.findOne({ type: 'waste_level' }).sort({ timestamp: -1 });

//     const trafficHistory = await DataLog.find({ type: 'traffic' }).sort({ timestamp: -1 }).limit(20);
//     const airQualityHistory = await DataLog.find({ type: 'air_quality' }).sort({ timestamp: -1 }).limit(1);

//     res.json({
//       latest: { traffic, airQuality, wasteLevel },
//       history: {
//         traffic: trafficHistory.reverse(),
//         airQuality: airQualityHistory,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
//new
export const getDashboardData = async (req, res) => {
  try {
    // Fetch latest log for each type
    const traffic = await DataLog.findOne({ type: 'traffic' }).sort({ timestamp: -1 });
    const airQuality = await DataLog.findOne({ type: 'air_quality' }).sort({ timestamp: -1 });
    const wasteLevel = await DataLog.findOne({ type: 'waste_level' }).sort({ timestamp: -1 });
    const energy = await DataLog.findOne({ type: 'energy' }).sort({ timestamp: -1 }); // Fetch latest energy log

    // Fetch history for charts
    const trafficHistory = await DataLog.find({ type: 'traffic' }).sort({ timestamp: -1 }).limit(20);
    const energyHistory = await DataLog.find({ type: 'energy' }).sort({ timestamp: -1 }).limit(20); // Fetch energy history

    res.json({
      latest: { traffic, airQuality, wasteLevel, energy }, // Add energy to latest
      history: {
        traffic: trafficHistory.reverse(),
        energy: energyHistory.reverse(), // Add energy to history
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getReportData = async (req, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const trafficReport = await DataLog.aggregate([
      { $match: { type: 'traffic', timestamp: { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: { $dayOfWeek: '$timestamp' },
          avgCongestion: { $avg: '$value.congestion' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ trafficReport });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};