import type { FC } from 'react';
import React from 'react';
import './style.scss';

export const AuthContent: FC<{ handleOpen: () => void }> = (props) => {
  const { handleOpen } = props;

  return (
    <div className="auth-wrapper">
      <button className="close-modal" onClick={handleOpen}>
        X
      </button>
      <div className="auth-wrapper__inputs">
        LOGIN
        <input className="auth-login" type="text" />
        PASSWORD
        <input className="auth-password" type="text" />
      </div>
      <div className="auth-wrapper__btns">
        <button className="auth-signin">SIGN IN</button>
        <button className="auth-signup">NOT SMESHARIK?</button>
      </div>
    </div>
  );
};
