"use client";

import { useState } from "react";
import NavigationList from "@/components/NavigationList/NavigationList";
import NavigationForm from "@/components/NavigationForm/NavigationForm";
import { NavigationItem } from "@/types/navigation";

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

  const handleAdd = (data: NavigationItem) => {
    setItems([...items, { ...data, id: crypto.randomUUID() }]);
  };

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Navigation Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Navigation List</h2>
          <NavigationList
            items={items}
            onReorder={setItems}
            onEdit={handleEdit}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Navigation" : "Add Navigation"}
          </h2>
          <NavigationForm
            initialData={editingItem || undefined}
            onSubmit={(data) => {
              if (editingItem) {
                setItems(
                  items.map((item) =>
                    item.id === editingItem.id
                      ? {
                          ...data,
                          id: item.id,
                          children: data.children as NavigationItem[],
                        }
                      : item,
                  ),
                );
                setEditingItem(null);
              } else {
                handleAdd(data as NavigationItem);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
