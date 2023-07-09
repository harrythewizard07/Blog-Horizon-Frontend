import { createContext, useEffect, useState } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../auth/auth";

//creating user context
export const UserContext = createContext();

//sharing created context with other components
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userData: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      userData: getCurrentUserDetail(),
      login: isLoggedIn(),
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
