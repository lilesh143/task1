import React, { useState, useEffect } from 'react';

const token = "test"; // Replace with your actual token

const submitUpdatedProduct = async (productData) => {
  try {
    const response = await fetch(`https://ops.cloud.leadtorev.com/product-catalog/update`, {
      method: 'PUT', // or 'PATCH', depending on your API
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert('Product updated successfully!');
    } else {
      // Log the response for debugging
      const errorData = await response.json();
      console.error('Error response:', errorData);
      alert('Error updating product.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error updating product.');
  }
};

function UpdateModal({ onClose, product }) {
  const [productName, setProductName] = useState(product.name || '');
  const [productDescription, setProductDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.categories[0] || '');
  const [availability, setAvailability] = useState(product.availability.inStock || false);
  const [price, setPrice] = useState(product.price || '');
  const [quantity, setQuantity] = useState(product.availability.quantity || 0);
  const [attributes, setAttributes] = useState(product.attributes || [{ key: '', value: '' }]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [name]: value } : attr
    );
    setAttributes(updatedAttributes);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      productId: product._id, // Include the product ID for identification
      name: productName,
      description: productDescription,
      price: parseFloat(price),
      categories: [category],
      attributes,
      availability: {
        inStock: availability,
        quantity: parseInt(quantity, 10),
      },
    };
    await submitUpdatedProduct(productData);
    onClose(); // Hide the modal after submission
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Product Description:</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Product Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Health & Personal Care">Health & Personal Care</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Automotive">Automotive</option>
              <option value="Beauty & Grooming">Beauty & Grooming</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Availability:</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value === 'true')}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={true}>In Stock</option>
              <option value={false}>Out of Stock</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Attributes:</label>
            {attributes.map((attr, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={attr.key}
                  onChange={(e) => handleAttributeChange(index, e)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, e)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAttribute(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAttribute}
              className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Add Attribute
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdateModal;
