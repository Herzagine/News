import React, { memo, Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { createError } from '../../store/news/newsActions';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GoogleAuthErrorComponent = props => {
  const { message } = props.match.params;
  const dispatch = useDispatch();
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (message) {
      dispatch(createError(message));
      setError({ isError: true });
    }
  }, [message, dispatch]);

  return (
    isError ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <section className="main-content">
          <Spinner animation="grow" variant="dark" />
        </section>
      </Fragment>
    )
  );
};

export default memo(GoogleAuthErrorComponent);

GoogleAuthErrorComponent.propTypes = { match: PropTypes.objectOf(PropTypes.objectOf).isRequired };
