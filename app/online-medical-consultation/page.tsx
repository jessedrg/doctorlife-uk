import type { Metadata } from "next";
import { ClinicLanding, type ClinicConfig } from "@/components/clinic-landing";
import { SITE_URL } from "@/lib/articles";

const PATH = "/consulta-medica-online";

const config: ClinicConfig = {
  path: PATH,
  planPrefix: "ads-clinica",
};

export const metadata: Metadata = {
  title: "Your online doctor | Online doctor consultation with GMC-registered doctors — DoctorLife",
  description:
    "Online doctor consultation with GMC-registered doctors in the UK, with no waits or appointments. Complete a questionnaire and receive a personalised clinical assessment.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ClinicLanding config={config} />;
}
