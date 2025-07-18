import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Contact } from 'lucide-react';
import imageCompression from 'browser-image-compression';

// Move ProductForm component outside of Products component
const ProductForm = ({
  product,
  onSubmit,
  onCancel,
  formData,
  setFormData,
  showNewCategory,
  setShowNewCategory,
  categories,
  urls,
  uploadImages,
  removeImage
}) => {
  // Update form data when product changes (for editing) - only when product actually changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || '',
        category: product?.category
          ? Array.isArray(product.category)
            ? product.category
            : [product.category]
          : [],
        price: product?.price || '',
        discount: product?.discount || '',
        stock: product?.stock || '',
        description: product?.desc|| '',

        image: [
          product?.image1 || '',
          product?.image2 || '',
          product?.image3 || '',
        ],
      });

    }
  }, [product?.id, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  console.log(formData)
  //Image Input field
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.image];
    updatedImages[index] = value;
    setFormData({ ...formData, image: updatedImages });
  };

  // Ensure always 3 inputs, fill missing with empty strings
  const inputImages = [...formData.image];
  while (inputImages.length < 3) {
    inputImages.push('');
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center justify-between">
              <span>Category</span>
              <button className="btn btn-secondary"
                type="button"
                onClick={() => setShowNewCategory(!showNewCategory)}

              >
                {showNewCategory ? 'Cancel' : 'Add NEW'}
              </button>
            </label>
            <select
              className="form-select"
              value={formData.category[0] || ''} // ✅ use first category for single select
              onChange={(e) =>
                setFormData({ ...formData, category: [e.target.value] }) // ✅ always set as array
              }
            >
              {categories.filter(cat => cat !== 'all').map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

          </div>

          {showNewCategory && (
            <div className="form-group">
              <label className="form-label">Multiple Category</label>
             <input
  type="text"
  className="form-input"
  value={formData.category.join(', ')} // display as string
  onChange={(e) => {
    const uniqueCategories = [...new Set(e.target.value.split(',').map(cat => cat.trim()))];
    setFormData({
      ...formData,
      category: uniqueCategories, // ✅ update with cleaned array
    });
  }}
  placeholder="Enter categories separated by commas"
/>



            </div>
          )}

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />

          </div>
          <div className="form-group">
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
              required
            />

          </div>
          <div className="form-group">
            <label className="form-label">Description:</label>
            <textarea className='form-input' rows="4" placeholder="Enter product description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

          </div>
          <div className="form-group">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-input"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Image URL</label>
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={uploadImages}
              />
              <p style={{ color: "gray", fontSize: "14px" }}>
                You can upload up to 3 images at a time.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                {urls.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img src={url} alt={`Uploaded ${idx + 1}`} width="150" height="150" />
                    <button
                      onClick={() => removeImage(idx)}
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        background: "#ff4d4f",
                        border: "none",
                        borderRadius: "50%",
                        color: "white",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        fontSize: "14px",
                        lineHeight: "20px",
                        textAlign: "center",
                      }}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="url"
                className="form-input"
                placeholder="Image 1 URL"
                value={formData.image[0] || ''}
                onChange={(e) => {
                  const updatedImages = [...formData.image];
                  updatedImages[0] = e.target.value;
                  setFormData({ ...formData, image: updatedImages });
                }}
              />

              <input
                type="url"
                className="form-input"
                placeholder="Image 2 URL"
                value={formData.image[1] || ''}
                onChange={(e) => {
                  const updatedImages = [...formData.image];
                  updatedImages[1] = e.target.value;
                  setFormData({ ...formData, image: updatedImages });
                }}
              />
              <input
                type="url"
                className="form-input"
                placeholder="Image 3 URL"
                value={formData.image[2] || ''}
                onChange={(e) => {
                  const updatedImages = [...formData.image];
                  updatedImages[2] = e.target.value;
                  setFormData({ ...formData, image: updatedImages });
                }}
              />
            </div>




          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            {product ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const Products = ({ toast }) => {
 const BLOG_ID = import.meta.env.VITE_BLOG_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
  const ACCESS_TOKEN = localStorage.getItem("access_token");


  // Move formData state to parent component
  const [formData, setFormData] = useState({
    name: '',
    category: [],
    description: '',
    price: '',
    discount: '',
    stock: '',
    image: [],
    image1: '',
    image2: '',
    image3: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showNewCategory, setShowNewCategory] = useState(false);

  //GET Products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = async () => {


    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`);
    const data = await res.json();
    const mapped = data.items.map((post) => {
      const { image1, image2, image3, price, stock, desc, discount } = parsePostContent(post.content || "");

      return {
        id: post.id,
        name: post.title,
        category: post.labels?.join(", ") || "Uncategorized",
        price,
        stock,
        image1,
        image2,
        image3,
        desc,
        discount,
        url: post.url,
        author: post.author?.displayName || "Unknown",
      };
    });

    setProducts(mapped);

  };

  //Get Products (Content Parsing)
  const parsePostContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // IMAGE
    const imgTag1 = doc.querySelector("#p1img");
    const image1 = imgTag1?.getAttribute("src") || "";
    const imgTag2 = doc.querySelector("#p2img");
    const image2 = imgTag2?.getAttribute("src") || "";
    const imgTag3 = doc.querySelector("#p3img");
    const image3 = imgTag3?.getAttribute("src") || "";

    // PRICE
    const priceTag = doc.querySelector(".productPrice");
    const price = priceTag?.getAttribute("content") || "0";

    // STOCK
    const stockInput = doc.querySelector("#stck");
    const stock = stockInput?.getAttribute("max") || "1";

    //Discount
        const disc = doc.querySelector(".productPrice");
        const discount = disc?.getAttribute("data-discount-percent") || ""; 


    //Description
    const dsc = doc.querySelector("h4");
const desc = dsc?.textContent.trim() || "";


    return { image1, image2, image3, price: parseFloat(price), stock: parseInt(stock), desc,discount };
  };


  const categories = ['all', ...new Set(products.map(p => p.category))];


  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });




  //ADD Product Api
  const createPost = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return alert("Login first");


    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        blogId : import.meta.env.VITE_BLOG_ID,
        title: formData.name,
        content: htmlTemplate,
        labels: [formData.category]
      }),
    });

    const data = await res.json();
    console.log(data);
    toast.success('Product Added');
    fetchPosts();

  };


  //product content
  const htmlTemplate = `
<div class="productPhoto">
  <a href="${formData.image[0]}"><img id='p1img' src="${formData.image[0]}" /></a>
  <a href="${formData.image[1]}"><img id='p2img' class="lightbox" src="${formData.image[1]}" /></a>
  <a href="${formData.image[2]}"><img id='p3img' class="lightbox" src="${formData.image[2]}" /></a>
</div>


<div class="productDetail" id="stck" data-stock="${formData.stock > 0 ? 'on' : 'off'}" max="${formData.stock}">

<!--==== harga produk ====-->
<span class="productPrice" data-discount-percent="${formData.discount}" content="${formData.price}">${formData.price}</span>

<!--==== opsi produk star ====-->
<br />


<!--==== opsi warna produk star ====-->


<!--==== detail produk ====-->
<br />
<div class="detailDescription">
  <h4>Detail Product</h4>
  <br />
  <p>${formData.description}</p>
</div>
<br />
</div>
`;

  //DELETE Product Api
  const deletePost = async (postId) => {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (res.status === 204) {
      console.log("✅ Post deleted successfully.");
      toast.success('Product Deleted');
      fetchPosts();
    } else {
      console.error("❌ Failed to delete post.", await res.text());
    }
  };


  //Update Product Api
  const updatePost = async (postId, updatedData) => {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      const updatedPost = await res.json();
      console.log("✅ Post updated:", updatedPost);
      return updatedPost;
    } else {
      console.error("❌ Failed to update post:", await res.text());
    }
  };

  // Reset form data when showing add form or starting edit
  const resetFormData = () => {
    setFormData({
      name: '',
      category: [],
      description: '',
      price: '',
      stock: '',
      image: [],
      image1: '',
      image2: '',
      image3: ''
    });
  };

  // Set form data when editing a product
  const setFormDataForEdit = (product) => {
    setFormData({
      name: product?.name || '',
      category: product?.category
        ? Array.isArray(product.category)
          ? product.category
          : [product.category]
        : [],
      description: product?.description || '',
      price: product?.price || '',
      stock: product?.stock || '',
      image: product?.image ? [product.image] : [],
      image1: product?.image1 || '',
      image2: product?.image2 || '',
      image3: product?.image3 || ''
    });
  };

  const handleAddProduct = (productData) => {


    setShowAddForm(false);
    resetFormData();
    createPost();
    // toast.success('Product Added', `${productData.name} has been added successfully.`);


  };

  //Image Crop
  const resizeToSquare = (file, size = 480) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");

        // crop from center
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;

        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(croppedFile);
        }, file.type, 0.7); // 👈 compress: quality 70%

      };

      img.onerror = (err) => reject(err);

      reader.readAsDataURL(file);
    });
  };


  //Upload Img 
  const [urls, setUrls] = useState([]);

  const uploadImages = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("Please select only up to 3 images.");
      return;
    }

    const uploadedUrls = [];

    for (const file of files) {
      try {
        // ✅ Compress and resize image in browser
        const croppedFile = await resizeToSquare(file, 480); // 👈 crop to 640x640

        const data = new FormData();
        data.append("file", croppedFile);
        data.append("upload_preset", "Lappyfi");
        data.append("cloud_name", "dy5utqlkm");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dy5utqlkm/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        uploadedUrls.push(result.secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    setUrls(prev => [...prev, ...uploadedUrls]);
    // Update formData with new images
    setFormData(prev => ({
      ...prev,
      image: [...prev.image, ...uploadedUrls]
    }));
  };

  const removeImage = (index) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleEditProduct = (productData) => {
    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    setEditingProduct(null);
    resetFormData();
    updatePost(editingProduct.id, {
  title: formData.name,
  content: htmlTemplate,
  labels: formData.category
});
 

    toast.success('Product Updated', `${productData.name} has been updated successfully.`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const product = products.find(p => p.id === id);
      setProducts(products.filter(p => p.id !== id));
      deletePost(id);

      // toast.success('Product Deleted', `${product.name} has been deleted successfully.`);
    }
  };

  return (
    <div className="products">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowAddForm(true);
            resetFormData();
          }}
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {(showAddForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
            resetFormData();
          }}
          formData={formData}
          setFormData={setFormData}
          showNewCategory={showNewCategory}
          setShowNewCategory={setShowNewCategory}
          categories={categories}
          urls={urls}
          uploadImages={uploadImages}
          removeImage={removeImage}
        />
      )}

      <div className="card">
        <div className="flex gap-4 mb-4">
          <div className="search-container flex-1">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '150px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image1}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td className="font-medium">₹{(product.price).toFixed(0)}</td>
                  <td>
                    <span className={product.stock === 0 ? 'text-red-600' : 'text-green-600'}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.stock === 0 ? 'status-cancelled' : 'status-completed'}`}>
                      {product.stock === 0 ? 'Out' : 'In'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-secondary">
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setEditingProduct(product);
                          setFormDataForEdit(product);
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;