import { exists, firestore, pageConverter } from "@/utilities/firebaseNode";
import { FieldValue } from "firebase-admin/firestore";

type Params = {
  params: {
    path?: string[];
  };
};

async function getPageByPath(path: string) {
  return await firestore
    .collection("pages")
    .withConverter(pageConverter)
    .doc(encodeURIComponent(path))
    .get();
}

const NEW_PAGE = {
  views: 0,
};

export async function GET(
  request: Request,
  { params: { path: segments = [] } }: Params
) {
  const path = "/" + segments.join("/");
  const page = await getPageByPath(path);

  if (exists(page)) {
    return Response.json(page.data());
  }

  return Response.json(NEW_PAGE);
}

export async function POST(
  request: Request,
  { params: { path: segments = [] } }: Params
) {
  const path = "/" + segments.join("/");
  const page = await getPageByPath(path);

  if (exists(page)) {
    await page.ref.update({
      views: FieldValue.increment(1),
    });

    return Response.json(page.data());
  } else {
    await page.ref.set(NEW_PAGE);

    return Response.json(NEW_PAGE);
  }
}
