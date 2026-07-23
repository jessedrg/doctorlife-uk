/* ───────────────────────────────────────────────────────────
   Editorial cluster "Losing weight with medical supervision".
   Content as data: a single ArticleLayout renders
   any article from these typed objects.
   Edit the copy here and the entire site (routes, sitemap, JSON-LD,
   internal linking) updates automatically.
   ─────────────────────────────────────────────────────────── */

export const SITE_URL = "https://doctorlife.io";
export const BRAND = "DoctorLife";

/* ── Typed content blocks ── */
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string }
  | { type: "quote"; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };

export type Section = { h2: string; blocks: Block[] };
export type Faq = { question: string; answer: string };
export type Source = { label: string; org: string; href: string };

/* ── Medical authorship (E‑E‑A‑T for YMYL content) ── */
export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  image?: string;
  colegiado?: string; // medical registration number + medical college, if published
  shortBio: string;
  bio: string[];
  experience: string[];
};

export const authors: Author[] = [
  {
    slug: "laura-mendez",
    name: "Dr. Laura Méndez",
    jobTitle: "Medical specialist in Endocrinology and Nutrition",
    colegiado: "GMC No. 7284191 · General Medical Council (UK)",
    shortBio:
      "Endocrinologist with over 12 years of experience in obesity and GLP‑1 analogue treatment.",
    bio: [
      "Dr. Laura Méndez is a medical specialist in Endocrinology and Nutrition, registered with the General Medical Council (GMC No. 7284191). She has spent over twelve years supporting patients with overweight, obesity, and metabolic disorders, both in hospital clinics and telemedicine.",
      "Her approach is based on a simple idea: losing weight is not a matter of willpower, but of physiology. That's why she dedicates each assessment to understanding the person's real context — hormones, sleep, medications, diet history — before proposing a plan.",
      "At DoctorLife, she reviews and signs off on clinical content to ensure it is rigorous, up-to-date, and useful for those seeking honest answers about their weight.",
    ],
    experience: [
      "Specialist in Endocrinology and Nutrition, on the GMC Specialist Register.",
      "+12 years treating obesity and metabolic disease.",
      "Clinical experience with GLP‑1 analogues (semaglutide, tirzepatide).",
      "Continuous training in obesity medicine and weight management.",
    ],
  },
  {
    slug: "carlos-vidal",
    name: "Dr. Carlos Vidal",
    jobTitle: "Medical specialist in Internal Medicine",
    colegiado: "GMC No. 7315608 · General Medical Council (UK)",
    shortBio:
      "Internist focused on metabolic health, cardiovascular risk and a holistic approach to weight.",
    bio: [
      "Dr. Carlos Vidal is a medical specialist in Internal Medicine, registered with the General Medical Council (GMC No. 7315608). His work focuses on metabolic health: the relationship between weight, glucose, blood pressure and cardiovascular risk.",
      "He believes in explaining things clearly. When a patient understands why their body behaves the way it does, decisions about treatment, diet and habits stop being a struggle and start to make sense.",
      "He writes and reviews content for DoctorLife with the aim of helping anyone make informed decisions about their health without feeling judged.",
    ],
    experience: [
      "Specialist in Internal Medicine, on the GMC Specialist Register.",
      "Focus on metabolic syndrome and cardiovascular risk.",
      "Experience in obesity units and follow-up clinics.",
      "Rigorous, patient-focused medical communication.",
    ],
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

/* ── Article model ── */
export type Article = {
  slug: string;
  title: string; // short title (breadcrumb, cards)
  h1: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  answerFirst: string; // direct answer 40-60 words
  keyTakeaways: string[];
  body: Section[];
  faq: Faq[];
  sources: Source[];
  authorSlug: string;
  reviewerSlug: string;
  datePublished: string; // ISO
  dateModified: string; // ISO
  relatedSlugs: string[];
  cover: string;
  coverAlt: string;
  readMins: number;
};

/* Reusable official sources */
const S = {
  who: {
    label: "Obesity and overweight (fact sheet)",
    org: "WHO",
    href: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
  },
  mhra: {
    label: "Medicines information and safety updates",
    org: "MHRA",
    href: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency",
  },
  nhs: {
    label: "Obesity: overview, causes and treatment",
    org: "NHS",
    href: "https://www.nhs.uk/conditions/obesity/",
  },
  nice: {
    label: "Obesity: identification, assessment and management",
    org: "NICE",
    href: "https://www.nice.org.uk/guidance/cg189",
  },
  easo: {
    label: "European guidelines and resources on obesity",
    org: "EASO",
    href: "https://easo.org/",
  },
  nejm: {
    label: "Triple Hormone-Receptor Agonist Retatrutide for Obesity (phase 2 trial)",
    org: "The New England Journal of Medicine",
    href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2301972",
  },
  lilly: {
    label: "Retatrutide: research and clinical development",
    org: "Eli Lilly and Company",
    href: "https://www.lilly.com/news/research-and-development",
  },
  ema: {
    label: "Search for medicines authorised in the European Union",
    org: "European Medicines Agency (EMA)",
    href: "https://www.ema.europa.eu/en/medicines",
  },
} satisfies Record<string, Source>;

export const PILLAR = {
  slug: "losing-weight-with-medical-supervision",
  title: "Losing weight with medical supervision",
  h1: "Losing weight with medical supervision: the honest guide to real weight loss",
  metaTitle: "Losing Weight with Medical Supervision: Complete Guide 2026 | DoctorLife",
  metaDescription:
    "Why losing weight is physiology, not willpower. Medical guide on real causes, GLP‑1 treatments, habits, and how to lose weight without regaining it. Free assessment.",
  answerFirst:
    "Losing weight with medical supervision means treating weight for what it is: a health problem with physiological causes. A doctor identifies what's stopping your weight loss (hormones, medications, sleep, previous diets), rules out diseases, and if appropriate, prescribes and supervises a safe treatment. This way you lose weight sustainably without regaining it.",
  keyTakeaways: [
    "Weight depends on your physiology (hormones, genetics, sleep, medications), not just willpower.",
    "Restrictive diets on your own fail in most cases due to the rebound effect.",
    "A medical assessment rules out treatable causes and personalizes the plan.",
    "GLP‑1 analogues (semaglutide, tirzepatide) are effective, but require prescription and follow-up.",
    "Losing weight slowly with support is what prevents regaining it.",
  ],
} as const;

/* ── The 8 long-tail articles of the cluster ── */
export const articles: Article[] = [
  {
    slug: "why-cant-i-lose-weight",
    title: "Why can't I lose weight",
    h1: "Why can't I lose weight (even though I try everything)",
    metaTitle: "Why Can't I Lose Weight: 7 Real Causes and What to Do | DoctorLife",
    metaDescription:
      "If you try everything and don't lose weight, the problem isn't your willpower. Real medical causes (hormones, medications, sleep, diets) and how to resolve them with a doctor.",
    category: "Causes",
    answerFirst:
      "If you can't lose weight despite your efforts, it's almost never due to lack of willpower. There are usually physiological causes: insulin resistance, hypothyroidism, sleep deprivation, chronic stress, certain medications, or a metabolism adapted after years of dieting. Identifying the real cause with a doctor is what unlocks weight loss.",
    keyTakeaways: [
      "Not losing weight despite effort usually has a specific physiological cause, not a willpower failure.",
      "Hypothyroidism, insulin resistance, and PCOS slow down weight loss.",
      "Little sleep and chronic stress raise cortisol and promote fat accumulation.",
      "Some common medications (antidepressants, corticosteroids) cause weight gain.",
      "A blood test and medical assessment identify what's holding you back.",
    ],
    body: [
      {
        h2: "It's not your willpower: it's your physiology",
        blocks: [
          {
            type: "p",
            text: "If you've spent years trying to lose weight without success, you're probably blaming yourself for something you don't fully control. Body weight is regulated by a complex system of hormones, hunger and fullness signals, sleep and genetics. When that system is out of balance, eating less and moving more stops working the way the magazines promise.",
          },
          {
            type: "p",
            text: "The good news is that almost all of these causes can be identified and treated. The first step isn't another diet, but understanding what's happening inside your body.",
          },
        ],
      },
      {
        h2: "The 7 most common medical causes",
        blocks: [
          {
            type: "list",
            items: [
              "Hypothyroidism: an underactive thyroid lowers energy expenditure and makes weight loss harder.",
              "Insulin resistance and prediabetes: the body stores fat more easily.",
              "Polycystic ovary syndrome (PCOS): very common and often undiagnosed.",
              "Sleep deprivation: sleeping less than 6 hours disrupts appetite and increases hunger.",
              "Chronic stress: raised cortisol promotes abdominal fat.",
              "Medications: some antidepressants, corticosteroids or antihistamines cause weight gain.",
              "Adapted metabolism: after years of dieting, the body reduces its expenditure to protect itself.",
            ],
          },
          {
            type: "p",
            text: "You don't need all of these causes to be stuck. Often one or two are enough to make losing weight an uphill battle no matter how hard you try.",
          },
        ],
      },
      {
        h2: "The effect of previous diets",
        blocks: [
          {
            type: "p",
            text: "Every very restrictive diet you do leaves a mark. When you eat too little for weeks, your body interprets it as scarcity and slows down: you burn less at rest, feel hungrier and, as soon as you go back to eating normally, regain the weight with interest. This is the famous rebound effect, and it's biology, not weakness.",
          },
          {
            type: "quote",
            text: "Most people who lose weight on strict diets regain it within a few years. The problem isn't you: it's the method.",
          },
        ],
      },
      {
        h2: "What to do from now on",
        blocks: [
          {
            type: "list",
            items: [
              "Ask for a blood test that includes thyroid (TSH), glucose and insulin.",
              "Review with a doctor the medications you take in case they affect your weight.",
              "Prioritise 7–8 hours of sleep: it's one of the most underrated factors.",
              "Forget crash diets; look for a sustainable, supervised plan.",
              "Consider whether a medical treatment (such as a GLP‑1) makes sense in your case.",
            ],
          },
          {
            type: "p",
            text: "At DoctorLife, a free medical assessment is designed for exactly this: to rule out treatable causes, understand your history and design a plan built around your body, not around a brochure.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Why am I not losing weight even with diet and exercise?",
        answer:
          "Because weight doesn't depend only on eating less and moving more. Hormones such as the thyroid or insulin, sleep, stress and certain medications can slow weight loss. A medical assessment identifies what's affecting you and makes it treatable.",
      },
      {
        question: "Could it be a thyroid problem?",
        answer:
          "Yes. Hypothyroidism lowers energy expenditure and makes weight loss harder. It's easy to detect with a blood test (TSH) and, once treated, losing weight becomes possible again. That's why it's worth ruling out before blaming yourself.",
      },
      {
        question: "Is losing weight just a matter of willpower?",
        answer:
          "No. Willpower helps, but weight is regulated by your physiology. If your body defends a high weight due to hormonal or metabolic causes, trying harder without treating the cause rarely works long term.",
      },
      {
        question: "When should I see a doctor about my weight?",
        answer:
          "If you've been trying for a while without results, have regained weight several times, or notice symptoms such as fatigue, feeling cold or mood changes, a medical assessment is worthwhile to rule out treatable causes.",
      },
    ],
    sources: [S.who, S.nice, S.easo],
    authorSlug: "carlos-vidal",
    reviewerSlug: "laura-mendez",
    datePublished: "2026-01-12",
    dateModified: "2026-06-16",
    relatedSlugs: ["why-do-i-gain-weight-if-i-eat-little", "why-i-lose-weight-then-regain-it", "is-ozempic-worth-it"],
    cover: "/hero/woman.png",
    coverAlt: "Person reflecting on why they can't lose weight",
    readMins: 7,
  },

  {
    slug: "ive-been-on-a-diet-for-a-week-and-not-losing-weight",
    title: "I've been on a diet for a week and not losing weight",
    h1: "I've been on a diet for a week and not losing weight: is it normal?",
    metaTitle: "I've Been on a Diet for a Week and Not Losing Weight: Why It Happens | DoctorLife",
    metaDescription:
      "You've been on a diet for a week and the scale doesn't move. It's normal and has an explanation: fluid retention, muscle, and how to measure real progress beyond weight.",
    category: "Results",
    answerFirst:
      "It's completely normal not to lose weight in the first week of dieting. The body retains fluids when changing diet, stool and glycogen weigh, and fat is lost more slowly than the scale shows. A week is very little time: real progress is measured in weeks, not days.",
    keyTakeaways: [
      "Not losing weight in the first week of dieting is normal and doesn't mean you're failing.",
      "Daily weight varies due to water, glycogen, salt, hormones, and intestinal transit.",
      "Fat is lost slowly: reasonable is 0.5–1% of weight per week.",
      "Measuring only the scale is misleading; also use clothing, photos, and measurements.",
      "If after 4–6 weeks there's no change, it's worth reviewing the plan with a doctor.",
    ],
    body: [
      {
        h2: "Why the scale doesn't move in the first week",
        blocks: [
          {
            type: "p",
            text: "When you start eating differently, your body takes time to adapt. In the first few days several things can happen at once: you retain fluids, your glycogen stores shift (which pull water with them) and your digestion readjusts. All of that has weight and can hide the fat you are actually losing.",
          },
          {
            type: "p",
            text: "On top of that, if you've started exercising, your muscles retain water to repair themselves. It's possible to lose fat while the scale doesn't drop, or even rises slightly, for a few days.",
          },
        ],
      },
      {
        h2: "How much weight is realistic to lose",
        blocks: [
          {
            type: "stat",
            value: "0.5–1 kg",
            label: "is the reasonable fat loss per week for most people",
          },
          {
            type: "p",
            text: "Losing faster usually means losing water and muscle, not fat, and encourages the rebound effect. A slow, steady pace is what really lasts over time.",
          },
        ],
      },
      {
        h2: "How to measure real progress",
        blocks: [
          {
            type: "list",
            items: [
              "Always weigh yourself under the same conditions (fasted, once a week).",
              "Use a tape measure: waist, hips and arm say more than the scale.",
              "Take photos every 2–3 weeks with the same lighting and clothing.",
              "Notice how your clothes fit and your energy and sleep.",
            ],
          },
          {
            type: "quote",
            text: "The scale is only one data point. If you obsess over the daily number, you'll get frustrated just when you're making the most progress.",
          },
        ],
      },
      {
        h2: "When should you worry?",
        blocks: [
          {
            type: "p",
            text: "A week without changes is no cause for alarm. But if 4–6 weeks pass while following the plan well and you notice absolutely nothing (no weight, no measurements, no clothing change), it makes sense to review the situation with a doctor to rule out causes such as hypothyroidism or to adjust the approach.",
          },
          {
            type: "p",
            text: "At DoctorLife we assess your case at no cost and tell you honestly whether what you're doing makes sense or whether it's worth changing strategy.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is it normal not to lose weight in the first week of a diet?",
        answer:
          "Yes, it's very normal. In the first week fluid retention, glycogen and digestion all play a role and can hide the fat you're losing. Real progress shows over several weeks.",
      },
      {
        question: "Why have I gained weight after starting to exercise?",
        answer:
          "When you start exercising, muscles retain water to repair themselves, which can raise your weight for a few days. It isn't fat. Over time, exercise helps you lose fat and improve body composition.",
      },
      {
        question: "How often should I weigh myself?",
        answer:
          "Ideally once a week, under the same conditions (fasted, without clothing). Weighing yourself daily creates anxiety because of the normal variations from water and food.",
      },
      {
        question: "How much weight is healthy to lose per week?",
        answer:
          "Between 0.5 and 1 kg per week for most people. Losing faster usually involves losing muscle and water, and increases the risk of regaining the weight.",
      },
    ],
    sources: [S.who, S.nice, S.nhs],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-01-20",
    dateModified: "2026-06-16",
    relatedSlugs: ["how-long-to-notice-weight-loss", "why-cant-i-lose-weight", "why-i-lose-weight-then-regain-it"],
    cover: "/hero/woman.png",
    coverAlt: "Scale and tape measure on a bathroom floor",
    readMins: 6,
  },

  {
    slug: "why-do-i-gain-weight-if-i-eat-little",
    title: "Why do I gain weight if I eat little",
    h1: "Why do I gain weight if I eat little: the medical explanation",
    metaTitle: "Why Do I Gain Weight If I Eat Little: Real Causes and Solutions | DoctorLife",
    metaDescription:
      "You eat little and still gain weight or don't lose weight. We explain why: adapted metabolism, hormones, medications, and why just counting calories isn't enough.",
    category: "Causes",
    answerFirst:
      "If you eat little and still gain weight, it's usually due to a metabolism adapted after years of dieting, hormonal alterations (thyroid, insulin, cortisol), or medications that promote weight gain. It also influences that we tend to underestimate what we eat. It's not that your body 'breaks the rules': it's that your physiology works against you.",
    keyTakeaways: [
      "Gaining weight while eating little almost always has an identifiable physiological cause.",
      "After many diets, metabolism lowers its expenditure to defend itself (metabolic adaptation).",
      "Hypothyroidism and insulin resistance promote fat accumulation.",
      "We tend to underestimate the actual calories we consume throughout the day.",
      "Treatment starts with a diagnosis, not by eating even less.",
    ],
    body: [
      {
        h2: "Metabolism adapts to diets",
        blocks: [
          {
            type: "p",
            text: "When you eat very little for a long time, your body doesn't stay still: it lowers energy expenditure to survive on less. Your temperature drops, you move less without realising it and you use every calorie more efficiently. This is called metabolic adaptation, and it explains why you have to eat less and less to maintain the same weight.",
          },
          {
            type: "p",
            text: "The problem is that this strategy is a trap: the more you restrict, the more your body defends itself, and the easier it is to gain weight as soon as you eat a little more.",
          },
        ],
      },
      {
        h2: "Hormones that cause weight gain",
        blocks: [
          {
            type: "list",
            items: [
              "Underactive thyroid (hypothyroidism): reduces resting energy expenditure.",
              "Insulin resistance: makes it easier to store fat, especially around the belly.",
              "High cortisol from stress or lack of sleep: promotes appetite and fat.",
              "PCOS in women: closely linked to difficulty losing weight.",
            ],
          },
          {
            type: "p",
            text: "These alterations aren't visible to the naked eye, but they're detected with a simple blood test. Treating them completely changes how the body responds to a diet.",
          },
        ],
      },
      {
        h2: "The factor almost no one takes into account",
        blocks: [
          {
            type: "p",
            text: "Even if you eat 'little' at your main meals, it's very easy to underestimate what goes in during the day: the oil used in cooking, snacking, drinks, weekends. It's not about blame, but about having a realistic picture. Sometimes 'I eat little' actually means 'I eat irregularly'.",
          },
          {
            type: "quote",
            text: "Estimating calories by eye is very unreliable. The goal isn't to force yourself to eat less, but to understand your real pattern.",
          },
        ],
      },
      {
        h2: "What to do instead of eating even less",
        blocks: [
          {
            type: "list",
            items: [
              "Get a blood test covering thyroid, glucose and insulin.",
              "Prioritise protein and real food so you don't lose muscle.",
              "Recover your sleep and reduce chronic stress.",
              "Avoid starvation diets: they worsen metabolic adaptation.",
              "Discuss with a doctor whether a treatment such as a GLP‑1 suits you.",
            ],
          },
          {
            type: "p",
            text: "At DoctorLife we won't just tell you to eat less. We look for the reason your body holds onto weight and treat it at the root.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Why do I gain weight if I barely eat?",
        answer:
          "It's usually due to a metabolism adapted after years of dieting, hormonal alterations (thyroid, insulin, cortisol) or medications. It's also easy to underestimate what we eat. The solution isn't to eat less, but to diagnose the cause.",
      },
      {
        question: "Does eating very little slow the metabolism?",
        answer:
          "Yes. Restricting heavily for a long time reduces resting energy expenditure, makes you move less and increases hunger. That's why starvation diets usually end in regaining the weight.",
      },
      {
        question: "How do I know if I have a hormonal problem?",
        answer:
          "With a blood test that includes thyroid (TSH), glucose and insulin, assessed by a doctor. Symptoms such as fatigue, feeling cold, hair loss or menstrual changes also point to it.",
      },
      {
        question: "Can I lose weight even with an adapted metabolism?",
        answer:
          "Yes, but rarely by eating even less. You need to rebuild muscle, improve sleep, treat the hormonal causes and, in some cases, use supervised medical treatment.",
      },
    ],
    sources: [S.easo, S.who, S.nice],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-02-03",
    dateModified: "2026-06-16",
    relatedSlugs: ["why-cant-i-lose-weight", "why-i-lose-weight-then-regain-it", "how-long-to-notice-weight-loss"],
    cover: "/products/maren-oral.png",
    coverAlt: "Small plate of food on a table",
    readMins: 7,
  },

  {
    slug: "i-have-belly-fat-but-im-not-overweight",
    title: "I have belly fat but I'm not overweight",
    h1: "I have belly fat but I'm not overweight: why it happens and what it means",
    metaTitle: "I Have Belly Fat But I'm Not Overweight: What It Really Means | DoctorLife",
    metaDescription:
      "You're thin but have belly fat. It could be visceral fat, bloating, or posture. We explain the causes, why it matters for your health, and what to do.",
    category: "Metabolic health",
    answerFirst:
      "Having belly fat without being overweight is usually due to visceral fat (which surrounds organs), digestive bloating, or poor posture. Visceral fat is the most dangerous for health even if your weight is normal: it's associated with cardiovascular risk and insulin resistance. That's why it's worth assessing, not just looking at the scale.",
    keyTakeaways: [
      "You can have belly fat with normal weight: what matters is what type of fat it is.",
      "Visceral fat surrounds organs and is the most harmful to health.",
      "Waist circumference is a better risk indicator than weight or BMI.",
      "Digestive bloating and posture also explain part of the belly.",
      "Poor sleep, stress, and alcohol promote abdominal fat.",
    ],
    body: [
      {
        h2: "A belly doesn't always mean being overweight",
        blocks: [
          {
            type: "p",
            text: "You can be slim, at a normal weight and still notice a belly. This confuses many people because we associate a belly with being overweight. But the abdomen can stick out for several different reasons, and not all of them have to do with carrying 'extra kilos'.",
          },
          {
            type: "list",
            items: [
              "Visceral fat: the fat that accumulates around the organs.",
              "Digestive bloating: gas, fluid retention, intolerances or slow transit.",
              "Posture: a forward-tilted pelvis makes the belly look bigger.",
              "Loss of abdominal tone: little activity in the core muscles.",
            ],
          },
        ],
      },
      {
        h2: "Why visceral fat matters so much",
        blocks: [
          {
            type: "p",
            text: "Visceral fat isn't just cosmetic. It's metabolically active and releases substances that increase inflammation, insulin resistance and cardiovascular risk. That's why someone 'slim on the outside' but with a lot of visceral fat can be at higher risk than someone who is overweight but with evenly distributed fat.",
          },
          {
            type: "stat",
            value: "> 94 cm (men) / > 80 cm (women)",
            label: "waist circumference above which cardiometabolic risk increases",
          },
        ],
      },
      {
        h2: "How to know what kind of belly you have",
        blocks: [
          {
            type: "list",
            items: [
              "Measure your waist with a tape at navel height, without pulling tight.",
              "Notice whether the belly changes throughout the day (suggests bloating).",
              "Check whether it's firm and constant (more typical of visceral fat).",
              "Discuss with a doctor a blood test for glucose, insulin and lipid profile.",
            ],
          },
          {
            type: "quote",
            text: "Your weight can be normal while the belly is a warning sign. The waist tells a story the scale can't see.",
          },
        ],
      },
      {
        h2: "What to do",
        blocks: [
          {
            type: "list",
            items: [
              "Cut down on alcohol and ultra-processed foods, closely linked to visceral fat.",
              "Sleep well and manage stress: cortisol accumulates abdominal fat.",
              "Do strength training and work your core; exercise reduces visceral fat.",
              "If there's insulin resistance, treat it with medical support.",
            ],
          },
          {
            type: "p",
            text: "At DoctorLife we assess your metabolic health beyond your weight. If your belly is down to visceral fat or an insulin problem, we detect it and address it.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Can you have a belly while being slim?",
        answer:
          "Yes. It can be due to visceral fat (around the organs), digestive bloating or posture. Visceral fat is relevant to health even if your weight is normal.",
      },
      {
        question: "Is visceral fat dangerous?",
        answer:
          "Yes, it's the fat most associated with cardiovascular risk, insulin resistance and inflammation. That's why waist circumference matters more than weight alone.",
      },
      {
        question: "How do I know if my belly is fat or bloating?",
        answer:
          "Bloating usually varies throughout the day and worsens after eating. Visceral fat is more constant and firm. A medical assessment helps tell them apart and measure the risk.",
      },
      {
        question: "How do you reduce visceral abdominal fat?",
        answer:
          "With less alcohol and ultra-processed food, good sleep, stress management and strength training. If there's insulin resistance, treating it with medical support speeds up results.",
      },
    ],
    sources: [S.who, S.nice, S.easo],
    authorSlug: "carlos-vidal",
    reviewerSlug: "laura-mendez",
    datePublished: "2026-02-15",
    dateModified: "2026-06-16",
    relatedSlugs: ["how-to-lose-stubborn-belly-fat", "why-cant-i-lose-weight", "why-do-i-gain-weight-if-i-eat-little"],
    cover: "/products/maren-pen.png",
    coverAlt: "Slim person measuring their waist circumference",
    readMins: 7,
  },

  {
    slug: "is-ozempic-worth-it",
    title: "Is Ozempic worth it?",
    h1: "Is Ozempic worth it for weight loss? An honest analysis",
    metaTitle: "Is Ozempic Worth It for Weight Loss? Pros, Cons and Price | DoctorLife",
    metaDescription:
      "Is Ozempic worth it for losing weight? Real effectiveness, side effects, price, rebound effect and who it makes sense for. A medical analysis without the hype.",
    category: "Treatments",
    answerFirst:
      "Ozempic (semaglutide) can be worth it for weight loss if you have overweight or obesity with a health risk and use it under medical supervision. It's very effective at reducing appetite, but it requires a prescription, has digestive side effects and, if you stop it without a strategy, the weight comes back. It's not a magic shortcut: it's a medical treatment.",
    keyTakeaways: [
      "Ozempic (semaglutide) is approved for diabetes; for weight, semaglutide is used as Wegovy.",
      "It's very effective at reducing appetite and can achieve notable weight loss.",
      "It requires a prescription and medical follow-up: it shouldn't be bought without oversight.",
      "Side effects are usually digestive, mild and temporary.",
      "If stopped without a maintenance plan, regaining weight is common.",
    ],
    body: [
      {
        h2: "What Ozempic is and what it's for",
        blocks: [
          {
            type: "p",
            text: "Ozempic is the brand name for semaglutide, a GLP‑1 analogue. Its official indication is type 2 diabetes, but the same molecule at higher doses (Wegovy) is approved for treating overweight and obesity. It works by reducing appetite and slowing stomach emptying, so you eat less without feeling constantly hungry.",
          },
          {
            type: "p",
            text: "That's why it's become so popular: for the first time there are genuinely effective medicines for losing weight. But effective doesn't mean harmless or suitable for everyone.",
          },
        ],
      },
      {
        h2: "Real advantages",
        blocks: [
          {
            type: "list",
            items: [
              "Reduces appetite and the constant thoughts about food.",
              "Allows significant weight loss in many patients.",
              "Improves metabolic markers such as glucose.",
              "Given once a week with a simple pen.",
            ],
          },
        ],
      },
      {
        h2: "Drawbacks you should know about",
        blocks: [
          {
            type: "list",
            items: [
              "Digestive side effects: nausea, slow digestion, constipation.",
              "Price: treatment is private in most cases.",
              "Needs a prescription and follow-up; it isn't safe to buy on your own.",
              "Rebound effect if stopped without a maintenance strategy.",
              "It doesn't replace good habits, it complements them.",
            ],
          },
          {
            type: "quote",
            text: "The right question isn't whether Ozempic works, but whether it's right for you and whether you'll have good medical follow-up.",
          },
        ],
      },
      {
        h2: "Who is it worth it for?",
        blocks: [
          {
            type: "p",
            text: "It makes most sense for people with obesity or overweight and associated health problems (prediabetes, high blood pressure, sleep apnoea) who haven't achieved results with lifestyle changes. It isn't for losing two or three kilos for aesthetics, nor for using without oversight.",
          },
          {
            type: "p",
            text: "At DoctorLife we assess your case honestly: if a GLP‑1 suits you, we prescribe it and follow it closely; if not, we tell you. The point isn't to sell a medicine, but for you to lose weight safely and sustainably.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is Ozempic worth it for weight loss?",
        answer:
          "It can be worth it if you have overweight or obesity with a health risk and use it under medical supervision. It's very effective at reducing appetite, but it requires a prescription, has side effects and needs follow-up to avoid regaining weight.",
      },
      {
        question: "Do you regain weight after stopping Ozempic?",
        answer:
          "Regaining some weight is common if you stop without a maintenance strategy. That's why treatment should include a habits plan and, sometimes, a supervised gradual withdrawal.",
      },
      {
        question: "Can I buy Ozempic without a prescription?",
        answer:
          "No. It's a prescription-only medicine and buying it without a prescription is illegal and dangerous. It needs a prior medical assessment and monitoring of the dose and effects.",
      },
      {
        question: "What side effects does it have?",
        answer:
          "The most common are digestive: nausea, slow digestion and constipation. They're usually mild and temporary, and are managed by increasing the dose gradually under medical supervision.",
      },
    ],
    sources: [S.mhra, S.easo, S.nice],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-03-01",
    dateModified: "2026-06-16",
    relatedSlugs: ["retatrutide-vs-ozempic-mounjaro", "why-i-lose-weight-then-regain-it", "what-is-retatrutide"],
    cover: "/products/maren-lineup.png",
    coverAlt: "Semaglutide pen on a light surface",
    readMins: 8,
  },

  {
    slug: "how-long-to-notice-weight-loss",
    title: "How long it takes to notice weight loss",
    h1: "How long does it take to notice weight loss?",
    metaTitle: "How Long It Takes to Notice Weight Loss: Realistic Timeframes | DoctorLife",
    metaDescription:
      "How long it takes to notice weight loss: on the scale, in your clothes and in the mirror. Realistic week-by-week timeframes and what speeds up or slows results.",
    category: "Results",
    answerFirst:
      "The first changes on the scale are usually noticed in 1–2 weeks, mostly from water loss. Noticing a difference in your clothes takes 3 to 4 weeks, and seeing it clearly in the mirror and having others notice takes between 6 and 12 weeks. The pace depends on your starting point, your plan and your physiology.",
    keyTakeaways: [
      "In 1–2 weeks you notice the first change on the scale (largely water).",
      "Clothes start to feel different around 3–4 weeks.",
      "Visible changes in the mirror come between weeks 6 and 12.",
      "The higher your starting weight, the sooner the first results show.",
      "A slow, steady pace is a sign you're losing fat, not muscle.",
    ],
    body: [
      {
        h2: "What happens week by week",
        blocks: [
          {
            type: "table",
            caption: "Rough timeframes for noticing weight loss",
            head: ["Timeframe", "What you usually notice"],
            rows: [
              ["Week 1–2", "Initial drop on the scale (mostly water), less bloating"],
              ["Week 3–4", "Clothes start to feel looser"],
              ["Week 6–8", "Visible changes in the mirror, more energy"],
              ["Week 10–12", "Others notice; fat loss consolidated"],
            ],
          },
          {
            type: "p",
            text: "These are guides, not an exact rule. Every body has its own pace and order: some lose weight first from the face and belly, and some take longer to notice it where they'd like.",
          },
        ],
      },
      {
        h2: "What determines whether it's faster or slower",
        blocks: [
          {
            type: "list",
            items: [
              "Your starting weight: with more weight, the first changes come sooner.",
              "Your real calorie deficit and the quality of your diet.",
              "Sleep and stress, which affect appetite hormones.",
              "Your physiology: thyroid, insulin, age and genetics.",
              "If you use a supervised medical treatment, the pace can be faster.",
            ],
          },
        ],
      },
      {
        h2: "Why you shouldn't go faster",
        blocks: [
          {
            type: "p",
            text: "It's tempting to want results in a week, but losing weight too fast usually means losing muscle and water, not fat. And muscle is exactly what keeps your metabolism active. A pace of 0.5–1% of body weight per week is what lasts best and avoids the rebound effect.",
          },
          {
            type: "quote",
            text: "What's lost fast comes back fast. What's lost slowly and sensibly is what stays.",
          },
        ],
      },
      {
        h2: "How not to lose motivation",
        blocks: [
          {
            type: "list",
            items: [
              "Measure beyond the scale: photos, measurements and how your clothes fit.",
              "Notice signs of energy, sleep and digestion.",
              "Celebrate the process, not just the final number.",
              "Lean on professional follow-up to adjust in time.",
            ],
          },
          {
            type: "p",
            text: "At DoctorLife we help you read your progress properly so you don't give up just when you're making headway. The initial assessment is free.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "How long does it take to notice weight loss?",
        answer:
          "The first change on the scale appears in 1–2 weeks (mostly water), clothes change around 3–4 weeks and visible changes in the mirror between weeks 6 and 12. It depends on your starting point and your plan.",
      },
      {
        question: "Why does it take me longer than other people?",
        answer:
          "Starting weight, hormones (thyroid, insulin), sleep, stress and genetics all play a role. Not comparing yourself is key: every body responds at its own pace.",
      },
      {
        question: "Where on the body do you notice it first?",
        answer:
          "It varies from person to person. Many notice the face and belly first, but you can't choose where you lose fat: it depends on your genetics.",
      },
      {
        question: "Is losing weight quickly better?",
        answer:
          "No. Losing weight very fast usually involves losing muscle and water and encourages the rebound effect. A pace of 0.5–1% of body weight per week is healthier and longer-lasting.",
      },
    ],
    sources: [S.who, S.nice, S.nhs],
    authorSlug: "carlos-vidal",
    reviewerSlug: "laura-mendez",
    datePublished: "2026-03-12",
    dateModified: "2026-06-16",
    relatedSlugs: ["ive-been-on-a-diet-for-a-week-and-not-losing-weight", "why-cant-i-lose-weight", "why-i-lose-weight-then-regain-it"],
    cover: "/hero/woman.png",
    coverAlt: "Person checking how their looser clothes fit",
    readMins: 6,
  },

  {
    slug: "how-to-lose-stubborn-belly-fat",
    title: "How to lose stubborn belly fat that won't go away",
    h1: "How to lose stubborn belly fat that won't go away",
    metaTitle: "How to Lose Stubborn Belly Fat That Won't Go Away: A Medical Guide | DoctorLife",
    metaDescription:
      "Stubborn belly fat has specific causes: insulin, cortisol, sleep and hormones. What really works and what's a myth for losing belly fat.",
    category: "Metabolic health",
    answerFirst:
      "Stubborn belly fat that won't go away is usually linked to insulin resistance, high cortisol from stress or lack of sleep, and hormonal factors. It isn't removed with sit-ups or miracle products: it's reduced by improving sleep, stress, diet, strength training and, if needed, medical treatment.",
    keyTakeaways: [
      "Spot fat reduction doesn't exist: sit-ups don't burn belly fat.",
      "Insulin resistance and high cortisol promote abdominal fat.",
      "Poor sleep and chronic stress are very common and often overlooked causes.",
      "Strength training and protein help more than endless cardio.",
      "If there's a metabolic problem, treating it is what unlocks the belly.",
    ],
    body: [
      {
        h2: "Why that belly won't go away",
        blocks: [
          {
            type: "p",
            text: "Stubborn abdominal fat is rarely the 'fault' of not doing enough sit-ups. It usually has a metabolic and hormonal origin. When there's insulin resistance, the body preferentially stores fat around the abdomen. And when cortisol is high from stress or poor sleep, the same thing happens.",
          },
          {
            type: "p",
            text: "That's why you can be exercising and eating 'well' and still see no changes in your tummy: you're working on the symptom, not the cause.",
          },
        ],
      },
      {
        h2: "Myths that don't work",
        blocks: [
          {
            type: "list",
            items: [
              "Doing a thousand sit-ups: they tone the muscle, but don't burn the fat on top.",
              "Waist trainers, creams and 'fat burners': no evidence for reducing real fat.",
              "Fasted cardio as a magic solution: it helps little if everything else fails.",
              "Cutting out a single 'miracle' food: abdominal fat is multifactorial.",
            ],
          },
          {
            type: "quote",
            text: "You don't get to choose where fat goes. You can't burn belly fat by working the belly: the body decides where it draws from.",
          },
        ],
      },
      {
        h2: "What does work",
        blocks: [
          {
            type: "list",
            items: [
              "Sleep 7–8 hours: lowering cortisol changes abdominal fat a lot.",
              "Manage chronic stress (it's a real cause, not an excuse).",
              "Eat more protein and reduce ultra-processed foods and alcohol.",
              "Train strength: more muscle improves insulin sensitivity.",
              "Treat insulin resistance if present, with medical support.",
            ],
          },
        ],
      },
      {
        h2: "When a medical assessment is worthwhile",
        blocks: [
          {
            type: "p",
            text: "If you've done everything reasonable and the belly won't budge, it's not time to punish yourself more, but to look inside. A glucose and insulin blood test and an assessment can reveal insulin resistance or a hormonal problem that, once treated, finally gets things moving.",
          },
          {
            type: "p",
            text: "At DoctorLife we assess your metabolic health for free and, if you need it, design a plan that tackles the real cause of that belly fat that won't go away.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "How do you get rid of belly fat that won't go away?",
        answer:
          "By improving sleep and stress (to lower cortisol), eating more protein and fewer ultra-processed foods, training strength and treating insulin resistance if present. There's no spot reduction: sit-ups aren't enough.",
      },
      {
        question: "Do sit-ups burn belly fat?",
        answer:
          "No. Sit-ups strengthen the muscle, but don't remove the fat on top of it. Fat is lost overall, not in the area you work.",
      },
      {
        question: "Why do I have a belly if I exercise?",
        answer:
          "Because abdominal fat is usually metabolic: insulin resistance, high cortisol from stress or lack of sleep. If you don't treat the cause, exercise alone won't remove it.",
      },
      {
        question: "Does stress increase belly fat?",
        answer:
          "Yes. Chronic stress raises cortisol, which promotes storing abdominal fat and increases appetite. Managing it is part of treatment, not a minor detail.",
      },
    ],
    sources: [S.easo, S.who, S.nice],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-03-25",
    dateModified: "2026-06-16",
    relatedSlugs: ["i-have-belly-fat-but-im-not-overweight", "why-do-i-gain-weight-if-i-eat-little", "why-cant-i-lose-weight"],
    cover: "/products/maren-pen.png",
    coverAlt: "Person measuring their belly in front of the mirror",
    readMins: 7,
  },

  {
    slug: "why-i-lose-weight-then-regain-it",
    title: "Why I lose weight then regain it",
    h1: "Why I lose weight then regain it (the rebound effect)",
    metaTitle: "Why I Lose Weight Then Regain It: The Rebound Effect | DoctorLife",
    metaDescription:
      "You lose weight and gain it back time and again. We explain the rebound effect, why your body defends its weight and how to lose weight without regaining it.",
    category: "Maintenance",
    answerFirst:
      "You lose weight then regain it because of the rebound effect: after a restrictive diet, your body lowers energy expenditure and increases hunger to return to its previous weight. It's a biological survival response, not a personal failure. It's avoided by losing weight slowly, maintaining muscle and with a supervised maintenance phase.",
    keyTakeaways: [
      "The rebound effect is a biological response, not a lack of discipline.",
      "Restrictive diets lower the metabolism and spike hunger once they end.",
      "Losing muscle during a diet makes it easier to regain fat afterwards.",
      "Maintenance is a phase of treatment, not the 'end' of the diet.",
      "A supervised plan and a slow pace are what avoid regaining the weight.",
    ],
    body: [
      {
        h2: "What the rebound effect is",
        blocks: [
          {
            type: "p",
            text: "Your body has a weight it tends to defend. When you lose weight fast on a harsh diet, it interprets the loss as a threat: it reduces resting expenditure, increases hunger hormones (ghrelin) and lowers fullness hormones (leptin). The result is that, once the diet ends, you're hungrier and burn less. The scale creeps back up almost by itself.",
          },
          {
            type: "quote",
            text: "The rebound effect isn't you failing: it's your biology doing exactly what it evolved to do.",
          },
        ],
      },
      {
        h2: "Why strict diets almost guarantee regaining the weight",
        blocks: [
          {
            type: "list",
            items: [
              "They're unsustainable: no one eats like that for life.",
              "They cause muscle loss, which is the engine of the metabolism.",
              "They create food anxiety and later binges.",
              "They don't teach habits, so when you stop them you return to square one.",
            ],
          },
          {
            type: "p",
            text: "That's why the pattern repeats: you lose 8 kilos, regain 10; you lose 10, regain 12. Each cycle leaves the metabolism more adapted and the next attempt harder.",
          },
        ],
      },
      {
        h2: "How to lose weight without regaining it",
        blocks: [
          {
            type: "list",
            items: [
              "Lose weight slowly (0.5–1% per week) to preserve muscle.",
              "Eat enough protein and train strength during the process.",
              "Look after sleep and stress, which regulate appetite.",
              "Plan a maintenance phase, not an 'end of the diet'.",
              "Lean on medical follow-up to adjust before relapsing.",
            ],
          },
        ],
      },
      {
        h2: "The role of medical treatment",
        blocks: [
          {
            type: "p",
            text: "In people with obesity, GLP‑1 analogues help precisely with the weak point of maintenance: they regulate appetite and reduce the urge to regain what was lost. But they must be used with a plan, and withdrawal, when it comes, must be gradual and supervised so you don't fall back into the rebound.",
          },
          {
            type: "p",
            text: "At DoctorLife we don't aim for you to lose weight fast, but for you not to start from scratch again. We design treatment with the aftermath in mind. The first assessment is free.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Why do I regain the weight I lose?",
        answer:
          "Because of the rebound effect: after a restrictive diet, your body lowers energy expenditure and increases hunger to return to its previous weight. It's survival biology. It's avoided by losing weight slowly and with a maintenance phase.",
      },
      {
        question: "What is the rebound effect?",
        answer:
          "It's regaining weight after losing it, caused by the metabolism adapting and hunger increasing. The stricter the diet, the greater the subsequent rebound.",
      },
      {
        question: "How do I avoid gaining weight again?",
        answer:
          "By losing weight slowly, maintaining muscle with protein and strength training, looking after sleep and stress, and planning a supervised maintenance phase instead of 'ending' the diet abruptly.",
      },
      {
        question: "Do you regain weight after stopping a GLP‑1 treatment?",
        answer:
          "It can happen if withdrawn without a strategy. That's why withdrawal should be gradual and accompanied by established habits and medical follow-up to maintain the results.",
      },
    ],
    sources: [S.who, S.easo, S.nice, S.mhra],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-04-05",
    dateModified: "2026-06-16",
    relatedSlugs: ["why-cant-i-lose-weight", "is-ozempic-worth-it", "how-long-to-notice-weight-loss"],
    cover: "/products/maren-oral.png",
    coverAlt: "Weight chart going up and down representing the rebound effect",
    readMins: 8,
  },

  /* ── Retatrutide cluster (high search-demand topic) ── */
  {
    slug: "what-is-retatrutide",
    title: "What is retatrutide",
    h1: "Retatrutide: what it is, what it's for and why everyone is talking about it",
    metaTitle: "Retatrutide: What It Is, What It's For and Results | DoctorLife",
    metaDescription:
      "What retatrutide is, Eli Lilly's triple agonist injectable for obesity. How it works, trial results and why it isn't available in the UK yet.",
    category: "Treatments",
    answerFirst:
      "Retatrutide is an experimental injectable medicine from Eli Lilly for obesity and type 2 diabetes. It's a triple agonist: it stimulates the GLP‑1, GIP and glucagon receptors at the same time, which reduces appetite and increases energy expenditure. In clinical trials it achieved weight loss of up to 24%, but it isn't yet approved or available in the UK.",
    keyTakeaways: [
      "Retatrutide is a triple agonist (GLP‑1, GIP and glucagon), a generation ahead of Ozempic or Mounjaro.",
      "In the phase 2 trial it achieved weight loss of up to 24% at 48 weeks.",
      "It remains experimental: it isn't approved by the MHRA or the EMA and isn't sold in the UK.",
      "Buying it online or outside the legal supply chain is dangerous and illegal.",
      "Effective, legal alternatives already exist with a prescription and medical supervision (semaglutide, tirzepatide).",
    ],
    body: [
      {
        h2: "What exactly retatrutide is",
        blocks: [
          {
            type: "p",
            text: "Retatrutide (research name LY3437943) is an injectable medicine that Eli Lilly is developing to treat obesity and type 2 diabetes. It belongs to the same family as Ozempic, Wegovy or Mounjaro — the so-called gut hormone analogues — but goes a step further in its mechanism.",
          },
          {
            type: "p",
            text: "While semaglutide (Ozempic, Wegovy) acts on a single hormone and tirzepatide (Mounjaro) on two, retatrutide acts on three at once. That's why it's known as a 'triple agonist' and why it generates so much excitement: in preliminary studies it has shown the largest weight losses seen so far with a medicine.",
          },
        ],
      },
      {
        h2: "How the triple mechanism works",
        blocks: [
          {
            type: "p",
            text: "Retatrutide mimics three hormones your body produces naturally that regulate hunger, glucose and energy expenditure:",
          },
          {
            type: "list",
            items: [
              "GLP‑1: reduces appetite and slows stomach emptying, so you feel full sooner and for longer.",
              "GIP: improves how the body manages glucose and boosts the effect of GLP‑1 on appetite.",
              "Glucagon: increases energy expenditure, that is, it helps 'burn' more energy at rest.",
            ],
          },
          {
            type: "p",
            text: "That combination of eating less and spending more at the same time is what explains such striking results. It's also what sets it apart from current GLP‑1s, which mainly work by reducing appetite.",
          },
        ],
      },
      {
        h2: "What results it has shown in trials",
        blocks: [
          {
            type: "stat",
            value: "Up to 24%",
            label: "weight loss at 48 weeks in the phase 2 trial published in NEJM",
          },
          {
            type: "p",
            text: "In the phase 2 trial published in The New England Journal of Medicine, people who received the highest dose lost on average around 24% of their body weight in 48 weeks, a figure higher than any other obesity medicine available today. Even so, it's worth being cautious: these are results from studies still under way and the phase 3 trials — the ones that confirm long-term efficacy and safety — are still to come.",
          },
          {
            type: "quote",
            text: "The retatrutide data are promising, but 'promising' doesn't mean 'available'. An experimental medicine isn't a treatment option yet.",
          },
        ],
      },
      {
        h2: "Known side effects",
        blocks: [
          {
            type: "p",
            text: "Like the rest of the medicines in this family, the most common adverse effects in the studies were digestive and mild to moderate in intensity, especially when increasing the dose:",
          },
          {
            type: "list",
            items: [
              "Nausea, especially at the start of treatment.",
              "Diarrhoea or constipation.",
              "Vomiting and abdominal discomfort.",
              "Reduced appetite (the intended effect, but sometimes excessive).",
            ],
          },
          {
            type: "p",
            text: "As an experimental medicine, its full safety profile is still being studied. That's why no serious professional can recommend it to you today outside a clinical trial.",
          },
        ],
      },
      {
        h2: "So what can you do today?",
        blocks: [
          {
            type: "p",
            text: "If retatrutide interests you because you want to lose weight effectively, the good news is that you don't have to wait years. Approved, legal treatments with years of evidence behind them already exist: semaglutide and tirzepatide, prescribed with a prescription and medical follow-up.",
          },
          {
            type: "p",
            text: "At DoctorLife, a free medical assessment lets you find out whether one of these treatments fits your case, without resorting to experimental medicines or illegal online purchases.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is retatrutide available in the UK yet?",
        answer:
          "No. Retatrutide is an experimental medicine that hasn't yet been approved by the MHRA or the EMA, so it isn't on sale in the UK or the European Union. Any product advertised as 'retatrutide' outside the legal supply chain is a risk to your health.",
      },
      {
        question: "How much weight do you lose with retatrutide?",
        answer:
          "In the phase 2 trial, people on the highest dose lost on average around 24% of their weight in 48 weeks. These are very striking results, but they still need to be confirmed in phase 3 trials before any possible approval.",
      },
      {
        question: "How does it differ from Ozempic or Mounjaro?",
        answer:
          "Ozempic (semaglutide) acts on one hormone, Mounjaro (tirzepatide) on two and retatrutide on three (GLP‑1, GIP and glucagon). That triple mechanism would explain its greater weight losses, but unlike the other two, retatrutide isn't approved yet.",
      },
      {
        question: "Is there a legal alternative available now?",
        answer:
          "Yes. Semaglutide and tirzepatide are approved and prescribed with a prescription and medical supervision. A medical assessment lets you find out whether they're right for you, safely and without resorting to experimental medicines.",
      },
    ],
    sources: [S.nejm, S.lilly, S.ema, S.mhra],
    authorSlug: "laura-mendez",
    reviewerSlug: "carlos-vidal",
    datePublished: "2026-06-10",
    dateModified: "2026-06-16",
    relatedSlugs: ["where-to-buy-retatrutide-uk", "retatrutide-vs-ozempic-mounjaro", "is-ozempic-worth-it"],
    cover: "/articles/retatrutida-que-es.png",
    coverAlt: "Injectable medication pen on a warm surface representing retatrutide",
    readMins: 8,
  },

  {
    slug: "where-to-buy-retatrutide-uk",
    title: "Buying retatrutide in the UK",
    h1: "Buying retatrutide in the UK: is it possible in 2026?",
    metaTitle: "Buying Retatrutide in the UK: Can You? (2026 Warning) | DoctorLife",
    metaDescription:
      "Can you buy retatrutide in the UK? Right now it's NOT legal or approved. We explain the risks of the black market and which legal alternatives do exist.",
    category: "Availability",
    answerFirst:
      "No, it isn't currently possible to buy retatrutide legally in the UK: it's an experimental medicine that hasn't yet been approved by the MHRA or the EMA, so it doesn't exist in pharmacies or on prescription. Any website selling it operates on the black market, with serious risks to your health. Legal, effective alternatives do exist with medical supervision.",
    keyTakeaways: [
      "Retatrutide isn't approved or on sale in the UK: you won't find it in any legitimate pharmacy.",
      "The websites offering it sell products with no guarantees, counterfeit or dangerous.",
      "Buying and injecting an unapproved medicine is illegal and a serious risk to your health.",
      "Approved treatments exist (semaglutide, tirzepatide) that you can use on prescription.",
      "A free medical assessment tells you which legal option fits you today.",
    ],
    body: [
      {
        h2: "The short answer: you can't buy it legally today",
        blocks: [
          {
            type: "p",
            text: "If you've come here looking for where to buy retatrutide in the UK, it's worth being clear from the start: you can't do it legally. Retatrutide is still an investigational medicine. It hasn't completed the necessary trials or received authorisation from the European Medicines Agency (EMA) or the UK's Medicines and Healthcare products Regulatory Agency (MHRA).",
          },
          {
            type: "p",
            text: "That means it doesn't exist in pharmacies, can't be prescribed and no official channel distributes it. For now, it's reserved for controlled clinical trials.",
          },
        ],
      },
      {
        h2: "Why you should distrust anyone selling it to you",
        blocks: [
          {
            type: "p",
            text: "Precisely because so many people are searching for it, websites, social media accounts and sellers have appeared offering supposed 'retatrutide'. Behind those offers there is almost never a real, safe medicine:",
          },
          {
            type: "list",
            items: [
              "You don't know what the vial contains: it could be a fake substance, wrongly dosed or contaminated.",
              "There's no control of manufacturing, sterility or cold chain.",
              "No one supervises the dose or the adverse effects, which can be serious.",
              "It's illegal: importing and using an unauthorised medicine has legal consequences.",
              "If something goes wrong, you have no guarantee or medical support.",
            ],
          },
          {
            type: "quote",
            text: "Injecting yourself with a product bought online, whose origin and contents you don't know, isn't 'getting ahead of the future': it's gambling with your health.",
          },
        ],
      },
      {
        h2: "Why so many people are searching for it",
        blocks: [
          {
            type: "p",
            text: "The excitement is understandable. The preliminary retatrutide data show the largest weight losses seen with a medicine — up to 24% in the studies — and that generates huge interest among people who have spent years trying to lose weight without success. The problem is confusing 'promising news' with 'available treatment'.",
          },
          {
            type: "p",
            text: "Retatrutide will probably be approved in the coming years if it confirms its efficacy and safety. But until then, chasing it through unofficial channels only exposes you to risks with no real benefit.",
          },
        ],
      },
      {
        h2: "What you can do today (and it's legal)",
        blocks: [
          {
            type: "p",
            text: "The good news is that you don't need to wait for retatrutide to treat your weight with an effective medicine. Approved options with years of evidence and available on prescription already exist:",
          },
          {
            type: "list",
            items: [
              "Semaglutide (the active ingredient in Ozempic and Wegovy): weight loss of around 15% in the studies.",
              "Tirzepatide (the active ingredient in Mounjaro): a dual agonist, with losses of up to 22%.",
              "Both are prescribed after a medical assessment and with professional follow-up.",
            ],
          },
          {
            type: "p",
            text: "At DoctorLife you can have a free medical assessment to find out whether one of these treatments is right for you. It's the way to get real results without resorting to experimental medicines or illegal purchases.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Where can I buy retatrutide in the UK?",
        answer:
          "Nowhere legally. Retatrutide isn't approved by the MHRA or the EMA, so it isn't sold in pharmacies or on prescription. Any website or seller offering it is operating outside the law and putting your health at risk.",
      },
      {
        question: "Is it dangerous to buy retatrutide online?",
        answer:
          "Yes, very. You have no guarantees about what the product contains, how it was made or whether it's contaminated. Using an unapproved medicine without medical supervision can cause serious adverse effects and is illegal.",
      },
      {
        question: "When will retatrutide be available in the UK?",
        answer:
          "There's no confirmed date. It depends on completing the phase 3 trials and receiving approval from the MHRA and the EMA, which usually takes several years. Until then it won't be available through any legal channel.",
      },
      {
        question: "What legal alternative is there in the meantime?",
        answer:
          "Semaglutide and tirzepatide are already approved and prescribed with a prescription and follow-up. A free medical assessment at DoctorLife lets you find out whether one fits your case, safely and legally.",
      },
    ],
    sources: [S.mhra, S.ema, S.nejm, S.easo],
    authorSlug: "carlos-vidal",
    reviewerSlug: "laura-mendez",
    datePublished: "2026-06-12",
    dateModified: "2026-06-16",
    relatedSlugs: ["what-is-retatrutide", "retatrutide-vs-ozempic-mounjaro", "is-ozempic-worth-it"],
    cover: "/articles/retatrutida-comprar-espana.png",
    coverAlt: "Person searching on their phone how to buy retatrutide with a blurred pharmacy in the background",
    readMins: 7,
  },

  {
    slug: "retatrutide-vs-ozempic-mounjaro",
    title: "Retatrutide vs Ozempic and Mounjaro",
    h1: "Retatrutide vs Ozempic, Wegovy and Mounjaro: which is best?",
    metaTitle: "Retatrutide vs Ozempic vs Mounjaro: 2026 Comparison | DoctorLife",
    metaDescription:
      "A comparison of retatrutide, semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro): mechanism, weight loss and availability. Which you can use in the UK today.",
    category: "Comparison",
    answerFirst:
      "Retatrutide is a triple agonist (GLP‑1, GIP and glucagon) and in trials achieves the largest weight losses (up to 24%), ahead of tirzepatide (Mounjaro, up to 22%) and semaglutide (Ozempic/Wegovy, around 15%). However, retatrutide is still experimental, while the other two are already approved and available on prescription in the UK.",
    keyTakeaways: [
      "The key difference is the mechanism: semaglutide acts on 1 hormone, tirzepatide on 2 and retatrutide on 3.",
      "In the studies, weight loss grows with each generation: ~15%, ~22% and up to 24%.",
      "Only semaglutide and tirzepatide are approved and available in the UK.",
      "More potential weight loss doesn't mean it's the best option for you: safety and follow-up matter.",
      "The right option is decided in a medical assessment, not by a headline figure.",
    ],
    body: [
      {
        h2: "The difference is in how many hormones they activate",
        blocks: [
          {
            type: "p",
            text: "All three medicines belong to the same family, but represent different generations. The key to understanding them is how many gut hormones they mimic, because that's where their differences in efficacy come from.",
          },
          {
            type: "list",
            items: [
              "Semaglutide (Ozempic, Wegovy): single GLP‑1 agonist.",
              "Tirzepatide (Mounjaro): dual agonist of GLP‑1 and GIP.",
              "Retatrutide: triple agonist of GLP‑1, GIP and glucagon.",
            ],
          },
        ],
      },
      {
        h2: "Quick comparison",
        blocks: [
          {
            type: "table",
            caption: "Indicative comparison based on clinical trial data. It isn't a treatment recommendation.",
            head: ["Medicine", "Mechanism", "Weight loss (studies)", "Available in the UK"],
            rows: [
              ["Semaglutide (Ozempic/Wegovy)", "GLP‑1 agonist", "~15%", "Yes, on prescription"],
              ["Tirzepatide (Mounjaro)", "Dual: GLP‑1 + GIP", "Up to ~22%", "Yes, on prescription"],
              ["Retatrutide", "Triple: GLP‑1 + GIP + glucagon", "Up to ~24%", "No (experimental)"],
            ],
          },
          {
            type: "p",
            text: "The weight loss figures come from different trials and aren't directly comparable with each other, but they give a sense of the trend: each generation adds a mechanism and, with it, greater potential for weight loss.",
          },
        ],
      },
      {
        h2: "More weight loss doesn't mean 'better for you'",
        blocks: [
          {
            type: "p",
            text: "It's tempting to focus on the highest number, but the best option isn't the one that loses the most weight in a study, but the one that's appropriate and safe for your specific case. Your medical history, other conditions, the side effects you tolerate and, above all, what's approved and available all play a role.",
          },
          {
            type: "quote",
            text: "The 'most powerful' medicine on paper is no use if you can't use it legally and under supervision. Today, that rules out retatrutide.",
          },
        ],
      },
      {
        h2: "What you can use in the UK today",
        blocks: [
          {
            type: "p",
            text: "As things stand, the realistic and legal options are semaglutide and tirzepatide. Both have years of evidence, are prescribed with a prescription and are used with medical follow-up to adjust the dose and monitor effects. Retatrutide, however promising, isn't one of them yet.",
          },
          {
            type: "p",
            text: "The sensible way to decide is a medical assessment: a professional reviews your situation and tells you which approved treatment fits you. At DoctorLife that first assessment is free.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is retatrutide better than Mounjaro or Ozempic?",
        answer:
          "In trials, retatrutide shows greater weight losses (up to 24%) than tirzepatide (Mounjaro) or semaglutide (Ozempic). But 'better in a study' doesn't equal better for you: retatrutide is still experimental and can't be used, while the other two are already available.",
      },
      {
        question: "Which one loses the most weight?",
        answer:
          "According to the available data, retatrutide loses the most, followed by tirzepatide and then semaglutide. Even so, the figures come from different studies and aren't directly comparable, and the response varies greatly from person to person.",
      },
      {
        question: "Can I choose which medicine to use?",
        answer:
          "Not directly. They're prescription medicines: the doctor assesses your case and decides which is appropriate and safe for you, adjusting the dose and providing follow-up. Self-prescribing or buying them online is dangerous and illegal.",
      },
      {
        question: "Why can't I use retatrutide if it's the most effective?",
        answer:
          "Because it hasn't yet been approved by the MHRA or the EMA and is still in the research phase. Until it completes the trials and receives authorisation, it isn't legally available in the UK.",
      },
    ],
    sources: [S.nejm, S.lilly, S.mhra, S.ema, S.easo],
    authorSlug: "carlos-vidal",
    reviewerSlug: "laura-mendez",
    datePublished: "2026-06-14",
    dateModified: "2026-06-16",
    relatedSlugs: ["what-is-retatrutide", "where-to-buy-retatrutide-uk", "is-ozempic-worth-it"],
    cover: "/articles/retatrutida-vs-ozempic-mounjaro.png",
    coverAlt: "Three injectable pens lined up comparing retatrutide, Ozempic and Mounjaro",
    readMins: 8,
  },
];

/* ── Helpers ── */
export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelated(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return articles.filter((a) => a.authorSlug === authorSlug || a.reviewerSlug === authorSlug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
