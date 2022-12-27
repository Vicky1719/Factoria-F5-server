function isValidPassword(password) {
  const passwordSegurity =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordSegurity.test(password)) {
    return true;
  } else {
    return false;
  }
}

module.exports = isValidPassword;
