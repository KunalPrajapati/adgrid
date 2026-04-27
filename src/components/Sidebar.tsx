import {
  LayoutDashboard, ShoppingBag, Package, ChefHat,
  Users, User, BarChart3, Settings,
} from 'lucide-react';

type View = 'dashboard' | 'orders' | 'inventory' | 'menu' | 'staff' | 'analytics' | 'profile';

const navItems: Array<{ id: View; label: string; icon: React.ElementType; badge?: number; badgeColor?: 'red' }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 12 },
  { id: 'inventory', label: 'Inventory', icon: Package, badge: 3, badgeColor: 'red' },
  { id: 'menu', label: 'Menu', icon: ChefHat },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

interface Props {
  activeView: View;
  setActiveView: (v: View) => void;
  open: boolean;
}

export default function Sidebar({ activeView, setActiveView, open }: Props) {
  return (
    // Mobile: fixed overlay drawer; Desktop: inline sidebar that collapses to icon-only
    <aside
      className={[
        // Base
        'bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300',
        // Mobile: fixed drawer, always w-64, slides in/out
        'fixed inset-y-0 left-0 z-50 w-64',
        // Desktop: inline, width toggles
        'md:relative md:inset-auto md:z-auto',
        open ? 'translate-x-0 md:w-64' : '-translate-x-full md:translate-x-0 md:w-20',
      ].join(' ')}
    >
      <div className="h-[69px] px-5 border-b border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        {open && (
          <div>
            <h1 className="font-bold text-slate-900 text-lg leading-tight">Spice Route</h1>
            <p className="text-xs text-slate-500">Owner Dashboard</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {open && (
                <>
                  <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' :
                      item.badgeColor === 'red' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100">
          <Settings className="w-5 h-5" />
          {open && <span className="font-medium text-sm">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
