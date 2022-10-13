function profileDataValidator(user) {
  const urlLinkRegExp = "https?://.*.(?:png|jpg)";
  const mobileRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  let errors = {};
  let hasErrors = false;

  if (!user.urlUserpic.match(urlLinkRegExp)) {
    errors = {
      ...errors,
      urlUserpic: "Broken Link, try another one!"
    }
    hasErrors = true;
  }
  if (!user.mobile.match(mobileRegExp)) {
    errors = {
      ...errors,
      mobile: "Wrong mobile format! insert 10 numbers"
    }
    hasErrors = true;
  }

  return {
    user,
    hasErrors,
    errors
  };
}

export default profileDataValidator;
