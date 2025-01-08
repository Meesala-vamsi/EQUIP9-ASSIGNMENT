const express = require("express");
const {registerUser,loginUser,resourceAccess} = require("../controllers/authController");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/auth-check",resourceAccess,async (req,res)=>{
  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      message: "User is authenticated.",
      user,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "something went wrong",
    });
  }
})

module.exports = router;