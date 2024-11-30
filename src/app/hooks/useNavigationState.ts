import { useState } from 'react';
import { NavigationItem, NavigationFormData } from '../types/navigation';
import { addItemToTree, removeItemFromTree, updateItemInTree } from '../utils/navigationTree';

export function useNavigationState() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAdd = (data: NavigationFormData) => {
    const newItem = { ...data, id: crypto.randomUUID() } as NavigationItem;

    if (parentId) {
      setItems((prevItems) => addItemToTree(prevItems, parentId, newItem));
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }

    setShowForm(false);
    setParentId(null);
  };

  const handleRemove = (id: string) => {
    setItems((prevItems) => removeItemFromTree(prevItems, id));
  };

  const handleAddSubItem = (parentId: string) => {
    setParentId(parentId);
    setShowForm(true);
  };

  const handleFormSubmit = (data: NavigationFormData) => {
    if (editingItem) {
      setItems((prevItems) =>
        updateItemInTree(prevItems, editingItem.id, data as NavigationItem)
      );
      setEditingItem(null);
    } else {
      handleAdd(data);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
    setParentId(null);
  };

  return {
    items,
    editingItem,
    showForm,
    setItems,
    setEditingItem,
    setShowForm,
    handleAdd,
    handleRemove,
    handleAddSubItem,
    handleFormSubmit,
    handleFormClose,
  };
}