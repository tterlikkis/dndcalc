import { useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME, setTheme, THEME_KEY } from "../../utilities/themes";
import "./ThemeToggle.css"

export function ThemeToggle() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = localStorage.getItem(THEME_KEY);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    setIsDarkMode(stored === DARK_THEME);
  }, [theme])

  function handleOnClick() {
    if (localStorage.getItem(THEME_KEY) === DARK_THEME) {
      setTheme(LIGHT_THEME);
      setIsDarkMode(false);
    }
    else {
      setTheme(DARK_THEME);
      setIsDarkMode(true);
    }
  }

  return (
    <label className="toggle">
      Dark Mode
      <input type="checkbox" id="toggle" checked={isDarkMode} onClick={handleOnClick} />
    </label>
  );

}