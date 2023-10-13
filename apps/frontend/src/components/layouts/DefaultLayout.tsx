import './style.scss';

import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';

import { FcFlashOn, FcFlashOff } from 'react-icons/fc';

import { AuthContent } from '#/components/AuthContent/AuthContent';
import { Modal } from '#/components/Modal/Modal';
import useTheme, { Theme } from '#/contexts/theme';

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const { theme, switchTheme } = useTheme();

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <button className="toggle-theme" onClick={switchTheme}>
          {theme === Theme.Light ? <FcFlashOff /> : <FcFlashOn />}
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
