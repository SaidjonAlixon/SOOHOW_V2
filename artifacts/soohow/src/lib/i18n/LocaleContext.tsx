import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type Locale,
  locales,
  translations,
  type TranslationTree,
} from "./translations";

const STORAGE_KEY = "locale";

function getStoredLocale(): Locale | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && locales.includes(saved as Locale)) {
    return saved as Locale;
  }
  return null;
}

function getNestedValue(obj: TranslationTree, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: TranslationTree;
  t: (key: string) => string;
  tList: (key: string) => readonly string[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    () => getStoredLocale() ?? "uz",
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const tree = translations[locale];

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      messages: tree,
      t: (key: string) => getNestedValue(tree, key),
      tList: (key: string) => {
        const keys = key.split(".");
        let current: unknown = tree;
        for (const k of keys) {
          if (current == null || typeof current !== "object") return [];
          current = (current as Record<string, unknown>)[k];
        }
        return Array.isArray(current) ? (current as string[]) : [];
      },
    }),
    [locale, setLocale, tree],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
