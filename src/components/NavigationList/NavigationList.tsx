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
}

export default function NavigationList({ items, onReorder, onEdit }: Props) {
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
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <NavigationListItem key={item.id} item={item} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
