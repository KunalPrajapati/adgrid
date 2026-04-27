import { useState } from 'react';
import { Bell, Search, Menu as MenuIcon, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardView from '../components/DashboardView';
import OrdersView from '../components/OrdersView';
import InventoryView from '../components/InventoryView';
import MenuView from '../components/MenuView';
import StaffView from '../components/StaffView';
import AnalyticsView from '../components/AnalyticsView';
import ProfileView from '../components/ProfileView';
import { useAuthStore } from '../store/authStore';

type View = 'dashboard' | 'orders' | 'inventory' | 'menu' | 'staff' | 'analytics' | 'profile';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const { user, logout } = useAuthStore();

  const handleNavChange = (view: View) => {
    setActiveView(view);
    // Close drawer on mobile after navigation
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const viewMap: Record<View, React.ReactNode> = {
    dashboard: <DashboardView onViewOrders={() => handleNavChange('orders')} />,
    orders: <OrdersView />,
    inventory: <InventoryView />,
    menu: <MenuView />,
    staff: <StaffView />,
    analytics: <AnalyticsView />,
    profile: <ProfileView />,
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeView={activeView}
        setActiveView={handleNavChange}
        open={sidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="h-[69px] bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between flex-shrink-0 gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 flex-shrink-0"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="relative flex-1 min-w-0 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, items, staff..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                {user?.initials}
              </div>
              <div className="text-sm hidden lg:block">
                <p className="font-semibold text-slate-900 leading-tight">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {viewMap[activeView]}
        </main>
      </div>
    </div>
  );
}
