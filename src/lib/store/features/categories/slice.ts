// import { Category } from '@/types/categories'; // Ensure this path is correct
import { Category } from '@/types/categories';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
    categories: Category[];
    parentCategories: Category[]; // Separate state for parent categories
    loading: boolean;
    parentLoading: boolean; // Separate loading state for parent categories
    error: string | null;
    parentError: string | null; // Separate error state for parent categories
}

const initialState: CategoriesState = {
    categories: [],
    parentCategories: [], // Initialize parent categories state
    loading: false,
    parentLoading: false, // Initialize parent loading state
    error: null,
    parentError: null, // Initialize parent error state
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategoriesStart(state, action: PayloadAction<string>) { 
            state.loading = true;
            state.error = null;
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
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchParentsStart,  
    fetchParentsSuccess,
    fetchParentsFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
