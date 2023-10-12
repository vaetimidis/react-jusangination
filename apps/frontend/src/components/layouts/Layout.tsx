import type { FC, PropsWithChildren } from 'react';
import React, { useState } from 'react';

import { FcFlashOn, FcFlashOff } from 'react-icons/fc';

import useTheme, { ThemeProvider } from '../../contexts/theme';
import { AuthContent } from '../AuthContent/AuthContent';
import { Modal } from '../Modal/Modal';

import './style.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const { theme, swithTheme } = useTheme();

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <button className="toggle-theme" onClick={swithTheme}>
          {theme === 'light' ? <FcFlashOn /> : <FcFlashOff />}
        </button>

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
