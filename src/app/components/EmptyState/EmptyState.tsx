import { AddIcon } from '../IconComponents';

interface Props {
  handleAddItem: () => void;
}

export default function EmptyState({ handleAddItem }: Props) {
  return (
    <div className="text-center p-12 border border-border-primary rounded-lg bg-background-secondary w-full md:w-auto">
      <h3 className="text-base font-semibold text-text-primary mb-3">
        Stwórz własną nawigację
      </h3>
      <p className="text-sm font-normal text-text-tertiary mb-4">
        Zarządzaj strukturą swojego menu w prosty i intuicyjny sposób.
      </p>
      <div className="mb-6 text-sm text-text-tertiary">
        <p className="mb-2">Możliwości:</p>
        <ul className="list-disc text-left max-w-md mx-auto">
          <li>Tworzenie hierarchicznej struktury menu</li>
          <li>Łatwe przeciąganie i upuszczanie elementów</li>
          <li>Dodawanie nazw i linków do każdej pozycji</li>
          <li>Tworzenie podmenu dla lepszej organizacji</li>
          <li>Edycja i usuwanie pozycji w dowolnym momencie</li>
        </ul>
      </div>
      <button
        onClick={handleAddItem}
        className="inline-flex items-center gap-1.5 px-6 py-3 bg-button-primary-bg text-button-primary-fg rounded-lg hover:bg-button-primary-hover transition-colors text-base font-semibold shadow-custom"
      >
        <AddIcon width={20} />
        <span>Dodaj pozycję menu</span>
      </button>
    </div>
  );
}
