import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'dark' | 'light';
    setTheme: () => void;
}

const useStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            setTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
        }),
        {
            name: 'theme',
        }
    )
);

export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);
