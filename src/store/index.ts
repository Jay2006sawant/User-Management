import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducer
const rootReducer = (state = {}, action: any) => state;

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 