'use client';

import React from 'react';
import { Modal, Table } from 'antd';
import { DrawData } from '@/types/features/announcment';
// import { DrawData } from '@/store/server/features/draw/interface';

interface LuckyTicketsModalProps {
  visible: boolean;
  onClose: () => void;
  draws: DrawData[];
}

const columns = [
  { title: 'Win', dataIndex: 'lebel', key: 'lebel' },

  { title: 'Number', dataIndex: ['ticket', 'number'], key: 'number' },
  {
    title: 'Payer Phone',
    dataIndex: ['ticket', 'payerPhone'],
    key: 'payerPhone',
  },
  {
    title: 'Player',
    dataIndex: ['ticket', 'player'],
    key: 'player',
    render: (text: any) => <p>{text ?? '-'}</p>,
  },
];

const LuckyTicketsModal: React.FC<LuckyTicketsModalProps> = ({
  visible,
  onClose,
  draws,
}) => {
  return (
    <Modal
      title="Lucky Tickets"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={'80%'}
    >
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={draws}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </Modal>
  );
};

export default LuckyTicketsModal;
