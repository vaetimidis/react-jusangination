import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

const THEME_KEY = '__THEME__';
const HTML = document.querySelector('html');

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

interface IThemeProps {
  theme: Theme | string;
  switchTheme: () => void;
}

const ThemeContext = createContext<IThemeProps | null>(null);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const savedTheme = (localStorage.getItem(THEME_KEY) as Theme) ?? Theme.Light;

  const [theme, setTheme] = useState<Theme>(savedTheme);

  const switchTheme = () => {
    const value = theme === Theme.Light ? Theme.Dark : Theme.Light;

    localStorage.setItem(THEME_KEY, value);

    HTML?.classList.replace(value, value === Theme.Light ? Theme.Dark : Theme.Light);

    setTheme(value);
  };

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): IThemeProps => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Missing ThemeContext');
  }

  return theme;
};

export default useTheme;
