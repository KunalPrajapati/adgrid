import { useState } from 'react';
import { Plus, User, MapPin, ShoppingBag, X } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { statusColors } from '../utils/colors';
import type { OrderStatus } from '../types';

const filters: Array<OrderStatus | 'all'> = ['all', 'preparing', 'ready', 'delivered', 'cancelled'];

export default function OrdersView() {
  const { orders, updateOrderStatus, addOrder } = useDashboardStore();
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: '', table: '', items: '1', total: '' });
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  const detail = orders.find((o) => o.id === selectedOrder);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({ customer: form.customer, table: form.table, items: Number(form.items), total: Number(form.total), status: 'preparing' });
    setForm({ customer: '', table: '', items: '1', total: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Order Management</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Track and manage all incoming orders</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm hover:shadow-lg shadow-orange-200 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> New Order
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {f} {f !== 'all' && `(${orders.filter((o) => o.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-slate-900">{order.id}</p>
                <p className="text-xs text-slate-500">{order.time}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2 py-3 border-y border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{order.customer}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">Table {order.table}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShoppingBag className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{order.items} items</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3">
              <p className="text-xl font-bold text-slate-900">₹{order.total.toLocaleString()}</p>
              <button
                onClick={() => setSelectedOrder(order.id)}
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">New Order</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer Name</label>
                <input required value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                  placeholder="Customer name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Table</label>
                <input required value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                  placeholder="e.g. T-01" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Items</label>
                  <input required type="number" min="1" value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Total (₹)</label>
                  <input required type="number" min="0" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                    placeholder="0" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg shadow-orange-200 transition-all">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">{detail.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Customer</span><span className="font-medium text-slate-900">{detail.customer}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Table</span><span className="font-medium text-slate-900">{detail.table}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Items</span><span className="font-medium text-slate-900">{detail.items}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Total</span><span className="font-bold text-slate-900">₹{detail.total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Time</span><span className="font-medium text-slate-900">{detail.time}</span></div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {(['preparing', 'ready', 'delivered', 'cancelled'] as OrderStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => { updateOrderStatus(detail.id, s); setSelectedOrder(null); }}
                    className={`py-2 rounded-lg text-sm font-medium capitalize transition-all border ${detail.status === s ? statusColors[s] + ' ring-2 ring-offset-1 ring-orange-400' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
