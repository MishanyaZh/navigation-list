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
    <div className="space-y-4">
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
      <button
        onClick={onAdd}
        className="w-full p-2 border-2 border-dashed rounded-lg text-[#7F56D9] hover:bg-gray-50"
      >
        <div className="flex items-center justify-center gap-2">
          Dodaj pozycję menu
        </div>
      </button>
    </div>
  );
}
