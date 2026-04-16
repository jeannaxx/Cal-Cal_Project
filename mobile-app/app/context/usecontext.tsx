import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState({
    gender: "", // 'M' หรือ 'F'
    age: "",
    height: "",
    weight: "",
    deficit: 0 // พลังงานที่หักออกตามเป้าหมาย
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);