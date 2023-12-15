import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducers/root.reducer";

export const store = createStore(rootReducer);
