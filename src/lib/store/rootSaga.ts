import { all } from "redux-saga/effects";
import { watchIncrementAsync } from "./features/counter/saga";
import {watchAddChildCategory, watchFetchCategoryHierarchy, watchFetchParentsCategory} from './features/categories/saga'
import { watchTreeActions } from "./features/treeSlice/saga";

export function* rootSaga(){
    yield all([
        watchIncrementAsync() ,
        watchFetchCategoryHierarchy(),
        watchFetchParentsCategory(),
        watchTreeActions(),
        watchAddChildCategory()
    ])
}