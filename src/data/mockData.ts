import type { Order, InventoryItem, MenuItem, StaffMember, RevenuePoint } from '../types';

export const revenueData: RevenuePoint[] = [
  { day: 'Mon', revenue: 12400, orders: 84 },
  { day: 'Tue', revenue: 15200, orders: 96 },
  { day: 'Wed', revenue: 11800, orders: 78 },
  { day: 'Thu', revenue: 18600, orders: 112 },
  { day: 'Fri', revenue: 24300, orders: 156 },
  { day: 'Sat', revenue: 28900, orders: 184 },
  { day: 'Sun', revenue: 22100, orders: 142 },
];

export const categoryData = [
  { name: 'Main Course', value: 45, color: '#f97316' },
  { name: 'Beverages', value: 25, color: '#3b82f6' },
  { name: 'Desserts', value: 18, color: '#ec4899' },
  { name: 'Appetizers', value: 12, color: '#10b981' },
];

export const initialOrders: Order[] = [
  { id: '#ORD-2841', customer: 'Aarav Sharma', items: 3, total: 1240, status: 'preparing', time: '5 min ago', table: 'T-04' },
  { id: '#ORD-2840', customer: 'Priya Patel', items: 5, total: 2180, status: 'ready', time: '12 min ago', table: 'T-12' },
  { id: '#ORD-2839', customer: 'Rohan Mehta', items: 2, total: 680, status: 'delivered', time: '18 min ago', table: 'T-07' },
  { id: '#ORD-2838', customer: 'Anita Desai', items: 4, total: 1560, status: 'preparing', time: '22 min ago', table: 'T-02' },
  { id: '#ORD-2837', customer: 'Vikram Singh', items: 6, total: 3200, status: 'delivered', time: '35 min ago', table: 'T-09' },
  { id: '#ORD-2836', customer: 'Sneha Reddy', items: 2, total: 540, status: 'cancelled', time: '42 min ago', table: 'T-05' },
];

export const initialInventory: InventoryItem[] = [
  { name: 'Basmati Rice', stock: 45, unit: 'kg', threshold: 20, status: 'good', category: 'Grains' },
  { name: 'Chicken (Fresh)', stock: 8, unit: 'kg', threshold: 15, status: 'low', category: 'Meat' },
  { name: 'Paneer', stock: 12, unit: 'kg', threshold: 10, status: 'good', category: 'Dairy' },
  { name: 'Tomatoes', stock: 3, unit: 'kg', threshold: 10, status: 'critical', category: 'Vegetables' },
  { name: 'Cooking Oil', stock: 28, unit: 'L', threshold: 15, status: 'good', category: 'Oils' },
  { name: 'Onions', stock: 18, unit: 'kg', threshold: 20, status: 'low', category: 'Vegetables' },
  { name: 'Wheat Flour', stock: 60, unit: 'kg', threshold: 25, status: 'good', category: 'Grains' },
  { name: 'Milk', stock: 5, unit: 'L', threshold: 12, status: 'critical', category: 'Dairy' },
];

export const initialMenuItems: MenuItem[] = [
  { id: 'm1', name: 'Butter Chicken', price: 380, category: 'Main Course', sold: 142, rating: 4.8, available: true, description: 'Creamy tomato-based chicken curry with aromatic spices' },
  { id: 'm2', name: 'Paneer Tikka', price: 320, category: 'Appetizers', sold: 98, rating: 4.6, available: true, description: 'Marinated cottage cheese grilled in tandoor' },
  { id: 'm3', name: 'Margherita Pizza', price: 450, category: 'Main Course', sold: 87, rating: 4.7, available: true, description: 'Classic Italian pizza with fresh mozzarella and basil' },
  { id: 'm4', name: 'Masala Chai', price: 80, category: 'Beverages', sold: 234, rating: 4.9, available: true, description: 'Traditional spiced Indian tea with milk' },
  { id: 'm5', name: 'Gulab Jamun', price: 150, category: 'Desserts', sold: 76, rating: 4.5, available: true, description: 'Soft milk-solid dumplings soaked in sugar syrup' },
  { id: 'm6', name: 'Veg Biryani', price: 290, category: 'Main Course', sold: 124, rating: 4.7, available: false, description: 'Fragrant basmati rice cooked with fresh vegetables' },
  { id: 'm7', name: 'Mango Lassi', price: 120, category: 'Beverages', sold: 189, rating: 4.8, available: true, description: 'Refreshing yogurt-based mango drink' },
  { id: 'm8', name: 'Dal Makhani', price: 250, category: 'Main Course', sold: 115, rating: 4.6, available: true, description: 'Slow-cooked black lentils with butter and cream' },
];

export const initialStaff: StaffMember[] = [
  { id: 's1', name: 'Rajesh Kumar', role: 'Head Chef', status: 'on-duty', shift: '10 AM - 8 PM', phone: '+91 98765 11001' },
  { id: 's2', name: 'Meera Joshi', role: 'Manager', status: 'on-duty', shift: '9 AM - 6 PM', phone: '+91 98765 11002' },
  { id: 's3', name: 'Arjun Nair', role: 'Waiter', status: 'on-break', shift: '11 AM - 9 PM', phone: '+91 98765 11003' },
  { id: 's4', name: 'Pooja Iyer', role: 'Cashier', status: 'on-duty', shift: '12 PM - 10 PM', phone: '+91 98765 11004' },
  { id: 's5', name: 'Karan Verma', role: 'Sous Chef', status: 'off-duty', shift: '2 PM - 11 PM', phone: '+91 98765 11005' },
  { id: 's6', name: 'Divya Menon', role: 'Waiter', status: 'on-duty', shift: '11 AM - 9 PM', phone: '+91 98765 11006' },
];
