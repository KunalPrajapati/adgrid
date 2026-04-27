import { useState } from 'react';
import { Plus, MoreVertical, Star, Edit3, X, Check } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const categories = ['All', 'Main Course', 'Appetizers', 'Beverages', 'Desserts'];

const categoryIcons: Record<string, string> = {
  'Main Course': '🍛',
  'Appetizers': '🥗',
  'Beverages': '☕',
  'Desserts': '🍮',
};

export default function MenuView() {
  const { menuItems, toggleMenuAvailability, updateMenuPrice, addMenuItem } = useDashboardStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: 'Main Course', description: '' });

  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  const savePrice = (id: string) => {
    const p = Number(editPrice);
    if (p > 0) updateMenuPrice(id, p);
    setEditingId(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem({ name: form.name, price: Number(form.price), category: form.category, description: form.description, available: true });
    setForm({ name: '', price: '', category: 'Main Course', description: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Menu Management</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your menu items and pricing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm hover:shadow-lg shadow-orange-200 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Dish
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {cat !== 'All' && categoryIcons[cat]} {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className={`bg-white p-5 rounded-2xl border transition-shadow ${item.available ? 'border-slate-200 hover:shadow-md' : 'border-slate-200 opacity-60'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-2xl">
                {categoryIcons[item.category] || '🍽️'}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleMenuAvailability(item.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${item.available ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">{item.name}</h3>
            <p className="text-xs text-slate-500 mb-1">{item.category}</p>
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">{item.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-slate-700">{item.rating > 0 ? item.rating : 'New'}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">{item.sold} sold</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {editingId === item.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">₹</span>
                  <input
                    type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
                    className="w-20 px-2 py-1 border border-orange-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    autoFocus
                  />
                  <button onClick={() => savePrice(item.id)} className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"><Check className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setEditingId(null)} className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <p className="text-xl font-bold text-slate-900">₹{item.price}</p>
              )}
              {editingId !== item.id && (
                <button
                  onClick={() => { setEditingId(item.id); setEditPrice(String(item.price)); }}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Dish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">Add New Dish</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Dish Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
                  placeholder="e.g. Chicken Tikka Masala" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹)</label>
                  <input required type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400">
                    {['Main Course', 'Appetizers', 'Beverages', 'Desserts'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 resize-none"
                  placeholder="Brief description..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg shadow-orange-200 transition-all">Add Dish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
