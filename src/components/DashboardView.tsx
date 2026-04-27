import {
  DollarSign, ShoppingBag, TrendingUp, Clock,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useDashboardStore } from '../store/dashboardStore';
import { revenueData, categoryData } from '../data/mockData';
import { statusColors } from '../utils/colors';

const stats = [
  { label: "Today's Revenue", value: '₹28,940', change: '+12.5%', trend: 'up' as const, icon: DollarSign, color: 'from-orange-500 to-red-500' },
  { label: 'Total Orders', value: '184', change: '+8.2%', trend: 'up' as const, icon: ShoppingBag, color: 'from-blue-500 to-indigo-500' },
  { label: 'Avg. Order Value', value: '₹157', change: '+4.1%', trend: 'up' as const, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { label: 'Pending Orders', value: '12', change: '-2', trend: 'down' as const, icon: Clock, color: 'from-purple-500 to-pink-500' },
];

interface Props {
  onViewOrders: () => void;
}

export default function DashboardView({ onViewOrders }: Props) {
  const orders = useDashboardStore((s) => s.orders);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Welcome back, Vatsal! 👋</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Here's what's happening at Spice Route today.</p>
        </div>
        <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200">
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900">Revenue Overview</h3>
            <p className="text-sm text-slate-500">Last 7 days performance</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-1">Sales by Category</h3>
          <p className="text-sm text-slate-500 mb-4">This week's breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {categoryData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-slate-600">{cat.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">Recent Orders</h3>
            <p className="text-sm text-slate-500">Latest activity from your customers</p>
          </div>
          <button onClick={onViewOrders} className="text-sm font-medium text-orange-600 hover:text-orange-700">
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                {['Order ID', 'Customer', 'Table', 'Items', 'Total', 'Status', 'Time'].map((h) => (
                  <th key={h} className="text-left py-3 px-6 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-medium text-slate-900">{order.id}</td>
                  <td className="py-3 px-6 text-slate-700">{order.customer}</td>
                  <td className="py-3 px-6 text-slate-600">{order.table}</td>
                  <td className="py-3 px-6 text-slate-600">{order.items} items</td>
                  <td className="py-3 px-6 font-semibold text-slate-900">₹{order.total.toLocaleString()}</td>
                  <td className="py-3 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-slate-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Daily Order Volume</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
