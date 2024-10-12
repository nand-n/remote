import React from "react";
import { Icon } from "./icon";

interface BreadcrumbProps {
  iconSrc: string;
  name: string;
  size?: "small" | "medium" | "large"; // Dynamically adjust size
  showSeparator?: boolean;
  separator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  iconSrc,
  name,
  size = "medium", // Default to medium size
  showSeparator = true, // Show separator by default
  separator = "/", // Default separator is "/"
}) => {
  const sizeMap = {
    small: { icon: 12, text: "text-sm" },
    medium: { icon: 16, text: "text-lg" },
    large: { icon: 24, text: "text-xl" },
  };

  const currentSize = sizeMap[size]; // Get icon and text size

  return (
    <div className="flex items-center space-x-2 w-full">
      {/* Icon with dynamic size */}
      <div className="flex items-center space-x-1 text-gray-400">
        <Icon
          src={iconSrc}
          width={currentSize.icon * 4}
          height={currentSize.icon * 4}
          alt={name}
        />
      </div>

      {/* Optional separator, only shown if showSeparator is true */}
      {showSeparator && <span className="text-gray-400">{separator}</span>}

      {/* Title with dynamic size */}
      <h1 className={`font-bold ${currentSize.text}`}>{name}</h1>
    </div>
  );
};

export default Breadcrumb;
