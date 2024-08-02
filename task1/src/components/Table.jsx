import React, { useEffect, useState } from "react";
import DelModal2 from "./DelModal2";
import CreateModal from "./CreateModal";

function Table() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null);
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setProducts(products.filter((product) => product._id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
    <div className="p-6">
      <div className="w-100">
        <button
          onClick={handleOpenModal}
          className="bg-blue-300 rounded-xl px-4 py-2 text-white"
        >
          Create Product
        </button>
      </div>

      {isModalOpen && (
        <CreateModal onClose={handleCloseModal} />
      )}
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
              <th>Edit Button</th>
              <th>Delete Button</th>
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
                  <button>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setProductId(product._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <DelModal2
          productId={productId}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Table;
