import { FC, PropsWithChildren } from 'react';
import './style.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <header className="layout-header">
                <button className="layout-header__button">SIGN IN</button>
            </header>
            {children}
        </div>
    );
};
