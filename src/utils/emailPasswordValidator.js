function isValid(email, password) {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regExp) && password.length >= 6) {
    return true;
  }
  alert(
    "Wrong format!!! \n Email must be in format: example@example.com \n Password length must be 6 or more characters/numbers"
  );
}

export default isValid;
