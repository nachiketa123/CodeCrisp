const isEmpty = require("../utility/is-empty")
module.exports = loginInputValidation = (data) =>{
    let errors = {}
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;

    if (isEmpty(data.email)) {
        errors.email = "Email can not be empty";
      }

      if (isEmpty(data.password)) {
        errors.password = "Password can not be empty";
      }

      return {errors, isValid: isEmpty(errors)}
}