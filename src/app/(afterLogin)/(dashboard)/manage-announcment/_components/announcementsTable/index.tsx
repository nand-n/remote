import React from "react";
import { Table, Button, Space } from "antd";
import { Announcement } from "@/types/features/announcment";
import useAnnouncementStore from "@/lib/store/uistate/features/manageAnnouncment/useStore";
import { useDeleteAnnouncement } from "@/lib/store/server/features/manageAnnouncment/mutation";

const AnnouncementsTable: React.FC = () => {
  const {
    announcements,
    setCurrentAnnouncement,
    setTickets,
    setIsModalVisible,
    setIsTicketModalVisible,
    deleteAnnouncement,
  } = useAnnouncementStore();

  const handleEdit = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setIsModalVisible(true);
  };

  const deleteAnnouncementMutation = useDeleteAnnouncement();

  const handleDelete = (id: string) => {
    deleteAnnouncementMutation.mutate(id);
    deleteAnnouncement(id);
  };

  const handleViewTickets = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setTickets(announcement.tickets || []);
    setIsTicketModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Number of Tickets",
      dataIndex: "numberOfTickets",
      key: "numberOfTickets",
    },
    {
      title: "Action",
      key: "action",
      /* eslint-disable  @typescript-eslint/naming-convention */
      render: (_: any, record: Announcement) => (
        /* eslint-enable  @typescript-eslint/naming-convention */

        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button onClick={() => handleViewTickets(record)}>
            View Tickets
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      scroll={{ x: "max-content" }}
      dataSource={announcements}
      columns={columns}
      rowKey="id"
    />
  );
};

export default AnnouncementsTable;
