import { combineReducers } from "redux";
import wordsReducer from "./words/slice";
import userReducer from "./users/slice";

const rootReducer = combineReducers({
  user: userReducer,
  words: wordsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
