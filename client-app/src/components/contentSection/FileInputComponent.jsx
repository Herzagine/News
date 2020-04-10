import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FieldFileInput extends PureComponent {

  onChange = event => {
    const { input: { onChange } } = this.props;

    onChange(event.target.files[0]);
  }

  render() {
    const { className } = this.props;

    return (
      <div>
        <label htmlFor="file-input-form">
          <div className={className}>Choose image</div>
          <div>
            <input
              name="picture"
              id="file-input-form"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={this.onChange}
              className="form-control-file"
            />
          </div>
        </label>
      </div>
    );
  }

}

FieldFileInput.propTypes = {
  className: PropTypes.string.isRequired,
  input: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
