import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToggleContextProps {
  isEnabled: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextProps>({
  isEnabled: false,
  toggle: () => {},
});

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle = () => setIsEnabled(prev => !prev);

  return (
    <ToggleContext.Provider value={{ isEnabled, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
