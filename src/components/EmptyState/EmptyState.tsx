interface Props {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: Props) {
  return (
    <div className="text-center p-8 border-2 border-dashed rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Menu jest puste</h3>
      <p className="text-gray-500 mb-4">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 bg-[#7F56D9] text-white rounded-md hover:bg-opacity-90"
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
}
