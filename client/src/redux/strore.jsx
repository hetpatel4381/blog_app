// store.jsx
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import themeReducer from "./theme/ThemeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(store);
