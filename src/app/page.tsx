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

  const handleAdd = (data: NavigationItem) => {
    const newItem = { ...data, id: crypto.randomUUID() };

    if (parentId) {
      setItems(
        items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem],
            };
          }
          return item;
        }),
      );
    } else {
      setItems([...items, newItem]);
    }

    setShowForm(false);
    setParentId(null);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
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
              setItems(
                items.map((item) =>
                  item.id === editingItem.id
                    ? { ...data, id: item.id, children: item.children }
                    : item,
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
