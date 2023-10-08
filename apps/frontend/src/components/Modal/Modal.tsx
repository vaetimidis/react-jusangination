import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import './style.scss';
import { createPortal } from 'react-dom';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal: FC<IModalProps> = ({ children, isOpen }) => {
  return !isOpen
    ? null
    : createPortal(<div className="modal-wrapper">{children}</div>, document.body);
};
