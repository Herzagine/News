import React, { memo, Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { authorizeUserSuccess } from '../../store/users/usersActions';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN, LOGIN } from '../../utils/const.js';

const GoogleAuthComponent = props => {
  const { login, token: accessToken } = props.match.params;
  const dispatch = useDispatch();
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (accessToken && login) {
      dispatch(authorizeUserSuccess({ accessToken, login }));
      window.localStorage.setItem(ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(LOGIN, login);
      setLogged({ isLogged: true });
    }
  }, [
    accessToken,
    dispatch,
    login,
  ]);

  return (
    isLogged ? (
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

export default memo(GoogleAuthComponent);

GoogleAuthComponent.propTypes = { match: PropTypes.objectOf(PropTypes.objectOf).isRequired };
