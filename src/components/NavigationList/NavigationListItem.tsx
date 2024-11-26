import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NavigationItem } from "@/types/navigation";

interface Props {
  item: NavigationItem;
  onEdit: (item: NavigationItem) => void;
}

export default function NavigationListItem({ item, onEdit }: Props) {
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
      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          ⋮⋮
        </button>
        <div>
          <p className="font-medium">{item.label}</p>
          {item.url && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.url}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onEdit(item)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
      >
        ✎
      </button>
      {item.children && item.children.length > 0 && (
        <div className="ml-8">
          {item.children.map((child) => (
            <NavigationListItem key={child.id} item={child} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
