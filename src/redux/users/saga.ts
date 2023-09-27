import { put, takeEvery } from "redux-saga/effects";
import { firestore } from "../../utils/firebase/firebase";
import { PayloadAction } from "@reduxjs/toolkit";
// Import Firebase and configure it with your Firebase project credentials

interface AddUserPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

function* addUserToFirestore(action: PayloadAction<AddUserPayload>) {
  try {
    // yield put(addUserRequest());

    // Use Firebase SDK to add user data to Firestore
    const userCollection = firestore.collection("users");
    const userData = {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
    };

    console.log(userData);
    yield userCollection.add(userData);
  } catch (error: any) {
    console.log("a");
  }
}

export function* usersSaga() {
  console.log("");
}
export default usersSaga;
