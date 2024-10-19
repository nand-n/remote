// users.interface.ts

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    password: string;
    role: 'super-admin' | 'admin' | 'player';
    permissions: string[];
    phone: string;
    email: string;
    telegramUser: string | null;
  }
  
  export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface UsersResponse {
    items: User[];
    meta: Meta;
  }
  
  export interface DataProp {
    id: string;
    dataP: Partial<User>;
  }
  
  export interface IsActiveDataProp {
    id: string;
  }
  

  export interface AssignRoleProp {
    id: string;
    role: string; 
    accessToken?: string;
  }

  export interface UserUIState {
    activeRole: string;
    setActiveRole: (role: string) => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
  }