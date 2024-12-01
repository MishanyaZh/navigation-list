"use client";

import { useState, useEffect, useCallback } from 'react';
import { NavigationItem, NavigationFormData } from '../types/navigation';
import { addItemToTree, removeItemFromTree, updateItemInTree } from '../utils/navigationTree';

export function useNavigationState() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('navigationItems');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load navigation items:', error);
    }
  }, []);

  const persistItems = useCallback((newItems: NavigationItem[]) => {
    setItems(newItems);
    localStorage.setItem('navigationItems', JSON.stringify(newItems));
  }, []);

  const handleAdd = (data: NavigationFormData) => {
    try {
      const newItem = { ...data, id: crypto.randomUUID() } as NavigationItem;

      if (parentId) {
        persistItems(addItemToTree(items, parentId, newItem));
      } else {
        persistItems([...items, newItem]);
      }

      setShowForm(false);
      setParentId(null);
      setError(null);
    } catch {
      setError('Failed to add item');
    }
  };

  const handleRemove = (id: string) => {
    persistItems(removeItemFromTree(items, id));
  };

  const handleAddSubItem = (parentId: string) => {
    setParentId(parentId);
    setShowForm(true);
  };

  const handleFormSubmit = (data: NavigationFormData) => {
    if (editingItem) {
      persistItems(updateItemInTree(items, editingItem.id, data as NavigationItem));
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
    error,
    setError,
    parentId
  };
}