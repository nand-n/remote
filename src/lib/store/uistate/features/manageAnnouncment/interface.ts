
import { Announcement, Ticket } from "@/types/features/announcment";
  export interface AnnouncementStore {
    announcements: Announcement[];
    setAnnouncements: (announcements: Announcement[]) => void;
    addAnnouncement: (announcement: Announcement) => void;
    updateAnnouncement: (announcement: Announcement) => void;
    deleteAnnouncement: (id: string) => void;
    tickets: Ticket[];
    setTickets: (tickets: Ticket[]) => void;
    updateTicketPayedStatus: (id: string, isPayed: boolean) => void;
    isTicketModalVisible: boolean;
    setIsTicketModalVisible: (visible: boolean) => void;
    currentAnnouncement: Announcement | null;
    setCurrentAnnouncement: (announcement: Announcement | null) => void;
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
  }
