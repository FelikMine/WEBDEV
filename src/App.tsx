import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Searcher from './components/Searcher';

function App() {

  const [productsData, setProductsData] = useState([]);
  const [filterProductsData, setFilterProductsData] = useState([]);
  const [categories, setCategories] = useState(new Set());
  const [nowCategory, setNowCategory] = useState("Category");

  useEffect(() => {

      fetch('https://fakestoreapi.com/products/')
          .then(res => res.json())
          .then(data => {

              setProductsData(data);
              setFilterProductsData(data);

              const uniqueCategories = new Set(data.map(el => el.category));
              setCategories(uniqueCategories);
          });

  }, []);

  const HandleSelect = (category) => {

      setNowCategory(category);

      const filteredProducts = productsData.filter(el => el.category == category);
      setFilterProductsData(filteredProducts);

      // console.log(nowCategory);
  };

  return (
    <>
      <div id='wrapper'>

        <Header> </Header>
        <Searcher
            categories={categories}
            nowCategory={nowCategory}
            onSelect={HandleSelect}
          />
        <ProductList products={filterProductsData} />
        <Footer> </Footer>

      </div>
    </>
  )
}

export default App
