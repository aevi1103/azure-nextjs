import Link from "next/Link";

export default function Posts() {
  return (
    <div>
      <h1>Posts</h1>
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
