
import React, { createContext, useState, useContext, useEffect } from 'react';
import { VideoPopup } from '@/components/ui/VideoPopup';

interface VideoPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const VideoPopupContext = createContext<VideoPopupContextType | undefined>(undefined);

export function VideoPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => {
    setIsOpen(false);
    setHasShownPopup(true);
    // Store in localStorage that the user has seen the popup
    localStorage.setItem('anpdp-video-popup-shown', 'true');
  };

  useEffect(() => {
    // Check if the popup has been shown before
    const hasShown = localStorage.getItem('anpdp-video-popup-shown');
    if (!hasShown && !hasShownPopup) {
      // If not, open the popup after a short delay
      const timer = setTimeout(() => {
        openPopup();
        setHasShownPopup(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

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
