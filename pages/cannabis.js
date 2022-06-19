export default function Cannabis({ cannabis }) {
  return (
    <ul>
      {cannabis.map((item) => (
        <li key={item.id}>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </li>
      ))}
    </ul>
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
