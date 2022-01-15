const handleErrors = (err) => {
  let errorsObj = { name: "", email: "", password: "", age: "" };
  if (err.message.includes("User validation failed")) {
    const errors = Object.values(err.errors);
    errors.forEach((err) => {
      console.log(err.properties);
      errorsObj[err.properties.path] = err.properties.message;
    });
  } else if (err.code === 11000) {
    errorsObj.email = "Email already exists";
  }
  console.log(errorsObj);
  return errorsObj;
};

module.exports = { handleErrors };
