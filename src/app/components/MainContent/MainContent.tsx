"use client";

import NavigationList from "@/components/NavigationList/NavigationList";
import EmptyState from "@/components/EmptyState/EmptyState";
import NavigationForm from "@/components/NavigationForm/NavigationForm";
import { useNavigationState } from "@/hooks/useNavigationState";

export default function MainContent() {
  const {
    items,
    editingItem,
    showForm,
    setShowForm,
    setItems,
    setEditingItem,
    handleRemove,
    handleAddSubItem,
    handleFormSubmit,
    handleFormClose,
  } = useNavigationState();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        {showForm ? (
          <NavigationForm
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        ) : (
          <EmptyState handleAddItem={() => setShowForm(true)} />
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
          onAddItem={() => setShowForm(true)}
          showForm={showForm}
          editingItem={editingItem}
          onFormSubmit={handleFormSubmit}
          onFormClose={handleFormClose}
        />
      </div>
    </div>
  );
}