import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Searcher from './components/Searcher';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './app/productsSlice';
import { RootState } from './app/store';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function App() {

  // const [productsData, setProductsData] = useState<Product[]>([]);
  // const [categories, setCategories] = useState<Set<string>>(new Set());

  const [filterProductsData, setFilterProductsData] = useState<Product[]>([]);
  const [nowCategory, setNowCategory] = useState<string>("Category");

  const dispatch = useDispatch();
    const productsData = useSelector((state: RootState) => state.products.catalog);
    const categories = useSelector((state: RootState) => state.products.categories);

  useEffect(() => {

      fetch('https://fakestoreapi.com/products/')
          .then(res => res.json())
          .then((data: Product[])=> {

              dispatch(getProducts(data));

              setFilterProductsData(data);
              // setProductsData(data);
              // const uniqueCategories = new Set(data.map(el => el.category));
              // setCategories(uniqueCategories);
          });

  }, [dispatch]);

  const HandleSelect = (category: string) => {

      setNowCategory(category);

      const filteredProducts = productsData.filter(el => el.category == category);
      setFilterProductsData(filteredProducts);

  };

  return (
    <>
      <div id='wrapper'>

        <Header/>
        <Searcher
            categories={categories}
            nowCategory={nowCategory}
            onSelect={HandleSelect}
          />
        <ProductList products={filterProductsData} />
        <Footer />

      </div>
    </>
  )
}

export default App
