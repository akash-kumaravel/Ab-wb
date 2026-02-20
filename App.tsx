import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './src/components/Layout';
import Home from './src/pages/Home';
import HomeMinimal from './src/pages/HomeMinimal';
import Shop from './src/pages/Shop';
import ProductDetail from './src/pages/ProductDetail';
import SearchResults from './src/pages/SearchResults';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import AdminLogin from './src/pages/AdminLogin';
import AdminDashboard from './src/pages/AdminDashboard';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Admin Routes (no layout) */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Main Routes (with layout) */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomeMinimal />} />
              <Route path="/all-products" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:productSlug" element={<ProductDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
