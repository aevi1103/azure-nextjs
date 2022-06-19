import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const randomApi = `https://random-data-api.com/api/cannabis/random_cannabis?size=30`;

export default function Cannabis({ cannabis, userInfo }) {
  const router = useRouter();
  const [data, setData] = useState(cannabis);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (userInfo) return;
    router.push("/login");
  }, [userInfo, router]);

  const getData = useCallback(async () => {
    const response = await fetch(randomApi);
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

const getuserInfo = async () => {
  const res = await fetch(
    `https://icy-flower-0005dea0f.1.azurestaticapps.net/.auth/me`
  );
  const payload = await res.json();
  const { clientPrincipal } = payload || {};
  return clientPrincipal;
};

export async function getStaticProps() {
  const userInfo = await getuserInfo();

  if (!userInfo) {
    return {
      props: {
        cannabis: [],
      },
    };
  }

  const respose = await fetch(randomApi);

  const data = await respose.json();
  return {
    props: {
      cannabis: data,
      userInfo: userInfo,
    },
  };
}
