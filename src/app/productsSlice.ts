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
}
const initialState:ProductsState ={
    catalog: [],
    categories: new Set(),
}

const productsSlice = createSlice( {
    name: 'products',
    initialState,
    reducers : {
        getProducts (state, action: PayloadAction<Product[]>) {
            console.log(state, "-состояние" , action, "-действие");

            state.catalog = action.payload;
            state.categories = new Set(action.payload.map(el => el.category));

            // fetch('https://fakestoreapi.com/products/')
            // .then(res => res.json())
            // .then((data: Product[])=> {

            //     setProductsData(data);
            //     setFilterProductsData(data);

            //     const uniqueCategories = new Set(data.map(el => el.category));
            //     setCategories(uniqueCategories);
            // });

        },
        // selectCategory (state, action) {},
        // filterProducts (state, action) {},
    }
})

export const {getProducts} = productsSlice.actions;
export default productsSlice.reducer;