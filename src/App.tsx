import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Searcher from './components/Searcher';
function App() {

  return (
    <>
      <div id='wrapper'>

        <Header> </Header>
        <Searcher> </Searcher>
        <ProductList></ProductList>
        <Footer> </Footer>

      </div>
    </>
  )
}

export default App
