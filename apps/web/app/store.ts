import { create } from 'zustand';

interface IsLoggedInState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useIsLoggedInStore = create<IsLoggedInState>()((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
}));
