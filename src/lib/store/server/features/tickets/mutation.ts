import { crudRequest } from "@/utils/crudRequest";
import { DataProp, IsPayedDataProp } from "./interface";
import { useMutation, useQueryClient } from "react-query";

/**
 * Function to assign user or phone number to specific ticket. 
 * @param id ID for assigning  the phone number or user. 
 * @param phoneNumber a phone number that will be assigned to a specifi ticket. 
 * @param userId a id that will be assigned to specific ticket. 
 * 
 * @returns The response data from the API 
 */

const assignTicket = async( data : DataProp ) =>{
    const {id,dataP} = data 
    return await crudRequest({
        url:`/tickets/${id}/assign`,
        method:"PATCH",
        data:dataP
    })
}

  const isPayed = async (data:IsPayedDataProp) =>{
    const {id} = data 
    return await crudRequest({ url: `/tickets/payed/${id}`, method: "PATCH"  });

  }
/***
 * Custom hook to assign a phone number or  user to a specific ticket using useMutatinoo form react-query . 
 * 
 * @returns The mutation object for patching a ticket by assigning phone or user 
 * 
 * @description 
 * This hook handles the mutation to  assign a phone number or user. On successful mutation , 
 * it invalidates the "tickets" query to refetch teh latest data 
 */

export const useAssignTicket = (announcementId: string)=> {
    const queryClient = useQueryClient()
    return useMutation(assignTicket , {
        onSuccess:()=> {
            queryClient.invalidateQueries('tickets')
            queryClient.invalidateQueries(['announcment' , announcementId])
        }
    })
}


export const useIsPaiedTicket = () =>{
    const queryClient = useQueryClient()
    return useMutation(isPayed , {
        onSuccess:()=> {
            queryClient.invalidateQueries('tickets')
            queryClient.invalidateQueries('announcments')
        }
    })
}