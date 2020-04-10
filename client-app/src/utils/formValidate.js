const passwordMinLength = 8;
const emailRegExp = new RegExp('[0-9a-z_]+@[0-9a-z_^.]+.+[a-z]{2,5}', 'u');

export const validate = (values, { type }) => {
  const errors = {};
  const regCondition = type === 'reg';

  if (!values.email) {
    errors.email = 'E-mail field is required to fill!';
  } else if (!values.password) {
    errors.password = 'Password field is required to fill!';
  } else if (!emailRegExp.test(values.email) || values.email.indexOf('/') + 1 !== 0) {
    errors.email = 'This is not e-mail!';
  } else if (values.password.length < passwordMinLength) {
    errors.password = 'Password shouldn`t be less then 8 symbols!';
  } else if (regCondition && !values.passwordRepeat) {
    errors.passwordRepeat = 'Password repeat field is required to fill!';
  } else if (regCondition && values.passwordRepeat.length < passwordMinLength) {
    errors.passwordRepeat = 'Password repeat shouldn`t be less then 8 symbols!';
  } else if (regCondition && values.password && values.passwordRepeat !== values.password) {
    errors.passwordRepeat = 'There is a password or password repeat error!';
  }

  return errors;
};
