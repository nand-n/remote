import { useMutation } from 'react-query';
import { crudRequest } from '@/utils/crudRequest';
import { LoginData, LoginResponse, SignupData, SignupResponse } from '@/types/features/authentication/signup';

/**
 * Function to login by sending a POST request to the API
 * @param data The email and password of the user
 * @returns The response data containing accessToken, refreshToken, and user details
 */
const login = async (data: LoginData): Promise<LoginResponse> => {
  return await crudRequest({ url: '/authentication/sign-in', method: 'POST', data });
};

/**
 * Function to register by sending a POST request to the API
 * @param data The email and password of the user
 * @returns The response data containing accessToken, refreshToken, and user details
 * 
 */

const signUp = async (data: SignupData): Promise<SignupResponse> => {
    return await crudRequest({ url: '/authentication/sign-up', method: 'POST', data });
  };
  

/**
 * Custom hook to handle user login using useMutation from react-query
 * @returns The mutation object for the login action
 */
export const useLogin = () => {
  return useMutation((data: LoginData) => login(data));
};

export const useSignUp = () => {
    return useMutation((data: SignupData) => signUp(data));
  };