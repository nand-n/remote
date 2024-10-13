// "use client";
// import React, { useEffect, useState } from "react";
// import { PlusOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Tree } from "antd";
// import type { TreeDataNode, TreeProps } from "antd";
// import { DataNode } from "antd/es/tree";
// import Breadcrumb from "@/components/commons/bradCramp";
// import BreadcrumbWithIcon from "@/components/commons/breadCrambWtihIcon";
// import { AiOutlineAppstore, AiOutlineFolder } from "react-icons/ai";
// import CustomSelect from "@/components/commons/customSelect.tsx/customSelect";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/lib/store/store";
// import { fetchCategoriesStart } from "@/lib/store/features/categories/slice";

// const initialTreeData: TreeDataNode[] = [
//   {
//     title: "System Management",
//     key: "1",
//     children: [
//       {
//         title: "Systems",
//         key: "1.1",
//         children: [
//           {
//             title: "System Code",
//             key: "1.1.1",
//             children: [
//               { title: "Code Registration", key: "1.1.1.1" },
//               { title: "Code Registration - 2", key: "1.1.1.2" },
//             ],
//           },
//           { title: "Properties", key: "1.1.2" },
//         ],
//       },
//       {
//         title: "Users & Groups",
//         key: "1.2",
//         children: [
//           {
//             title: "Users",
//             key: "1.2.1",
//             children: [{ title: "User Account Registration", key: "1.2.1.1" }],
//           },
//           {
//             title: "Groups",
//             key: "1.2.2",
//             children: [{ title: "User Group Registration", key: "1.2.2.1" }],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const App: React.FC = () => {
//   const dispatch = useDispatch();

//   // You can select your categories and loading/error states from the store
//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const loading = useSelector((state: RootState) => state.categories.loading);
//   const error = useSelector((state: RootState) => state.categories.error);

//   useEffect(() => {
//     dispatch(fetchCategoriesStart("e1a1e6fc-b4b8-45b8-b458-9fc2404055c5")); // Dispatch the action with the categoryId
//   }, []);
//   const [treeData, setTreeData] = useState<TreeDataNode[]>(categories);
//   const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
//   const [form] = Form.useForm();

//   const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
//     if (selectedKeys.length) {
//       const key = selectedKeys[0];
//       setSelectedNode({ ...info.node, key });
//       form.setFieldsValue({
//         menuId: key,
//         name: info.node.title,
//         parent: info.node.key.toString().split(".").slice(0, -1).join("."),
//         depth: key.toString().split(".").length - 1,
//       });
//     } else {
//       setSelectedNode(null);
//     }
//   };

//   // Add a new item to the currently selected node
//   const handleAddItem = () => {
//     if (!selectedNode) return;

//     const updatedTree = [...treeData];
//     const newKey = `${selectedNode.key}.${
//       (selectedNode.children?.length || 0) + 1
//     }`;
//     const newItem: DataNode = { title: " ", key: newKey };

//     const node = findNodeByKey(selectedNode.key as string, updatedTree);
//     if (node) {
//       node.children = node.children ? [...node.children, newItem] : [newItem];
//       setTreeData(updatedTree);
//     }
//   };

//   // Recursively find node by key
//   const findNodeByKey = (key: string, nodes: DataNode[]): DataNode | null => {
//     for (const node of nodes) {
//       if (node.key === key) {
//         return node;
//       }
//       if (node.children) {
//         const result = findNodeByKey(key, node.children);
//         if (result) {
//           return result;
//         }
//       }
//     }
//     return null;
//   };

//   const titleRender: (node: DataNode) => React.ReactNode = (node) => {
//     return (
//       <div className="flex items-center">
//         <span>{node.title?.toString()}</span>
//         {selectedNode && selectedNode.key === node.key && (
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<PlusOutlined />}
//             size="small"
//             className="ml-2"
//             onClick={handleAddItem}
//           />
//         )}
//       </div>
//     );
//   };

//   const updateMenuItem = (values: { name: string }) => {
//     if (selectedNode) {
//       const updatedTree = [...treeData];
//       const node = findNodeByKey(selectedNode.key as string, updatedTree);
//       if (node) {
//         node.title = values.name;
//         setTreeData(updatedTree);
//       }
//     }
//   };

//   console.log(categories, "categories");
//   return (
//     <div className="container mx-auto p-4">
//       <Breadcrumb
//         IconComponent={AiOutlineFolder} // Use the folder icon
//         name="Menus"
//         size="large"
//         showSeparator={true}
//         separator="/"
//       />

//       <br className="mt-4" />
//       <div className="hidden md:block">
//         <BreadcrumbWithIcon
//           icon={AiOutlineAppstore}
//           text="Menus"
//           iconSize={26}
//           textSize="30px"
//         />
//       </div>

//       <CustomSelect />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="py-4">
//           <Tree
//             showLine
//             blockNode
//             defaultExpandAll
//             switcherIcon={<DownOutlined />}
//             defaultExpandedKeys={["1"]}
//             onSelect={onSelect}
//             treeData={treeData}
//             titleRender={titleRender}
//           />
//         </div>

//         <div className="grid p-4">
//           {selectedNode && (
//             <Form layout="vertical" form={form} onFinish={updateMenuItem}>
//               <Form.Item label="Menu ID" name="menuId">
//                 <Input readOnly className="h-12" />
//               </Form.Item>
//               <div className="w-full lg:w-1/2">
//                 <Form.Item label="Depth" name="depth">
//                   <Input readOnly className="h-12 bg-gray-200" />
//                 </Form.Item>
//                 <Form.Item label="Name" name="name">
//                   <Input className="h-12" />
//                 </Form.Item>
//                 <Form.Item label="Parent" name="parent">
//                   <Input readOnly className="h-12 bg-gray-200" />
//                 </Form.Item>

//                 <div className="w-full h-16">
//                   <Button
//                     block
//                     type="primary"
//                     htmlType="submit"
//                     className="mb-4 h-full"
//                   >
//                     Save
//                   </Button>

//                  <Button
//                 block
//                 type="primary"
//                 danger
//                 icon={<DeleteOutlined />}
//                 onClick={() => console.log(`Deleting node ${selectedNode.key}`)}
//                 className="h-12"
//               >
//                 Delete Item
//               </Button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

"use client";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import Breadcrumb from "@/components/commons/bradCramp";
import BreadcrumbWithIcon from "@/components/commons/breadCrambWtihIcon";
import { AiOutlineAppstore, AiOutlineFolder } from "react-icons/ai";
import CustomSelect from "@/app/menues/_components/customSelect.tsx/customSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { fetchCategoriesStart } from "@/lib/store/features/categories/slice";
import ExpandAndColapse from "./_components/expandAndCollapse";
import LoadingTreeSkeleton from "./_components/loading/page";

// Recursive function to map categories to TreeDataNode format
const mapCategoriesToTreeData = (categories) => {
  return categories.map((category) => ({
    title: category.name,
    key: category.id, // Use id for key
    children: category.children
      ? mapCategoriesToTreeData(category.children)
      : [],
  }));
};

const App: React.FC = () => {
  // Select categories, loading, and error states from the store
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const loading = useSelector((state: RootState) => state.categories.loading);
  // const error = useSelector((state: RootState) => state.categories.error);

  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (categories.length) {
      const mappedData = mapCategoriesToTreeData(categories);
      setTreeData(mappedData);
    }
  }, [categories]);

  console.log(categories, "categories");

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    if (selectedKeys.length) {
      const key = selectedKeys[0];
      setSelectedNode({ ...info.node, key });
      form.setFieldsValue({
        menuId: key,
        name: info.node.title,
        parent: info.node.key.toString().split(".").slice(0, -1).join("."),
        depth: info.depth,
      });
    } else {
      setSelectedNode(null);
    }
  };

  const handleAddItem = () => {
    if (!selectedNode) return;

    const updatedTree = [...treeData];
    const newKey = `${selectedNode.key}.${
      (selectedNode.children?.length || 0) + 1
    }`;
    const newItem: DataNode = { title: "New Item", key: newKey };

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

  console.log(categories, "categories");

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb
        IconComponent={AiOutlineFolder}
        name="Menus"
        size="large"
        showSeparator={true}
        separator="/"
      />

      <br className="mt-4" />
      <div className="hidden md:block">
        <BreadcrumbWithIcon
          icon={AiOutlineAppstore}
          text="Menus"
          iconSize={26}
          textSize="30px"
        />
      </div>

      <CustomSelect />

      <ExpandAndColapse />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-4">
          {loading ? (
            <LoadingTreeSkeleton />
          ) : (
            <Tree
              showLine
              blockNode
              defaultExpandAll={true}
              switcherIcon={<DownOutlined />}
              onSelect={onSelect}
              treeData={treeData}
              titleRender={titleRender}
            />
          )}
        </div>

        <div className="grid p-4">
          {selectedNode && (
            <Form layout="vertical" form={form} onFinish={updateMenuItem}>
              <Form.Item label="Menu ID" name="menuId">
                <Input readOnly className="h-12" />
              </Form.Item>
              <div className="w-full lg:w-1/2">
                <Form.Item label="Depth" name="depth">
                  <Input readOnly className="h-12 bg-gray-200" />
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input className="h-12" />
                </Form.Item>
                <Form.Item label="Parent" name="parent">
                  <Input readOnly className="h-12 bg-gray-200" />
                </Form.Item>

                <div className="w-full h-16">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    className="mb-4 h-full"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
