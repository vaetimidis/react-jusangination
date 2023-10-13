import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useContext, useState } from 'react';

const THEME_KEY = '__THEME__';
const HTML = document.querySelector('html');

enum Theme {
  Light = 'light',
  Dark = 'dark'
}

interface IThemeProps {
  theme: Theme | string;
  swithTheme: () => void;
}

const ThemeContext = createContext<IThemeProps | null>(null);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | string>(
    localStorage.getItem(THEME_KEY) || Theme.Light
  );

  const swithTheme = () => {
    const value = theme === Theme.Light ? Theme.Dark : Theme.Light;

    localStorage.setItem(THEME_KEY, value);

    // if (value === Theme.Light) {
    //   console.log('light');
    // } else {
    //   console.log('dark');
    // }
    value === Theme.Light ? HTML?.classList.add('dark') : HTML?.classList.remove('dark');

    setTheme(value);
  };

  return <ThemeContext.Provider value={{ theme, swithTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): IThemeProps => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Missing ThemeContext');
  }

  return theme;
};

export default useTheme;
