import Link from "next/link";

export default function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <span>{}</span>
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