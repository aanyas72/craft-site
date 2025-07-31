"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";
import { useUser } from "../../context/UserContext";

export default function MyShopPage() {
  const { user, loading, isSeller } = useUser();
  const [isVerified, setIsVerified] = useState(false);
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    video_url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && isSeller) {
      fetchUserProducts(user.id);
    }
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, isSeller, router]);

  const fetchUserProducts = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Validate required uploads
    // TODO: change alerts later
    if (!formData.image_url) {
      alert("Please upload a product image. Images are required.");
      return;
    }
    if (!formData.video_url) {
      alert("Please upload a product video. Videos are required.");
      return;
    }

    try {
      const productData = {
        seller_id: user.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url,
        video_url: formData.video_url,
      };

      let result;
      if (editingProduct) {
        // Update existing product
        result = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
      } else {
        // Insert new product
        result = await supabase.from("products").insert(productData);
      }

      if (result.error) {
        console.error("Error saving product:", result.error);
        alert("Failed to save product. Please try again.");
      } else {
        // Reset form and refresh products
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image_url: "",
          video_url: "",
        });
        setImageFile(null);
        setVideoFile(null);
        setEditingProduct(null);
        setShowAddForm(false);
        await fetchUserProducts(user.id);
        alert(
          editingProduct
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category || "",
      image_url: product.image_url || "",
      video_url: product.video_url || "",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      } else {
        await fetchUserProducts(user.id);
        alert("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const toggleProductStatus = async (product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_active: !product.is_active })
        .eq("id", product.id);

      if (error) {
        console.error("Error updating product status:", error);
        alert("Failed to update product status. Please try again.");
      } else {
        await fetchUserProducts(user.id);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("Failed to update product status. Please try again.");
    }
  };

  const handleVideoUpload = async (file) => {
    if (!file) return;

    // Check file size (50MB = 50 * 1024 * 1024 bytes)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Video file size must be less than 50MB");
      return;
    }

    // Check file type
    const allowedTypes = [
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/wmv",
      "video/flv",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload a valid video file (MP4, AVI, MOV, WMV, FLV, or WebM)"
      );
      return;
    }

    setVideoUploading(true);
    try {
      const fileName = `videos/${user.id}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-videos")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading video:", error);
        alert("Failed to upload video. Please try again.");
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-videos").getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, video_url: publicUrl }));
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setVideoUploading(false);
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      handleVideoUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image file size must be less than 10MB");
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    setImageUploading(true);
    try {
      const fileName = `images/${user.id}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
      video_url: "",
    });
    setImageFile(null);
    setVideoFile(null);
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
            <h1 className="text-2xl font-bold text-[#5a3c20] mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be a seller to access the My Shop page.
            </p>
            <button
              onClick={() => router.push("/sell")}
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
              <h1 className="text-3xl font-bold text-[#5a3c20] mb-2">
                My Shop
              </h1>
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

          {/* Verification Banner */}
          {isSeller && !isVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      Your shop is not verified.
                      <button className="ml-2 text-yellow-800 underline hover:text-yellow-900 font-medium">
                        Get Verified!
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TODO: Link this to the public shop */}
          {isSeller && user && (
            <div className="text-center mb-4">
              <a
                href={`/shop/${user.id}`}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                View your public shop
              </a>
            </div>
          )}

          {/* Add/Edit Product Form */}
          {/* TODO: get the categories from the product page/db */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-[#5a3c20] mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
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
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
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
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                    placeholder="Describe your product..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image * (Max 10MB)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                      disabled={imageUploading}
                      required
                    />
                    {imageUploading && (
                      <div className="flex items-center text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading image...
                      </div>
                    )}
                    {formData.image_url && (
                      <div className="text-sm text-green-600">
                        ✓ Image uploaded successfully
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Supported formats: JPEG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Video * (Max 50MB)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5C2A]"
                      disabled={videoUploading}
                      required
                    />
                    {videoUploading && (
                      <div className="flex items-center text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading video...
                      </div>
                    )}
                    {formData.video_url && (
                      <div className="text-sm text-green-600">
                        ✓ Video uploaded successfully
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Supported formats: MP4, AVI, MOV, WMV, FLV, WebM
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-[#8B5C2A] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6B3F16] transition"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
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
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url || "/handmaking.jpeg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/handmaking.jpeg")}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleProductStatus(product)}
                      className={`p-2 rounded-full ${
                        product.is_active
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      } hover:opacity-80 transition`}
                      title={product.is_active ? "Active" : "Inactive"}
                    >
                      {product.is_active ? (
                        <FiEye className="w-4 h-4" />
                      ) : (
                        <FiEyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">
                      {product.name}
                    </h3>
                    <span className="text-[#8B5C2A] font-bold text-lg ml-2">
                      ${product.price}
                    </span>
                  </div>
                  {product.category && (
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                  )}
                  {product.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {product.video_url && (
                    <div className="mb-3">
                      <video
                        controls
                        className="w-full h-32 object-cover rounded"
                        preload="metadata"
                      >
                        <source src={product.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start building your shop by adding your first product.
              </p>
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
