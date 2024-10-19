export interface UserData {
    id: string;
    name: string;
    role: string;
    permissions: string[];
    phone: string;
    email: string;
    telegramUser: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}
export interface SignupResponse {
    id: string;
    name: string;
    role: string;
    permissions: string[];
    phone: string;
    email: string;
    telegramUser: string;
  }

export interface LoginData {
  email: string;
  password: string;
}


 export interface SignupData {
    name: string;
    password: string;
    email: string;
    phone: string;
    telegramUser: string;
    role: string;
    permissions: string[];
  }