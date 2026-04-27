---

# 📊 API Requirements Documentation

## 1. Dashboard

* **Stats API**

  * A separate API to fetch overall statistics for the dashboard.

* **Orders API (Reusable)**

  * API to fetch orders with filters.
  * Designed to be reusable across:

    * Dashboard
    * Orders section

---

## 2. Orders

* **Orders API**

  * Provides all order-related data.
  * Filtering is handled on the frontend.
  * Supports parameters like:

    * Page size
    * Pagination
  * Reusable for dashboard usage as well.

---

## 3. Inventory

* **Inventory API**

  * Provides complete inventory data.
  * Includes stock status:

    * Healthy stock
    * Low stock
    * Critical stock

---

## 4. Menu

* **Menu API**

  * Returns all menu-related data.
  * Filtering is handled on the frontend.

---

## 5. Staff Management

* **Staff API**

  * Provides all staff-related data.
  * Includes status information:

    * On duty
    * On break
    * Off duty

---

## 6. Analytics

* **Stats API**

  * Same API used in the Dashboard for statistics.

* **Profile API**

  * Provides complete profile-related data.

---
