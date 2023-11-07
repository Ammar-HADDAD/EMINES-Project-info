function Validate(values) {
  let error = {};
  const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (values.username === "") {
    error.username = "Username should not be empty";
  } else {
    error.username = "";
  }

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Password must be 8+ characters with at least 1 digit, 1 lowercase, and 1 uppercase letter";
  } else {
    error.password = "";
  }
  //   if (values.password === values.confirm_password) {
  //     error.confirm_password = "";
  //   } else {
  //     error.confirm_password = "Passwords didn't match";
  //   }
  return error;
}
export default Validate;
