function Validate(values) {
  let error = {};

  if (values.email[0] === "") {
    error.email = "Email should not be empty";
  } else {
    error.email = "";
  }

  if (values.password[0] === "") {
    error.password = "Password should not be empty";
  } else {
    error.password = "";
  }

  return error;
}
export default Validate;
