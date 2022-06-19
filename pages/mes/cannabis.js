import { useState, useCallback } from "react";

export default function Cannabis({ cannabis }) {
  const [data, setData] = useState(cannabis);
  const [count, setCount] = useState(0);

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
  const respose = await fetch(
    `https://random-data-api.com/api/cannabis/random_cannabis?size=30`
  );
  const data = await respose.json();

  return {
    props: {
      cannabis: data,
    },
  };
}
