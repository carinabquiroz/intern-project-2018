const isGoodUsername = username => {
  const goodUsernameRegex = RegExp("^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
  return goodUsernameRegex.test(username);
}

export default isGoodUsername;
