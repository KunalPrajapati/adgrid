import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useDashboardStore } from '../store/dashboardStore';
import { revenueData, categoryData } from '../data/mockData';

export default function AnalyticsView() {
  const menuItems = useDashboardStore((s) => s.menuItems);
  const sorted = [...menuItems].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const maxSold = sorted[0]?.sold || 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Analytics</h2>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">Deep dive into your restaurant's performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Daily Order Volume</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Top Performing Items</h3>
          <div className="space-y-3">
            {sorted.map((item, i) => {
              const pct = (item.sold / maxSold) * 100;
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                      <span className="font-medium text-slate-700 text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{item.sold} orders</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden ml-7">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" cx="50%" cy="45%" outerRadius={90} paddingAngle={3} label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {categoryData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹1,33,300', sub: 'This week' },
          { label: 'Total Orders', value: '852', sub: 'This week' },
          { label: 'Avg Daily Revenue', value: '₹19,043', sub: 'Per day' },
          { label: 'Best Day', value: 'Saturday', sub: '₹28,900' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm font-medium text-slate-600 mt-1">{s.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
