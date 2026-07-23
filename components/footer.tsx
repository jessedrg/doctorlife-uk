import { QuizTrigger } from "./quiz-trigger";
import { BrandLogo } from "./brand-logo";
import { FooterColumns } from "./footer-columns";
import { TrustBox } from "./trustbox";

const paymentMethods = [
  { label: "Visa", src: "/payments/visa.svg" },
  { label: "Mastercard", src: "/payments/mastercard.svg" },
  { label: "PayPal", src: "/payments/paypal.svg" },
  { label: "Apple Pay", src: "/payments/apple-pay.svg" },
  { label: "Google Pay", src: "/payments/google-pay.svg" },
];

export function Footer() {
  return (
    <footer className="px-3 pb-6 pt-[60px] sm:px-4 lg:px-5">
      <div className="mx-auto max-w-none overflow-hidden rounded-[32px] bg-ink text-paper">
        <div className="grid grid-cols-1 gap-x-10 px-8 pb-10 pt-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:gap-10 md:pb-12 md:px-14">
          {/* marca + CTA */}
          <div className="mb-2 md:col-span-1 md:mb-0">
            <a
              href="/#top"
              aria-label="DoctorLife — home"
              className="inline-flex no-underline"
            >
              <BrandLogo boxed markSize={28} textSize={23} textClassName="text-paper" />
            </a>
            <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed text-paper/65">
              Platform connecting patients with independent registered doctors for weight management with GLP‑1 treatment.
            </p>
            <QuizTrigger className="mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-[12px] text-[15px] font-semibold text-ink">
              First consultation free
              <span className="text-[13px]">↗</span>
            </QuizTrigger>
            <TrustBox theme="dark" alignment="left" className="mt-6 max-w-[260px]" />
          </div>

          <FooterColumns />
        </div>

        <div className="flex flex-col gap-5 border-t border-paper/10 px-8 py-7 md:flex-row md:items-center md:justify-between md:px-14">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[.14em] text-sage">Secure payment</span>
            <ul className="flex flex-wrap items-center gap-2.5" aria-label="Accepted payment methods">
              {paymentMethods.map((p) => (
                <li
                  key={p.label}
                  className="flex h-9 w-[58px] items-center justify-center rounded-lg bg-paper px-2.5 shadow-sm"
                >
                  <img
                    src={p.src || "/placeholder.svg"}
                    alt={p.label}
                    className="max-h-[18px] w-auto"
                    width={40}
                    height={18}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1 text-[12.5px] text-paper/45 md:items-end">
            <span>© 2026 DoctorLife · doctorlife.co.uk</span>
            <span>Treatment subject to medical assessment.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
