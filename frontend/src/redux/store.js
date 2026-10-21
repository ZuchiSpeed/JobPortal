import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// 1. Create a bulletproof custom storage engine
// This directly uses the browser's localStorage and returns Promises,
// which is exactly what redux-persist requires to avoid serialization warnings.
const customStorage = {
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return Promise.resolve(value);
    } catch (e) {
      console.warn("Error reading from localStorage", e);
      return Promise.resolve(null);
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve(true);
    } catch (e) {
      console.warn("Error writing to localStorage", e);
      return Promise.resolve(false);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve();
    } catch (e) {
      console.warn("Error removing from localStorage", e);
      return Promise.resolve();
    }
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage: customStorage, // 2. Use our custom storage here
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to prevent non-serializable value warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
