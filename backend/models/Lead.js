const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    company: {
      type: String
    },

    requirement: {
      type: String,
      required: true
    },

    trackingId: String,

    emailSent: {
      type: Boolean,
      default: false
    },

    emailOpened: {
      type: Boolean,
      default: false
    },

    linkClicked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Lead", LeadSchema);