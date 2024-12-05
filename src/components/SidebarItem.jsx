import React from "react";

const SidebarItem = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-red-50 text-red-600'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <item.icon className="w-5 h-5 mr-3" />
    <span>{item.label}</span>
  </button>
);

export default SidebarItem;
