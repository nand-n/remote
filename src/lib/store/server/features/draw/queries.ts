import { Announcement, DrawData } from "@/types/features/announcment";
import { crudRequest } from "@/utils/crudRequest";
import { useQuery } from "react-query";

/**
 * Function to fetch all draws by sending a GET request to the API.
 * @returns The array of draw data responded from the API.
 */
// const getAllDraws = async () => {
//   return await crudRequest({ url: '/draws', method: "GET" });
// }

/**
 * Function to fetch a single draw by sending a GET request to the API.
 * @param id The ID of the draw to fetch the single draw.
 * @returns The response data, a single draw object, from the API.
 */
const getDraw = async (id: string) => {
  return await crudRequest({ url: `/draws/${id}`, method: "GET" });
}

/**
 * Function to fetch a list of draws related to a specific announcement.
 * @param announcementId The ID of the announcement to fetch its draws.
 * @returns Array of draws related to the given announcement.
 */
const getAllDrawsByAnnouncement = async (announcementId: string | null) => {
  return await crudRequest({ url: `/draws/announcement/${announcementId}`, method: "GET" });
}

/**
 * Function to fetch announcements that do not have any associated draws.
 * @returns The array of announcements without draws responded from the API.
 */
const getAnnouncementsWithoutDraws = async () => {
  return await crudRequest({ url: '/draws/announcements/without-draws', method: "GET" });
}

/**
 * Function to fetch announcements that have at least one associated draw.
 * @returns The array of announcements with draws responded from the API.
 */
const getAnnouncementsWithDraws = async () => {
  return await crudRequest({ url: '/draws/announcements/with-draws', method: "GET" });
}

/**
 * Custom hook to fetch a list of draws using useQuery from react-query.
 * 
 * @returns The query object for fetching draws.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a list of draws from the API. It returns 
 * the query object containing the draws data and any loading or error states.
 */
// export const useGetDraws = () => useQuery<Draw[]>("draws", getAllDraws);

/**
 * Custom hook to fetch a single draw by ID using useQuery from react-query.
 * 
 * @param id The ID of the draw to fetch.
 * 
 * @returns The query object for fetching the draw.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a single draw by its ID. It returns the query 
 * object containing the draw data, and it keeps the previous data while the new data is being fetched.
 */
export const useGetDraw = (id: string) => useQuery<DrawData>(["draw", id], () => getDraw(id), { keepPreviousData: true });

/**
 * Custom hook to fetch a list of draws related to a specific announcement using useQuery from react-query.
 * 
 * @param announcementId The ID of the announcement to fetch its draws.
 * 
 * @returns A query object for fetching draws related to the given announcement.
 * 
 * @description 
 * This hook uses `useQuery` to fetch a list of draws related to a specific announcement by the announcement's ID. 
 * It returns the query object containing the draws data, and its error, loading state, and also keeps 
 * previous data while new data is being fetched.
 */
export const useGetDrawsByAnnouncement = (announcementId: string | null) => useQuery<Announcement[]>(["draws", announcementId], () => getAllDrawsByAnnouncement(announcementId), { keepPreviousData: true , enabled:false });

/**
 * Custom hook to fetch a list of announcements that do not have any associated draws using useQuery from react-query.
 * 
 * @returns A query object for fetching announcements without draws.
 * 
 * @description 
 * This hook uses `useQuery` to fetch announcements that do not have any associated draws. It returns the 
 * query object containing the announcements data, and its error, loading state, and also keeps 
 * previous data while new data is being fetched.
 */
export const useGetAnnouncementsWithoutDraws = () => useQuery<Announcement[]>("announcements-without-draws", getAnnouncementsWithoutDraws);

/**
 * Custom hook to fetch a list of announcements that have at least one associated draw using useQuery from react-query.
 * 
 * @returns A query object for fetching announcements with draws.
 * 
 * @description 
 * This hook uses `useQuery` to fetch announcements that have at least one associated draw. It returns the 
 * query object containing the announcements data, and its error, loading state, and also keeps 
 * previous data while new data is being fetched.
 */
export const useGetAnnouncementsWithDraws = () => useQuery<Announcement[]>("announcements-ts-witdraws", getAnnouncementsWithDraws);
