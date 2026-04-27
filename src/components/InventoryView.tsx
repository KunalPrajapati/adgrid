import { useState } from 'react';
import { Plus, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { stockStatusColors } from '../utils/colors';

export default function InventoryView() {
  const { inventory, restockItem } = useDashboardStore();
  const [restockTarget, setRestockTarget] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState('10');

  const good = inventory.filter((i) => i.status === 'good').length;
  const low = inventory.filter((i) => i.status === 'low').length;
  const critical = inventory.filter((i) => i.status === 'critical').length;

  const handleRestock = (e: React.FormEvent) => {
    e.preventDefault();
    if (restockTarget) {
      restockItem(restockTarget, Number(restockAmount));
      setRestockTarget(null);
      setRestockAmount('10');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Inventory Management</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Monitor stock levels and supplies</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm hover:shadow-lg shadow-orange-200 transition-all flex-shrink-0">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">Healthy Stock</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{good} items</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">Low Stock</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{low} items</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">Critical</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{critical} items</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                {['Item', 'Category', 'Stock Level', 'Threshold', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-6 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item, i) => {
                const pct = Math.min((item.stock / item.threshold) * 100, 100);
                const barColor = item.status === 'good' ? 'bg-green-500' : item.status === 'low' ? 'bg-amber-500' : 'bg-red-500';
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-6 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3 px-6 text-slate-600">{item.category}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-slate-700 font-medium">{item.stock} {item.unit}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-slate-600">{item.threshold} {item.unit}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${stockStatusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => setRestockTarget(item.name)}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {restockTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Restock Item</h3>
              <button onClick={() => setRestockTarget(null)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">Adding stock for: <span className="font-semibold text-slate-900">{restockTarget}</span></p>
            <form onSubmit={handleRestock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount to add</label>
                <input
                  type="number" min="1" value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setRestockTarget(null)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">Confirm Restock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
