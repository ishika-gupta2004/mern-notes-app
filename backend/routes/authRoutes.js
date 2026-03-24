const router = require("express").Router();
const User = require("../models/User");
// const authMiddleware = require("../middleware/authMiddleware");


const{register,login} = require ("../controllers/authController");

router.post("/register",register);
router.post("/login",login);

// router.get("/me", authMiddleware, async (req, res) => {

//   const user = await User.findById(req.user.id).select("-password");

//   res.json({ user });
// });
module.exports = router;