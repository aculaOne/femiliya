import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { json, useLoaderData, useSubmit } from "@remix-run/react";
import { Formating } from "~/utils/Formating";

export const meta: MetaFunction = () => {
  return [{ title: "Генератор" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const base = url.searchParams.get("base");
  return json({ base });
};

export default function Generator() {
  const { base: preBase } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  let base;
  if (preBase) base = Formating.toFamilyFormat(preBase);
  else base = ["Введите любое слово"];

  return (
    <div>
      <h1 className="text-xl mb-4">Generator</h1>

      <form
        onChange={(event) => {
          const isFirstSearch = base === null;

          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <input
          className="p-2 border-2 rounded-sm w-full"
          type="text"
          name="base"
        />
      </form>
      <ul className="p-2 min-h-14 mt-4 bg-sky-100 rounded">
        {base.map((v) => (
          <>
            <li key={v}>{v}</li>
            <hr className="border-1 border-sky-200 mb-2" />
          </>
        ))}
      </ul>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const base = body.get("base");

  return redirect(`/generator?base=${base}`);
}
