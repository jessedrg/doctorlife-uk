"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const result = await subscribeNewsletter(email, "guia");
    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <section id="cta" className="mx-auto max-w-none px-3 pt-10 sm:px-4 lg:px-5">
      <Reveal className="relative grid min-h-[460px] grid-cols-1 overflow-hidden rounded-[40px] text-paper md:grid-cols-2">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#3a4029 0%,#2a2114 60%,#171009 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 80% at 95% 60%,rgba(227,181,130,.4),transparent 55%)" }} />

        <div className="relative z-[2] p-[54px]">
          <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] font-light leading-[1.04] tracking-[-.02em]">
            Start with a plan
            <br />
            built around <span className="font-serif italic text-sage">you</span>
          </h2>
          <p className="mb-[26px] mt-4 max-w-[36ch] text-base font-light leading-[1.5] text-paper/[.78]">
            Get your free "Balance your hormones" guide, written by GMC-registered
            doctors to support you on your journey.
          </p>

          {status === "success" ? (
            <div className="flex max-w-[380px] items-center gap-3 rounded-[14px] border border-sage/40 bg-sage/10 px-5 py-4 text-[15px] text-sage">
              Guide sent. Check your email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-[380px] flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="rounded-[14px] border border-paper/[.28] px-[18px] py-4 text-[15px] text-paper outline-none placeholder:text-paper/50"
                style={{ background: "rgba(246,240,230,.1)" }}
              />
              {status === "error" && (
                <p className="text-[12px] text-red-400">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-[14px] bg-paper py-4 text-base font-semibold text-ink transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Get the guide"}
              </button>
            </form>
          )}

          <p className="mt-4 max-w-[40ch] text-[11.5px] text-paper/50">
            By entering your email you accept our Terms & Conditions and
            acknowledge the Privacy Policy.
          </p>
        </div>

        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0" style={{ background: "linear-gradient(200deg,#c98a4f 0%,#7a4a2b 50%,#2a2114 100%)" }} />
          <img
            src="/testimonials/maria.png"
            alt="Smiling DoctorLife patient"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#171009 0%,transparent 28%)" }} />
          <div className="grain absolute inset-0" />
        </div>
      </Reveal>
    </section>
  );
}
