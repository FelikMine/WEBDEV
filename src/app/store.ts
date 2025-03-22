import { configureStore } from '@reduxjs/toolkit'
import productSliceReducer from "./productsSlice";
import userDataSliceReducer from "./userDataSlice";

export const store = configureStore({
  reducer: {
    //Редюсер products будет выполнять какую-то логику (:productSliceReducer)
    products: productSliceReducer,
    userData: userDataSliceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch