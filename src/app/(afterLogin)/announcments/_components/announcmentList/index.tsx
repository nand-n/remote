"use client";

import {
  useGetAnnouncments,
  useGetClosedAnnouncments,
  useGetOpenAnnouncments,
} from "@/lib/store/server/features/announcment/queries";
import AnnouncmentCard from "../annoucmentCard";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const AnnouncementList = () => {
  const { data: allAnnouncements } = useGetAnnouncments();
  const { data: allClosedAnnouncements } = useGetClosedAnnouncments();
  const { data: allOpemAnnouncements } = useGetOpenAnnouncments();

  return (
    <div className="">
      <Tabs defaultActiveKey="1">
        <TabPane tab="All Announcments" key={"1"}>
          <AnnouncmentCard announcements={allAnnouncements} />
        </TabPane>

        <TabPane tab="Open Announcments" key={"2"}>
          <AnnouncmentCard announcements={allOpemAnnouncements} />
        </TabPane>
        <TabPane tab="Closed Announcments" key={"3"}>
          <AnnouncmentCard announcements={allClosedAnnouncements} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AnnouncementList;
