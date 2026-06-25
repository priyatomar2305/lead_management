const Lead = require("../models/Lead");
const { v4: uuidv4 } = require("uuid");

exports.createLead = async (req, res) => {
  try {
    const trackingId = uuidv4();

    const lead = await Lead.create({
      ...req.body,
      trackingId
    });

    res.status(201).json(lead);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const total = await Lead.countDocuments();

    const opened = await Lead.countDocuments({
      emailOpened: true
    });

    const clicked = await Lead.countDocuments({
      linkClicked: true
    });

    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      total,
      opened,
      clicked,
      leads,
      openRate: total ? (opened / total) * 100 : 0,
      clickRate: total ? (clicked / total) * 100 : 0
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};