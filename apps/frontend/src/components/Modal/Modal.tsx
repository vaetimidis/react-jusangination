import type { FC, PropsWithChildren } from 'react';
import React, { useState } from 'react';

import './style.scss';
import { createPortal } from 'react-dom';

export const Modal: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(<div className="modal-wrapper">{children}</div>, document.body);
};
