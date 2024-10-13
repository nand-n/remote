// import React from "react";
// import { Skeleton, Tree } from "antd";
// import { DownOutlined } from "@ant-design/icons";

// const LoadingTreeSkeleton: React.FC = () => {
//   const treeData = Array.from({ length: 5 }, (_, index) => ({
//     title: <Skeleton active paragraph={false} title={{ width: 100 }} />,
//     key: `parent-${index}`,
//     children: Array.from({ length: 3 }, (_, childIndex) => ({
//       title: <Skeleton active paragraph={false} title={{ width: 80 }} />,
//       key: `child-${index}-${childIndex}`, // Unique key for each child node
//       children: [], // No grandchildren for simplicity
//     })),
//   }));

//   return (
//     <Tree
//       showLine
//       blockNode
//       defaultExpandAll
//       switcherIcon={<DownOutlined />}
//       treeData={treeData}
//     />
//   );
// };

// export default LoadingTreeSkeleton;

import React from "react";
import { Skeleton, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

const LoadingTreeSkeleton: React.FC = () => {
  // Generate skeleton data for the tree structure
  const treeData = Array.from({ length: 3 }, (_, index) => ({
    title: (
      <div className="flex items-center">
        <Skeleton.Button
          active
          size="small"
          style={{ width: "20px", marginRight: "8px" }}
        />
        <Skeleton active paragraph={false} title={{ width: 100 }} />
      </div>
    ),
    key: `parent-${index}`, // Unique key for each parent node
    children: Array.from({ length: 3 }, (_, childIndex) => ({
      title: (
        <div className="flex items-center">
          <Skeleton.Button
            active
            size="small"
            style={{ width: "20px", marginRight: "8px" }}
          />
          <Skeleton active paragraph={false} title={{ width: 80 }} />
        </div>
      ),
      key: `child-${index}-${childIndex}`, // Unique key for each child node
      children: [], // No grandchildren for simplicity
    })),
  }));

  return (
    <Tree
      showLine
      blockNode
      defaultExpandAll
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      className="loading-tree-skeleton"
    />
  );
};

export default LoadingTreeSkeleton;
