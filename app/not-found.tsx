import Link from "next/link";

// This page is rendered for 404 errors, but you can throw notFound() in any route to trigger this page.
// Just import the following:
// import { notFound } from "next/navigation";
// and call notFound() where you want to trigger a 404 error.
// You can also use the `notFound` function in your API routes to return a 404 status code.
// You do not need to "return" the function, just call it directly.

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
