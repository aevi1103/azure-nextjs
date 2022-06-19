import { useState, useEffect } from "react";
import { getuserInfo } from "./auth";

export const useUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getuserInfo().then((userInfo) => {
      if (userInfo) {
        location.href = "/login";
        return;
      }

      setUser(userInfo);
    });

    return () => {
      setUser(null);
    };
  }, []);

  return user;
};
