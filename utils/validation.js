function isValidPassword(password) {
  const passwordSegurity =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordSegurity.test(password)) {
    console.log("patata", password);
    return true;
  } else {
    console.log("ensalada", password);
    return false;
  }
}

module.exports = isValidPassword;
