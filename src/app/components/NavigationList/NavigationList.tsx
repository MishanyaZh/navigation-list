'use client';

import {
  DndContext,
  pointerWithin,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NavigationItem, NavigationFormData } from '@/types/navigation';
import NavigationForm from '../NavigationForm/NavigationForm';
import NavigationListItems from './NavigationListItems';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

interface Props {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  onAddItem: () => void;
  showForm: boolean;
  editingItem: NavigationItem | null;
  onFormSubmit: (data: NavigationFormData) => void;
  onFormClose: () => void;
  parentId?: string | null;
}

export default function NavigationList({ items, onReorder, ...props }: Props) {
  const { getAllIds, handleDragEnd } = useDragAndDrop(onReorder);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 8,
      pressure: 0.3,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className="bg-background-default border border-border-primary rounded-md overflow-hidden w-full md:w-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={() => {
          if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
          }
        }}
        onDragEnd={(e: DragEndEvent) => {
          handleDragEnd(e, items);
          if (window.navigator.vibrate) {
            window.navigator.vibrate([50]);
          }
        }}
      >
        <SortableContext
          items={getAllIds(items)}
          strategy={verticalListSortingStrategy}
        >
          <NavigationListItems items={items} {...props} />
        </SortableContext>
      </DndContext>

      {props.showForm && !props.editingItem && !props.parentId && (
        <NavigationForm
          initialData={props.editingItem || undefined}
          onSubmit={props.onFormSubmit}
          onClose={props.onFormClose}
        />
      )}

      <div className="py-5 pl-6 bg-background-secondary rounded-b-md border-t border-border-primary">
        <button
          onClick={props.onAddItem}
          className="px-4 py-2 text-sm font-semibold text-text-secondary bg-background-default border border-border-primary rounded-md hover:bg-background-secondary shadow-custom"
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
