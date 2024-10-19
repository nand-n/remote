import { addAnnouncement } from "@/types/features/announcment";
import { crudRequest } from "@/utils/crudRequest";
import { useMutation, useQueryClient } from "react-query";


/**
 * Function to create a new announcment by sending a announcment request to the API
 * @param data The data for the new announcment
 * @returns The response data from the API
 */
const addAnnouncment = async (data:addAnnouncement) =>{
  return await crudRequest({ url: `/announcements`, method: 'POST' , data });
}

/**
 * Function to delete a announcment by sending a DELETE request to the API
 * @param id The ID of the announcment to delete
 * @returns The response data from the API
 */
const deleteAnnounmcent = async(id:string) =>{
    return await crudRequest({ url:`/announcements/${id}`, method:"DELETE"})
}
/**
 * Function to update an announcement by sending PATCH request to the API.
 * 
 * @param id The ID of the announcment to update
 * 
 * @returns The response data form the API
 * 
 */

const updateAnnouncment = async(id:string) => {
    return await crudRequest({url:`/announcements/${id}` , method:"PATCH"})
}

/***
 * Cusotom hook to delete an announment using useMutation from react-query.
 * 
 * @returns The mutation object for deleteing an announcement
 * 
 * @description 
 * This hook handles the mutation to delete an announcment. On successful mutation,
 * it invalidate the "announcments" query to ensure the announcments is refetched.
 */
export const useDeleleteAnnounmcent = ()=>{
    const queryClient = useQueryClient()
    return useMutation(deleteAnnounmcent , {
        onSuccess:() => {
            queryClient.invalidateQueries('announcements')
        }
    })
}

/***
 * Cusotm hook to add a new announment using useMutation from react-query. 
 * 
 * @returns The mutation object for adding an announcements.
 * 
 * @description
 * This hook handles the mutation to add a new announcement. On successful mutation, 
 * it invalidates the "announcements" query to refetch the latest data.
 */
export const useAddAnnounment= ()=>{
    const queryClient = useQueryClient()
    return useMutation(addAnnouncment , {
        onSuccess:()=>{
            queryClient.invalidateQueries("announcements")
        }
    })
}


/**
 * Custom hook to update an annoucnemnt using useMutation from react-query.
 * 
 * @returns The mutation object for updating an existing annoucnement.
 * 
 * @description 
 * This hook handles the mutation to update an existing announcment. On successful mutation,
 * it involves the "announcments" query to refetch the latest data.
 */
export const useUpdateAnnouncment =()=>{
    const queryClient = useQueryClient()
    return useMutation(updateAnnouncment,{
        onSuccess:()=>{
            queryClient.invalidateQueries('announcements')
        },

    })
}