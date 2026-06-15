import { QuizProvider } from "@/components/quiz-context";
import { Announcement } from "@/components/announcement";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ImmersiveProduct } from "@/components/immersive-product";
import { Transformation } from "@/components/transformation";
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
          <Transformation />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
