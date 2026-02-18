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
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: '',
    category: 1,
    image: '',
    description: '',
    features: '',
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
      const url = editingId
        ? `${getApiBaseURL()}/api/products/${editingId}`
        : `${getApiBaseURL()}/api/products`;

      const method = editingId ? 'PUT' : 'POST';

      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category.toString());
      data.append('description', formData.description);

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
        // Do NOT set Content-Type header when using FormData, browser does it automatically
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
          features: '',
        });
        setImagePreview(null);
        setEditingId(null);
        setShowForm(false);
        fetchProducts();

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving product. Please try again.');
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
      image: product.image,
      description: product.description,
      features: Array.isArray(product.features) ? product.features.join('\n') : product.features || '',
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
      image: '',
      description: '',
      features: '',
    });
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
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

        {/* ADD PRODUCT BUTTON */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-sm font-bold mb-8 transition-colors"
          >
            <Plus size={20} />
            Add New Product
          </button>
        )}

        {/* FORM SECTION */}
        {showForm && (
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

        {/* PRODUCTS TABLE */}
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
