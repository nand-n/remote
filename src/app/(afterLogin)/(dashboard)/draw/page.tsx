"use client";
import React, { useState } from "react";
import AnnouncementsTable from "./_components/drawTableAnnoucments";

import NotificationMessage from "@/components/common/notification/notificationMessage";

import { Card, Tabs } from "antd";
import LuckyTicketsModal from "./_components/luckyTicketsModal";
import { DrawData } from "@/types/features/announcment";
import {
  useDraw5LuckyWinners,
  useDrawTickets,
} from "@/lib/store/server/features/draw/mutation";
import {
  useGetAnnouncementsWithDraws,
  useGetAnnouncementsWithoutDraws,
  useGetDrawsByAnnouncement,
} from "@/lib/store/server/features/draw/queries";
import Breadcrumb from "@/components/common/bradCramp";
import { AiOutlineFolder } from "react-icons/ai";
// import { DrawData } from '@/store/server/features/draw/interface';
const { TabPane } = Tabs;
function Draw() {
  const drawTicket = useDrawTickets();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: announcementsWithoutDraws } = useGetAnnouncementsWithoutDraws();
  const { data: announcementsWithDraws } = useGetAnnouncementsWithDraws();

  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);
  const { data: drawsByAnnouncement, refetch: refetchDrawsByAnnouncement } =
    useGetDrawsByAnnouncement(selectedAnnouncementId);

  // Lazy initialization of `useDraw5LuckyWinners` based on selectedAnnouncementId
  const draw5LuckyWinnersMutation = useDraw5LuckyWinners();

  const handleDraw = async (id: string) => {
    try {
      const draw = await drawTicket.mutateAsync({ announcementId: id });
      if (!draw) {
        throw draw;
      }
      NotificationMessage.success({
        message: "Draw  Successful.",
        description: "Success",
      });
    } catch (error: any) {
      NotificationMessage.error({
        message: "Failed to draw announcement",
        description: `${error?.response?.data?.message}`,
      });
    }
  };
  const handleDraw5LuckyWinners = async (id: string) => {
    try {
      const draw = await draw5LuckyWinnersMutation.mutateAsync({
        announcementId: id,
      });
      if (!draw) {
        throw draw;
      }
      NotificationMessage.success({
        message: "Draw  Successful.",
        description: "Success",
      });
    } catch (error: any) {
      NotificationMessage.error({
        message: "Failed to draw announcement",
        description: `${error?.response?.data?.message}`,
      });
    }
  };
  const handleAnnouncementSelect = (id: string) => {
    setSelectedAnnouncementId(id);
    refetchDrawsByAnnouncement();
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Card className="mb-4 bg-dark border border-gray-700 my-2">
        <div className="sm:grid sm:gap-8 lg:flex  gap-4 justify-between items-center ">
          <Breadcrumb name="Draw " IconComponent={AiOutlineFolder} />
        </div>
      </Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Lucky tickets with announcment" key="3">
          <AnnouncementsTable
            announcements={announcementsWithDraws || []}
            onAnnouncementSelect={handleAnnouncementSelect}
          />
        </TabPane>
        <TabPane tab="Announcements to Draws" key="4">
          <AnnouncementsTable
            announcements={announcementsWithoutDraws || []}
            toBeDraw
            onDraw={handleDraw}
            onDraw5LuckyWinners={handleDraw5LuckyWinners}
          />
        </TabPane>
      </Tabs>

      <LuckyTicketsModal
        visible={isModalVisible}
        onClose={handleModalClose}
        draws={(drawsByAnnouncement as unknown as DrawData[]) || []}
      />
    </div>
  );
}

export default Draw;
