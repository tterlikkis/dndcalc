export const THEME_KEY = 'theme';
export const LIGHT_THEME = 'theme-light';
export const DARK_THEME = 'theme-dark';

export function setTheme(themeName: string): void {
  localStorage.setItem(THEME_KEY, themeName);
  document.documentElement.className = themeName;
}

export function keepTheme(): void {
  const stored = localStorage.getItem(THEME_KEY);
  if (!!stored) {
    if (stored === DARK_THEME) {
      setTheme(DARK_THEME);
    }
    else if (stored === LIGHT_THEME) {
      setTheme(LIGHT_THEME);
    }
  }
  else {
    setTheme(DARK_THEME);
  }
}