'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { DragIcon } from '../IconComponents';
import NavigationForm from '../NavigationForm/NavigationForm';

interface Props {
  item: NavigationItem;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  child?: boolean;
  editingItem: NavigationItem | null;
  onFormSubmit: (data: NavigationFormData) => void;
  onFormClose: () => void;
}

export default function NavigationListItem({
  item,
  onEdit,
  onRemove,
  onAddSubItem,
  child,
  editingItem,
  onFormSubmit,
  onFormClose,
}: Props) {
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddSubItem = (parentId: string) => {
    setIsAddingSubItem(true);
    onAddSubItem(parentId);
  };

  const handleFormClose = () => {
    setIsAddingSubItem(false);
    onFormClose();
  };

  const handleFormSubmit = (data: NavigationFormData) => {
    onFormSubmit(data);
    onFormClose();
    setIsAddingSubItem(false);
  };

  return (
    <div ref={setNodeRef} style={style} className={`${child ? 'ml-16' : ''}`}>
      <div
        className={`flex items-center justify-between p-4 border border-border-primary ${
          child ? 'border-l rounded-md' : 'rounded-md'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-background-secondary rounded text-text-tertiary"
          >
            <DragIcon />
          </button>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {item.label}
            </p>
            {item.url && (
              <p className="text-sm font-normal text-text-tertiary mt-1">
                {item.url}
              </p>
            )}
          </div>
        </div>
        <div
          className="inline-flex rounded-md border border-border-primary shadow-custom"
          role="group"
        >
          <button
            onClick={() => onRemove(item.id)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border-r border-border-primary rounded-l-md hover:bg-background-secondary"
          >
            Usuń
          </button>
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border-r border-border-primary hover:bg-background-secondary"
          >
            Edytuj
          </button>
          <button
            onClick={() => handleAddSubItem(item.id)}
            className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default rounded-r-md hover:bg-background-secondary"
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {(editingItem?.id === item.id || isAddingSubItem) && (
        <NavigationForm
          initialData={editingItem?.id === item.id ? editingItem : undefined}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}

      {item.children && item.children.length > 0 && (
        <div className="">
          {item.children.map(childItem => (
            <NavigationListItem
              key={childItem.id}
              item={childItem}
              onEdit={onEdit}
              onRemove={onRemove}
              onAddSubItem={onAddSubItem}
              child={true}
              editingItem={editingItem}
              onFormSubmit={onFormSubmit}
              onFormClose={onFormClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}
