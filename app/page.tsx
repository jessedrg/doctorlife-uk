import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "DoctorLife — Tu cuerpo, por fin entendido",
  description:
    "Cuidado del peso y hormonal dirigido por médicos colegiados en España, con seguimiento real desde la app. Sin listas de espera y sin permanencia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DoctorLife — Tu cuerpo, por fin entendido",
    description:
      "Cuidado del peso y hormonal dirigido por médicos colegiados en España, con seguimiento real desde la app.",
    url: "/",
    type: "website",
    locale: "es_ES",
    siteName: "DoctorLife",
  },
};

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
          <MobileFollowup />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
