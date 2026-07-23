import type { Metadata } from "next";
import {
  ValoracionMedicaLanding,
  type ValoracionConfig,
} from "@/components/valoracion-medica-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/medical-assessment-5";

const config: ValoracionConfig = {
  path: PATH,
  planPrefix: "ads-valoracion-5",
  hideReviews: true,
  showGlpBadge: false,
  // Form buttons temporarily hidden; they will be added after approval.
  hideCta: true,
};

export const metadata: Metadata = {
  title: "Online medical assessment for weight management — DoctorLife",
  description:
    "Complete a health questionnaire and a GMC-registered doctor assesses your case in a video consultation. First assessment free, with continuous follow-up and no travel.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ValoracionMedicaLanding config={config} />;
}
