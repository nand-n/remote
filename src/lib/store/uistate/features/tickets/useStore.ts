import { create } from "zustand";
import { TicketsUIState } from "./interface";

export const useUIState = create<TicketsUIState>((set) => ({
    selectedNumbers: [],
    currentPage: 1,
    timeLeft: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    setSelectedNumbers: (numbers) => set({ selectedNumbers: numbers }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTimeLeft: (time) => set({ timeLeft: time }),
  }));