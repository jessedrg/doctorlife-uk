import { QuizProvider } from "@/components/quiz-context";
import { Announcement } from "@/components/announcement";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ImmersiveProduct } from "@/components/immersive-product";
import { Transformation } from "@/components/transformation";
import { WegovyPenCard } from "@/components/wegovy-pen-card";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip">
        <Announcement />
        <Navbar />
        <main>
          <Hero />
          <ImmersiveProduct />
          <section className="mx-auto max-w-[480px] px-4 py-16">
            <WegovyPenCard />
          </section>
          <Transformation />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
