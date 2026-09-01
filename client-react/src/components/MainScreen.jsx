import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
} from '../store/categoriesSlice';
import { addToCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import './MainScreen.css';

export default function MainScreen() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { categories, selectedCategory, products, loading, error } = useSelector(
    (state) => state.categories
  );
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    dispatch(setSelectedCategory(categoryId));
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
    setQuantity(1);
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        categoryName: product.category?.name,
        quantity: parseInt(quantity),
      })
    );
    setQuantity(1);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="main-container">
      <header className="header">
        <h1>חנות מוצרים</h1>
      </header>

      <div className="main-content-wrapper">
        <main className="content">
          <section className="categories-section">
            <label htmlFor="category-select">בחר קטגוריה:</label>
            <select
              id="category-select"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="">-- בחר קטגוריה --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </section>

          {error && <div className="error-message">{error}</div>}

          {loading && <div className="loading">טוען...</div>}

          {selectedCategory && !loading && (
            <section className="products-section">
              <h2>מוצרים בקטגוריה</h2>
              {products.length > 0 ? (
                <div className="products-list">
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-category">{product.category?.name}</span>
                      </div>
                      <div className="product-actions">
                        <div className="quantity-control">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="qty-btn"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="qty-input"
                          />
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="add-to-cart-btn"
                        >
                          הוסף לסל
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-products">אין מוצרים בקטגוריה זו</p>
              )}
            </section>
          )}
        </main>

        <aside className="cart-sidebar">
          <div className="cart-header">
            <h3>סל קניות</h3>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          {cartItems.length > 0 ? (
            <div className="cart-content">
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-category">{item.categoryName}</span>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-qty-control">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="cart-qty-btn"
                        >
                          −
                        </button>
                        <span className="cart-qty">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="cart-qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="checkout-btn">המשך להזמנה</button>
            </div>
          ) : (
            <p className="empty-cart">הסל ריק</p>
          )}
        </aside>
      </div>
    </div>
  );
}
