import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import deviceReducer from './deviceSlice';

const store = configureStore({
    reducer: {
        devices: deviceReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
