const Validator = require("validator");
const isEmpty = require("../utility/is-empty")

module.exports = registerInputValidation = (data) => {
  let errors = {};
  // name, email, phoneno, age, password
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.phoneno = isEmpty(data.phoneno) ? "" : data.phoneno;
  data.age = isEmpty(data.age) ? "" : data.age;
  data.password = isEmpty(data.password) ? "" : data.password;

  //Name validation
  if (!Validator.isLength(data.name, { min: 2, max: 25 })) {
    errors.name = "Name must contains min 2 and max 25 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }

  //Password validation
  if( !(/.*[a-z].*/.test(data.password) && 
        /.*[A-Z].*/.test(data.password) && 
        /.*[0-9].*/.test(data.password) && 
        /.*[!@#$%^&].*/.test(data.password)
       )
    ){

        errors.password = "Password must be according to the policy, click (?) for more info";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be of atleast 6 characters";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password can not be empty";
  }
  

  //Email validation
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }

  //Phone number validation
  if(!(/^[0-9]{10}$/.test(data.phoneno))){
    errors.phoneno = "Phone number should be numeric only"
  }

  if (!Validator.isLength(data.phoneno, { min : 10, max : 10 }) ) {
    errors.phoneno = "Phone number must have 10 digits";
  }

  if (isEmpty(data.phoneno)) {
    errors.phoneno = "Phone number can not be empty";
  }

  //Age validation
  if(!/^[0-9]{1,3}$/.test(data.age)){
    errors.age = "Age can only be positive integer"
  }

  if (isEmpty(data.age)) {
    errors.age = "Age can not be empty";
  }
 

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
