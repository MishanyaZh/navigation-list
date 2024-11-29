import { AddIcon } from "../Icons";

interface Props {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: Props) {
  return (
    <div className="text-center p-12 border rounded-lg bg-[#F9FAFB]">
      <h3 className="text-2xl font-bold mb-3">Menu jest puste</h3>
      <p className="text-gray-600 mb-6">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-1.5  px-6 py-3 bg-[#7F56D9] text-white rounded-lg hover:bg-[#6941C6] transition-colors"
      >
        <AddIcon width={20} />
        <span>Dodaj pozycję menu</span>
      </button>
    </div>
  );
}
