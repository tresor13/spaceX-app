function profileDataValidator(user) {
  const urlLinkRegExp = "https?://.*.(?:png|jpg)";
  const mobileRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  if (!user.urlUserpic.match(urlLinkRegExp)) {
    alert("Broken Link, try another one!");
    return false;
  } else if (!user.mobile.match(mobileRegExp)) {
    alert("Wrong mobile format! insert 10 numbers");
    return false;
  }

  return user;
}

export default profileDataValidator;
