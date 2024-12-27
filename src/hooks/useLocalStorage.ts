// src/hooks/useLocalStorage.ts

import { useState } from "react";

// Define a generic type for the hook's value, so it can store any kind of data.
function useLocalStorage<T>(key: string, initialValue: T) {
  // Check if localStorage has the item. If it exists, parse it; if not, use the initial value.
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // Set the initial state as the parsed value or initial value.
  const [value, setValue] = useState<T>(parsedValue);

  // Update localStorage whenever the value changes.
  const setStoredValue = (newValue: T) => {
    // Save the new value to state.
    setValue(newValue);

    // Save the new value to localStorage.
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const; // Return a tuple with the value and setter function.
}

export default useLocalStorage;
