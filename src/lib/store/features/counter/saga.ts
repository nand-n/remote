import { delay } from "@/utils"
import { call, put, takeEvery } from "redux-saga/effects"
import { increment } from "./slice"

export const incrementAsyncRequest =  "counter/incrementAsyncRequest"
export function* incrementAsyc(){
    try {
        yield call(delay , 1000) //simulate async operation 
        // dispatch an actoin to update the state uypon start 
        yield put(increment)
    } catch (error) {
        console.log("error happened " , error);
    }
}

export function* watchIncrementAsync() {
    yield takeEvery(incrementAsyncRequest , incrementAsyc)
}