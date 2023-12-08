import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import {
  DocumentData,
  FirestoreDataConverter,
  getFirestore,
} from "firebase-admin/firestore";
import { firebaseServerConfig } from "./firebaseEdge";
import { Page } from "@/types";

export const firebase =
  getApps().length === 0
    ? initializeApp({
        credential: cert(firebaseServerConfig.serviceAccount),
      })
    : getApp();

export const firestore = getFirestore(firebase);

try {
  firestore.settings({
    ignoreUndefinedProperties: true,
  });
} catch {
  // Settings have already been set
}

const createConverter = <
  TDocumentData extends DocumentData
>(): FirestoreDataConverter<TDocumentData> => ({
  toFirestore: ({ id, ...data }: TDocumentData) => data,
  fromFirestore: (snap) =>
    ({
      id: snap.id,
      ...snap.data(),
    } as TDocumentData & {
      id: string;
    }),
});

export const pageConverter = createConverter<Page>();

export function exists<TData extends DocumentData>(
  doc: FirebaseFirestore.DocumentSnapshot<TData> | undefined
): doc is FirebaseFirestore.DocumentSnapshot<TData> & {
  get: <TPath extends keyof TData>(path: TPath) => TData[TPath];
} {
  return doc !== undefined && doc.exists;
}
