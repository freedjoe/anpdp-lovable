
import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Statistics />
      <Activities />
      <Events />
    </div>
  );
};

export default Index;
