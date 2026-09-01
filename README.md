# מערכת ניהול עגלת קניות וסיכום הזמנות

## 1. סקירת המוצר (Product Overview)

מערכת ניהול עגלת קניות וסיכום הזמנות המורכבת משני מסכים ושלושה שירותים עם ארכיטקטורת **Microservices** מבוססת **Docker Compose**.

### תהליך העבודה:
1. **מסך ראשי (Main Screen):** בחירת קטגוריות, בחירת מוצרים, הוספה לסל
2. **מסך סיכום (Order Summary):** מילוי פרטי לקוח, אישור הזמנה

---

## 2. טכנולוגיות ורכיבים

### 📱 Client (Frontend)
- **Framework:** React 19.2.8 + Vite 8.2.2
- **State Management:** Redux Toolkit 2.12.0 + React-Redux 9.3.0
- **HTTP Client:** Axios 1.20.0
- **סגנון:** CSS3 עם RTL (עברית) + Responsive Design

### 🖥️ Backend 1 - שירות קטגוריות ומוצרים
- **Framework:** .NET 10 Web API
- **ORM:** Entity Framework Core
- **Database:** SQL Server 2022
- **זמינות:** http://localhost:5239/api

### 🖥️ Backend 2 - שירות הזמנות
- **Runtime:** Node.js 22-Alpine
- **Framework:** Express 5.2.1
- **Search Engine:** Elasticsearch 8.11.0
- **Visualization:** Kibana 8.11.0
- **זמינות:** http://localhost:3000/api

### 📊 אינפרסטרוקטורה
- **Orchestration:** Docker Compose 3.8
- **Network:** dev-network (bridge)
- **Volumes:** SQL Server + Elasticsearch data persistence

---

## 3. דרישות קדם להרצה

### ✅ מינימום דרישות
- **Docker Desktop** (Windows, macOS, או Linux)
  - Docker Engine 20.10+
  - Docker Compose 2.0+

---

## 4. הוראות התקנה והרצה (Quick Start)

### התקנה והרצה בשורה אחת:
```bash
docker compose up --build
```

### 🌐 כתובות גישה

| שירות | כתובת | פורט |
|-------|-------|------|
| React Client | http://localhost:5173 | 5173 |
| .NET API | http://localhost:5239 | 5239 |
| Express API | http://localhost:3000 | 3000 |
| Elasticsearch | http://localhost:9200 | 9200 |
| Kibana | http://localhost:5601 | 5601 |
| SQL Server | localhost:1433 | 1433 |

### 🔑 Credentials
- **SQL Server:**
  - User: `sa`
  - Password: `YourStrong@Passw0rd`
  - Database: `ShopDb`

---

## 5. הסבר על קובץ ה-Mapping

### orderIndexMapping.json
קובץ זה מגדיר את מבנה ה-index `orders` ב-Elasticsearch.

#### שדות המוטבעים:
```json
{
  "customerName": "text + keyword",  // שם לקוח - חיפוש מלא ופילטר
  "address": "text",                 // כתובת מלאה - חיפוש מלא
  "email": "keyword",                // מייל - חיפוש מדויק
  "items": [                         // מערך מוטבע של פריטים
    {
      "productId": "integer",        // מזהה המוצר
      "name": "text",               // שם המוצר
      "quantity": "integer"         // כמות שהוזמנה
    }
  ],
  "createdAt": "date"               // תאריך יצירת ההזמנה
}
```

---

## 6. API Endpoints

### 📋 Backend 1 - .NET Web API

#### קטגוריות
```
GET /api/categories              # קבל את כל הקטגוריות
GET /api/categories/{id}         # קבל קטגוריה ספציפית עם המוצרים שלה
```

#### מוצרים
```
GET /api/products                # קבל את כל המוצרים
GET /api/products/{id}           # קבל מוצר ספציפי
GET /api/products/by-category/{categoryId}  # קבל מוצרים לפי קטגוריה
```

### 📦 Backend 2 - Node.js Express API

#### הזמנות
```
POST /api/orders                 # צור הזמנה חדשה
GET /api/orders                  # קבל את כל ההזמנות
GET /health                      # בדיקת תקינות השרת
```

#### דוגמה - POST /api/orders
```json
{
  "customerName": "ישראל ישראלי",
  "address": "רחוב הראל 123, תל אביב",
  "email": "israel@example.com",
  "items": [
    {
      "productId": 14,
      "name": "כבש",
      "quantity": 2
    },
    {
      "productId": 17,
      "name": "קבב",
      "quantity": 1
    }
  ]
}
```

---

## 7. ניהול הנתונים

### SQL Server (Backend 1)
- **Database:** ShopDb
- **Tables:**
  - `Categories` - קטגוריות מוצרים
  - `Products` - מוצרים עם קשר לקטגוריות

### Elasticsearch (Backend 2)
- **Index:** orders
- **Document Type:** Default (_doc)
- **Mapping:** הגדרה ב-`orderIndexMapping.json`
- **Kibana Console:** http://localhost:5601

---
