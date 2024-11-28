import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NavigationItem } from "@/types/navigation";
import NavigationListItem from "./NavigationListItem";

interface Props {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  onAdd: () => void;
}

export default function NavigationList({
  items,
  onReorder,
  onEdit,
  onRemove,
  onAddSubItem,
  onAdd,
}: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      onReorder(newItems);
    }
  };

  return (
    <div className="bg-white border border-[#D0D5DD] rounded-md">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <NavigationListItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onRemove={onRemove}
                onAddSubItem={onAddSubItem}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="py-5 pl-6 bg-[#F9FAFB] rounded-b-md">
        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-[#D0D5DD] rounded-md hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-300"
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
