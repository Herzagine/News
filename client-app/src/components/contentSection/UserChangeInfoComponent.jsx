import React, { memo, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeModalChangeStatus, changeUser } from '../../store/users/usersActions';
import ConnectedForm from './UserChangeInfoForm.jsx';

const UserChangeInfoComponent = () => {
  const { modalChangeIsOpen, userLogin, userToken, processing } = useSelector(state => ({
    modalChangeIsOpen: state.usersReducer.modalChangeIsOpen,
    processing: state.usersReducer.processing,
    userLogin: state.usersReducer.userLogin,
    userToken: state.usersReducer.userToken,
  }));

  const dispatch = useDispatch();

  const openOrCloseModalChange = () => {
    dispatch(changeModalChangeStatus());
  };

  const onSubmitFunction = values => {
    dispatch(changeUser({ userLogin, userToken, values }));
    dispatch(changeModalChangeStatus());
  };

  return (
    <Fragment>
      <button type="button" className="edit-user-inf-button" onClick={openOrCloseModalChange} />
      {modalChangeIsOpen
        && (
          <ConnectedForm
            openCloseFunc={openOrCloseModalChange}
            onSubmit={onSubmitFunction}
            processing={processing}
          />
        )}
    </Fragment>
  );
};

export default memo(UserChangeInfoComponent);
