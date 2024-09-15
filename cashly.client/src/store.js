import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducers: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default Store;
