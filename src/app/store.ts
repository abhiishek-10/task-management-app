import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskReducer from "../features/task/taskSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk;
