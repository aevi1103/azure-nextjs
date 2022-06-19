import { useState, useEffect, useCallback } from "react";
import { getuserInfo } from "./auth";

export const useUserInfo = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = getuserInfo();
    console.log({
      userInfo,
    });
    setUser(userInfo);
    return () => {
      setUser(null);
    };
  }, []);

  return user;
};
