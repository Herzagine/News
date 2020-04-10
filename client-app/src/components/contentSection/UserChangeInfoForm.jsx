import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../utils/formChangeInfoValidate.js';
import { Spinner } from 'react-bootstrap';
import FileInputComponent from './FileInputComponent.jsx';
import PropTypes from 'prop-types';

class UserChangeInfoForm extends PureComponent {

  renderField = props => {
    const { input, label, type, className, meta: { touched, error } } = props;

    return (
      <Fragment>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={className}
        />
        {touched && (error && <div className="text-danger text-danger-custom">{error}</div>)}
      </Fragment>
    );
  };

  render() {
    const { handleSubmit, submitting, pristine, processing, openCloseFunc } = this.props;

    return (
      <Fragment>
        <div className="dark-overlay" />
        <form onSubmit={handleSubmit} className="modal-content modal-change-info">
          <div className="modal-header">
            <h5 className="modal-title">Change info</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={openCloseFunc}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Field
              name="name"
              component={this.renderField}
              type="text"
              className="form-control input-login"
              label="Name"
            />
            <Field
              name="surname"
              component={this.renderField}
              type="text"
              className="form-control input-login"
              label="Surname"
            />
            <Field
              name="picture"
              component={properties => <FileInputComponent {...properties} />}
              type="file"
              accept=".jpg, .png, .jpeg"
              className="input-file-label input-file-change-info"
              label="Image"
            />
          </div>
          <div className="modal-footer">
            { processing && <Spinner /> }
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }

}

const ConnectedForm = reduxForm({ form: 'formChangeInfo', validate })(UserChangeInfoForm);

UserChangeInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  openCloseFunc: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default ConnectedForm;
