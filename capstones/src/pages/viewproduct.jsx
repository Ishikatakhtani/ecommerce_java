import { useEffect, useState } from "react";
import API from "./api";
import './viewproduct.css';
import { Link } from 'react-router-dom';

function VProducts() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); // adjust as needed

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/user/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const searchProducts = async () => {
  try {
    const res = await API.get("/user/products/search", {
      params: {
        name: searchTerm
      }
    });
  setProducts(res.data);
    setMsg(`Showing results for "${searchTerm}"`);
  } catch (err) {
    console.error(err);
    setMsg("Error searching products");
  }
};


  const filterByPrice = async () => {
    try {
      const res = await API.get("/user/products/filter", {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice
        }
      });
      setProducts(res.data);
      setMsg(`Showing products from ₹${minPrice} to ₹${maxPrice}`);
    } catch (err) {
      console.error(err);
      setMsg("Error filtering products");
    }
  };


const sortProductsByName = async (order = "asc") => {
  try {
    const res = await API.get("/user/products/sort", {
      params: { order },
    });
    setProducts(res.data);
    setMsg(`Sorted by name (${order.toUpperCase()})`);
  } catch (err) {
    console.error(err);
    setMsg("Error sorting products");
  }
};



  const addToCart = async (productId) => {
    try {
      const username = localStorage.getItem("username");
      await API.post(`/api/cart/add`, null, {
        params: {
          productId: productId,
          quantity: 1,
          username: username
        }
      });
      setMsg("Product added to cart!");
    } catch (err) {
      console.error(err);
      setMsg("Error adding to cart");
    }
  };

  return (
   <>
   
<div className="catalog-container">
      {/* Sidebar */}
      <aside className="catalog-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Search</label>
          
          <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> <br/> <br/>
          <button className="catalog-button" onClick={searchProducts}>Search</button>
        <button className="catalog-button" onClick={fetchProducts} style={{ marginLeft: "10px" }}>
          Clear
        </button>
        </div>
        <div className="filter-group">
<div style={{ marginBottom: "20px" }}>
        <label>
          Min Price: ₹{minPrice}
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            style={{ margin: "0 10px" }}
          />
        </label>
        <br />
        <label>
          Max Price: ₹{maxPrice}
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ margin: "0 10px" }}
          />
        </label>
        <br />
        <button className="catalog-button" onClick={filterByPrice}>Filter by Price</button>
      </div>
      </div>
        <div className="filter-group">
          
          <label>Sort By</label>
          <select  onChange={(e) => {
      const val = e.target.value;
      sortProductsByName(val);
      if (val === "price-low") sortProductsByName("desc");
      else if (val === "price-high") sortProductsByName("asc");
    }}
  >
            <option value="default">Default</option>
            <option value="price-low">Z-A</option>
            <option value="price-high">A-Z</option>
          </select>
          {/* <button onClick={filterByPrice}>Filter by Price</button> */}
        </div>

        {/* Future scope: Add price slider here */}
        {/* <div className="filter-group">...Price Range Filter...</div> */}
      </aside>

      {/* Products */}
       
      <main className="catalog-products">
      
       <div className="products-wrapper">

  {products.length > 0 ? (
    <div className="product-grid">
      {products.map((p) => (
        <div className="product-card" key={p.id} >
        <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
  <img className="card-body" src={p.imageUrl} alt={p.name} />

          <h3>{p.name}</h3>
          <p className="product-price">₹{p.price}</p>
          <p className="product-category">{p.category}</p>
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-products-msg">No products found.</p>
  )}
  
</div>


      </main>
      
    </div>

   </>
  );
}

export default VProducts;
