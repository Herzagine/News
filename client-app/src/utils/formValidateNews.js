export const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title field is required to fill!';
  } else if (!values.text) {
    errors.text = 'Text field is required to fill!';
  }

  return errors;
};
