import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './src/components/Layout';
import Home from './src/pages/Home';
import Shop from './src/pages/Shop';
import ProductDetail from './src/pages/ProductDetail';
import SearchResults from './src/pages/SearchResults';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import Blog from './src/pages/Blog';

const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
