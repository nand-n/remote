import { configureStore } from '@reduxjs/toolkit'
import createSagaMidleware from 'redux-saga'
import counterReducer from "./features/counter/slice";
import categoriesSlice from './features/categories/slice';
import treeSlice from './features/treeSlice/slice';

import { rootSaga } from './rootSaga';

const sagaMidleware = createSagaMidleware()

export const makeStore = ()=>{
    const store =  configureStore({
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMidleware),
        reducer: {
            counter : counterReducer,
            categories:categoriesSlice,
            tree: treeSlice,

        }
    });
    sagaMidleware.run(rootSaga)
    return store
}

export type AppStore = ReturnType<typeof makeStore>;
export  type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];