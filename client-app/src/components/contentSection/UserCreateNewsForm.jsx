import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../utils/formValidateNews.js';
import FileInputComponent from './FileInputComponent.jsx';
import PropTypes from 'prop-types';

class FormNews extends PureComponent {

  renderField = props => {
    const { input, label, type, className, meta: { touched, error } } = props;

    return (
      <Fragment>
        <input
          {...input}
          placeholder={label === 'Tags' ? 'Please enter tags, separated by commas...' : label}
          type={type}
          className={className}
        />
        {touched && (error && <div className="text-danger text-danger-custom">{error}</div>)}
      </Fragment>
    );
  };

  renderTextarea = props => {
    const { input, label, type, className, meta: { touched, error } } = props;

    return (
      <Fragment>
        <textarea {...input} placeholder={label} type={type} className={className} rows={5} />
        {touched && (error && <div className="text-danger text-danger-custom">{error}</div>)}
      </Fragment>
    );
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <Fragment>
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header create-news-form-header">
            <h5 className="modal-title create-news-form-title">Create news</h5>
          </div>
          <div className="modal-body create-news-form-body">
            <Field
              name="title"
              component={this.renderField}
              type="text"
              className="form-control"
              label="Title"
            />
            <Field
              name="text"
              component={this.renderTextarea}
              type="text"
              className="form-control"
              label="Text"
            />
            <Field
              name="tags"
              component={this.renderField}
              type="text"
              className="form-control"
              label="Tags"
            />
            <Field
              name="picture"
              component={properties => <FileInputComponent {...properties} />}
              type="file"
              accept=".jpg, .png, .jpeg"
              className="input-file-label"
              label="Image"
            />
          </div>
          <div className="modal-footer create-news-form-footer">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              Create
            </button>
          </div>
        </form>
      </Fragment>
    );
  }

}

FormNews.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const ConnectedForm = reduxForm({ form: 'formNews', validate })(FormNews);

export default ConnectedForm;
