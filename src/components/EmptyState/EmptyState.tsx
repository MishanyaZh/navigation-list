import { AddIcon } from "../Icons";

interface Props {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: Props) {
  return (
    <div className="text-center p-12 border border-border-secondary rounded-lg bg-background-secondary">
      <h3 className="text-base font-semibold text-text-primary mb-3">
        Menu jest puste
      </h3>
      <p className="text-sm font-normal text-text-tertiary mb-6">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-1.5 px-6 py-3 bg-button-primary-bg text-button-primary-fg rounded-lg hover:bg-button-primary-hover transition-colors text-base font-semibold shadow-custom"
      >
        <AddIcon width={20} />
        <span>Dodaj pozycję menu</span>
      </button>
    </div>
  );
}
