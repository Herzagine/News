import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../utils/formValidate.js';
import config from '../../config';
import PropTypes from 'prop-types';

class Form extends PureComponent {

  renderField = props => {
    const { input, label, type, className, meta: { touched, error } } = props;

    return (
      <Fragment>
        <input {...input} placeholder={label} type={type} className={className} />
        {touched && (error && <div className="text-danger text-danger-custom">{error}</div>)}
      </Fragment>
    );
  };

  render() {
    const { handleSubmit, openCloseFunc, type, submitting, pristine } = this.props;

    return (
      <Fragment>
        <div className="dark-overlay" />
        <form onSubmit={handleSubmit} className="modal-content modal-auth">
          <div className="modal-header">
            <h5 className="modal-title">{type === 'auth' ? 'Authorization' : 'Registration'}</h5>
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
              name="email"
              component={this.renderField}
              type="text"
              className="form-control input-login"
              label="E-mail"
            />
            <Field
              name="password"
              component={this.renderField}
              type="password"
              className="form-control input-password"
              label="Password"
            />
            {type !== 'auth'
              && (
                <Field
                  name="passwordRepeat"
                  component={this.renderField}
                  type="password"
                  className="form-control input-password"
                  label="Repeat password"
                />
              )}
          </div>
          <div className="modal-footer modal-footer-auth">
            <a href={`${config.ngrok}/users/auth/google`}>
              <img src="https://image.flaticon.com/icons/svg/142/142378.svg" className="google-img" alt="" />
            </a>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              {type === 'auth' ? 'Sign-In' : 'Sign-Up'}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }

}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  openCloseFunc: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

const ConnectedForm = reduxForm({ form: 'formRegAuth', validate })(Form);

export default ConnectedForm;
