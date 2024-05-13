import { combineReducers } from "redux";
import wordsReducer from "./words/slice";
import userReducer from "./users/slice";
import appManagerReducer from './appManager/slice'

const rootReducer = combineReducers({
  user: userReducer,
  words: wordsReducer,
  appManager: appManagerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
