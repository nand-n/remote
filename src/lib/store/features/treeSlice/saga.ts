// src/sagas/treeSaga.ts
import { put, takeEvery } from "redux-saga/effects";
import { collapseAll, expandAll } from "./slice";

function* handleExpandAll(action: any) {
  yield put(expandAll(action.payload)); 
}

function* handleCollapseAll() {
  yield put(collapseAll()); 
}

export function* watchTreeActions() {
  yield takeEvery(expandAll.type, handleExpandAll);
  yield takeEvery(collapseAll.type, handleCollapseAll);
}
