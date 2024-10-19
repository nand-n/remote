/**
 * Function to fetch all users by sending a GET request to the API.
 * @returns The array of users data responded from the API.
 */

import useAuthStore from "@/lib/store/uistate/auth/login/useAuth";
import { User, UsersResponse } from "@/types/features/users";
import { crudRequest } from "@/utils/crudRequest";
import { useQuery } from "react-query";

const getAllUsers = async () => {
    const { accessToken } = useAuthStore.getState();
  return await crudRequest({ url: '/users', method: "GET" ,  headers: {
    Authorization: `Bearer ${accessToken}`,
  },});
};

/**
 * Function to fetch a single user by sending a GET request to the API.
 * @param id The ID of the user to fetch.
 * @returns The response data, a single user object, from the API.
 */

const getUser = async (id: string) => {
  return crudRequest({ url: `/users/${id}`, method: "GET" });
};

/**
 * Function to fetch a list of users by role by sending a GET request to the API.
 * @param role The role of the users to fetch.
 * @returns Array of users with the specified role.
 */
const getUsersByRole = async (role: string) => {
  return crudRequest({ url: `/users/role/${role}`, method: "GET" });
};

/**
 * Custom hook to fetch a list of users using useQuery from react-query.
 * 
 * @returns The query object for fetching users.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a list of users from the API. It returns
 * the query object containing the users data and any loading or error states.
 * 
 */
export const useGetUsers = () => useQuery<UsersResponse>("users", getAllUsers);

/**
 * Custom hook to fetch a single user by ID using useQuery from react-query.
 * 
 * @param id The ID of the user to fetch.
 * 
 * @returns The query object for fetching the user.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a single user by their ID. It returns the query
 * object containing user data, and it keeps the previous data while the new data is being fetched.
 */

export const useGetUser = (id: string) => useQuery<User>(["user", id], () => getUser(id), { keepPreviousData: true });

/**
 * Custom hook to fetch a list of users by role using useQuery from react-query.
 * 
 * @param role The role of the users to fetch.
 * 
 * @returns A query object for fetching users with the specified role.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a list of users by role from the API. It returns
 * the query object containing the users data and any error or loading states, and it keeps
 * the previous data while new data is being fetched.
 */

export const useGetUsersByRole = (role: string) => useQuery<User[]>(["users", "role", role], () => getUsersByRole(role), { keepPreviousData: true });
