import '../styles/App.css';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Searcher from '../components/Searcher';
import { useDispatch } from 'react-redux';
import { getProducts, selectCategory } from '../app/productsSlice';
import { SelectCallback } from '../components/Searcher';

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
      .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((data: Product[]) => {
        console.log('Data received:', data); // Логирование данных
        dispatch(getProducts(data));
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Логирование ошибки
    });

  }, [dispatch]);

  const HandleSelect:SelectCallback = (category: string | null) => {

    if(category) {
      dispatch(selectCategory(category as string));
    }

  };

  return (
    <>
      <div id='wrapper' style={{gridTemplateRows: "auto auto 1fr auto"}}>
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
