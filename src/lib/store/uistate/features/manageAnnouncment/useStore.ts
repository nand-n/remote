import { AnnouncementStore } from "./interface";
import { create } from "zustand";

const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  announcements: [],
  setAnnouncements: (announcements) => set({ announcements }),
  addAnnouncement: (announcement) =>
    set((state) => ({
      announcements: [...state.announcements, announcement],
    })),
  updateAnnouncement: (updatedAnnouncement) =>
    set((state) => ({
      announcements: state.announcements.map((announcement) =>
        announcement.id === updatedAnnouncement.id ? updatedAnnouncement : announcement
      ),
    })),
  deleteAnnouncement: (id) =>
    set((state) => ({
      announcements: state.announcements.filter(
        (announcement) => announcement.id !== id
      ),
    })),
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
  updateTicketPayedStatus: (id, isPayed) => set((state) => ({
    tickets: state.tickets.map(ticket =>
      ticket.id === id ? { ...ticket, isPayed } : ticket
    ),
  })),
  isTicketModalVisible: false,
  setIsTicketModalVisible: (visible) => set({ isTicketModalVisible: visible }),
  currentAnnouncement: null,
  setCurrentAnnouncement: (announcement) => set({ currentAnnouncement: announcement }),
  isModalVisible: false,
  setIsModalVisible: (visible) => set({ isModalVisible: visible }),
}));

export default useAnnouncementStore;