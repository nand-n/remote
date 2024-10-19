
/**
 * Function to fetch all tickets by sending a GET request to the API. 
 * @retuns The array of tickets data responded form the API  
 */

import { crudRequest } from "@/utils/crudRequest"
import { useQuery } from "react-query"
import { Ticket } from "./interface"

const getAllTickets = async()=>{
    return await crudRequest({url:'/tickets' , method:"GET"})
}

/**
 * Function to fetch a single ticket by sending a GET request to the API
 * @param id The ID of the ticket to fetch the single ticket 
 * @returns The response data , a single ticket object , from the API 
 */

const getTicket = async(id:string) =>{
    return crudRequest({url:`/tickets/${id}` , method:"GET"})
}

/**
 * Function to fetch a list of tickets that one announcment have , by sending a GET request to the API. 
 * @param id The ID of announcment to fetch a list of that annoucment's tickets. 
 * @returns Array of tickets that is announcment have.
 */
const getAllTicketsByAnnouncement = async(id:string) =>{
    return crudRequest({url:`tickets/announcment/${id}` , method:"GET"})
}

/**
 * Custom hook to fetch a list of tickets using useQuery form react-query.
 * 
 * @returns The query object for fetching a tickets 
 * 
 * @description 
 * This hook uses `useQuery` to fetch a list of tickets form the API. It returns 
 * the query object containing the tickets data and andy loading or error states. 
 * 
 */
export const useGetTickets = () => useQuery<Ticket[]>("tickets" , getAllTickets)

/**
 * Custom hook to fetch a single ticket by ID using useQuery from react-query. 
 * 
 * @param id The idof the ticket to fetch. 
 * 
 * @returns The query object for fetching the ticket . 
 * 
 * @description 
 * This hook uses `useQuery` to fetch a single tickcet by it's ID. It returns the query 
 * object conting ticket data , and it keeps the previous data while the new data is being fetched.
 */

export const useGetTicket = (id:string) => useQuery<Ticket>(["ticket" , id] , ()=> getTicket(id) , { keepPreviousData:true})

/**
 * Custom hook to fetch a list of tickets only related to single announcment with id by sending a GET requetst to the API
 * 
 * @param id The ID of announcment to fetch its tickets. 
 * 
 * @returns A query object for fetching tickets related to one announcment.
 * 
 * @description 
 * Thsi hook uses `useQuery` to fetch a list of tickets reated to one announcment by announcment's ID. 
 * It returns the query object containg the tickets data , and  its error , loading state and also it 
 * keeps previous data while a new data is being fetched. 
 */

export const useGetTicketsByAnnounmcent = (id:string) => useQuery<Ticket[]>(["tickets" , "ticketId"] , ()=> getAllTicketsByAnnouncement(id) , {keepPreviousData:true})