import { combineReducers } from "redux";
import userReducer from "./../containers/AuthPage/slice";
import wordsReducer from "./words/slice";
const rootReducer = combineReducers({
  user: userReducer,
  words: wordsReducer, // Add your slice reducer here
  // Add other slice reducers if you have more
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;