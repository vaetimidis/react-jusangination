import type { FC, PropsWithChildren } from 'react';
import { Modal } from '../Modal/Modal';
import { AuthContent } from '../AuthContent/AuthContent';

import './style.scss';
import React, { useState } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <button className="layout-header__button" onClick={handleOpen}>
          Sign up
        </button>
        <Modal isOpen={isOpen}>
          <AuthContent handleOpen={handleOpen} />
        </Modal>
      </header>
      {children}
    </div>
  );
};
