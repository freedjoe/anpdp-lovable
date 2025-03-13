
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPopup({ isOpen, onClose }: VideoPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video when popup is closed
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  // Add event listener for video end
  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handleVideoEnd = () => {
      console.log("Video playback ended, closing popup");
      onClose();
    };
    
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="sm:max-w-[720px] p-0 bg-transparent border-none">
        {/* Add DialogTitle for accessibility but hide it visually */}
        <DialogTitle className="sr-only">Spot de Sensibilisation</DialogTitle>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            src="https://anpdp.dz/wp-content/uploads/2024/11/ANPDP-2-1.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
