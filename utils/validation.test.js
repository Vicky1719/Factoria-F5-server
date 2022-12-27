const isValidPassword = require("../utils/validation");

test("validar una contraseña valida", () => {
  expect(isValidPassword("Navidad22.")).toBe(true);
});

test("validar una contraseña no valida", () => {
  expect(isValidPassword("Navidad")).toBe(false);
});
