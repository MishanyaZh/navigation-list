'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { DragIcon } from '../IconComponents';
import NavigationForm from '../NavigationForm/NavigationForm';
import Link from 'next/link';

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

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
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
    <div
      ref={setNodeRef}
      style={style}
      className={`${
        child ? 'pl-[3%] md:pl-16' : ''
      } animate-fade-in touch-manipulation select-none`}
    >
      <div
        className={`w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 justify-between p-4 glass-card ${
          child ? 'border-l border-border-primary rounded-md' : 'rounded-md'
        } transform transition-all duration-300 hover:shadow-hover hover:-translate-y-1`}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1 w-full">
          <button
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-background-secondary rounded text-text-tertiary"
          >
            <DragIcon />
          </button>
          <div className="min-w-0 flex-1 w-full">
            <p className="text-sm font-semibold text-text-primary truncate">
              {item.label}
            </p>
            {item.url && (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-text-tertiary hover:text-blue-600 mt-1 truncate block w-full"
              >
                {item.url}
              </Link>
            )}
          </div>
        </div>
        <div
          className="flex-shrink-0 inline-flex rounded-md border border-border-primary shadow-custom"
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
        <div className="animate-slide-up">
          <NavigationForm
            initialData={editingItem?.id === item.id ? editingItem : undefined}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        </div>
      )}

      {item.children && item.children.length > 0 && (
        <div className="overflow-x-auto">
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
