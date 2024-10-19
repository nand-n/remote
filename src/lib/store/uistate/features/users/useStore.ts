import { UserUIState } from '@/types/features/users';
import {create} from 'zustand';

const useUserUIState = create<UserUIState>((set) => ({
  activeRole: 'player',
  setActiveRole: (role) => set({ activeRole: role }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useUserUIState;
