import React from "react";

interface Attributes {
  role: string;
  tabIndex: number;
  "aria-disabled": boolean;
  "aria-roledescription": string;
  "aria-describedby": string;
}

interface Listeners {
  [key: string]: Function;
}

interface DragHandleProps {
  id: string;
  attributes: Attributes;
  listeners?: Listeners;
}

const DragHandle: React.FC<DragHandleProps> = ({
  attributes,
  listeners,
  id,
}) => {
  return (
    <button
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()}
      className="cursor-grab px-1 py-1 mr-2 rounded hover:bg-gray-200 active:cursor-grabbing"
      aria-label={`Drag to reorder ${id}`}>
      <div className="flex flex-col items-center space-y-0.5">
        <span className="w-1 h-1 bg-gray-500 rounded-full" />
        <span className="w-1 h-1 bg-gray-500 rounded-full" />
        <span className="w-1 h-1 bg-gray-500 rounded-full" />
      </div>
    </button>
  );
};

export default DragHandle;
