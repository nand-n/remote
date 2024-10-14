import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchCategoriesFailure,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchParentsStart,
    fetchParentsFailure,
    fetchParentsSuccess,
    addChildCategorySuccess,
    addChildCategoryFailure,
    addChildCategoryStart,

} from './slice';
import { addChildCategory, getAllParrentCategories, getCategoryHierarchy } from './api'; 
import { PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/types/categories';

function* fetchCategoryHierarchySaga(action: PayloadAction<string>) {
    try {
        const response: Category[] = yield call(getCategoryHierarchy, action.payload);
        yield put(fetchCategoriesSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchCategoriesFailure(error.message));
        } else {
            yield put(fetchCategoriesFailure('Unknown error happened'));
        }
    }
}

function* fetchParentsCategory() {
    try {
        const response: Category[] = yield call(getAllParrentCategories);
        yield put(fetchParentsSuccess(response)); // Dispatch success action for parent categories
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchParentsFailure(error.message)); // Dispatch failure action with error message
        } else {
            yield put(fetchParentsFailure('Unknown error happened'));
        }
    }
}


function* addChildCategorySaga(action: PayloadAction<Category>) {
    try {
        const response:Category = yield call(addChildCategory, action.payload);
        yield put(addChildCategorySuccess(response)); // Dispatch success action with response data
    } catch (error) {
        if (error instanceof Error) {
            yield put(addChildCategoryFailure(error.message)); // Dispatch failure action with error message
        } else {
            yield put(addChildCategoryFailure('Unknown error happened'));
        }
    }
}



export function* watchFetchCategoryHierarchy() {
    yield takeLatest(fetchCategoriesStart.type, fetchCategoryHierarchySaga);
}

export function* watchFetchParentsCategory() {
    yield takeLatest(fetchParentsStart.type, fetchParentsCategory);
}

export function* watchAddChildCategory() {
    yield takeLatest(addChildCategoryStart.type, addChildCategorySaga);
}