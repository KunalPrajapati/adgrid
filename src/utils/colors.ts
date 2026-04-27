import type { OrderStatus, StockStatus } from '../types';

export const statusColors: Record<OrderStatus, string> = {
  preparing: 'bg-amber-100 text-amber-700 border-amber-200',
  ready: 'bg-blue-100 text-blue-700 border-blue-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export const stockStatusColors: Record<StockStatus, string> = {
  good: 'bg-green-100 text-green-700',
  low: 'bg-amber-100 text-amber-700',
  critical: 'bg-red-100 text-red-700',
};
