const handleErrors = (err) => {
  let errorsObj = { name: "", email: "", password: "", age: "" };

  if (err.message === "incorrect email") {
    errorsObj.email = "Email not registered";
  } else if (err.message === "incorrect password") {
    errorsObj.password = "Incorrect password";
  } else if (err.message.includes("User validation failed")) {
    const errors = Object.values(err.errors);
    errors.forEach((err) => {
      errorsObj[err.properties.path] = err.properties.message;
    });
  } else if (err.code === 11000) {
    errorsObj.email = "Email already exists";
  }

  return errorsObj;
};

module.exports = { handleErrors };
