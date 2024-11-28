import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NavigationItem } from "@/types/navigation";

interface Props {
  item: NavigationItem;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  child?: boolean;
}

export default function NavigationListItem({
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
    <div
      ref={setNodeRef}
      style={style}
      className={` ${child ? "space-y-3" : ""}`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b ${
          child ? "border-l rounded-bl-md" : ""
        } transition-colors`}
      >
        <div className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-gray-100 rounded text-gray-500"
          >
            ⋮⋮
          </button>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {item.label}
            </p>
            {item.url && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.url}
              </p>
            )}
          </div>
        </div>
        <div
          className="inline-flex rounded-md border border-[#D0D5DD] shadow-sm"
          role="group"
        >
          <button
            onClick={() => onRemove(item.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-r border-[#D0D5DD] rounded-l-md hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-300"
          >
            Usuń
          </button>
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-r border-[#D0D5DD] hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-300"
          >
            Edytuj
          </button>
          <button
            onClick={() => onAddSubItem(item.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-r-md hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-300"
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="ml-12">
          {item.children.map((child) => (
            <NavigationListItem
              key={child.id}
              item={child}
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
