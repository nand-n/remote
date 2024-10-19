export interface Ticket {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    number: number;
    payerPhone: string | null;
}

export interface AssignTicket {
    userId?: string
    phoneNumber?:number | string
}

export interface IsPayed {
    userId?: string
    phoneNumber?:number | string
}

export interface DataProp {
    id:string 
    dataP:AssignTicket
}


export interface IsPayedDataProp {
    id:string 
}