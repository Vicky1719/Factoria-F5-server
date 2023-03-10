const router = require("express").Router();
const User = require("../models/User.model");

const { isAuthenticated } = require("../middlewares/auth.middlewares");

//GET mi perfil
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH editar usuario
router.patch("/:userId/edit", isAuthenticated, async (req, res, next) => {
  const userUpdate = {
    firstname: req.body.firstname,
    username: req.body.username,
  };

  try {
    await User.findByIdAndUpdate(req.payload._id, userUpdate);

    res.status(200).json("Actualizar perfil");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
