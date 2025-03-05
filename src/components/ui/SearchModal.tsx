
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const SearchModal = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = (key: string) => getTranslation(language, key);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    document.body.style.overflow = '';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
    // For demo purposes, close after search
    setTimeout(handleClose, 500);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        !isOpen ? handleOpen() : handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="rounded-full p-2 transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={handleOpen}
        aria-label={t('actions.search')}
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm transition-all">
          <div
            ref={modalRef}
            className="mt-28 max-h-full w-full max-w-xl animate-scale-in rounded-xl border bg-card p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{t('actions.search')}</h2>
              <button
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mt-4">
              <div className="flex items-center rounded-lg border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full border-0 bg-transparent px-2 py-1 text-foreground placeholder-muted-foreground focus:outline-none"
                  placeholder={`${t('actions.search')}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <div className="mt-4 text-sm text-muted-foreground">
              {!searchTerm && "Type to start searching..."}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
