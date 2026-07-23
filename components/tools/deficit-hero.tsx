"use client";

import { useState } from "react";
import { QuizTrigger } from "@/components/quiz-trigger";

// ── Mifflin-St Jeor BMR ──────────────────────────────────────────────
function calcBMR(
  sex: "male" | "female",
  weightKg: number,
  heightCm: number,
  age: number,
  bodyFatPct?: number
): number {
  if (bodyFatPct && bodyFatPct > 0) {
    const lbm = weightKg * (1 - bodyFatPct / 100);
    return 370 + 21.6 * lbm;
  }
  if (sex === "male") return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

const ACTIVITY = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Light (1-3 days/week)", value: 1.375 },
  { label: "Moderate (3-5 days/week)", value: 1.55 },
  { label: "Active (6-7 days/week)", value: 1.725 },
  { label: "Very active (physical work + exercise)", value: 1.9 },
];

const RATES = [
  { label: "0.25 kg/week (~275 kcal/day)", deficit: 275 },
  { label: "0.5 kg/week (~550 kcal/day)", deficit: 550 },
  { label: "0.75 kg/week (~825 kcal/day)", deficit: 825 },
  { label: "1 kg/week (~1,100 kcal/day)", deficit: 1100 },
];

interface Field {
  label: string;
  placeholder: string;
  key: "age" | "weightKg" | "heightCm" | "goalWeightKg" | "bodyFat";
  half?: boolean;
}

export function DeficitHero() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [goalWeightKg, setGoalWeightKg] = useState("");
  const [goalWeightLb, setGoalWeightLb] = useState("");
  const [activity, setActivity] = useState(1.55);
  const [rateDeficit, setRateDeficit] = useState(550);
  const [bodyFat, setBodyFat] = useState("");
  const [result, setResult] = useState<{
    tdee: number;
    deficit1: number;
    deficit2: number;
    weeks: number | null;
    goalKg: number | null;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  function toKg(val: string) {
    return unit === "metric" ? parseFloat(val) : parseFloat(val) * 0.453592;
  }
  function toCm() {
    if (unit === "metric") return parseFloat(heightCm);
    return parseFloat(heightFt) * 30.48 + parseFloat(heightIn || "0") * 2.54;
  }

  function calculate() {
    const w = toKg(unit === "metric" ? weightKg : weightLb);
    const h = toCm();
    const a = parseFloat(age);
    const bf = bodyFat ? parseFloat(bodyFat) : undefined;
    const gw = unit === "metric"
      ? goalWeightKg ? parseFloat(goalWeightKg) : null
      : goalWeightLb ? parseFloat(goalWeightLb) * 0.453592 : null;

    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) return;

    const bmr = calcBMR(sex, w, h, a, bf);
    const tdee = Math.round(bmr * activity);
    const deficit1 = Math.max(1200, tdee - rateDeficit);
    const deficit2 = Math.max(1200, tdee - rateDeficit * 2);

    let weeks: number | null = null;
    if (gw && gw > 0 && gw < w) {
      const kgToLose = w - gw;
      const weeklyKg = rateDeficit / 7700;
      weeks = Math.round(kgToLose / weeklyKg);
    }

    setResult({ tdee, deficit1, deficit2, weeks, goalKg: gw });
    setCalculated(true);
  }

  const displayGoal =
    result?.goalKg != null
      ? unit === "metric"
        ? `${result.goalKg.toFixed(1)} kg`
        : `${(result.goalKg / 0.453592).toFixed(1)} lb`
      : "__ kg";

  return (
    <section className="bg-paper">
      {/* unit toggle */}
      <div className="flex justify-end px-6 pt-6 md:px-14">
        <div className="flex rounded-full border border-ink/15 bg-paper p-0.5 text-[13px]">
          {(["metric", "imperial"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                unit === u
                  ? "bg-espresso text-paper"
                  : "text-ink/50 hover:text-ink"
              }`}
            >
              {u === "metric" ? "Metric" : "Imperial"}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 md:grid-cols-2 md:px-14 md:py-14">
        {/* ── LEFT: form ── */}
        <div>
          <h1 className="font-display text-[2.4rem] font-bold leading-tight text-ink text-balance">
            Calorie deficit calculator
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
            Work out how many calories you need to eat each day to reach your target weight. Get a personalised calorie deficit estimate based on your details and desired rate of loss.
          </p>

          {/* sex toggle */}
          <div className="mt-7">
            <label className="mb-2 block text-sm font-medium text-ink/70">Biological sex</label>
            <div className="flex rounded-2xl border border-ink/12 bg-white p-1 text-[14px] font-medium">
              {(["male", "female"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSex(s)}
                  className={`flex-1 rounded-xl py-2.5 transition-colors ${
                    sex === s
                      ? "bg-espresso text-paper shadow-sm"
                      : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {s === "male" ? "Male" : "Female"}
                </button>
              ))}
            </div>
          </div>

          {/* age + weight */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Age</label>
              <input
                type="number"
                min="10" max="100"
                placeholder="Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">
                Weight {unit === "metric" ? "(kg)" : "(lb)"}
              </label>
              <input
                type="number"
                placeholder={unit === "metric" ? "kg" : "lb"}
                value={unit === "metric" ? weightKg : weightLb}
                onChange={(e) =>
                  unit === "metric" ? setWeightKg(e.target.value) : setWeightLb(e.target.value)
                }
                className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
              />
            </div>
          </div>

          {/* height */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">
              Height {unit === "metric" ? "(cm)" : "(ft / in)"}
            </label>
            {unit === "metric" ? (
              <input
                type="number"
                placeholder="cm"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="feet"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                />
                <input
                  type="number"
                  placeholder="inches"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                />
              </div>
            )}
          </div>

          {/* activity */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Activity level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              {ACTIVITY.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>

          {/* goal weight */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">
              Target weight {unit === "metric" ? "(kg)" : "(lb)"}
            </label>
            <input
              type="number"
              placeholder={unit === "metric" ? "kg" : "lb"}
              value={unit === "metric" ? goalWeightKg : goalWeightLb}
              onChange={(e) =>
                unit === "metric" ? setGoalWeightKg(e.target.value) : setGoalWeightLb(e.target.value)
              }
              className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
            />
          </div>

          {/* weight loss rate */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Rate of weight loss</label>
            <select
              value={rateDeficit}
              onChange={(e) => setRateDeficit(parseInt(e.target.value))}
              className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              {RATES.map((r) => (
                <option key={r.deficit} value={r.deficit}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* body fat (optional) */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">
              Body fat % <span className="font-normal text-ink/40">(optional)</span>
            </label>
            <input
              type="number"
              placeholder="Percentage"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
            />
          </div>

          {/* calculate button */}
          <button
            onClick={calculate}
            className="mt-6 w-full rounded-full bg-amber py-3.5 text-[15px] font-semibold text-espresso transition-opacity hover:opacity-90 active:scale-[.98]"
          >
            Calculate
          </button>
        </div>

        {/* ── RIGHT: results ── */}
        <div className="flex flex-col gap-4">
          {/* maintenance */}
          <div className="rounded-3xl bg-espresso px-7 py-6 text-paper">
            <p className="text-xs font-medium uppercase tracking-[.12em] text-amber">Your result</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="text-[1.35rem] font-semibold leading-snug">
                To maintain your current weight
              </p>
              <p className="shrink-0 text-right">
                <span className="block font-display text-[2.4rem] font-bold text-amber leading-none">
                  {calculated && result ? result.tdee.toLocaleString("en-GB") : "—"}
                </span>
                <span className="text-sm text-paper/60">kcal/day</span>
              </p>
            </div>
          </div>

          {/* deficit cards */}
          <div className="rounded-3xl bg-amber px-7 py-6">
            <div className="grid grid-cols-2 gap-y-5 border-b border-espresso/15 pb-5">
              <div>
                <p className="text-[13px] font-medium text-espresso/70">To lose</p>
                <p className="mt-0.5 font-display text-[1.2rem] font-bold text-espresso">
                  {RATES.find((r) => r.deficit === rateDeficit)?.label.split(" ")[0] ?? "0.5 kg"}/week
                </p>
              </div>
              <div className="text-right">
                <span className="font-display text-[2.2rem] font-bold text-espresso leading-none">
                  {calculated && result ? result.deficit1.toLocaleString("en-GB") : "—"}
                </span>
                <span className="ml-1 text-sm text-espresso/60">kcal/day</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-5 pt-5">
              <div>
                <p className="text-[13px] font-medium text-espresso/70">To lose</p>
                <p className="mt-0.5 font-display text-[1.2rem] font-bold text-espresso">
                  {RATES.find((r) => r.deficit === rateDeficit * 2) ? "" : "double rate"} ×2/week
                </p>
              </div>
              <div className="text-right">
                <span className="font-display text-[2.2rem] font-bold text-espresso leading-none">
                  {calculated && result ? result.deficit2.toLocaleString("en-GB") : "—"}
                </span>
                <span className="ml-1 text-sm text-espresso/60">kcal/day</span>
              </div>
            </div>
          </div>

          {/* timeline */}
          <div className="rounded-3xl border border-ink/10 bg-white px-7 py-6">
            <p className="text-xs font-medium uppercase tracking-[.12em] text-ink/40">Your goal</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="text-[1.15rem] font-semibold leading-snug text-ink">
                Reach {displayGoal}
              </p>
              <p className="shrink-0 text-right">
                <span className="block font-display text-[2.4rem] font-bold text-espresso leading-none">
                  {calculated && result?.weeks != null ? result.weeks : "—"}
                </span>
                <span className="text-sm text-ink/50">weeks</span>
              </p>
            </div>
            {!calculated && (
              <p className="mt-2 text-[13px] text-ink/40">
                Enter your target weight to see the estimated time.
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-espresso/5 px-7 py-5">
            <p className="text-[14px] text-ink/70 leading-relaxed">
              Want a doctor-supervised weight loss plan? Start with a free assessment.
            </p>
            <QuizTrigger className="mt-4 inline-flex rounded-full bg-espresso px-6 py-2.5 text-[14px] font-semibold text-paper hover:opacity-90 transition-opacity">
              Start free assessment
            </QuizTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
