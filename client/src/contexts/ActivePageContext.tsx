/* A context for setting the active page for navbar styling. Needed to allow
 * buttons to also change the active page, so made a context.
*/
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ActivePageContextProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const ActivePageContext = createContext<ActivePageContextProps | undefined>(undefined);

export const ActivePageProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<string>('Upcoming Elections');
  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => {
  const context = useContext(ActivePageContext);
  if (context === undefined) {
    throw new Error('useActivePage must be used within an ActivePageProvider');
  }
  return context;
};