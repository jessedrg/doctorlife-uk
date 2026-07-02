import { QuizProvider } from "@/components/quiz-context";
import { Announcement } from "@/components/announcement";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ImmersiveProduct } from "@/components/immersive-product";
import { ProductCarousel } from "@/components/product-carousel";
import { Transformation } from "@/components/transformation";
import { MobileFollowup } from "@/components/mobile-followup";
import { FinalCta } from "@/components/final-cta";
import { TrustpilotReviewsSection } from "@/components/trustpilot-reviews-section";
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
            className="grain overflow-hidden pb-12 pt-10 text-paper sm:pb-16 sm:pt-14"
            style={{
              background: "#120c07",
              margin: "0 clamp(12px, 1.5vw, 20px) 0",
              borderRadius: "0 0 44px 44px",
              padding: "clamp(24px, 4vw, 56px) clamp(16px, 3vw, 32px)",
            }}
          >
            <div className="mx-auto w-full max-w-[1500px]">
              <ProductCarousel />
            </div>
          </section>
          <Transformation />
          <TrustpilotReviewsSection />
          <MobileFollowup />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
