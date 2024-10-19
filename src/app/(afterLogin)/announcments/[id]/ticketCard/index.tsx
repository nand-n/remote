"use client";
import React, { useState } from "react";
import { Card, Popover, Input, Button, Form } from "antd";
import NotificationMessage from "@/components/common/notification/notificationMessage";
import { Ticket } from "@/types/features/announcment";
import { useAssignTicket } from "@/lib/store/server/features/tickets/mutation";
import LotteryCelebration from "@/components/common/lotteryCelebration";

interface TicketCardProps {
  ticket: Ticket;
  handleNumberClick: (ticketNumber: number, phoneNumber: string) => void;
  announcementId: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  handleNumberClick,
  announcementId,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: assignTicket, isLoading } = useAssignTicket(announcementId);

  const handleCardClick = () => {
    if (!ticket?.payerPhone) {
      setIsPopoverVisible(true);
    }
  };

  const handlePhoneNumberSubmit = (values: { phoneNumber: string }) => {
    const { phoneNumber } = values;
    assignTicket(
      { id: ticket.id, dataP: { phoneNumber: `251${phoneNumber}` } },
      {
        onSuccess: () => {
          NotificationMessage.success({
            message: "Phone number assigned successfully",
            description: "Success",
          });
          handleNumberClick(Number(ticket.number), phoneNumber);
          setIsPopoverVisible(false);
          form.resetFields();
        },
        onError: () => {
          NotificationMessage.error({
            message: "Failed to assign phone number",
            description: "Error",
          });
        },
      }
    );
  };

  const popoverContent = (
    <Form
      form={form}
      onFinish={handlePhoneNumberSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <Form.Item
        name="phoneNumber"
        rules={[
          { required: true, message: "Please enter phone number" },
          {
            pattern: /^\d{9}$/,
            message: "Phone number must be 9 digits",
          },
        ]}
      >
        <Input
          type="number"
          addonBefore="+251"
          maxLength={9}
          placeholder="Enter phone number"
          disabled={isLoading}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return ticket?.isPayed ? (
    <div
      key={ticket.id}
      aria-disabled={true}
      className="cursor-not-allowed border bg-red-700 text-white flex justify-center items-center rounded-xl"
    >
      <p className="p-2 text-sm flex justify-center items-center text-center lg:p-8 lg:text-4xl font-bold">
        X
      </p>
    </div>
  ) : ticket.payerPhone ? (
    <div
      key={ticket.id}
      className=" border bg-purple text-white flex justify-center items-center rounded-xl cursor-pointer"
      onClick={() => {}}
    >
      <div className="grid items-center">
        <p className="p-2 text-sm flex justify-center items-center text-center lg:p-8 lg:text-4xl font-bold">
          {ticket.number}
        </p>
        <span className="flex justify-center items-center">Pay now</span>
      </div>
    </div>
  ) : (
    <Popover
      content={popoverContent}
      title="Enter Phone Number"
      trigger="click"
      open={isPopoverVisible}
      onOpenChange={(visible) => setIsPopoverVisible(visible)}
    >
      <Card
        key={ticket.id}
        className="cursor-pointer border bg-gray-800 text-white border-gray-700"
        onClick={handleCardClick}
      >
        <p className="p-2 text-sm flex justify-center items-center text-center lg:p-8 lg:text-4xl font-bold">
          {ticket.number}
        </p>
      </Card>
    </Popover>
  );
};

export default TicketCard;
