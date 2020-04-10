import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { requestUserFromServer } from '../../store/users/usersActions';
import { sendNewsToServer } from '../../store/news/newsActions';
import { NEWS_ON_PAGE, LOGIN, USER_TOKEN, TITLE, TEXT, PICTURE, TAGS } from '../../utils/const.js';
import { reset } from 'redux-form';
import MemodPaginationComponent from './PaginationComponent.jsx';
import MemodNewsComponent from '../contentSection/NewsComponent.jsx';
import MemodUserChangeInfoComponent from './UserChangeInfoComponent.jsx';
import config from '../../config';
import PropTypes from 'prop-types';

import ConnectedForm from './UserCreateNewsForm.jsx';

class UserPageComponent extends PureComponent {

  componentDidMount() {
    const {
      userToken,
      requestUserFromServer: requestUserFromServerExec,
      match: { params: { login } },
    } = this.props;

    requestUserFromServerExec({ login, userToken });
  }

  handleSubmitForm = values => {
    const {
      userToken,
      sendNewsToServer: sendNewsToServerExec,
      reset: resetExec,
      match: { params: { login } },
    } = this.props;
    const formData = new FormData();

    if (values.picture) {
      formData.append(PICTURE, values.picture, values.picture.name);
    }
    if (values.tags) {
      formData.append(TAGS, values.tags);
    }

    formData.append(USER_TOKEN, userToken);
    formData.append(LOGIN, login);
    formData.append(TEXT, values.text);
    formData.append(TITLE, values.title);

    sendNewsToServerExec(formData);
    resetExec('formNews');
  }

  render() {
    const {
      currentUserPage,
      newsAfterSearch,
      newsToView,
      userLogin,
      match: { params: { login } },
    } = this.props;

    const { name = '', surname = '', photoPass } = currentUserPage;

    const photoLink = photoPass && photoPass.indexOf('googleusercontent.com') + 1
      ? photoPass
      : `${config.host}/users/images/${login}`;

    return (
      <div className="user-page-block">
        <div className="user-information">
          <div className="user-photo">
            <img
              src={photoPass
                ? photoLink
                : 'https://image.flaticon.com/icons/svg/74/74472.svg'}
              alt="User"
            />
          </div>
          <div className="user-name-surname">
            {name && surname ? `${name} ${surname}` : 'Anonymous'}
            { login === userLogin && <MemodUserChangeInfoComponent />}
          </div>
        </div>
        {login === userLogin
          && (
            <div className="user-create-news-form">
              <ConnectedForm onSubmit={this.handleSubmitForm} />
            </div>
          )}
        {newsToView.length > 0 && (
          <Fragment>
            {newsAfterSearch.length > NEWS_ON_PAGE && <MemodPaginationComponent />}
            <MemodNewsComponent newsToView={newsToView} />
          </Fragment>
        )}
      </div>
    );
  }

}

UserPageComponent.propTypes = {
  currentUserPage: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  newsAfterSearch: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  newsToView: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  requestUserFromServer: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  sendNewsToServer: PropTypes.func.isRequired,
  userLogin: PropTypes.string.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentUserPage: state.usersReducer.currentUserPage,
  newsAfterSearch: state.newsReducer.newsAfterSearch,
  newsToView: state.newsReducer.newsToView,
  userLogin: state.usersReducer.userLogin,
  userToken: state.usersReducer.userToken,
});

const mapDispatchToProps = { requestUserFromServer, reset, sendNewsToServer };

export default connect(mapStateToProps, mapDispatchToProps)(UserPageComponent);
