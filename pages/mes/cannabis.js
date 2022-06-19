import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export default function Cannabis({ cannabis, userInfo }) {
  const router = useRouter();
  const [data, setData] = useState(cannabis);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (userInfo) return;
    router.push("/login");
  }, [userInfo, router]);

  const getData = useCallback(async () => {
    const response = await fetch(
      `https://random-data-api.com/api/cannabis/random_cannabis?size=30`
    );
    const records = await response.json();
    setData(records);
  }, []);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => getData()}>refresh data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const getuserInfo = async () => {
    const res = await fetch(`/.auth/me`);
    const payload = await res.json();
    const { clientPrincipal } = payload || {};
    return clientPrincipal;
  };

  const auth = async () => {
    try {
      const userInfo = await getuserInfo();

      if (!userInfo) {
        return {
          data: [],
          userInfo: null,
        };
      }

      const respose = await fetch(
        `https://random-data-api.com/api/cannabis/random_cannabis?size=30`
      );

      const data = await respose.json();

      return {
        data: data,
        userInfo,
      };
    } catch (error) {
      console.error({ ...error });
    }
  };

  const { data, userInfo } = auth();

  return {
    props: {
      cannabis: data,
      userInfo,
    },
  };
}
