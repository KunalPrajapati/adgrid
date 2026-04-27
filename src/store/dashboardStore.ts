import { create } from 'zustand';
import type { Order, InventoryItem, MenuItem, StaffMember, OrderStatus } from '../types';
import { initialOrders, initialInventory, initialMenuItems, initialStaff } from '../data/mockData';

interface DashboardState {
  orders: Order[];
  inventory: InventoryItem[];
  menuItems: MenuItem[];
  staff: StaffMember[];
  addOrder: (order: Omit<Order, 'id' | 'time'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  restockItem: (name: string, amount: number) => void;
  toggleMenuAvailability: (id: string) => void;
  updateMenuPrice: (id: string, price: number) => void;
  addMenuItem: (item: Omit<MenuItem, 'id' | 'sold' | 'rating'>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  orders: initialOrders,
  inventory: initialInventory,
  menuItems: initialMenuItems,
  staff: initialStaff,

  addOrder: (orderData) => set((state) => {
    const newOrder: Order = {
      ...orderData,
      id: `#ORD-${2842 + state.orders.length}`,
      time: 'Just now',
    };
    return { orders: [newOrder, ...state.orders] };
  }),

  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
  })),

  restockItem: (name, amount) => set((state) => ({
    inventory: state.inventory.map((item) => {
      if (item.name !== name) return item;
      const newStock = item.stock + amount;
      const status = newStock >= item.threshold ? 'good' : newStock >= item.threshold * 0.5 ? 'low' : 'critical';
      return { ...item, stock: newStock, status };
    }),
  })),

  toggleMenuAvailability: (id) => set((state) => ({
    menuItems: state.menuItems.map((m) => (m.id === id ? { ...m, available: !m.available } : m)),
  })),

  updateMenuPrice: (id, price) => set((state) => ({
    menuItems: state.menuItems.map((m) => (m.id === id ? { ...m, price } : m)),
  })),

  addMenuItem: (itemData) => set((state) => ({
    menuItems: [
      ...state.menuItems,
      { ...itemData, id: `m${Date.now()}`, sold: 0, rating: 0 },
    ],
  })),
}));
