import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const DEMO_CREDENTIALS = [
  { email: 'amit@spiceroute.in', password: 'admin123', user: { name: 'Amit Sharma', email: 'amit@spiceroute.in', role: 'Owner', initials: 'AS' } },
  { email: 'meera@spiceroute.in', password: 'manager123', user: { name: 'Meera Joshi', email: 'meera@spiceroute.in', role: 'Manager', initials: 'MJ' } },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 800));
        const match = DEMO_CREDENTIALS.find(
          (c) => c.email === email && c.password === password
        );
        if (match) {
          set({ user: match.user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'spice-route-auth' }
  )
);
