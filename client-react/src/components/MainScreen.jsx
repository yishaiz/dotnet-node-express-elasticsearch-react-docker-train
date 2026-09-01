import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
} from '../store/categoriesSlice';
import './MainScreen.css';

export default function MainScreen() {
  const dispatch = useDispatch();
  const { categories, selectedCategory, products, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    dispatch(setSelectedCategory(categoryId));
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>חנות מוצרים</h1>
      </header>

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
              <ul className="products-list">
                {products.map((product) => (
                  <li key={product.id} className="product-item">
                    <span className="product-name">{product.name}</span>
                    <span className="product-category">{product.category?.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-products">אין מוצרים בקטגוריה זו</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
