const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUsed } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUsed, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUsed, sendStripeApiKey);
module.exports = router;
