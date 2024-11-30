"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NavigationItem } from "@/types/navigation";
import { DragIcon } from "../IconComponents";

interface Props {
  index?: number;
  item: NavigationItem;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  child?: boolean;
}

export default function NavigationListItem({
  index,
  item,
  onEdit,
  onRemove,
  onAddSubItem,
  child,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`${child ? "ml-12" : ""}`}>
      <div
        className={`flex items-center justify-between p-4 border-b border-border-primary ${
          child ? "border-l rounded-bl-md" : index === 0 ? "" : "border-t"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-background-secondary rounded text-text-tertiary"
          >
            <DragIcon />
          </button>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {item.label}
            </p>
            {item.url && (
              <p className="text-sm font-normal text-text-tertiary mt-1">
                {item.url}
              </p>
            )}
          </div>
        </div>
        <div
          className="inline-flex rounded-md border border-border-primary shadow-custom"
          role="group"
        >
          <button
            onClick={() => onRemove(item.id)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border-r border-border-primary rounded-l-md hover:bg-background-secondary"
          >
            Usuń
          </button>
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border-r border-border-primary hover:bg-background-secondary"
          >
            Edytuj
          </button>
          <button
            onClick={() => onAddSubItem(item.id)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default rounded-r-md hover:bg-background-secondary"
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="">
          {item.children.map((childItem) => (
            <NavigationListItem
              key={childItem.id}
              item={childItem}
              onEdit={onEdit}
              onRemove={onRemove}
              onAddSubItem={onAddSubItem}
              child={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
