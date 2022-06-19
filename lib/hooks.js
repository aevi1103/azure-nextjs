import { useState, useEffect } from "react";
import { getuserInfo } from "./auth";
import { useRouter } from "next/router";

export const useUserInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getuserInfo().then((userInfo) => {
      console.log({
        userInfo,
      });

      if (!userInfo) {
        router.push("/login");
        return;
      }

      setUser(userInfo);
    });

    return () => {
      setUser(null);
    };
  }, [router]);

  return user;
};
