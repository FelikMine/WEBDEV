import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Searcher from './components/Searcher';
import { useDispatch } from 'react-redux';
import { getProducts, selectCategory } from './app/productsSlice';
import { SelectCallback } from './components/Searcher';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

      fetch('https://fakestoreapi.com/products/')
          .then(res => res.json())
          .then((data: Product[])=> {

              dispatch(getProducts(data));
          });

  }, [dispatch]);

  const HandleSelect:SelectCallback = (category: string | null) => {

    if(category) {
      dispatch(selectCategory(category as string));
      console.log('выбрана категория ', category);

    }

  };

  return (
    <>
      <div id='wrapper'>

        <Header />
        <Searcher
            onSelect={HandleSelect}
          />
        <ProductList />
        <Footer />

      </div>
    </>
  )
}

export default App
