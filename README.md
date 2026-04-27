# 📊 Spice Route — API Requirements

> **Note:** App currently uses mock data (`src/data/mockData.ts`). Below documents the real API contract when a backend is connected.

## Base URL

```
(base url is just for example , the currnet project doesn't uses any api . its on mock data.)
https://api.spiceroute.in/v1
```

## Common Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` — required on all endpoints except login |
| `Content-Type` | `application/json` — required on POST / PUT / PATCH |

---

## 0. Auth

### `POST /auth/login`

```json
// Request
{ "email": "amit@spiceroute.in", "password": "admin123" }

// Response 200
{ "token": "eyJhbGci...", "user": { "name": "Amit Sharma", "email": "amit@spiceroute.in", "role": "Owner", "initials": "AS" } }
```

---

## 1. Dashboard

### `GET /dashboard/stats`

| Query Param | Type | Default | Values |
|-------------|------|---------|--------|
| `period` | string | `week` | `week` \| `month` \| `year` |

```json
// Response 200
{
  "todayRevenue": 28940,
  "todayRevenueCurrency": "INR",
  "totalOrders": 184,
  "avgOrderValue": 157,
  "pendingOrders": 12,
  "changes": { "revenue": "+12.5%", "orders": "+8.2%", "avgOrderValue": "+4.1%", "pendingOrders": "-2" }
}
```

---

## 2. Orders

Reusable across Dashboard (recent 5) and Orders section (full list).

### `GET /orders`

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `pageSize` | number | `20` | Items per page |
| `status` | string | — | `preparing` \| `ready` \| `delivered` \| `cancelled` |

```json
// Response 200
{
  "data": [
    { "id": "#ORD-2841", "customer": "Aarav Sharma", "items": 3, "total": 1240, "status": "preparing", "time": "5 min ago", "table": "T-04" },
    { "id": "#ORD-2840", "customer": "Priya Patel",  "items": 5, "total": 2180, "status": "ready",     "time": "12 min ago", "table": "T-12" }
  ],
  "pagination": { "page": 1, "pageSize": 5, "total": 184, "totalPages": 37 }
}
```

### `POST /orders`

```json
// Request
{ "customer": "Rahul Gupta", "items": 3, "total": 980, "status": "preparing", "table": "T-06" }

// Response 201
{ "id": "#ORD-2842", "customer": "Rahul Gupta", "items": 3, "total": 980, "status": "preparing", "time": "Just now", "table": "T-06" }
```

### `PATCH /orders/:id/status`

| Path Param | Type | Example |
|------------|------|---------|
| `id` | string | `ORD-2841` |

```json
// Request
{ "status": "ready" }

// Response 200
{ "id": "#ORD-2841", "customer": "Aarav Sharma", "items": 3, "total": 1240, "status": "ready", "time": "5 min ago", "table": "T-04" }
```

---

## 3. Inventory

### `GET /inventory`

| Query Param | Type | Values |
|-------------|------|--------|
| `status` | string | `good` \| `low` \| `critical` |
| `category` | string | `Grains` \| `Meat` \| `Dairy` \| `Vegetables` \| `Oils` |

```json
// Response 200
{
  "data": [
    { "name": "Basmati Rice",    "stock": 45, "unit": "kg", "threshold": 20, "status": "good",     "category": "Grains" },
    { "name": "Chicken (Fresh)", "stock": 8,  "unit": "kg", "threshold": 15, "status": "low",      "category": "Meat" },
    { "name": "Tomatoes",        "stock": 3,  "unit": "kg", "threshold": 10, "status": "critical", "category": "Vegetables" }
  ],
  "summary": { "good": 4, "low": 2, "critical": 2 }
}
```

### `PATCH /inventory/:name/restock`

| Path Param | Type | Example |
|------------|------|---------|
| `name` | string (URL-encoded) | `Chicken%20(Fresh)` |

```json
// Request
{ "amount": 20 }

// Response 200
{ "name": "Chicken (Fresh)", "stock": 28, "unit": "kg", "threshold": 15, "status": "good", "category": "Meat" }
```

---

## 4. Menu

### `GET /menu`

| Query Param | Type | Values |
|-------------|------|--------|
| `category` | string | `Main Course` \| `Appetizers` \| `Beverages` \| `Desserts` |
| `available` | boolean | `true` \| `false` |

```json
// Response 200
{
  "data": [
    { "id": "m1", "name": "Butter Chicken", "price": 380, "category": "Main Course", "sold": 142, "rating": 4.8, "available": true,  "description": "Creamy tomato-based chicken curry with aromatic spices" },
    { "id": "m6", "name": "Veg Biryani",    "price": 290, "category": "Main Course", "sold": 124, "rating": 4.7, "available": false, "description": "Fragrant basmati rice cooked with fresh vegetables" }
  ]
}
```

### `POST /menu`

```json
// Request
{ "name": "Chicken Biryani", "price": 420, "category": "Main Course", "available": true, "description": "Aromatic basmati rice layered with spiced chicken" }

// Response 201
{ "id": "m1714200000000", "name": "Chicken Biryani", "price": 420, "category": "Main Course", "sold": 0, "rating": 0, "available": true, "description": "Aromatic basmati rice layered with spiced chicken" }
```

### `PATCH /menu/:id/availability`

| Path Param | Type | Example |
|------------|------|---------|
| `id` | string | `m6` |

```json
// Request
{ "available": true }

// Response 200
{ "id": "m6", "name": "Veg Biryani", "price": 290, "category": "Main Course", "sold": 124, "rating": 4.7, "available": true, "description": "Fragrant basmati rice cooked with fresh vegetables" }
```

### `PATCH /menu/:id/price`

```json
// Request
{ "price": 420 }

// Response 200
{ "id": "m1", "name": "Butter Chicken", "price": 420, "category": "Main Course", "sold": 142, "rating": 4.8, "available": true, "description": "Creamy tomato-based chicken curry with aromatic spices" }
```

---

## 5. Staff

### `GET /staff`

| Query Param | Type | Values |
|-------------|------|--------|
| `status` | string | `on-duty` \| `on-break` \| `off-duty` |
| `role` | string | `Head Chef` \| `Sous Chef` \| `Manager` \| `Waiter` \| `Cashier` |

```json
// Response 200
{
  "data": [
    { "id": "s1", "name": "Rajesh Kumar", "role": "Head Chef", "status": "on-duty",  "shift": "10 AM - 8 PM",  "phone": "+91 98765 11001" },
    { "id": "s3", "name": "Arjun Nair",   "role": "Waiter",    "status": "on-break", "shift": "11 AM - 9 PM",  "phone": "+91 98765 11003" },
    { "id": "s5", "name": "Karan Verma",  "role": "Sous Chef", "status": "off-duty", "shift": "2 PM - 11 PM",  "phone": "+91 98765 11005" }
  ],
  "summary": { "onDuty": 4, "onBreak": 1, "offDuty": 1 }
}
```

---

## 6. Analytics

### `GET /analytics/revenue`

> Same stats as `GET /dashboard/stats`. Also returns chart-ready weekly breakdown.

| Query Param | Type | Default |
|-------------|------|---------|
| `period` | string | `week` |

```json
// Response 200
{
  "data": [
    { "day": "Mon", "revenue": 12400, "orders": 84  },
    { "day": "Sat", "revenue": 28900, "orders": 184 }
  ],
  "summary": { "totalRevenue": 133300, "totalOrders": 852, "avgDailyRevenue": 19043, "bestDay": "Sat", "bestDayRevenue": 28900 }
}
```

### `GET /analytics/categories`

```json
// Response 200
{
  "data": [
    { "name": "Main Course", "value": 45, "color": "#f97316" },
    { "name": "Beverages",   "value": 25, "color": "#3b82f6" },
    { "name": "Desserts",    "value": 18, "color": "#ec4899" },
    { "name": "Appetizers",  "value": 12, "color": "#10b981" }
  ]
}
```

### `GET /profile`

```json
// Response 200
{
  "name": "Spice Route", "tagline": "Authentic Indian Cuisine",
  "address": "DLF Cyber Hub, Gurugram, Haryana", "phone": "+91 98765 43210",
  "email": "contact@spiceroute.in", "hours": "11 AM - 11 PM",
  "cuisine": "Indian, Mughlai", "capacity": "80 guests",
  "established": "2018", "rating": 4.7, "totalReviews": 1284
}
```

### `PUT /profile`

Request body: same fields as GET response (excluding `rating`, `totalReviews`). Returns updated profile.

---

## Error Shape

```json
{ "error": "Descriptive message", "code": 404 }
```

| Code | Meaning |
|------|---------|
| `400` | Bad request |
| `401` | Unauthorized |
| `404` | Not found |
| `422` | Validation failed |
| `500` | Server error |
