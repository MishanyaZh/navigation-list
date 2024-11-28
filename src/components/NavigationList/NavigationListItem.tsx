import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NavigationItem } from "@/types/navigation";

interface Props {
  item: NavigationItem;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
}

export default function NavigationListItem({
  item,
  onEdit,
  onRemove,
  onAddSubItem,
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
    <div ref={setNodeRef} style={style} className="space-y-3">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-300 transition-colors">
        <div className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRemove(item.id)}
            className="px-3 py-2 border border-[#D0D5DD] rounded-md text-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Usuń
          </button>
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-2 border border-[#D0D5DD] rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Edytuj
          </button>
          <button
            onClick={() => onAddSubItem(item.id)}
            className="px-3 py-2 border border-[#D0D5DD] rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="ml-12 space-y-3">
          {item.children.map((child) => (
            <NavigationListItem
              key={child.id}
              item={child}
              onEdit={onEdit}
              onRemove={onRemove}
              onAddSubItem={onAddSubItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
