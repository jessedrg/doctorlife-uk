import type { Metadata } from "next";
import {
  ValoracionMedicaLanding,
  type ValoracionConfig,
} from "@/components/valoracion-medica-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/medical-assessment-6";

const config: ValoracionConfig = {
  path: PATH,
  planPrefix: "ads-valoracion-6",
  // Full version: reviews, injectable GLP-1 badge and active form buttons.
  hideReviews: false,
  showGlpBadge: true,
  glpBadgeText:
    "Injectable GLP-1 medical treatment, if the doctor considers it appropriate",
  hideCta: false,
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
