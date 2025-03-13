
import React, { createContext, useState, useContext } from 'react';
import { VideoPopup } from '@/components/ui/VideoPopup';

interface VideoPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const VideoPopupContext = createContext<VideoPopupContextType | undefined>(undefined);

export function VideoPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

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
