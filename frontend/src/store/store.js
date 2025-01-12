import { legacy_createStore as createStore, combinedReducers } from "redux";

import {userReducer} from "./user/user.reducer";
import {storyReducer} from "./story/story.reducer";

const rootReducer = combinedReducers({
  user: userReducer,
  story: storyReducer
});

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer,middleware)
