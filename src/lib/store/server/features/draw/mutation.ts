import { crudRequest } from "@/utils/crudRequest"
import { useMutation, useQueryClient } from "react-query"

/***
 * Funciton to draw ticket to get a winning tikcets 
 * @param announcementId ID for draw and get a list of winner tickets 
 * @returns array of winner tickets  or error indicating that atleat 85% of the tickets must be sold
 */
const drawTicketsWithAnnouncmentId = async (data:any) =>{
    return await crudRequest({
        url:`/draws`,
        method:"POST",
        data
    })
}

/**
 * Custom Hook to draw a tickets. 
 * 
 * @returns The mutation object for drawing a ticket by uskng annoucment id 
 * 
 * @description
 * This hooks handles the mutaiton to draw aticket. ON successful mutation it invalidates the "draws"
 */
export const useDrawTickets = () =>{
    const queryClient = useQueryClient()
    return useMutation(drawTicketsWithAnnouncmentId , {
        onSuccess:() =>{
            queryClient.invalidateQueries('draws')
            queryClient.invalidateQueries('announcements-without-draws')
            queryClient.invalidateQueries('announcements-ts-witdraws')

        }
    })
}

/**
 * Function to draw 5 lucky winners for a given announcement.
 * @param announcementId ID for the draw to get a list of winner tickets.
 * @returns Array of 5 winner tickets or an error if the draw criteria are not met.
 */
const draw5LuckyWinnersWithAnnouncementId = async (data: any) => {
    return await crudRequest({
      url: `/draws/5-lucky-winners/`,
      method: "POST",
      data
    });
  };
  
  /**
   * Custom Hook to draw 5 lucky winners.
   * 
   * @returns The mutation object for drawing 5 lucky winners using the announcement ID.
   * 
   * @description
   * This hook handles the mutation to draw 5 lucky winners. On successful mutation, 
   * it invalidates the relevant queries to reflect the latest draw results.
   */
  export const useDraw5LuckyWinners = () => {
    const queryClient = useQueryClient();
    return useMutation(draw5LuckyWinnersWithAnnouncementId, {
      onSuccess: () => {
        queryClient.invalidateQueries('draws');
        queryClient.invalidateQueries('announcements-without-draws');
        queryClient.invalidateQueries('announcements-ts-witdraws');
      }
    });
  };