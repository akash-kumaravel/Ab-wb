import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Share2 } from 'lucide-react';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';
import { Product } from '../types';
import ProductService from '../services/ProductService';
import { slugify, findProductBySlug } from '../utils/slugify';

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

const ProductDetail: React.FC = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Log immediately on mount and when productSlug changes
  React.useEffect(() => {
    console.log('=== PRODUCT DETAIL PAGE MOUNT ===');
    console.log('Current URL:', window.location.href);
    console.log('useParams productSlug:', productSlug);
  }, [productSlug]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('=== FETCH DATA START ===');
      console.log('Product slug from URL:', productSlug);
      console.log('Window location:', window.location.href);
      
      // Always start with constants as base - these are guaranteed to be valid
      const baseProducts = [...TRENDING_PRODUCTS, ...SPECIAL_OFFERS];
      console.log('Base products from constants:', baseProducts.length, 'products');
      console.log('Base product names:', baseProducts.map(p => p.name));
      
      let productsToUse = [...baseProducts]; // Start with constants
      
      try {
        // Try to fetch from API
        const apiProducts = await ProductService.getAllProducts();
        console.log('API returned:', apiProducts);
        
        // If API has valid products, add them (but keep constants as base)
        if (apiProducts && Array.isArray(apiProducts) && apiProducts.length > 0) {
          console.log('API has products, combining with constants');
          // Merge API products with constants (API first, then constants)
          const idSet = new Set(apiProducts.map(p => p?.id));
          const validApiProducts = apiProducts.filter(p => p?.name && p?.id);
          productsToUse = [...validApiProducts, ...baseProducts.filter(p => !idSet.has(p.id))];
        } else {
          console.log('API returned no valid products, using only constants');
        }
      } catch (error) {
        console.error('Error fetching from API:', error);
        console.log('Using constants only');
      }
      
      console.log('Final products to search:', productsToUse.length, 'products');
      setAllProducts(productsToUse);

      let found: Product | null = null;

      // If slug is undefined, show first product as fallback
      if (!productSlug) {
        console.log('No slug provided, using first available product');
        found = productsToUse[0] || null;
        console.log('First product:', found?.name);
      } else {
        // Search for product by slug
        console.log('Searching for slug:', productSlug);
        found = findProductBySlug(productSlug, productsToUse);
        
        if (!found) {
          console.log('Slug not found');
          found = productsToUse.find(p => p.name.toLowerCase() === productSlug.toLowerCase());
        }
        console.log('Found:', found?.name);
      }
      
      setProduct(found || null);

      if (found) {
        setRelatedProducts(
          productsToUse.filter(p => p.id !== found.id).slice(0, 4)
        );
      } else {
        console.warn('No product found! productsToUse:', productsToUse);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [productSlug]);

  return (
    <div className="min-h-screen bg-black">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Loading product...</p>
        </div>
      )}

      {!loading && !product && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-2 text-sm">Slug: {productSlug || 'None'}</p>
            {allProducts.length > 0 && (
              <div className="mb-6 text-left bg-gray-900 p-4 rounded-sm border border-gray-800">
                <h3 className="text-white font-bold mb-2 text-sm">Available Products ({allProducts.length}):</h3>
                <ul className="text-gray-400 text-xs space-y-1">
                  {allProducts.map(p => (
                    <li key={p.id} 
                      onClick={() => navigate(`/product/${slugify(p.name)}`)}
                      className="hover:text-blue-500 cursor-pointer"
                    >
                      {p.id}. {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-all"
            >
              Back to All Products
            </button>
          </div>
        </div>
      )}

      {!loading && product && (
        <>
          {/* BREADCRUMB */}
          <div className="max-w-[1400px] mx-auto px-4 py-6 flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/shop')}
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              Products
            </button>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>

          {/* PRODUCT DETAIL SECTION */}
          <section className="max-w-[1400px] mx-auto px-4 py-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-8 transition-colors"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* PRODUCT IMAGE */}
              <div className="flex items-start justify-center">
                <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden border border-gray-800 group flex items-start justify-center">
                  {product.image ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
                        }}
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-colors">
                          <Heart size={18} className="text-white" />
                        </button>
                        <button className="p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-colors">
                          <Share2 size={18} className="text-white" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">No Image Available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="flex flex-col justify-center space-y-6">
                {/* TITLE */}
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                  {product.model || product.series ? (
                    <div className="text-sm text-gray-400 space-y-1">
                      {product.model && <p>Model: <span className="text-white font-semibold">{product.model}</span></p>}
                      {product.series && <p>Series: <span className="text-white font-semibold">{product.series}</span></p>}
                    </div>
                  ) : null}
                </div>

                {/* PRICE */}
                <div className="border-t border-b border-gray-800 py-6">
                  <p className="text-gray-400 text-sm mb-2">Price</p>
                  <p className="text-4xl font-black text-blue-500">{product.price}</p>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Product Description</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {product.description || 'Experience premium quality textile machinery designed for industrial excellence. This advanced equipment provides superior performance, durability, and efficiency for your textile production operations.'}
                  </p>
                </div>

                {/* FEATURES */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                      product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-400">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-3 text-gray-400">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          High-precision engineering
                        </li>
                        <li className="flex items-center gap-3 text-gray-400">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Energy-efficient operation
                        </li>
                        <li className="flex items-center gap-3 text-gray-400">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          24/7 Technical support
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-sm border border-gray-800 hover:border-gray-700 transition-colors">
                    Contact for Inquiry
                  </button>
                </div>

                {/* SPECS */}
                <div className="bg-gray-900 p-4 rounded-sm border border-gray-800">
                  <h4 className="text-sm font-bold text-white mb-3 uppercase">Specifications</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between"><span>Category:</span><span className="text-white">{product.categoryName || 'Textile Machinery'}</span></div>
                    {product.model && <div className="flex justify-between"><span>Model:</span><span className="text-white">{product.model}</span></div>}
                    {product.series && <div className="flex justify-between"><span>Series:</span><span className="text-white">{product.series}</span></div>}
                    <div className="flex justify-between"><span>Warranty:</span><span className="text-white">{product.warranty || '24 Months'}</span></div>
                    <div className="flex justify-between"><span>Shipping:</span><span className="text-white">{product.shipping || '2-5 Business Days'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* RELATED PRODUCTS */}
            <div className="border-t border-gray-800 pt-20">
              <h2 className="text-3xl font-bold text-white mb-10">
                Related <span className="font-light">Products</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map(relProd => (
                  <div
                    key={relProd.id}
                    onClick={() => navigate(`/product/${slugify(relProd.name)}`)}
                    className="cursor-pointer group"
                  >
                    <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden mb-4 border border-gray-800 hover:border-blue-500 transition-colors flex items-center justify-center">
                      {relProd.image ? (
                        <img
                          src={relProd.image}
                          alt={relProd.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-gray-300 group-hover:text-blue-500 transition-colors line-clamp-2 mb-2">
                      {relProd.name}
                    </h3>
                    <p className="text-blue-500 font-black">{relProd.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
