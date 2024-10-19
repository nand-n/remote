import { Announcement } from "@/types/features/announcment";
import { crudRequest } from "@/utils/crudRequest";
import { useMutation, useQueryClient } from "react-query";

const createAnnouncement = async ({data  , accessToken}:any)  => {
  console.log(accessToken ,data ,"accessToken");
const headers = {
    Authorization: `Bearer ${accessToken}`
  };
    return await crudRequest({ url: "/announcements", method: "POST", data, headers });
  };
  
  const updateAnnouncement = async (id: string, data: Announcement) => {
    return await crudRequest({ url: `/announcements/${id}`, method: "PATCH", data });
  };
  
  const deleteAnnouncement = async (id: string) => {
    return await crudRequest({ url: `/announcements/${id}`, method: "DELETE" });
  };


  export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation(createAnnouncement, {
      onSuccess: () => {
        queryClient.invalidateQueries("announcements");
      },
    });
  };
  
  export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation((data: { id: string; announcement: Announcement }) => updateAnnouncement(data.id, data.announcement), {
      onSuccess: () => {
        queryClient.invalidateQueries("announcements");
      },
    });
  };
  
  export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteAnnouncement, {
      onSuccess: () => {
        queryClient.invalidateQueries("announcements");
      },
    });
  };
  