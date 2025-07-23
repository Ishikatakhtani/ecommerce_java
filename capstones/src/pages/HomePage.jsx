import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div className="container mt-4">
     
      <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/792/742/non_2x/3d-realistic-natural-pink-podium-with-hearts-design-template-of-fashion-cosmetics-product-for-ads-flyer-banner-or-magazine-background-iillustration-free-vector.jpg"
              className="d-block w-100"
              alt="Slide 1"
            />
            <div className="carousel-caption d-none d-md-block text-start">
              <h2 className="text-shadow fw-bold">Glow Naturally</h2>
              <p className="text-shadow">Explore our pure, gentle & effective lip care</p>
              <Link to="/products" className="btn btn-light fw-bold px-4 py-2 mt-2">Shop Now</Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://adn-static1.nykaa.com/media/wysiwyg/DOTKE00000243x_1.jpg?tr=w-400,pr-true"
              className="d-block w-100"
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/77a0bb97-5fef-4f32-a947-84f71788ed8e._CR0%2C0%2C3000%2C1500_.jpg"
              className="d-block w-100"
              alt="Slide 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Products */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 product-card shadow-sm">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-success fw-bold">₹ {product.price}</p>
                <p className="card-text text-muted small">
                  <i className="fas fa-star text-warning"></i> {product.rating || 4.5} / 5
                </p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                  <i className="fas fa-eye"></i> View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
