import type { Metadata } from "next";
import { WeightLossLanding } from "@/components/weight-loss-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/consulta-peso-glp1";

export const metadata: Metadata = {
  title: "GLP-1 treatment with online medical supervision | DoctorLife",
  description:
    "GLP-1 treatment with GMC-registered endocrinologists, 100% online, if clinically indicated. Personalised plan and follow-up. Free first visit.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <WeightLossLanding
      config={{
        path: PATH,
        planPrefix: "ads-peso-glp1",
        eyebrow: "GMC-registered endocrinologists · 100% online",
        headline: (
          <>
            <span className="font-serif italic text-sage">GLP-1</span> treatment with{" "}
            <span className="font-serif italic text-sage">medical supervision</span>
            , from home
          </>
        ),
        subtitle:
          "Treatment with GLP-1, if the endocrinologist considers it appropriate for your case.",
        photos: 0,
      }}
    />
  );
}
