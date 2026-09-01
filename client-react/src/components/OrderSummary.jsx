import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import axios from 'axios';
import './OrderSummary.css';

export default function OrderSummary({ onBackToMain }) {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setError('שם הלקוח הוא שדה חובה');
      return false;
    }
    if (!formData.address.trim()) {
      setError('כתובת היא שדה חובה');
      return false;
    }
    if (!formData.email.trim()) {
      setError('מייל הוא שדה חובה');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('כתובת מייל אינה תקינה');
      return false;
    }
    if (cartItems.length === 0) {
      setError('העגלה ריקה');
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        address: formData.address,
        email: formData.email,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
        })),
      };

      await axios.post('/api/orders', orderData);

      setSuccess(true);
      setFormData({ customerName: '', address: '', email: '' });
      dispatch(clearCart());

      setTimeout(() => {
        onBackToMain();
      }, 2000);
    } catch (err) {
      setError('שגיאה בשמירת ההזמנה. אנא נסה שוב.');
      console.error('Error submitting order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-container">
      <header className="summary-header">
        <h1>סיכום הזמנה</h1>
      </header>

      <div className="summary-content">
        <div className="order-items-section">
          <h2>פרטי ההזמנה</h2>
          {cartItems.length > 0 ? (
            <div className="order-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-category">{item.categoryName}</span>
                  </div>
                  <div className="item-quantity">
                    <span>{item.quantity} ×</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-items">אין מוצרים בהזמנה</p>
          )}
        </div>

        <div className="customer-form-section">
          <h2>פרטי הלקוח</h2>
          <form onSubmit={handleSubmitOrder} className="customer-form">
            <div className="form-group">
              <label htmlFor="customerName">שם מלא *</label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="שם פרטי ומשפחה"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">כתובת מלאה *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="רחוב, מספר בית, עיר, מיקוד"
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">כתובת מייל *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className="form-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && (
              <div className="success-message">
                ✓ ההזמנה נשמרה בהצלחה! מעביר חזרה לחנות...
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || success}
              >
                {loading ? 'שומר הזמנה...' : 'אשר הזמנה'}
              </button>
              <button
                type="button"
                className="back-btn"
                onClick={onBackToMain}
                disabled={loading || success}
              >
                חזור לחנות
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
