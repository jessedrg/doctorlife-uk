import { QuizProvider } from "@/components/quiz-context";
import { Announcement } from "@/components/announcement";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ImmersiveProduct } from "@/components/immersive-product";
import { ProductCarousel } from "@/components/product-carousel";
import { Transformation } from "@/components/transformation";
import { MobileFollowup } from "@/components/mobile-followup";
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
          <section
            className="grain overflow-hidden px-4 pb-12 pt-0 text-paper sm:px-6 sm:pb-16 lg:px-8"
            style={{ background: "#120c07" }}
          >
            <div className="mx-auto max-w-6xl">
              <ProductCarousel />
            </div>
          </section>
          <Transformation />
          <MobileFollowup />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
