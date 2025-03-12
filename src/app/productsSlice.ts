import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}
interface ProductsState {
    catalog : Product[],
    categories: string[];
    filterData: Product[],
    nowCategory: string,
}
const initialState:ProductsState ={
    catalog: [],
    categories: [],
    filterData: [],
    nowCategory: "category",
}

const productsSlice = createSlice( {
    name: 'products',
    initialState,
    reducers : {
        getProducts (state, action: PayloadAction<Product[]>) {
            // console.log(state, "-состояние" , action, "-действие");

            state.catalog = action.payload; //payload-непосредственно передаваемые данные
            const uniqueCategories = Array.from(new Set(action.payload.map(el => el.category)));
            state.categories = uniqueCategories;
            state.filterData = action.payload;

        },
        selectCategory (state, action) {

            state.nowCategory = action.payload;

            if (action.payload === "category") {
                state.filterData = state.catalog;
            } else {
                state.filterData = state.catalog.filter(el => el.category === action.payload);
            }
        },
    }
})

export const {getProducts, selectCategory} = productsSlice.actions;
export default productsSlice.reducer;