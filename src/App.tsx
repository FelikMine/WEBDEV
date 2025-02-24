import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Searcher from './components/Searcher';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function App() {

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [filterProductsData, setFilterProductsData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [nowCategory, setNowCategory] = useState<string>("Category");

  useEffect(() => {

      fetch('https://fakestoreapi.com/products/')
          .then(res => res.json())
          .then((data: Product[])=> {

              setProductsData(data);
              setFilterProductsData(data);

              const uniqueCategories = new Set(data.map(el => el.category));
              setCategories(uniqueCategories);
          });

  }, []);

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
