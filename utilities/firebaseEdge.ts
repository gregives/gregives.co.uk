export const firebaseServerConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replaceAll("\\n", "\n"),
  },
  cookieSignatureKeys: [
    process.env.COOKIE_SECRET_1!,
    process.env.COOKIE_SECRET_2!,
  ],
};
