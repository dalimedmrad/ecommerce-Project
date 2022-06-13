const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const { isAuthenticatedUsed, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUsed, getUserDetails);
router.route("/password/update").put(isAuthenticatedUsed, updatePassword);
router.route("/me/update").put(isAuthenticatedUsed, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUsed, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUsed, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUsed, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUsed, authorizeRoles("admin"), deleteUser);

module.exports = router;
