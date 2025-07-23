import { useState, useEffect } from "react";
import API from "./api";  
import './Product.css';
function ProductForm() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");


  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", form.image);

    try {
      await API.post("/admin/products", formData);

      setMsg("Product added!");
      setForm({
        name: "",
        price: "",
        category: "",
        image: null,
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      setMsg("Error adding product.");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="product-form-container">
      <h2>Add Product</h2>
      <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          type="text"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          type="text"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
      </div>
      <div className={`product-header ${products.length === 0 ? "hidden" : ""}`}>
      <p className="product-message">{msg}</p>

      <h2>Products</h2>
      </div>
      <div className="product-list">
        {products.map((p) => (
          <div  key={p.id}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Category: {p.category}</p>
            <img src={p.imageUrl} alt={p.name} />
          </div>
          
        ))}
      </div>
      
   
    </>
  );
}

export default ProductForm;
