import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {user: userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // To not get an error when we don't serialize our variables
  }),
});

