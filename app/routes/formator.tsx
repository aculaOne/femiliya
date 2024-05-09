import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { json, useLoaderData, useSubmit } from "@remix-run/react";
import { Formating } from "~/utils/Formating";

export const meta: MetaFunction = () => {
  return [{ title: "Форматор" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const base = url.searchParams.get("base");
  return json({ base });
};

export default function Generator() {
  const { base } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const base_f = Formating.toFerisian(base || "");
  const base_r = Formating.toCyrillic(base || "");

  return (
    <div>
      <h1 className="text-xl mb-4">Форматор</h1>

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
          className="p-2 mb-2 border-2 rounded-sm w-full"
          maxLength={2000}
          name="base"
          rows={5}
        />
        <p className="text-right">{base?.length || 0}/2000</p>
      </form>
      <h2>Пверiйснü Варiант</h2>
      <p className="p-2 min-h-14 bg-sky-100 rounded">{base_f}</p>
      <button
        disabled={!base_f}
        className="mt-4 p-4 w-full rounded bg-sky-200 disabled:bg-slate-200 disabled:text-slate-600"
        onClick={(e) => {
          const el = e.currentTarget;
          navigator.clipboard.writeText(base_f);
          el.textContent = "Скопировано!";
          setTimeout(() => (el.textContent = "Скопировать"), 1000);
        }}
      >
        Скопировать
      </button>
      <h2>Русский формат</h2>
      <p className="p-2 min-h-14 bg-sky-100 rounded">{base_r}</p>
      <button
        disabled={!base_r}
        className="mt-4 p-4 w-full rounded bg-sky-200 disabled:bg-slate-200 disabled:text-slate-600"
        onClick={(e) => {
          const el = e.currentTarget;
          navigator.clipboard.writeText(base_r);
          el.textContent = "Скопировано!";
          setTimeout(() => (el.textContent = "Скопировать"), 1000);
        }}
      >
        Скопировать
      </button>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const base = body.get("base");

  return redirect(`/generator?base=${base}`);
}
