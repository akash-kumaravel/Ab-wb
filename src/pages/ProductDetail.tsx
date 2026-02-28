import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Check } from 'lucide-react';
import { Product } from '../types';
import ProductService from '../services/ProductService';
import { slugify, findProductBySlug } from '../utils/slugify';

const WHATSAPP_NUMBER = '919344158524';

const buildWhatsAppMessage = (product: Product): string => {
  const lines = [
    `Hello! I am interested in the following product:`,
    ``,
    `*Product:* ${product.name}`,
    product.model ? `*Model:* ${product.model}` : '',
    product.series ? `*Series:* ${product.series}` : '',
    `*Price:* ${product.price}`,
    ``,
    `Could you please provide more details and availability?`,
  ].filter(l => l !== undefined);
  return encodeURIComponent(lines.join('\n'));
};

const openWhatsApp = (product: Product) => {
  const message = buildWhatsAppMessage(product);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
};

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
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.name || 'Product', url });
      } catch (_) { }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Log immediately on mount and when productSlug changes
  React.useEffect(() => {
    console.log('=== PRODUCT DETAIL PAGE MOUNT ===');
    console.log('Current URL:', window.location.href);
    console.log('useParams productSlug:', productSlug);
  }, [productSlug]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedProducts = await ProductService.getAllProducts();
        const validProducts = Array.isArray(fetchedProducts)
          ? fetchedProducts.filter(p => p?.name && p?.id)
          : [];

        setApiProducts(validProducts);
        setAllProducts(validProducts);

        let found: Product | null = null;
        if (productSlug) {
          found = findProductBySlug(productSlug, validProducts);
          if (!found) {
            found = validProducts.find(p => p.name.toLowerCase() === productSlug.toLowerCase()) || null;
          }
        } else {
          found = validProducts[0] || null;
        }

        setProduct(found || null);

        if (found) {
          const related = validProducts.filter(p => p.id !== found!.id).slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
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
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={handleShare}
                          title={copied ? 'Link copied!' : 'Share product'}
                          className="p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-colors flex items-center gap-1"
                        >
                          {copied
                            ? <Check size={18} className="text-white" />
                            : <Share2 size={18} className="text-white" />
                          }
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
                  <button
                    onClick={() => openWhatsApp(product)}
                    className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-sm transition-colors"
                  >
                    {/* WhatsApp Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Enquiry
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
