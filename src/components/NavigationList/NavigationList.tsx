import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
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
  const getAllIds = (items: NavigationItem[]): string[] => {
    return items.reduce((acc: string[], item) => {
      acc.push(item.id);
      if (item.children?.length) {
        acc = [...acc, ...getAllIds(item.children)];
      }
      return acc;
    }, []);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const flattenTree = (items: NavigationItem[]): NavigationItem[] => {
      return items.reduce((flat: NavigationItem[], item) => {
        if (item.children?.length) {
          return [...flat, item, ...flattenTree(item.children)];
        }
        return [...flat, item];
      }, []);
    };

    const findParent = (
      items: NavigationItem[],
      childId: string,
    ): NavigationItem | null => {
      for (const item of items) {
        if (item.children?.some((child) => child.id === childId)) {
          return item;
        }
        if (item.children) {
          const parent = findParent(item.children, childId);
          if (parent) return parent;
        }
      }
      return null;
    };

    const reorderItems = (
      items: NavigationItem[],
      activeId: string,
      overId: string,
    ): NavigationItem[] => {
      const activeParent = findParent(items, activeId);
      const overParent = findParent(items, overId);

      if (!activeParent && !overParent) {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      }

      const result = [...items];
      const activeItem = flattenTree(items).find(
        (item) => item.id === activeId,
      );
      const overItem = flattenTree(items).find((item) => item.id === overId);

      if (!activeItem || !overItem) return items;

      if (activeParent) {
        activeParent.children = activeParent.children?.filter(
          (child) => child.id !== activeId,
        );
      } else {
        const index = result.findIndex((item) => item.id === activeId);
        if (index !== -1) result.splice(index, 1);
      }

      if (overParent) {
        if (!overParent.children) overParent.children = [];
        const overIndex = overParent.children.findIndex(
          (child) => child.id === overId,
        );
        overParent.children.splice(overIndex, 0, activeItem);
      } else {
        const overIndex = result.findIndex((item) => item.id === overId);
        result.splice(overIndex, 0, activeItem);
      }

      return result;
    };

    onReorder(reorderItems(items, active.id as string, over.id as string));
  };

  return (
    <div className="bg-background-default border border-border-primary rounded-md overflow-hidden">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <SortableContext
          items={getAllIds(items)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {items.map((item, index) => (
              <NavigationListItem
                key={item.id}
                index={index}
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
        <div className="">
          <NavigationForm
            initialData={editingItem || undefined}
            onSubmit={onFormSubmit}
            onClose={onFormClose}
          />
        </div>
      )}

      <div className="py-5 pl-6 bg-background-secondary rounded-b-md border-t border-border-primary">
        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border border-border-primary rounded-md hover:bg-background-secondary focus:ring-2 focus:ring-button-primary-action shadow-custom"
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
