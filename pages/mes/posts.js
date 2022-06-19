import { useEffect, useState } from "react";
import Link from "next/link";

export default function Posts() {
  const [azureFuncData, setAzureFuncData] = useState("");

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setAzureFuncData(text);
    })();
  });

  return (
    <div>
      <h1>Posts</h1>
      <h1>{azureFuncData ?? "no data yet"}</h1>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
