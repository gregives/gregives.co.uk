import { getApp, getApps, initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { BASE_HOST, PRODUCTION_HOST } from "./constants";

export const firebaseClientConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:
    BASE_HOST === PRODUCTION_HOST
      ? BASE_HOST
      : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const firebase =
  getApps().length === 0 ? initializeApp(firebaseClientConfig) : getApp();

export const auth = getAuth(firebase);
