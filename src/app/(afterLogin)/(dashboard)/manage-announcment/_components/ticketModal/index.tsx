"use client";
import React from "react";
import { Modal, Switch, Table } from "antd";

import { Ticket } from "@/types/features/announcment";
import useAnnouncementStore from "@/lib/store/uistate/features/manageAnnouncment/useStore";
import { useIsPaiedTicket } from "@/lib/store/server/features/tickets/mutation";

const TicketModal: React.FC = () => {
  const {
    tickets,
    setIsTicketModalVisible,
    isTicketModalVisible,
    updateTicketPayedStatus,
  } = useAnnouncementStore();

  const { mutate: updateIsPayed } = useIsPaiedTicket();

  const handleIsPayedChange = (id: string, currentPayedStatus: boolean) => {
    updateIsPayed(
      { id },
      {
        onSuccess: () => {
          updateTicketPayedStatus(id, !currentPayedStatus);
        },
      }
    );
  };

  const ticketColumns = [
    {
      title: "Ticket Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Telegram User",
      dataIndex: "telegramUser",
      key: "telegramUser",
      render: (text: string) => <p>{text ?? "-"}</p>,
    },
    {
      title: "Phone Number",
      dataIndex: "payerPhone",
      key: "payerPhone",
      render: (text: string) => <p>{text ?? "-"}</p>,
    },
    {
      title: "Is Payed",
      dataIndex: "isPayed",
      key: "isPayed",
      render: (isPayed: boolean, record: Ticket) => (
        <Switch
          checked={isPayed}
          onChange={() => handleIsPayedChange(record.id, isPayed)}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Ticket Details"
      width={"85%"}
      open={isTicketModalVisible}
      onCancel={() => setIsTicketModalVisible(false)}
      footer={null}
    >
      <Table
        columns={ticketColumns}
        dataSource={tickets}
        rowKey="number"
        scroll={{ x: true }}
      />
    </Modal>
  );
};

export default TicketModal;
