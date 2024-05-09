import { Link, type MetaFunction } from "@remix-run/react";
import nav from "../../config/navigation.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Главная Femiliya" },
    { name: "description", content: "Simple Remix App" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-xl mb-4">Добро пожаловать в Femiliya!</h1>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {nav.map((el) => (
          <div
            key={el.title}
            className="p-2 bg-sky-100 rounded m-2 flex flex-col justify-between"
          >
            <h2 className="font-medium text-lg mb-2 text-sky-400">
              {el.title}
            </h2>
            <p className="h-full">{el.description}</p>
            {el.url === "/" ? (
              <p
                className="mt-2 w-full p-2 rounded text-center border-2 border-sky-200
            text-sky-300"
              >
                Вы уже тут
              </p>
            ) : (
              <Link
                to={el.url}
                className="mt-2 w-full p-2 rounded text-center bg-sky-200 text-sky-500"
              >
                Вперёд!
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
