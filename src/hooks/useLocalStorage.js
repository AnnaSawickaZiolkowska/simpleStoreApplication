import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const localStorageData = localStorage.getItem(key);
      return localStorageData ? JSON.parse(localStorageData) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const updateValue = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [value, updateValue];
};

export default useLocalStorage;
