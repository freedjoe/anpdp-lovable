
import React, { createContext, useState, useContext, useEffect } from 'react';
import { VideoPopup } from '@/components/ui/VideoPopup';
import { useLocation } from 'react-router-dom';

interface VideoPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const VideoPopupContext = createContext<VideoPopupContextType | undefined>(undefined);

export function VideoPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    // Open popup automatically on home page
    if (location.pathname === '/') {
      // Open popup after a short delay to let the page render first
      const timer = setTimeout(() => {
        openPopup();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <VideoPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
      <VideoPopup isOpen={isOpen} onClose={closePopup} />
    </VideoPopupContext.Provider>
  );
}

export function useVideoPopup() {
  const context = useContext(VideoPopupContext);
  if (context === undefined) {
    throw new Error('useVideoPopup must be used within a VideoPopupProvider');
  }
  return context;
}
