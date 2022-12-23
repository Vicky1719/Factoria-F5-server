const router = require("express").Router();
const Creation = require("../models/Creation.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const uploader = require("../middlewares/cloudinary.js")

//GET lista de creaciones
router.get("/", async (req, res, next) => {
  try {
    const response = await Creation.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//POST crear creacion
router.post("/create", isAuthenticated, uploader.single("image"), async (req, res, next) => {
  const newCreation = {
    name: req.body.name,
    image: req.body.image,
    user: req.payload._id,
  };

  try {
    const response = await Creation.create(newCreation);

    res.status(201).json("Nueva creacion creada");
  } catch (error) {
    next(error);
  }
});

//PATH Edita una creacion
router.patch("/:creationId/edit", isAuthenticated, async (req, res, next) => {
  const creationUpdate = {
    name: req.body.name,
    image: req.body.image,
    user: req.payload._id,
  };

  try {
    await Creation.findByIdAndUpdate(req.params.creationId, creationUpdate);
    res.status(200).json("Creación actualizada");
  } catch (error) {
    next(error);
  }
});

//GET mis creaciones
router.get("/my-creation", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Creation.find({
      user: req.payload._id,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//DELETE Borrar creacion
router.delete(
  "/:creationId/delete",
  isAuthenticated,
  async (req, res, next) => {
    try {
      await Creation.findByIdAndDelete(req.params.creationId);
      res.status(200).json("Creación borrada");
    } catch (error) {
      next(error);
    }
  }
);


//PATCH  creaciones favoritas
router.patch(
  "/:creationId/favorites",
  isAuthenticated,
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { favorites: req.params.creationId },
      });
      res.status(200).json("Creación agregada a favoritos");
    } catch (error) {
      next(error);
    }
  }
);



//DELETE borrar de favoritos
router.patch(
  "/:creationId/delete-favorites",
  isAuthenticated,
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: { favorites: req.params.creationId },
      });
      res.status(200).json("Creación borrada de favoritos");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;