import React, { useState, useEffect } from 'react';
import getApiBaseURL from '../config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit2, Upload } from 'lucide-react';

interface ProductForm {
  name: string;
  price: string;
  category: number | string;
  image: string | File | null;
  description: string;
  features: string;
  sku: string;
  warranty: string;
  shipping: string;
  model: string;
  series: string;
}

interface SpecialOfferForm {
  productId: number | string;
  discount: string;
  specialOfferPrice: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'product' | 'special-offer' | 'category' | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: '',
    category: 1,
    image: '',
    description: '',
    features: '',
    sku: '',
    warranty: '',
    shipping: '',
    model: '',
    series: '',
  });
  const [specialOfferForm, setSpecialOfferForm] = useState<SpecialOfferForm>({
    productId: '',
    discount: '',
    specialOfferPrice: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check authentication
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin');
    }
    // Load products from server
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${getApiBaseURL()}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Update preview if image URL is entered manually
    if (name === 'image' && typeof value === 'string' && value.trim()) {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (formType === 'special-offer') {
        // Handle Special Offer
        if (!specialOfferForm.productId || !specialOfferForm.specialOfferPrice) {
          setMessage('Please select a product and enter special offer price');
          setLoading(false);
          return;
        }

        const response = await fetch(`${getApiBaseURL()}/api/products/${specialOfferForm.productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            discount: specialOfferForm.discount,
            specialOfferPrice: specialOfferForm.specialOfferPrice,
            isSpecialOffer: true,
          }),
        });

        if (response.ok) {
          setMessage('Special offer added successfully!');
          setSpecialOfferForm({
            productId: '',
            discount: '',
            specialOfferPrice: '',
          });
          setShowForm(false);
          setFormType(null);
          fetchProducts();
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error adding special offer. Please try again.');
        }
      } else if (formType === 'product') {
        // Handle Product
        const url = editingId
          ? `${getApiBaseURL()}/api/products/${editingId}`
          : `${getApiBaseURL()}/api/products`;

        const method = editingId ? 'PUT' : 'POST';

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('category', formData.category.toString());
        data.append('description', formData.description);
        data.append('sku', formData.sku);
        data.append('model', formData.model);
        data.append('series', formData.series);
        data.append('warranty', formData.warranty);
        data.append('shipping', formData.shipping);

        // Handle features as JSON string
        const featuresArray = formData.features.split('\n').filter(f => f.trim());
        data.append('features', JSON.stringify(featuresArray));

        // Handle image
        if (formData.image instanceof File) {
          data.append('image', formData.image);
        } else if (typeof formData.image === 'string') {
          data.append('image', formData.image);
        }

        const response = await fetch(url, {
          method,
          body: data,
        });

        if (response.ok) {
          setMessage(editingId ? 'Product updated successfully!' : 'Product added successfully!');
          setFormData({
            name: '',
            price: '',
            category: 1,
            image: '',
            description: '',
            model: '',
            series: '',
            features: '',
            sku: '',
            warranty: '',
            shipping: '',
          });
          setImagePreview(null);
          setEditingId(null);
          setShowForm(false);
          setFormType(null);
          fetchProducts();
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error saving product. Please try again.');
        }
      }
    } catch (error) {
      setMessage('Error connecting to server. Make sure it\'s running.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 1,
      model: product.model || '',
      series: product.series || '',
      image: product.image,
      description: product.description,
      features: Array.isArray(product.features) ? product.features.join('\n') : product.features || '',
      sku: product.sku || '',
      warranty: product.warranty || '',
      shipping: product.shipping || '',
    });
    setImagePreview(product.image); // Show existing image
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${getApiBaseURL()}/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Product deleted successfully!');
          fetchProducts();
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error deleting product.');
        }
      } catch (error) {
        setMessage('Error connecting to server.');
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      category: 1,
      model: '',
      series: '',
      image: '',
      description: '',
      features: '',
      sku: '',
      warranty: '',
      shipping: '',
    });
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
    setFormType(null);
  };

  const openFormType = (type: 'product' | 'special-offer' | 'category') => {
    setFormType(type);
    setShowForm(true);
    setFormData({
      name: '',
      model: '',
      series: '',
      price: '',
      category: 1,
      image: '',
      description: '',
      features: '',
      sku: '',
      warranty: '',
      shipping: '',
    });
    setImagePreview(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-sm font-bold transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* MESSAGE */}
        {message && (
          <div className={`mb-6 p-4 rounded-sm border ${message.includes('Error')
            ? 'bg-red-900/30 border-red-600 text-red-400'
            : 'bg-green-900/30 border-green-600 text-green-400'
            }`}>
            {message}
          </div>
        )}

        {/* ADD BUTTONS */}
        {!showForm && (
          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => openFormType('product')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-sm font-bold transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              onClick={() => openFormType('special-offer')}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-sm font-bold transition-colors"
            >
              <Plus size={20} />
              Add Special Offer
            </button>
            <button
              onClick={() => openFormType('category')}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-sm font-bold transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        )}

        {/* FORM SECTION */}
        {showForm && formType === 'product' && (
          <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRODUCT NAME */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., Bleaching Machine BS-1800"
                    required
                  />
                </div>

                {/* PRICE */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., $19,500.00"
                    required
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value={1}>Sulzer Weaving Machine</option>
                    <option value={2}>Air-Jet Weaving Machine</option>
                    <option value={3}>OE</option>
                    <option value={4}>Spares & Parts</option>
                    <option value={5}>Scrap</option>
                  </select>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Product Image *
                  </label>

                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <div className="relative border border-gray-700 border-dashed rounded-sm bg-black hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="p-4 flex flex-col items-center justify-center text-gray-400">
                          <Upload size={24} className="mb-2" />
                          <span className="text-sm">Click to upload image</span>
                          <span className="text-xs text-gray-600 mt-1">or drag and drop</span>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="image"
                        value={typeof formData.image === 'string' ? formData.image : ''}
                        onChange={handleInputChange}
                        placeholder="Or enter Image URL manually"
                        className="w-full mt-2 bg-black border border-gray-800 rounded-sm py-2 px-3 text-sm text-gray-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* PREVIEW */}
                    {imagePreview && (
                      <div className="w-32 h-32 bg-gray-900 border-2 border-blue-500 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Product Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                    placeholder="Enter detailed product description"
                    required
                  />
                </div>

                {/* FEATURES */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Features (one per line) *
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none font-mono text-sm"
                    placeholder="High-precision engineering&#10;Energy-efficient operation&#10;24/7 Technical support"
                    required
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    SKU
                  </label>
                  <input
                    type="text"
                    MODEL */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., Rieter"
                  />
                </div>

                {/* SERIES */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Series
                  </label>
                  <input
                    type="text"
                    name="series"
                    value={formData.series}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., R35"
                  />
                </div>

                {/* name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., TM-1-001"
                  />
                </div>

                {/* WARRANTY */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Warranty
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 24 Months"
                  />
                </div>

                {/* SHIPPING */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Shipping
                  </label>
                  <input
                    type="text"
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 2-5 Business Days"
                  />
                </div>
              </div>

              {/* FORM BUTTONS */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors disabled:cursor-not-allowed"
                >
                  <Upload size={18} />
                  {loading ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SPECIAL OFFER FORM */}
        {showForm && formType === 'special-offer' && (
          <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Add Special Offer</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRODUCT SELECTION */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Select Product *
                  </label>
                  <select
                    value={specialOfferForm.productId}
                    onChange={(e) => setSpecialOfferForm({ ...specialOfferForm, productId: e.target.value })}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">-- Select a product --</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (${product.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* DISCOUNT PERCENTAGE */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Discount Percentage *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={specialOfferForm.discount}
                    onChange={(e) => setSpecialOfferForm({ ...specialOfferForm, discount: e.target.value })}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 20"
                    required
                  />
                </div>

                {/* SPECIAL OFFER PRICE */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Special Offer Price *
                  </label>
                  <input
                    type="text"
                    value={specialOfferForm.specialOfferPrice}
                    onChange={(e) => setSpecialOfferForm({ ...specialOfferForm, specialOfferPrice: e.target.value })}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 15,999.00"
                    required
                  />
                </div>
              </div>

              {/* INFO MESSAGE */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-sm p-4 text-sm text-blue-300">
                This will mark the selected product as a special offer and display it in the Special Offers section.
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors disabled:cursor-not-allowed"
                >
                  <Upload size={18} />
                  {loading ? 'Saving...' : 'Add Special Offer'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CATEGORY FORM */}
        {showForm && formType === 'category' && (
          <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., Sulzer Weaving Machine"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Category Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                    placeholder="Enter category description"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors disabled:cursor-not-allowed"
                >
                  <Upload size={18} />
                  {loading ? 'Saving...' : 'Add Category'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-gray-900 border border-gray-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No products yet. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 text-sm">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-400">{product.price}</td>
                      <td className="px-6 py-4 text-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-sm object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-sm transition-colors"
                            title="Edit product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-sm transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
