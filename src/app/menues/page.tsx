"use client";
import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";

const initialTreeData: TreeDataNode[] = [
  {
    title: "System Management",
    key: "1",
    children: [
      {
        title: "Systems",
        key: "1.1",
        children: [
          {
            title: "System Code",
            key: "1.1.1",
            children: [
              { title: "Code Registration", key: "1.1.1.1" },
              { title: "Code Registration - 2", key: "1.1.1.2" },
            ],
          },
          { title: "Properties", key: "1.1.2" },
        ],
      },
      {
        title: "Users & Groups",
        key: "1.2",
        children: [
          {
            title: "Users",
            key: "1.2.1",
            children: [{ title: "User Account Registration", key: "1.2.1.1" }],
          },
          {
            title: "Groups",
            key: "1.2.2",
            children: [{ title: "User Group Registration", key: "1.2.2.1" }],
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>(initialTreeData);
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
  const [form] = Form.useForm();

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    if (selectedKeys.length) {
      const key = selectedKeys[0];
      setSelectedNode({ ...info.node, key });
      form.setFieldsValue({
        menuId: key,
        name: info.node.title,
        parent: info.node.key.toString().split(".").slice(0, -1).join("."),
        depth: key.toString().split(".").length - 1,
      });
    } else {
      setSelectedNode(null);
    }
  };

  // Add a new item to the currently selected node
  const handleAddItem = () => {
    if (!selectedNode) return;

    const updatedTree = [...treeData];
    const newKey = `${selectedNode.key}.${
      (selectedNode.children?.length || 0) + 1
    }`;
    const newItem: DataNode = { title: " ", key: newKey };

    const node = findNodeByKey(selectedNode.key as string, updatedTree);
    if (node) {
      node.children = node.children ? [...node.children, newItem] : [newItem];
      setTreeData(updatedTree);
    }
  };

  // Recursively find node by key
  const findNodeByKey = (key: string, nodes: DataNode[]): DataNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const result = findNodeByKey(key, node.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const titleRender: (node: DataNode) => React.ReactNode = (node) => {
    return (
      <div className="flex items-center">
        <span>{node.title?.toString()}</span>
        {selectedNode && selectedNode.key === node.key && (
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            className="ml-2"
            onClick={handleAddItem}
          />
        )}
      </div>
    );
  };

  const updateMenuItem = (values: { name: string }) => {
    if (selectedNode) {
      const updatedTree = [...treeData];
      const node = findNodeByKey(selectedNode.key as string, updatedTree);
      if (node) {
        node.title = values.name;
        setTreeData(updatedTree);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tree Display */}
        <div className="p-4">
          <Tree
            showLine
            blockNode
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={["1"]}
            onSelect={onSelect}
            treeData={treeData}
            titleRender={titleRender}
          />
        </div>

        {/* Menu Form */}
        <div className="p-4">
          {/* <Form layout="vertical" form={form}> */}
          {selectedNode && (
            <Form layout="vertical" form={form} onFinish={updateMenuItem}>
              <Form.Item label="Menu ID" name="menuId">
                <Input readOnly className="h-12" />
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input className="h-12" />
              </Form.Item>
              <Form.Item label="Parent" name="parent">
                <Input readOnly className="h-12 bg-gray-200" />
              </Form.Item>
              <Form.Item label="Depth" name="depth">
                <Input readOnly className="h-12 bg-gray-200" />
              </Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="mb-4 h-12"
              >
                Save
              </Button>

              <Button
                block
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => console.log(`Deleting node ${selectedNode.key}`)}
                className="h-12"
              >
                Delete Item
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
