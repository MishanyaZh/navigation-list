import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { NavigationItem } from '@/types/navigation';

export function useDragAndDrop(onReorder: (items: NavigationItem[]) => void) {
  const getAllIds = (items: NavigationItem[]): string[] => {
    return items.reduce((acc: string[], item) => {
      acc.push(item.id);
      if (item.children?.length) {
        acc = [...acc, ...getAllIds(item.children)];
      }
      return acc;
    }, []);
  };

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
    childId: string
  ): NavigationItem | null => {
    for (const item of items) {
      if (item.children?.some(child => child.id === childId)) {
        return item;
      }
      if (item.children) {
        const parent = findParent(item.children, childId);
        if (parent) return parent;
      }
    }
    return null;
  };

  const handleDragEnd = (event: DragEndEvent, items: NavigationItem[]) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const reorderItems = (
      items: NavigationItem[],
      activeId: string,
      overId: string
    ) => {
      const activeParent = findParent(items, activeId);
      const overParent = findParent(items, overId);

      if (!activeParent && !overParent) {
        const oldIndex = items.findIndex(item => item.id === activeId);
        const newIndex = items.findIndex(item => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      }

      const result = [...items];
      const activeItem = flattenTree(items).find(item => item.id === activeId);
      const overItem = flattenTree(items).find(item => item.id === overId);

      if (!activeItem || !overItem) return items;

      if (activeParent) {
        activeParent.children = activeParent.children?.filter(
          child => child.id !== activeId
        );
      } else {
        const index = result.findIndex(item => item.id === activeId);
        if (index !== -1) result.splice(index, 1);
      }

      if (overParent) {
        if (!overParent.children) overParent.children = [];
        const overIndex = overParent.children.findIndex(
          child => child.id === overId
        );
        overParent.children.splice(overIndex, 0, activeItem);
      } else {
        const overIndex = result.findIndex(item => item.id === overId);
        result.splice(overIndex, 0, activeItem);
      }

      return result;
    };

    onReorder(reorderItems(items, active.id as string, over.id as string));
  };

  return { getAllIds, handleDragEnd };
}
