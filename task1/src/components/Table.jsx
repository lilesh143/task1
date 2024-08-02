import React, { useEffect, useState } from "react";
import DelModal2 from "./DelModal2";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal"; // Import UpdateModal component

function Table() {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [productId, setProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = "test";

  useEffect(() => {
    fetch("https://ops.cloud.leadtorev.com/product-catalog/get/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://ops.cloud.leadtorev.com/product-catalog/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setProducts(products.filter((product) => product._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenUpdateModal = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedProduct(null);
  };

  const handleOpenDeleteModal = (id) => {
    setProductId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div>
        <div className="p-6">
          <div className="w-100">
            <button
              onClick={handleOpenCreateModal}
              className="bg-blue-300 rounded-xl px-4 py-2 text-white"
            >
              Create Product
            </button>
          </div>

          {showCreateModal && <CreateModal onClose={handleCloseCreateModal} />}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.categories.join(", ")}</td>
                <td>{product.availability.inStock ? "In Stock" : "Out of Stock"}</td>
                <td>{product.price}</td>
                <td>{product.availability.quantity}</td>
                <td>
                  <button
                    onClick={() => handleOpenUpdateModal(product)}
                    className="bg-yellow-300 rounded-xl px-2 py-1"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenDeleteModal(product._id)}
                    className="bg-red-300 rounded-xl px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <DelModal2
          productId={productId}
          onDelete={handleDelete}
          onClose={handleCloseDeleteModal}
        />
      )}

      {showUpdateModal && selectedProduct && (
        <UpdateModal
          product={selectedProduct}
          onClose={handleCloseUpdateModal}
        />
      )}
    </>
  );
}

export default Table;
