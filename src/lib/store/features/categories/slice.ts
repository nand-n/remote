import { Category } from '@/types/categories';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
    categories: Category[];
    parentCategories: Category[]; 
    loading: boolean;
    parentLoading: boolean; 
    error: string | null;
    parentError: string | null;
    addChildLoading: boolean; 
    addChildError: string | null;
    rootNodeId:string
    sucessfullyAdded:string
}


const initialState: CategoriesState = {
    categories: [],
    parentCategories: [], 
    loading: false,
    parentLoading: false, 
    error: null,
    parentError: null, 
    addChildLoading: false,
    addChildError: null,
    rootNodeId:'',
    sucessfullyAdded:''
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategoriesStart(state, action: PayloadAction<string>) { 
            state.loading = true;
            state.error = null;
            state.rootNodeId= action.payload
        },
        fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
            state.loading = false;
        },
        fetchCategoriesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchParentsStart(state) {
            state.parentLoading = true;
            state.parentError = null;
        },
        fetchParentsSuccess(state, action: PayloadAction<Category[]>) {
            state.parentCategories = action.payload;
            state.parentLoading = false;
        },
        fetchParentsFailure(state, action: PayloadAction<string>) {
            state.parentLoading = false;
            state.parentError = action.payload;
        },
         addChildCategoryStart(state, action: PayloadAction<Category>) {
            state.addChildLoading = true;
            state.addChildError = null;
        },
        addChildCategorySuccess(state, action: PayloadAction<Category>) {
            state.addChildLoading = false;
           state.sucessfullyAdded = action.payload.id

        },
        addChildCategoryFailure(state, action: PayloadAction<string>) {
            state.addChildLoading = false;
            state.addChildError = action.payload;
           state.sucessfullyAdded = ''

        }
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchParentsStart,  
    fetchParentsSuccess,
    fetchParentsFailure,
    addChildCategoryStart,
    addChildCategorySuccess,
    addChildCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
