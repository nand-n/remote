import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';

interface AnnouncementModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
  currentAnnouncement: any;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  visible,
  onOk,
  onCancel,
  form,
  currentAnnouncement,
}) => {
  return (
    <Modal
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={currentAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...currentAnnouncement,
          endDate: currentAnnouncement?.endDate
            ? dayjs(currentAnnouncement.endDate)
            : null,
          endTime: currentAnnouncement?.endTime
            ? dayjs(currentAnnouncement.endTime, 'HH:mm:ss')
            : null,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the announcement!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date!' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please select the end time!' }]}
        >
          <TimePicker className="w-full" format="HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="numberOfTickets"
          label="Number of Tickets"
          rules={[
            { required: true, message: 'Please input the number of tickets!' },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="ticketPrice"
          label="Ticket price"
          rules={[
            { required: true, message: 'Please input the ticket price!' },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AnnouncementModal;
