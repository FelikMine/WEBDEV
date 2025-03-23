import { configureStore } from '@reduxjs/toolkit'
import productSliceReducer from "./productsSlice";
import userDataSliceReducer from "./userDataSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Конфигурация для Redux Persist
const persistConfig = {
  key: 'root', // Ключ для хранения в localStorage
  storage, // Используемое хранилище
};

const persistedReducer = persistReducer(persistConfig, userDataSliceReducer);

export const store = configureStore({
  reducer: {
    //Редюсер products будет выполнять какую-то логику (:productSliceReducer)
    products: productSliceReducer,
    userData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Игнорируем действия Redux Persist
      },
  }),
})
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch