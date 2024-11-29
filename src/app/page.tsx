"use client";

import { useState } from "react";
import NavigationList from "@/components/NavigationList/NavigationList";
import EmptyState from "@/components/EmptyState/EmptyState";
import { NavigationItem } from "@/types/navigation";
import NavigationForm from "@/components/NavigationForm/NavigationForm";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const addItemToTree = (
    items: NavigationItem[],
    parentId: string,
    newItem: NavigationItem,
  ): NavigationItem[] => {
    return items.map((item) => {
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

  const removeItemFromTree = (
    items: NavigationItem[],
    id: string,
  ): NavigationItem[] => {
    return items.filter((item) => {
      if (item.id === id) return false;
      if (item.children) {
        item.children = removeItemFromTree(item.children, id);
      }
      return true;
    });
  };

  const updateItemInTree = (
    items: NavigationItem[],
    id: string,
    newData: NavigationItem,
  ): NavigationItem[] => {
    return items.map((item) => {
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

  const handleAdd = (data: NavigationItem) => {
    const newItem = { ...data, id: crypto.randomUUID() };

    if (parentId) {
      setItems((prevItems) => addItemToTree(prevItems, parentId, newItem));
    } else {
      setItems([...items, newItem]);
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

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        {showForm ? (
          <NavigationForm
            onSubmit={(data) => handleAdd(data as NavigationItem)}
            onClose={() => setShowForm(false)}
          />
        ) : (
          <EmptyState onAddClick={() => setShowForm(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 gap-8">
        <NavigationList
          items={items}
          onReorder={setItems}
          onEdit={setEditingItem}
          onRemove={handleRemove}
          onAddSubItem={handleAddSubItem}
          onAdd={() => setShowForm(true)}
          showForm={showForm}
          editingItem={editingItem}
          onFormSubmit={(data) => {
            if (editingItem) {
              setItems((prevItems) =>
                updateItemInTree(
                  prevItems,
                  editingItem.id,
                  data as NavigationItem,
                ),
              );
              setEditingItem(null);
            } else {
              handleAdd(data as NavigationItem);
            }
          }}
          onFormClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      </div>
    </div>
  );
}
