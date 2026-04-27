export type OrderStatus = 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type StockStatus = 'good' | 'low' | 'critical';
export type StaffStatus = 'on-duty' | 'on-break' | 'off-duty';

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: OrderStatus;
  time: string;
  table: string;
}

export interface InventoryItem {
  name: string;
  stock: number;
  unit: string;
  threshold: number;
  status: StockStatus;
  category: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  sold: number;
  rating: number;
  available: boolean;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: StaffStatus;
  shift: string;
  phone: string;
}

export interface RevenuePoint {
  day: string;
  revenue: number;
  orders: number;
}

export interface User {
  name: string;
  email: string;
  role: string;
  initials: string;
}
