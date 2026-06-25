const router = require("express").Router();

const { body, validationResult } =
  require("express-validator");

const { v4: uuidv4 } = require("uuid");

const Lead = require("../models/Lead");

const sendEmail =
  require("../utils/sendEmail");

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
    body("requirement").notEmpty()
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const trackingId = uuidv4();

      const lead = await Lead.create({
        ...req.body,
        trackingId
      });

      try {
        await sendEmail(lead);

        lead.emailSent = true;

        await lead.save();
      } catch (emailError) {
        console.log(
          "Email Error:",
          emailError.message
        );
      }

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        lead
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);

router.get("/open/:id", async (req, res) => {

  await Lead.findOneAndUpdate(
    {
      trackingId: req.params.id
    },
    {
      emailOpened: true
    }
  );

  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");

  res.send(pixel);
});

router.get("/click/:id", async (req, res) => {

  await Lead.findOneAndUpdate(
    {
      trackingId: req.params.id
    },
    {
      linkClicked: true
    }
  );

  res.redirect("https://google.com");
});

router.get("/dashboard", async (req, res) => {

  const total =
    await Lead.countDocuments();

  const opened =
    await Lead.countDocuments({
      emailOpened: true
    });

  const clicked =
    await Lead.countDocuments({
      linkClicked: true
    });

  const leads =
    await Lead.find()
      .sort({ createdAt: -1 })
      .limit(10);

  res.json({
    total,
    opened,
    clicked,
    leads,
    openRate:
      total > 0
        ? (opened / total) * 100
        : 0,

    clickRate:
      total > 0
        ? (clicked / total) * 100
        : 0
  });
});

module.exports = router;