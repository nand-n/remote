"use client";
import React, { useEffect } from "react";
import { Card, Button, Form } from "antd";
import AnnouncementsTable from "./_components/announcementsTable";
import TicketModal from "./_components/ticketModal";
import AnnouncementModal from "./_components/announcmentModal";
import NotificationMessage from "@/components/common/notification/notificationMessage";
import { Announcement } from "@/types/features/announcment";
import useAnnouncementStore from "@/lib/store/uistate/features/manageAnnouncment/useStore";
import useAuthStore from "@/lib/store/uistate/auth/login/useAuth";
import { useGetAnnouncements } from "@/lib/store/server/features/manageAnnouncment/queries";
import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "@/lib/store/server/features/manageAnnouncment/mutation";
import Breadcrumb from "@/components/common/bradCramp";
import { Icon } from "@/components/common/icon";
import { AiOutlineFolder } from "react-icons/ai";

const ManageAnnouncement: React.FC = () => {
  const {
    setAnnouncements,
    addAnnouncement,
    updateAnnouncement,
    setCurrentAnnouncement,
    currentAnnouncement,
    isModalVisible,
    setIsModalVisible,
  } = useAnnouncementStore();
  const { accessToken } = useAuthStore();

  const { data: fetchedAnnouncements } = useGetAnnouncements();
  const createAnnouncementMutation = useCreateAnnouncement();
  const updateAnnouncementMutation = useUpdateAnnouncement();

  const [form] = Form.useForm();

  useEffect(() => {
    if (fetchedAnnouncements) {
      setAnnouncements(fetchedAnnouncements);
    }
  }, [fetchedAnnouncements, setAnnouncements]);

  const showModal = (announcement: Announcement | null = null) => {
    setCurrentAnnouncement(announcement);
    form.setFieldsValue(announcement || {});
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.numberOfTickets = Number(values.numberOfTickets);
      values.endDate = values.endDate.format("YYYY-MM-DD");
      values.endTime = values.endTime.format("HH:mm:ss");
      values.ticketPrice = Number(values.ticketPrice);

      if (currentAnnouncement) {
        await updateAnnouncementMutation.mutateAsync({
          id: currentAnnouncement.id || "",
          announcement: values,
        });
        updateAnnouncement({ ...currentAnnouncement, ...values });
      } else {
        const { data } = await createAnnouncementMutation.mutateAsync({
          data: values,
          accessToken,
        });
        addAnnouncement(data);
      }
      NotificationMessage.success({
        message: "Announcement saved successfully",
        description: "Success",
      });

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      NotificationMessage.error({
        message: "Failed to save announcement",
        description: "Error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="container mx-auto py-4  dark:text-white min-h-screen ">
      <Card className="mb-4 bg-dark border border-gray-700 my-2">
        <div className="sm:grid sm:gap-8 lg:flex  gap-4 justify-between items-center ">
          <Breadcrumb
            name="Manage Announcements"
            IconComponent={AiOutlineFolder}
          />
          <div className="text-lg md:text-2xl  font-bold"></div>
          <button
            className="h-12 bg-blackBg hover:translate-y-[-1px] hover:animate-bounce text-white rounded-xl border font-bold px-4 py-2"
            onClick={() => showModal()}
          >
            Create Announcement
          </button>
        </div>
      </Card>

      <AnnouncementsTable />

      <AnnouncementModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        form={form}
        currentAnnouncement={currentAnnouncement}
      />

      <TicketModal />
    </div>
  );
};

export default ManageAnnouncement;
