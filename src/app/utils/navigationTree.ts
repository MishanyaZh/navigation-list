import { NavigationItem } from '../types/navigation';

export const addItemToTree = (
  items: NavigationItem[],
  parentId: string,
  newItem: NavigationItem
): NavigationItem[] => {
  return items.map(item => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [...(item.children || []), newItem],
      };
    }
    if (item.children) {
      return {
        ...item,
        children: addItemToTree(item.children, parentId, newItem),
      };
    }
    return item;
  });
};

export const removeItemFromTree = (
  items: NavigationItem[],
  id: string
): NavigationItem[] => {
  return items.filter(item => {
    if (item.id === id) return false;
    if (item.children) {
      item.children = removeItemFromTree(item.children, id);
    }
    return true;
  });
};

export const updateItemInTree = (
  items: NavigationItem[],
  id: string,
  newData: NavigationItem
): NavigationItem[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...newData, id: item.id, children: item.children };
    }
    if (item.children) {
      return {
        ...item,
        children: updateItemInTree(item.children, id, newData),
      };
    }
    return item;
  });
};
