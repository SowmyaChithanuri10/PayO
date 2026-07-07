import React, {createContext, useContext, useState} from "react";
import {LightTheme, DarkTheme} from "./colors";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? DarkTheme : LightTheme,
        isDark,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);