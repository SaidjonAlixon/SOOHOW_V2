export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_MANUAL_KEY = "theme-manual";

/** Kechki rejim: 20:00 dan. Kunduzgi rejim: 07:00 dan. */
const DARK_START_HOUR = 20;
const LIGHT_START_HOUR = 7;

export const THEME_CHANGE_EVENT = "soohow-theme-change";

export function getScheduledTheme(date = new Date()): Theme {
  const hour = date.getHours();
  if (hour >= DARK_START_HOUR || hour < LIGHT_START_HOUR) return "dark";
  return "light";
}

export function getMsUntilNextScheduleBoundary(now = new Date()): number {
  const next = new Date(now);
  const hour = now.getHours();

  if (hour >= DARK_START_HOUR || hour < LIGHT_START_HOUR) {
    if (hour >= DARK_START_HOUR) {
      next.setDate(next.getDate() + 1);
    }
    next.setHours(LIGHT_START_HOUR, 0, 0, 0);
  } else {
    next.setHours(DARK_START_HOUR, 0, 0, 0);
  }

  return Math.max(1000, next.getTime() - now.getTime());
}

export function getStoredTheme(): Theme | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return null;
}

function dispatchThemeChange(theme: Theme) {
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

export function applyTheme(theme: Theme, options?: { manual?: boolean }) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
  if (options?.manual) {
    localStorage.setItem(THEME_MANUAL_KEY, "1");
  }
  dispatchThemeChange(theme);
}

export function applyScheduledTheme(): Theme {
  localStorage.removeItem(THEME_MANUAL_KEY);
  const theme = getScheduledTheme();
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
  dispatchThemeChange(theme);
  return theme;
}

export function initTheme(): Theme {
  if (localStorage.getItem(THEME_MANUAL_KEY) === "1") {
    const theme = getStoredTheme() ?? getScheduledTheme();
    document.documentElement.classList.toggle("dark", theme === "dark");
    dispatchThemeChange(theme);
    return theme;
  }
  return applyScheduledTheme();
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === "dark" ? "light" : "dark";
  applyTheme(next, { manual: true });
  return next;
}

export function startThemeSchedule(): () => void {
  const syncIfAuto = () => {
    if (localStorage.getItem(THEME_MANUAL_KEY) === "1") return;
    const theme = getScheduledTheme();
    const isDark = document.documentElement.classList.contains("dark");
    const current: Theme = isDark ? "dark" : "light";
    if (theme !== current) applyScheduledTheme();
  };

  syncIfAuto();

  let timeoutId = 0;
  const scheduleBoundary = () => {
    timeoutId = window.setTimeout(() => {
      applyScheduledTheme();
      scheduleBoundary();
    }, getMsUntilNextScheduleBoundary());
  };
  scheduleBoundary();

  const intervalId = window.setInterval(syncIfAuto, 60_000);

  return () => {
    window.clearInterval(intervalId);
    window.clearTimeout(timeoutId);
  };
}
