const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (lead) => {
  const openPixel =
    `http://localhost:5000/api/leads/open/${lead.trackingId}`;

  const clickLink =
    `http://localhost:5000/api/leads/click/${lead.trackingId}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: lead.email,
    subject: "Thank You",

    html: `
      <h2>Hi ${lead.name}</h2>

      <p>Thank you for contacting us.</p>

      <p><strong>Requirement:</strong></p>

      <p>${lead.requirement}</p>

      <a href="${clickLink}">
        Learn More
      </a>

      <img
        src="${openPixel}"
        width="1"
        height="1"
      />
    `
  });
};

module.exports = sendEmail;