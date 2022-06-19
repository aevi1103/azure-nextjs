import { useState, useCallback, useEffect } from "react";
import { useUserInfo } from "../../lib/hooks";
import { useRouter } from "next/router";

const randomApi = `https://random-data-api.com/api/cannabis/random_cannabis?size=30`;

export default function Cannabis({ cannabis }) {
  const router = useRouter();
  const userInfo = useUserInfo();
  const [data, setData] = useState(cannabis);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log({
      userInfo,
    });
    //todo: store in a local storage, or move in the layout component
    if (userInfo) {
      console.log("no redirect", userInfo);
      return;
    }
    console.log("redirect to login", userInfo);
    // router.push("/login");
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

export async function getStaticProps() {
  const respose = await fetch(randomApi);
  const data = await respose.json();
  return {
    props: {
      cannabis: data,
    },
  };
}
