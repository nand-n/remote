"use client";
import CustomBreadcrumb from "@/components/common/breadCramp";
import { useGetUsers } from "@/lib/store/server/features/users/queries";
import useUserUIState from "@/lib/store/uistate/features/users/useStore";

import { User } from "@/types/features/users";
import { Button, Popconfirm, Table, Tabs } from "antd";
import React from "react";

function UserListPage() {
  const { data: users, isLoading: loading } = useGetUsers();
  const { activeRole, setActiveRole, isLoading } = useUserUIState();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Telegram User",
      dataIndex: "telegramUser",
      key: "telegramUser",
    },
    /* eslint-disable  @typescript-eslint/naming-convention */

    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Popconfirm
          title={`Are you sure you want to suspend ${record.name}?`}
          onConfirm={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Suspend User</Button>
        </Popconfirm>
      ),
    },
    /* eslint-enable  @typescript-eslint/naming-convention */
  ];

  const tabItems = [
    {
      key: "player",
      label: "Players",
    },
    {
      key: "admin",
      label: "Admins",
    },
    {
      key: "super-admin",
      label: "Super Admins",
    },
  ];

  return (
    <div>
      <CustomBreadcrumb title="Users" subtitle="List of users" />
      <Tabs activeKey={activeRole} onChange={(key) => setActiveRole(key)}>
        {tabItems.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key}>
            <Table
              columns={columns}
              dataSource={
                users?.items?.filter((item: User) => item.role == tab.key) ?? []
              }
              loading={isLoading || loading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default UserListPage;
