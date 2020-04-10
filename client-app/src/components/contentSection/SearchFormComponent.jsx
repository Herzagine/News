import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { findNewsInTheStore } from '../../store/news/newsActions.js';
import PropTypes from 'prop-types';

class SearchFormComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selector: '', value: '' };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.newsFilter);
  }

  newsFilter = () => {
    const { selector, value } = this.state;

    this.props.findNewsInTheStore({ type: selector, value });
  }

  render() {
    return (
      <div className="form-container">
        <select
          className="form-control search-selector"
          defaultValue=""
          onChange={this.handleChange}
          name="selector"
        >
          <option value="">All</option>
          <option value="tags">Tag</option>
          <option value="user">Author</option>
        </select>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Pleace, input what we have to search..."
          onChange={this.handleChange}
          name="value"
        />
      </div>
    );
  }

}

SearchFormComponent.propTypes = { findNewsInTheStore: PropTypes.func.isRequired };

const mapDispatchToProps = { findNewsInTheStore };

export default connect(null, mapDispatchToProps)(SearchFormComponent);
