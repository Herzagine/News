import React, { memo, Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchAndSpinnerComponent = ({ newsToView, news }) => (
  <Fragment>
    {news.length === 0 && <Spinner animation="grow" variant="dark" />}
    {news.length > 0 && newsToView.length === 0 && 'Sorry, we have not any news which sutisfied your requires :('}
  </Fragment>
);

export default memo(SearchAndSpinnerComponent);

SearchAndSpinnerComponent.propTypes = {
  news: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  newsToView: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
