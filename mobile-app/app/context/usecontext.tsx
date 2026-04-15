import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  gender: 'M' | 'F' | '';
  age: string;
  height: string;
  weight: string;
  goalWeight: string;
  rate: number;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    gender: '', age: '', height: '', weight: '', goalWeight: '', rate: 0.33,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};