import * as functions from "firebase-functions";

export const beforeLogin = functions.auth.user().onCreate((user) => {
  if (!user.emailVerified) {
    console.log("User's email is not verified.");
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The email "${user.email}" has not been verified.`
    );
  }
});
