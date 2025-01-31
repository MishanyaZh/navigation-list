import { NavigationFormData, NavigationItem } from '@/types/navigation';
import NavigationListItem from './NavigationListItem';

interface Props {
  items: NavigationItem[];
  onEdit: (item: NavigationItem) => void;
  onRemove: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
  showForm: boolean;
  editingItem: NavigationItem | null;
  onFormSubmit: (data: NavigationFormData) => void;
  onFormClose: () => void;
}

export default function NavigationListItems({ items, ...props }: Props) {
  return (
    <div className="w-full md:w-auto">
      {items.map(item => (
        <NavigationListItem key={item.id} item={item} {...props} />
      ))}
    </div>
  );
}
