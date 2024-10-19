import React from 'react';
import { Table, Button, Space, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Announcement } from '@/types/features/announcment';
// import { Announcement } from '@/store/server/features/draw/interface';

interface AnnouncementsTableProps {
  announcements: Announcement[];
  onDraw?: (announcementId: string) => void;
  toBeDraw?: boolean;
  onAnnouncementSelect?: (id: string) => void;
  onDraw5LuckyWinners?: (announcementId: string) => void;
}

const AnnouncementsTable: React.FC<AnnouncementsTableProps> = ({
  announcements,
  onDraw,
  toBeDraw = false,
  onAnnouncementSelect,
  onDraw5LuckyWinners,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Number of Tickets',
      dataIndex: 'numberOfTickets',
      key: 'numberOfTickets',
    },
    /* eslint-disable  @typescript-eslint/naming-convention */

    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Announcement) => (
        <Space size="middle">
          {/* Dropdown for action selection */}
          <Dropdown
            overlay={
              <Menu>
                {toBeDraw && onDraw && (
                  <Menu.Item key="draw" onClick={() => onDraw(record.id)}>
                    Draw
                  </Menu.Item>
                )}
                {onDraw5LuckyWinners && (
                  <Menu.Item
                    key="draw5LuckyWinners"
                    onClick={() => onDraw5LuckyWinners(record.id)}
                  >
                    Draw 5 Lucky Winners
                  </Menu.Item>
                )}
                <Menu.Item
                  key="viewTickets"
                  onClick={() =>
                    onAnnouncementSelect && onAnnouncementSelect(record.id)
                  }
                >
                  View Lucky Tickets
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
    /* eslint-enable  @typescript-eslint/naming-convention */
  ];

  return (
    <Table
      scroll={{ x: 'max-content' }}
      dataSource={announcements}
      columns={columns}
      rowKey="id"
    />
  );
};

export default AnnouncementsTable;
