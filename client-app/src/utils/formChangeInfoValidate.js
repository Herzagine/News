export const validate = values => {
  const errors = {};

  if (!values.name && values.surname) {
    errors.name = 'Name field is required to fill if you fill the surname field!';
  } else if (values.name && !values.surname) {
    errors.surname = 'Surname field is required to fill if you the fill name field!';
  }

  return errors;
};
