import type { FC } from "react";
import { Hero } from "../shared/components/Hero";
import { Jobs } from "../features/jobs";
import { Newsletter } from "../features/newsletter";
import { Testimonials } from "../features/testimonials";

export const Home: FC = () => {
  return (
    <div>
      <Hero />
      <main
        id="vagas"
        className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <Jobs />
      </main>
      <Newsletter />
      <Testimonials />
    </div>
  );
};
