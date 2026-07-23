import type { Metadata } from "next";
import { WeightLossLanding } from "@/components/weight-loss-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/consulta-peso-suave-fotos";

export const metadata: Metadata = {
  title: "Online doctor consultation for weight management | DoctorLife",
  description:
    "Assessment with GMC-registered doctors for weight management, 100% online. Personalised plan and follow-up. Free first visit, no lock-in.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <WeightLossLanding
      config={{
        path: PATH,
        planPrefix: "ads-peso-suave-fotos",
        eyebrow: "GMC-registered doctors · 100% online",
        headline: (
          <>
            Online doctor consultation for{" "}
            <span className="font-serif italic text-sage">weight management</span>
          </>
        ),
        subtitle:
          "Assessment with a registered endocrinologist and a personalised plan, from home.",
        photos: 3,
      }}
    />
  );
}
