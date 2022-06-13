const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUsed, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUsed, newOrder);

router.route("/order/:id").get(isAuthenticatedUsed, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUsed, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUsed, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUsed, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUsed, authorizeRoles("admin"), deleteOrder);

module.exports = router;
