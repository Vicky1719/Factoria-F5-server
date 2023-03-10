const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middlewares");
const isValidPassword = require("../utils/validation");

//(signup y login)

//POST  registro usuario
router.post("/signup", async (req, res, next) => {
  const { firstname, username, email, password } = req.body;

  //1. validaciones de backend
  if (!firstname || !username || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Debe cumplimentar todos los campos" });
    return;
  }

  //validar la contraseña
  if (!isValidPassword(password)) {
    res
      .status(406)
      .json({
        errorMessage:
          "La contraseña debe tener mñinimo 8 caracteres, una mayúscula y un número",
      });
    return;
  }

  try {
    // Validar usuario
    if (username.length < 4) {
      res.status(400).json({
        errorMessage: "El nombre de usuario debe tener mínimo 4 caracteres",
      });
      return;
    }
    // Validar Email
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail !== null) {
      res.status(406).json({ errorMessage: "Email ya registrado" });
      return;
    }

    // Validacion Usuario
    const foundUser = await User.findOne({ username: username });
    if (foundUser !== null) {
      res.status(406).json({ errorMessage: "Usuario ya registrado." });
      return;
    }
    //2. codificar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstname: firstname,
      username: username,
      email: email,
      password: hashPassword,
    };

    //3. crear usuario
    await User.create(newUser);

    //4. enviar mensaje de OK al frontend
    res.status(201).json("Usuario registrado correctamente");
  } catch (error) {
    next(error);
  }
});

//POST validación  login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  //1. validaciones de backend

  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: " Debe tener usuario y contraseña" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
      return;
    }

    //2. creación de sesión (TOKEN)
    const payload = {
      _id: foundUser._id,
      firstname: foundUser.firstname,
      username: foundUser.username,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//GET "api/auth/verify" =>
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json({ user: req.payload });
});

module.exports = router;
