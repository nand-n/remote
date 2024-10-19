import useAuthStore from "@/lib/store/uistate/auth/login/useAuth";
import { AssignRoleProp, DataProp, IsActiveDataProp } from "@/types/features/users";
import { crudRequest } from "@/utils/crudRequest";
import { useMutation, useQueryClient } from "react-query";

/**
 * Function to update user information by sending a PATCH request to the API.
 * @param data The data object containing user ID and the data to be updated.
 * @returns The response data from the API.
 */
const updateUser = async (data: DataProp) => {
  const { id, dataP } = data;
  return await crudRequest({
    url: `/users/${id}`,
    method: "PATCH",
    data: dataP,
  });
};

/**
 * Function to toggle the active status of a user.
 * @param data The data object containing the user ID.
 * @returns The response data from the API.
 */
const toggleUserActiveStatus = async (data: IsActiveDataProp) => {
  const { id } = data;
  const { accessToken } = useAuthStore.getState();

  return await crudRequest({ url: `/users/${id}/toggle-active`, method: "PATCH" ,  headers: {
    Authorization: `Bearer ${accessToken}`,
  },});
};

/**
 * Function to assign a role to a user.
 * @param data The data object containing user ID, role, and accessToken.
 * @returns The response data from the API.
 */
const assignRole = async (data: AssignRoleProp) => {
  const { id, role } = data;
  const { accessToken } = useAuthStore.getState();
  return await crudRequest({
    url: `/users/${id}/assign-role`,
    method: "PATCH",
    data: { role },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Custom hook to update user information using useMutation from react-query.
 * @returns The mutation object for updating user information.
 * 
 * @description
 * This hook handles the mutation to update a user's information. On successful mutation,
 * it invalidates the "users" query to refetch the latest data.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

/**
 * Custom hook to toggle the active status of a user using useMutation from react-query.
 * @returns The mutation object for toggling the active status of a user.
 * 
 * @description
 * This hook handles the mutation to toggle a user's active status. On successful mutation,
 * it invalidates the "users" query to refetch the latest data.
 */
export const useToggleUserActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleUserActiveStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

/**
 * Custom hook to assign a role to a user using useMutation from react-query.
 * @returns The mutation object for assigning a role to a user.
 * 
 * @description
 * This hook handles the mutation to assign a role to a user. On successful mutation,
 * it invalidates the "users" query to refetch the latest data.
 */
export const useAssignRole = () => {
  const queryClient = useQueryClient();
  return useMutation(assignRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
