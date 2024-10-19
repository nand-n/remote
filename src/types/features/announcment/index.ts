// export interface Ticket {
//     id: string;
//     number: string | number;
// }

// export interface Announcement {
//     id?:string
//     name: string;
//     endDate: string;
//     endTime: string;
//     numberOfTickets: number;
//     tickets: Ticket[];
// }

export interface AnnouncementDetailProps {
    params: { id: string };
}


export interface Ticket {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    number: number | string;
    payerPhone: string | number | null;
    isPayed:boolean
}

export interface Announcement {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    endDate: string;
    endTime: string;
    numberOfTickets: number;

    tickets: Ticket[];
}
export interface addAnnouncement {
    name: string;
    endDate: string;
    endTime: string;
    numberOfTickets: number;
}



// export interface Ticket {
//     id: string;
//     player?: string;
//     payerPhone?: string;
//   }
  
  export interface DrawData {
    id: string;
    ticket: Ticket;
    announcementId: string;
  }
  
//   export interface Announcement {
//     id: string;
//     name: string;
//     endDate: string;
//     endTime: string;
//     numberOfTickets: number;
//     tickets: Ticket[];
//   }
  