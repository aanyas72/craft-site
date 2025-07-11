"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";

export default function MyShopPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: ""
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is signed in with Supabase
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUser(user);
        
        // Check seller status
        const cachedStatus = sessionStorage.getItem(`seller_${user.id}`);
        if (cachedStatus !== null) {
          const sellerStatus = cachedStatus === 'true';
          setIsSeller(sellerStatus);
          if (sellerStatus) {
            await fetchUserProducts(user.id);
          }
        } else {
          // Check database for seller status
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('is_seller')
              .eq('id', user.id)
              .single();
            
            if (profile && !error) {
              const sellerStatus = profile.is_seller;
              setIsSeller(sellerStatus);
              sessionStorage.setItem(`seller_${user.id}`, sellerStatus.toString());
              if (sellerStatus) {
                await fetchUserProducts(user.id);
              }
            } else {
              setIsSeller(false);
              sessionStorage.setItem(`seller_${user.id}`, 'false');
            }
          } catch (error) {
            console.log('Profile not found, user is not a seller');
            setIsSeller(false);
            sessionStorage.setItem(`seller_${user.id}`, 'false');
          }
        }
      } else {
        router.push("/login");
        return;
      }
      setLoading(false);
    });
  }, [router]);

  const fetchUserProducts = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const productData = {
        seller_id: user.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url || null
      };

      let result;
      if (editingProduct) {
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
      } else {
        // Insert new product
        result = await supabase
          .from('products')
          .insert(productData);
      }

      if (result.error) {
        console.error('Error saving product:', result.error);
        alert('Failed to save product. Please try again.');
      } else {
        // Reset form and refresh products
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image_url: ""
        });
        setEditingProduct(null);
        setShowAddForm(false);
        await fetchUserProducts(user.id);
        alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category || "",
      image_url: product.image_url || ""
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      } else {
        await fetchUserProducts(user.id);
        alert('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const toggleProductStatus = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);

      if (error) {
        console.error('Error updating product status:', error);
        alert('Failed to update product status. Please try again.');
      } else {
        await fetchUserProducts(user.id);
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Failed to update product status. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: ""
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#cfc8c2] border-t-[#8B5C2A] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (!isSeller) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold text-[#5a3c20] mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need to be a seller to access the My Shop page.</p>
            <button
              onClick={() => router.push('/sell')}
              className="bg-[#8B5C2A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6B3F16] transition"
            >
              Become a Seller
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#5a3c20] mb-2">My Shop</h1>
              <p className="text-gray-600">Manage your product listings</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#8B5C2A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6B3F16] transition flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Add New Product
            </button>
          </div>

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-[#5a3c20] mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                  >
                    <option value="">Select a category</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Ceramics">Ceramics</option>
                    <option value="Knitting">Knitting</option>
                    <option value="Woodwork">Woodwork</option>
                    <option value="Leather Goods">Leather Goods</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Glass Art">Glass Art</option>
                    <option value="Metalwork">Metalwork</option>
                    <option value="Paper Crafts">Paper Crafts</option>
                    <option value="Candles">Candles</option>
                    <option value="Soaps">Soaps</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Basketry">Basketry</option>
                    <option value="Quilting">Quilting</option>
                    <option value="Embroidery">Embroidery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                    placeholder="Describe your product..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-[#8B5C2A] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6B3F16] transition"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url || '/handmaking.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={e => e.target.src = '/handmaking.jpeg'}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleProductStatus(product)}
                      className={`p-2 rounded-full ${
                        product.is_active 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      } hover:opacity-80 transition`}
                      title={product.is_active ? 'Active' : 'Inactive'}
                    >
                      {product.is_active ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">{product.name}</h3>
                    <span className="text-[#8B5C2A] font-bold text-lg ml-2">
                      ${product.price}
                    </span>
                  </div>
                  {product.category && (
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  )}
                  {product.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition"
                    >
                      <FiEdit className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && !showAddForm && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Start building your shop by adding your first product.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-[#8B5C2A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6B3F16] transition"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
