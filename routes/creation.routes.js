const router = require("express").Router();
const Creation = require("../models/Creation.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const uploader = require("../middlewares/cloudinary.js");

//GET lista de imágenes
router.get("/", async (req, res, next) => {
  try {
    const response = await Creation.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//POST crear imagen
router.post(
  "/create",
  isAuthenticated,
  uploader.single("image"),
  async (req, res, next) => {
    const newCreation = {
      name: req.body.name,
      image: req.body.image,
      user: req.payload._id,
    };

    try {
      const response = await Creation.create(newCreation);

      res.status(201).json("Nueva imagen creada");
    } catch (error) {
      next(error);
    }
  }
);

//PATH Edita una imagen
router.patch("/:creationId/edit", isAuthenticated, async (req, res, next) => {
  const creationUpdate = {
    name: req.body.name,
    image: req.body.image,
    user: req.payload._id,
  };

  try {
    await Creation.findByIdAndUpdate(req.params.creationId, creationUpdate);
    res.status(200).json("Imagen actualizada");
  } catch (error) {
    next(error);
  }
});

//GET Detalles de la imagen
router.get("/:creationId/detail", async (req, res, next) => {
  const { creationId } = req.params;
  try {
    const response = await Creation.findById(creationId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//GET mis imágenes
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

//DELETE Borrar imagen
router.delete(
  "/:creationId/delete",
  isAuthenticated,
  async (req, res, next) => {
    try {
      await Creation.findByIdAndDelete(req.params.creationId);
      res.status(200).json("Imagen borrada");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
