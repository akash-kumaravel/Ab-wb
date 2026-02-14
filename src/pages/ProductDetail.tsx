import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Find product from either trending or special offers
  const product = useMemo(() => {
    const allProducts = [...TRENDING_PRODUCTS, ...SPECIAL_OFFERS];
    return allProducts.find(p => p.id === parseInt(productId || '1'));
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-all"
          >
            Back to All Products
          </button>
        </div>
      </div>
    );
  }

  // Get related products (same category approximately)
  const relatedProducts = useMemo(() => {
    const allProducts = [...TRENDING_PRODUCTS, ...SPECIAL_OFFERS];
    return allProducts.filter(p => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen bg-black">
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
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden border border-gray-800 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-colors">
                  <Heart size={18} className="text-white" />
                </button>
                <button className="p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-colors">
                  <Share2 size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-center space-y-6">
            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
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
                Experience premium quality textile machinery designed for industrial excellence. 
                This advanced equipment provides superior performance, durability, and efficiency 
                for your textile production operations. Built with precision engineering and 
                cutting-edge technology to meet international quality standards.
              </p>
            </div>

            {/* FEATURES */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
              <ul className="space-y-2">
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
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  2-year warranty included
                </li>
              </ul>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-sm transition-colors">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-sm border border-gray-800 hover:border-gray-700 transition-colors">
                Buy Now
              </button>
            </div>

            {/* SPECS */}
            <div className="bg-gray-900 p-4 rounded-sm border border-gray-800">
              <h4 className="text-sm font-bold text-white mb-3 uppercase">Specifications</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between"><span>Category:</span><span className="text-white">Textile Machinery</span></div>
                <div className="flex justify-between"><span>SKU:</span><span className="text-white">TM-{product.id}-001</span></div>
                <div className="flex justify-between"><span>Warranty:</span><span className="text-white">24 Months</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span className="text-white">2-5 Business Days</span></div>
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
                onClick={() => navigate(`/product/${relProd.id}`)}
                className="cursor-pointer group"
              >
                <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden mb-4 border border-gray-800 hover:border-blue-500 transition-colors">
                  <img
                    src={relProd.image}
                    alt={relProd.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
    </div>
  );
};

export default ProductDetail;
