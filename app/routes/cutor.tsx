import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { json, useLoaderData, useSubmit } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Разделятор" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const base = url.searchParams.get("base");
  return json({ base });
};

export default function Generator() {
  const { base } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const words = base?.trim()?.split(/[ \n]+/) || [];
  const result: string[] = [];
  words?.forEach((w) => {
    const punctuation = [
      ",",
      ".",
      "!",
      "?",
      ":",
      ";",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "'",
      '"',
      "/",
      "|",
      "\\",
    ];

    let wn = w.trim();
    while (punctuation.includes(wn[0])) {
      result.push(wn[0]);
      wn = wn.slice(1);
    }
    const preResult = [];
    while (punctuation.includes(wn[wn.length - 1])) {
      preResult.push(wn.slice(wn.length - 1));
      wn = wn.slice(0, -1);
    }
    result.push(wn);
    preResult.reverse().forEach((s) => result.push(s));
  });

  return (
    <div>
      <h1 className="text-xl mb-4">Разделятор</h1>
      <form
        onChange={(event) => {
          event.preventDefault();
          const isFirstSearch = base === null;

          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <textarea
          defaultValue={base || ""}
          maxLength={2000}
          className="p-2 border-2 rounded-sm w-full"
          name="base"
          rows={5}
        />
        <p className="text-right">{base?.length || 0}/2000</p>
      </form>
      <h2>Результат</h2>
      <p className="p-2 min-h-14 bg-sky-100 rounded">
        {result?.map((w, i) => {
          return (
            <span
              key={i}
              className="group p-1 pl-2 hover:bg-sky-300 rounded-full transition-all"
            >
              {w}{" "}
              <span className="group-hover:ml-2 hidden py-0 px-2 group-hover:inline-block animate-pulse rounded-full bg-sky-400">
                Порядок: {i}
              </span>
            </span>
          );
        })}
      </p>

      <button
        disabled={!base}
        className="mt-4 p-4 w-full rounded bg-sky-200 disabled:bg-slate-200 disabled:text-slate-600"
        onClick={(e) => {
          const el = e.currentTarget;
          navigator.clipboard.writeText(JSON.stringify(result));
          el.textContent = `Готово! Всего скопировано ${result.length} элементов`;
          setTimeout(
            () => (el.textContent = "Скопировать JSON (массив строк)"),
            1000
          );
        }}
      >
        Скопировать JSON (массив строк)
      </button>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const base = body.get("base");

  return redirect(`/generator?base=${base}`);
}
