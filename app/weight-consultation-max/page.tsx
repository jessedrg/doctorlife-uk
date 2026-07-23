import type { Metadata } from "next";
import { WeightLossLanding } from "@/components/weight-loss-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/consulta-peso-max";

export const metadata: Metadata = {
  title: "Lose weight with GLP-1 and medical follow-up | DoctorLife",
  description:
    "Weight management programme with GLP-1 supervised by GMC-registered endocrinologists, 100% online. Start your assessment today. Free first visit.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <WeightLossLanding
      config={{
        path: PATH,
        planPrefix: "ads-peso-max",
        eyebrow: "Lose weight with GLP-1 · Medical supervision",
        headline: (
          <>
            Lose weight with{" "}
            <span className="font-serif italic text-sage">GLP-1</span> and{" "}
            <span className="font-serif italic text-sage">medical follow-up</span>
          </>
        ),
        subtitle:
          "Weight management programme with GLP-1 supervised by GMC-registered endocrinologists. Start your assessment today.",
        photos: 3,
      }}
    />
  );
}
