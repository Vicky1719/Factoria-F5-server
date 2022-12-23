const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const creationRoutes = require("./creation.routes");
router.use("/creation", creationRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

module.exports = router;