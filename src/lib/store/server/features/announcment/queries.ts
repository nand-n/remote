import { useQuery } from "react-query"
import { crudRequest } from "@/utils/crudRequest";
import { Announcement } from "@/types/features/announcment";

/**
 * Function to fetch announcments by sending a GET request to the API
 * @returns The response data from the API
 */
const getAnouncments = async () => {
  return await crudRequest({ url: '/announcements', method: 'GET' });
  };

  const getOpenAnouncments = async () => {
    return await crudRequest({ url: '/announcements/open', method: 'GET' });
    };

   const getClosedAnouncments = async () => {
      return await crudRequest({ url: '/announcements/closed', method: 'GET' });
      };

 /**
 * Function to fetch a single announcment by sending a GET request to the API
 * @param id The ID of the announcment to fetch
 * @returns The response data from the API
 */

const getAnouncment =async(id:string)=>{
  
  return await crudRequest({ url: `/announcements/${id}`, method: 'GET' });
}


/**
 * Custom hook to fetch a list of announcments using useQuery from react-query.
 * 
 * @returns The query object for fetching announcments.
 * 
 * @description
 * This hook uses `useQuery` to fetch a list of announcments from the API. It returns
 * the query object containing the announcments data and any loading or error states.
 */
export const useGetAnnouncments = ()=> useQuery<Announcement[]>("announcments" , getAnouncments)

export const useGetOpenAnnouncments = ()=> useQuery<Announcement[]>("openAnnouncments" , getOpenAnouncments)

export const useGetClosedAnnouncments = ()=> useQuery<Announcement[]>("closedAnnouncments" , getClosedAnouncments)

/**
 * Custom hook to fetch a single announcment by ID using useQuery from react-query.
 * 
 * @param announcmentId The ID of the announcment to fetch
 * @returns The query object for fetching the announcment.
 * 
 * @description
 * This hook uses `useQuery` to fetch a single annoucment by its ID. It returns the
 * query object containing the announcment data, and it keeps the previous data
 * while the new data is being fetched.
 */
export const useGetAnnouncment =(id:string)=> useQuery<Announcement>(['announcment' , id] , ()=> getAnouncment(id) , {
    keepPreviousData:true
} )