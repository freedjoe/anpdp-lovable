
import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Statistics } from "@/components/sections/Statistics";
import { useVideoPopup } from "@/context/VideoPopupContext";
import { useEffect } from "react";

const Index = () => {
  const { openPopup } = useVideoPopup();
  
  // Open popup on component mount (first time only)
  useEffect(() => {
    // Using sessionStorage to only show the popup once per session
    if (!sessionStorage.getItem('videoShown')) {
      const timer = setTimeout(() => {
        openPopup();
        sessionStorage.setItem('videoShown', 'true');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [openPopup]);

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Mission />
      <Statistics />
      <Activities />
      <Events />
    </div>
  );
};

export default Index;
