import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NavigationItem, NavigationFormData } from "@/types/navigation";
import NavigationListItem from "./NavigationListItem";
import NavigationForm from "../NavigationForm/NavigationForm";

interface Props {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  onAdd: () => void;
  showForm: boolean;
  editingItem: NavigationItem | null;
  onFormSubmit: (data: NavigationFormData) => void;
  onFormClose: () => void;
}

export default function NavigationList({
  items,
  onReorder,
  onEdit,
  onRemove,
  onAddSubItem,
  onAdd,
  showForm,
  editingItem,
  onFormSubmit,
  onFormClose,
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

      {(showForm || editingItem) && (
        <div className="border-t border-[#D0D5DD]">
          <NavigationForm
            initialData={editingItem || undefined}
            onSubmit={onFormSubmit}
            onClose={onFormClose}
          />
        </div>
      )}

      <div className="py-5 pl-6 bg-[#F9FAFB] rounded-b-md border-t border-[#D0D5DD]">
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
