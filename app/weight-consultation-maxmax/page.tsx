import type { Metadata } from "next";
import { WeightLossLanding } from "@/components/weight-loss-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/consulta-peso-maxmax";

export const metadata: Metadata = {
  title: "Lose weight with medical treatment and a painless injection | DoctorLife",
  description:
    "Weight management programme with a painless injection, supervised by GMC-registered endocrinologists 100% online. Real results. Free first visit.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <WeightLossLanding
      config={{
        path: PATH,
        planPrefix: "ads-peso-maxmax",
        eyebrow: "Painless injection · Medical supervision",
        headline: (
          <>
            Lose weight for real with a{" "}
            <span className="font-serif italic text-sage">painless injection</span>{" "}
            and medical follow-up
          </>
        ),
        subtitle:
          "Weight management programme with a weekly painless injection, supervised by GMC-registered endocrinologists. Visible results with continuous medical support.",
        photos: 3,
      }}
    />
  );
}
