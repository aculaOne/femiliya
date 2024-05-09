import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import nav from "../config/navigation.json";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex flex-col sm:flex-row">
      <nav className="w-full sm:w-64 h-auto sm:h-screen flex flex-col sm:flex-col justify-between items-center sm:sticky top-0 bg-sky-100">
        <p className="text-2xl font-bold text-center md:text-left mx-2 sm:my-4">
          Femiliya
        </p>
        <ul className="w-full p-2 h-full flex flex-wrap sm:flex-row sm:block justify-between sm:justify-start items-center gap-2">
          {nav.map((e) => (
            <li
              className="w-auto sm:w-full sm:mb-4 inline-block sm:block bg-sky-200 rounded"
              key={e.title}
            >
              <Link className="w-full h-full m-2 inline-block" to={e.url}>
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
