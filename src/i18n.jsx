import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('de');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // t() accepts a plain string/array (same in both languages) or { de, en }.
  const t = useCallback(
    (value) => {
      if (value == null) return '';
      if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) return value;
      return value[lang] ?? value.de;
    },
    [lang],
  );

  const ctx = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
