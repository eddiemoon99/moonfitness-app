export const registerValidate = (inputs) => {
  const error = { result: false, errors: {} };
  if (inputs.password !== inputs.confirmPassword) {
    error.errors['confirmPassword'] = 'Passwords do not match.';
    error.result = true;
  }
  if (inputs.password.length < 8) {
    error.errors['password'] = 'Password has to be at least 8 characters long.';
    error.result = true;
  }
  if (inputs.username.length < 4) {
    error.errors['username'] = 'Username must be at least 4 characters long.';
    error.result = true;
  }
  return error;
};

export const editValidate = (inputs) => {
  const error = { result: false, errors: {} };
  if (inputs.username.length < 4) {
    error.errors['username'] = 'Username must be at least 4 characters long.';
    error.result = true;
  }
  return error;
};
