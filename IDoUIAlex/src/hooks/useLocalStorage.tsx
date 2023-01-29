import { useState } from "react";

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return value;
      } else {
        window.localStorage.setItem(key, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(key, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };
  return { storedValue, setValue };
};
