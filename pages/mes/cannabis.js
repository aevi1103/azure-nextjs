import { useState, useCallback, useEffect } from "react";
import { useUserInfo } from "../../lib/hooks";

const randomApi = `https://random-data-api.com/api/cannabis/random_cannabis?size=30`;

export default function Cannabis({ cannabis }) {
  const userInfo = useUserInfo();
  const [data, setData] = useState(cannabis);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log({
      userInfo,
    });
    // if (userInfo) return;
    // router.push("/login");
  }, [userInfo]);

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
