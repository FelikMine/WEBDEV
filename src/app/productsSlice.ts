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

            // fetch('https://fakestoreapi.com/products/')
            // .then(res => res.json())
            // .then((data: Product[])=> {

            //     setProductsData(data);
            //     setFilterProductsData(data);

            //     const uniqueCategories = new Set(data.map(el => el.category));
            //     setCategories(uniqueCategories);
            /*
            const [filterProductsData, setFilterProductsData] = useState<Product[]>([]);
              const [nowCategory, setNowCategory] = useState<string>("Category");*/
            // });

        },
        selectCategory (state, action) {

            state.nowCategory = action.payload;

            const filteredProducts = state.filterData.filter(el => el.category == action.payload);
            state.filterData = filteredProducts;
        },
        // filterProducts (state, action) {},
    }
})

export const {getProducts, selectCategory} = productsSlice.actions;
export default productsSlice.reducer;