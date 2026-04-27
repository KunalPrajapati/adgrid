import { useState } from 'react';
import { Plus, Phone, X } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import type { StaffStatus } from '../types';

const statusConfig: Record<StaffStatus, { color: string; dot: string }> = {
  'on-duty': { color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  'on-break': { color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  'off-duty': { color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
};

export default function StaffView() {
  const { staff } = useDashboardStore();
  const [showModal, setShowModal] = useState(false);

  const onDuty = staff.filter((s) => s.status === 'on-duty').length;
  const onBreak = staff.filter((s) => s.status === 'on-break').length;
  const offDuty = staff.filter((s) => s.status === 'off-duty').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Staff Management</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your team and shifts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm hover:shadow-lg shadow-orange-200 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'On Duty', count: onDuty, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'On Break', count: onBreak, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Off Duty', count: offDuty, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100' },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.bg} text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-sm text-slate-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {staff.map((person) => {
          const initials = person.name.split(' ').map((n) => n[0]).join('');
          const cfg = statusConfig[person.status];
          return (
            <div key={person.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {initials}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-4 h-4 ${cfg.dot} rounded-full border-2 border-white`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{person.name}</h3>
                  <p className="text-sm text-slate-500">{person.role}</p>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${cfg.color}`}>
                    {person.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Shift</span>
                  <span className="font-medium text-slate-700">{person.shift}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Contact</span>
                  <a href={`tel:${person.phone}`} className="font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {person.phone}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Staff Member</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Staff management with full CRUD coming soon. For now, view and monitor your team above.</p>
            <button onClick={() => setShowModal(false)} className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
