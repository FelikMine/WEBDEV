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
    categories: Set<string>;
    filterData: Product[],
    nowCategory: string,
}
const initialState:ProductsState ={
    catalog: [],
    categories: new Set(),
    filterData: [],
    nowCategory: "Category",
}

const productsSlice = createSlice( {
    name: 'products',
    initialState,
    reducers : {
        getProducts (state, action: PayloadAction<Product[]>) {
            console.log(state, "-состояние" , action, "-действие");

            state.catalog = action.payload; //payload-непосредственно передаваемые данные
            state.categories = new Set(action.payload.map(el => el.category));
            state.filterData = action.payload;

        },
        selectCategory (state, action) {

            state.nowCategory = action.payload;

            const filteredProducts = state.filterData.filter(el => el.category == action.payload);
            state.filterData = filteredProducts;
        },
    }
})

export const {getProducts, selectCategory} = productsSlice.actions;
export default productsSlice.reducer;