/* ───────────────────────────────────────────────────────────
   DoctorLife blog content. High-intent SEO posts for the UK
   market (GLP-1, Wegovy, Mounjaro, Ozempic…).
   Edit/add posts here and the whole blog + sitemap updates.
   ─────────────────────────────────────────────────────────── */

import { generateMunicipioPosts } from "./blog-municipios";

export type InlineLink = { label: string; href: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "links"; title?: string; items: InlineLink[] };

export type Section = { h2: string; blocks: Block[] };
export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  keyword: string;
  readMins: number;
  date: string; // ISO
  updated: string; // ISO
  cover: string;
  coverAlt: string;
  featured?: boolean;
  /** Target location of the page (city/region). If present, the local
   *  greeting uses this place instead of IP geo, so it never contradicts
   *  the content (e.g. a London page → "London"). */
  place?: string;
  sections: Section[];
  faqs: Faq[];
};

/* Brand and medical authorship (E-E-A-T for YMYL health content) */
export const BRAND = "DoctorLife";

export const MEDICAL_REVIEWER = {
  name: "Dr Miguel A. Guirola",
  role: "Obesity specialist doctor · DoctorLife doctor",
  credentials: "GMC-registered · General Medical Council",
  bio: "GMC-registered obesity specialist with more than 12 years' experience in weight management and GLP-1 treatment. He reviews DoctorLife's clinical content.",
};

const PRICE_NOTE =
  "At DoctorLife your first medical consultation is free, with no obligation. All follow-up is managed from our in-app service.";

const manualPosts: Post[] = [
  /* 1 ───────────────────────────────────────────── */
  {
    slug: "buy-wegovy-uk",
    title: "Buy Wegovy in the UK",
    h1: "Buy Wegovy in the UK: price, prescription and how to start",
    metaTitle: "Buy Wegovy in the UK (2026): Price, Prescription & How to Start",
    metaDescription:
      "How to buy Wegovy in the UK with a prescription: real prices, how to get the prescription and start with medical follow-up. First consultation free!",
    excerpt:
      "Everything you need to buy Wegovy in the UK legally and safely: price, private prescription and how to start with clinical support.",
    category: "Wegovy",
    keyword: "buy wegovy uk",
    readMins: 7,
    date: "2026-01-08",
    updated: "2026-06-16",
    cover: "/hero/woman.png",
    coverAlt: "Smiling patient after starting Wegovy treatment in the UK",
    featured: true,
    place: "the UK",
    sections: [
      {
        h2: "Can you buy Wegovy in the UK?",
        blocks: [
          {
            type: "p",
            text: "Yes. Wegovy (semaglutide 2.4 mg) is available at UK pharmacies, but it is a prescription-only medicine. You cannot buy it without a prescription issued by a registered professional after a clinical assessment. Any website offering Wegovy 'without a prescription' is neither legal nor safe.",
          },
          {
            type: "p",
            text: "The right way to start is with a medical consultation that confirms the treatment is suitable for you, sets your dose and monitors your progress and any side effects.",
          },
        ],
      },
      {
        h2: "Wegovy price in the UK",
        blocks: [
          {
            type: "p",
            text: "The price of Wegovy in the UK varies by dose (the pen escalates in steps: 0.25 / 0.5 / 1 / 1.7 / 2.4 mg). As a guide, a monthly pen usually costs between £150 and £200 at the pharmacy, plus the cost of the consultation and medical follow-up.",
          },
          {
            type: "p",
            text: "At DoctorLife we separate the costs: the medical follow-up plan has a fixed monthly price, and the medicine is bought at the pharmacy only if the doctor prescribes it. That way you know exactly what you pay for.",
          },
          {
            type: "table",
            caption: "Indicative Wegovy price by dose in the UK",
            head: ["Pen dose", "Treatment phase", "Indicative price/month"],
            rows: [
              ["0.25 mg", "Start (weeks 1–4)", "£150–£170"],
              ["0.5 mg", "Adjustment", "£150–£180"],
              ["1 mg", "Escalation", "£160–£190"],
              ["1.7 mg", "Escalation", "£170–£200"],
              ["2.4 mg", "Maintenance", "£180–£200"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Is there a Wegovy shortage in the UK?",
        blocks: [
          {
            type: "p",
            text: "Wegovy availability has been irregular in the UK, with shortages mostly affecting the lower starter doses. The situation has been improving, but it is worth confirming stock at your pharmacy before you start and having a medical team that can adjust the regimen if a particular dose is unavailable.",
          },
          {
            type: "p",
            text: "If a strength is missing, the doctor can consider alternatives in the same family (for example, another dose or a different GLP-1) so your progress is not interrupted. That is why it is better to start with follow-up than to buy the pen on your own.",
          },
        ],
      },
      {
        h2: "How to start, step by step",
        blocks: [
          {
            type: "list",
            items: [
              "Book your first medical consultation (free).",
              "Complete your history and health goals in the app.",
              "A GMC-registered doctor assesses whether Wegovy or another GLP-1 is right for you.",
              "If appropriate, you receive the prescription and dosing guidance.",
              "Continuous follow-up in the app: dose, side effects and progress.",
            ],
          },
        ],
      },
      {
        h2: "Is Wegovy safe?",
        blocks: [
          {
            type: "p",
            text: "Wegovy is safe when used under medical supervision. The most common side effects (nausea, slower digestion) are usually mild and temporary, and are managed by escalating the dose gradually. That is why follow-up matters so much: it is not just buying the pen, it is supporting the whole process.",
          },
          {
            type: "links",
            title: "Keep reading",
            items: [
              { label: "Wegovy price in the UK: how much per dose", href: "/blog/wegovy-price-uk" },
              { label: "Ozempic vs Wegovy vs Mounjaro: which to choose", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "How to get a Wegovy prescription online", href: "/blog/wegovy-prescription-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Wegovy safe?",
        a: "Yes, Wegovy is safe when taken under medical supervision with the dose escalated gradually. The most common side effects (nausea, slower digestion) are usually mild and temporary. It should not be used without medical assessment and follow-up.",
      },
      {
        q: "Can I buy Wegovy without a prescription in the UK?",
        a: "No. Wegovy is a prescription-only medicine. Buying it without a prescription is illegal and carries serious health risks.",
      },
      {
        q: "How much does it cost to start with DoctorLife?",
        a: "The first medical consultation is free. The medicine is bought separately at the pharmacy if it is prescribed.",
      },
      {
        q: "How long until I see results?",
        a: "Most patients notice changes in appetite within the first few weeks, with gradual weight loss over the following months depending on the dose and plan.",
      },
    ],
  },

  /* 2 ───────────────────────────────────────────── */
  {
    slug: "wegovy-price-uk",
    title: "Wegovy price in the UK",
    h1: "Wegovy price in the UK: how much it costs per dose",
    metaTitle: "Wegovy Price UK (2026): How Much It Costs Per Dose",
    metaDescription:
      "Wegovy price in the UK by dose: what a monthly pen costs, what is included in the consultation and how to start safely. First consultation free!",
    excerpt:
      "How much Wegovy costs in the UK by dose, what changes between pharmacies and how to start with real medical follow-up.",
    category: "Prices",
    keyword: "wegovy price uk",
    readMins: 6,
    date: "2026-01-12",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Wegovy pens with indicative UK pricing",
    place: "the UK",
    sections: [
      {
        h2: "How much does Wegovy cost in the UK?",
        blocks: [
          {
            type: "p",
            text: "The price of Wegovy depends on the dose of the pen, which escalates in five steps. As a guide, a monthly pen usually sits between £150 and £200 at UK pharmacies, with small variations between pharmacies.",
          },
          {
            type: "table",
            caption: "Indicative Wegovy price by dose",
            head: ["Pen dose", "Treatment phase", "Indicative price/month"],
            rows: [
              ["0.25 mg", "Start", "£150–£170"],
              ["0.5 mg", "Adjustment", "£150–£180"],
              ["1 mg", "Escalation", "£160–£190"],
              ["1.7 mg", "Escalation", "£170–£200"],
              ["2.4 mg", "Maintenance", "£180–£200"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "What does the price include?",
        blocks: [
          {
            type: "p",
            text: "The pharmacy price covers the medicine only. The medical assessment, prescription and follow-up are separate. At DoctorLife the first consultation is free, and follow-up is handled entirely in the app.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Wegovy available on the NHS?",
        a: "Wegovy is available on the NHS for some patients through specialist weight-management services, but access is limited and waiting lists are long. Many patients choose the private route for faster access.",
      },
      {
        q: "Why does the price change between pharmacies?",
        a: "Private pricing is not fixed, so there are small variations between pharmacies. The dose you are on also affects the monthly cost.",
      },
    ],
  },

  /* 3 ───────────────────────────────────────────── */
  {
    slug: "buy-mounjaro-uk",
    title: "Buy Mounjaro in the UK",
    h1: "Buy Mounjaro (tirzepatide) in the UK: full guide",
    metaTitle: "Buy Mounjaro in the UK (2026): Price, Prescription & Results",
    metaDescription:
      "How to buy Mounjaro (tirzepatide) in the UK with a prescription: price, differences from Wegovy, results and how to start with medical follow-up. First consultation free!",
    excerpt:
      "Mounjaro (tirzepatide) is one of the most effective GLP-1 medicines for weight loss. We explain the price, prescription and how to start in the UK.",
    category: "Mounjaro",
    keyword: "buy mounjaro uk",
    readMins: 8,
    date: "2026-01-15",
    updated: "2026-06-16",
    cover: "/products/maren-pen.png",
    coverAlt: "Mounjaro (tirzepatide) pen for weight loss in the UK",
    place: "the UK",
    sections: [
      {
        h2: "Can you buy Mounjaro in the UK?",
        blocks: [
          {
            type: "p",
            text: "Yes, with a prescription. Mounjaro (tirzepatide) is available at UK pharmacies and is prescription-only. A GMC-registered doctor must assess whether it is right for you before it can be dispensed.",
          },
          {
            type: "p",
            text: "Mounjaro is a dual GIP/GLP-1 agonist and has shown the greatest average weight loss in clinical trials (up to around 20%), which is why demand has grown so quickly.",
          },
        ],
      },
      {
        h2: "Mounjaro price in the UK",
        blocks: [
          {
            type: "table",
            caption: "Indicative Mounjaro price by dose",
            head: ["Pen dose", "Treatment phase", "Indicative price/month"],
            rows: [
              ["2.5 mg", "Start", "£120–£150"],
              ["5 mg", "Adjustment", "£140–£180"],
              ["7.5–10 mg", "Escalation", "£170–£220"],
              ["12.5–15 mg", "Maintenance", "£200–£250"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "How to start, step by step",
        blocks: [
          {
            type: "list",
            items: [
              "Book your first medical consultation (free).",
              "Video consultation with a GMC-registered doctor: history, BMI and goals.",
              "If appropriate, a private prescription for Mounjaro valid at any UK pharmacy.",
              "Continuous follow-up in the app: dose escalation, side effects and progress.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Mounjaro better than Wegovy?",
        a: "In clinical trials Mounjaro (tirzepatide) showed greater average weight loss than semaglutide, but the best choice depends on your medical history and goals. A doctor will advise which is right for you.",
      },
      {
        q: "Can I buy Mounjaro without a prescription?",
        a: "No. Mounjaro is prescription-only in the UK. Buying it without a prescription is illegal and unsafe.",
      },
    ],
  },

  /* 4 ───────────────────────────────────────────── */
  {
    slug: "mounjaro-price-uk",
    title: "Mounjaro price in the UK",
    h1: "Mounjaro price in the UK: how much it costs per dose",
    metaTitle: "Mounjaro Price UK (2026): How Much It Costs Per Dose",
    metaDescription:
      "Mounjaro (tirzepatide) price in the UK by dose: what a monthly pen costs and how to start with medical follow-up. First consultation free!",
    excerpt:
      "How much Mounjaro costs in the UK by dose and what is included beyond the pharmacy price.",
    category: "Prices",
    keyword: "mounjaro price uk",
    readMins: 6,
    date: "2026-01-18",
    updated: "2026-06-16",
    cover: "/products/maren-pen.png",
    coverAlt: "Mounjaro pen with indicative UK pricing",
    place: "the UK",
    sections: [
      {
        h2: "How much does Mounjaro cost in the UK?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro pricing depends on the dose, which escalates from 2.5 mg up to 15 mg. As a guide, monthly costs range from around £120 at the starter dose to £250 at higher maintenance doses.",
          },
          {
            type: "table",
            caption: "Indicative Mounjaro price by dose",
            head: ["Pen dose", "Treatment phase", "Indicative price/month"],
            rows: [
              ["2.5 mg", "Start", "£120–£150"],
              ["5 mg", "Adjustment", "£140–£180"],
              ["7.5–10 mg", "Escalation", "£170–£220"],
              ["12.5–15 mg", "Maintenance", "£200–£250"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Mounjaro available on the NHS?",
        a: "Mounjaro is being rolled out on the NHS for weight management, but eligibility is limited and phased. Many patients choose the private route for faster access.",
      },
      {
        q: "Does the price include the consultation?",
        a: "No. The pharmacy price is for the medicine only. At DoctorLife the first medical consultation is free.",
      },
    ],
  },

  /* 5 ───────────────────────────────────────────── */
  {
    slug: "buy-ozempic-uk",
    title: "Buy Ozempic in the UK",
    h1: "Buy Ozempic in the UK: price, prescription and how to start",
    metaTitle: "Buy Ozempic in the UK (2026): Price, Prescription & How to Start",
    metaDescription:
      "How to buy Ozempic in the UK with a prescription: price, what it is licensed for and how to start with medical follow-up. First consultation free!",
    excerpt:
      "Everything you need to know about buying Ozempic in the UK: price, prescription and what a doctor will consider for weight loss.",
    category: "Ozempic",
    keyword: "buy ozempic uk",
    readMins: 7,
    date: "2026-01-22",
    updated: "2026-06-16",
    cover: "/blog/ozempic-madrid.png",
    coverAlt: "Ozempic pen for treatment in the UK",
    place: "the UK",
    sections: [
      {
        h2: "Can you buy Ozempic in the UK?",
        blocks: [
          {
            type: "p",
            text: "Yes, with a prescription. Ozempic (semaglutide) is licensed for type 2 diabetes. For weight loss specifically, doctors usually consider medicines with a specific licence such as Wegovy, but a clinician will advise on the best option for you.",
          },
          {
            type: "p",
            text: "Ozempic is prescription-only. Any website offering it without a prescription is operating outside the law and is a real risk to your health.",
          },
        ],
      },
      {
        h2: "Ozempic price in the UK",
        blocks: [
          {
            type: "table",
            caption: "Indicative Ozempic details",
            head: ["Detail", "Information"],
            rows: [
              ["Active ingredient", "semaglutide"],
              ["Regimen", "Weekly injection"],
              ["Indicative price", "£130–£180/month"],
              ["Prescription", "Required (private prescription valid UK-wide)"],
              ["First consultation", "Free with DoctorLife"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Ozempic licensed for weight loss?",
        a: "Ozempic is licensed for type 2 diabetes. For weight loss, doctors usually consider alternatives with a specific weight-loss licence, such as Wegovy (the same active ingredient, semaglutide).",
      },
      {
        q: "Can I buy Ozempic without a prescription?",
        a: "No. Ozempic is prescription-only in the UK. A medical assessment is always the first step.",
      },
    ],
  },

  /* 6 ───────────────────────────────────────────── */
  {
    slug: "ozempic-price-uk",
    title: "Ozempic price in the UK",
    h1: "Ozempic price in the UK: how much it costs",
    metaTitle: "Ozempic Price UK (2026): How Much It Costs",
    metaDescription:
      "Ozempic price in the UK: what a monthly pen costs, what is included and how to start with medical follow-up. First consultation free!",
    excerpt: "How much Ozempic costs in the UK and what a doctor will consider for your case.",
    category: "Prices",
    keyword: "ozempic price uk",
    readMins: 5,
    date: "2026-01-25",
    updated: "2026-06-16",
    cover: "/blog/ozempic-madrid.png",
    coverAlt: "Ozempic pen with indicative UK pricing",
    place: "the UK",
    sections: [
      {
        h2: "How much does Ozempic cost in the UK?",
        blocks: [
          {
            type: "p",
            text: "Ozempic typically costs around £130–£180 per month at UK pharmacies, depending on the dose and pharmacy. The medical consultation and follow-up are separate.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Ozempic cheaper than Wegovy?",
        a: "Prices are broadly similar and vary by pharmacy and dose. The right choice depends on your medical needs, not just price.",
      },
    ],
  },

  /* 7 ───────────────────────────────────────────── */
  {
    slug: "ozempic-vs-wegovy-vs-mounjaro",
    title: "Ozempic vs Wegovy vs Mounjaro",
    h1: "Ozempic vs Wegovy vs Mounjaro: which one to choose",
    metaTitle: "Ozempic vs Wegovy vs Mounjaro: Which to Choose (2026)",
    metaDescription:
      "Ozempic, Wegovy and Mounjaro compared: active ingredients, licences, average weight loss and price. Get a medical assessment. First consultation free!",
    excerpt:
      "The key differences between Ozempic, Wegovy and Mounjaro: active ingredient, licence, effectiveness and how to choose with a doctor.",
    category: "Comparisons",
    keyword: "ozempic vs wegovy vs mounjaro",
    readMins: 8,
    date: "2026-02-02",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Ozempic, Wegovy and Mounjaro pens side by side",
    place: "the UK",
    sections: [
      {
        h2: "The quick comparison",
        blocks: [
          {
            type: "table",
            caption: "Ozempic vs Wegovy vs Mounjaro",
            head: ["Medicine", "Active ingredient", "Licence", "Indicative price/month"],
            rows: [
              ["Ozempic", "semaglutide", "Type 2 diabetes", "£130–£180"],
              ["Wegovy", "semaglutide 2.4 mg", "Weight loss", "£150–£200"],
              ["Mounjaro", "tirzepatide", "Type 2 diabetes & weight loss", "£120–£250"],
            ],
          },
        ],
      },
      {
        h2: "Which one is right for you?",
        blocks: [
          {
            type: "p",
            text: "If your goal is weight loss, Wegovy and Mounjaro are the usual candidates because of their licences and clinical evidence. Ozempic is licensed for type 2 diabetes. Mounjaro has shown the greatest average weight loss in trials, but the best choice depends on your history, tolerance and goals.",
          },
          {
            type: "links",
            title: "Keep reading",
            items: [
              { label: "Buy Wegovy in the UK", href: "/blog/buy-wegovy-uk" },
              { label: "Buy Mounjaro in the UK", href: "/blog/buy-mounjaro-uk" },
              { label: "Wegovy vs Mounjaro", href: "/blog/wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Which is most effective for weight loss?",
        a: "In clinical trials, Mounjaro (tirzepatide) showed the greatest average weight loss, followed by Wegovy. However, the most effective option for you depends on your medical assessment.",
      },
      {
        q: "Can a doctor switch me between them?",
        a: "Yes. If one medicine is not tolerated or is out of stock, a doctor can consider switching within the GLP-1 family with appropriate monitoring.",
      },
    ],
  },

  /* 8 ───────────────────────────────────────────── */
  {
    slug: "wegovy-vs-mounjaro",
    title: "Wegovy vs Mounjaro",
    h1: "Wegovy vs Mounjaro: which is better for weight loss",
    metaTitle: "Wegovy vs Mounjaro: Which Is Better for Weight Loss (2026)",
    metaDescription:
      "Wegovy vs Mounjaro compared: active ingredient, average weight loss, side effects and price. Get a medical assessment. First consultation free!",
    excerpt:
      "Wegovy (semaglutide) vs Mounjaro (tirzepatide): the differences that matter and how to choose with a doctor.",
    category: "Comparisons",
    keyword: "wegovy vs mounjaro",
    readMins: 7,
    date: "2026-02-08",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Wegovy and Mounjaro pens side by side",
    place: "the UK",
    sections: [
      {
        h2: "Head to head",
        blocks: [
          {
            type: "table",
            caption: "Wegovy vs Mounjaro",
            head: ["Detail", "Wegovy", "Mounjaro"],
            rows: [
              ["Active ingredient", "semaglutide 2.4 mg", "tirzepatide"],
              ["Mechanism", "GLP-1 agonist", "Dual GIP/GLP-1 agonist"],
              ["Regimen", "Weekly injection", "Weekly injection"],
              ["Average weight loss", "~15%", "up to ~20%"],
              ["Indicative price/month", "£150–£200", "£120–£250"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Mounjaro stronger than Wegovy?",
        a: "Mounjaro showed greater average weight loss in trials, but 'stronger' is not always better for every patient. Tolerability and medical suitability matter too.",
      },
      {
        q: "Which has fewer side effects?",
        a: "Both share similar gastrointestinal side effects (nausea, slower digestion) that are usually mild and managed by escalating the dose slowly. Individual experience varies.",
      },
    ],
  },

  /* 9 ───────────────────────────────────────────── */
  {
    slug: "wegovy-prescription-online",
    title: "Wegovy prescription online",
    h1: "How to get a Wegovy prescription online in the UK",
    metaTitle: "Wegovy Prescription Online UK: With a GMC-Registered Doctor",
    metaDescription:
      "How to get a Wegovy prescription online in the UK with a GMC-registered doctor: legal, fast and with follow-up. First consultation free!",
    excerpt:
      "How the online route works to get a Wegovy prescription in the UK: assessment, private prescription and app-based follow-up.",
    category: "Prescription",
    keyword: "wegovy prescription online",
    readMins: 6,
    date: "2026-02-14",
    updated: "2026-06-16",
    cover: "/hero/woman.png",
    coverAlt: "Online video consultation to get a Wegovy prescription",
    place: "the UK",
    sections: [
      {
        h2: "Can I get a Wegovy prescription online?",
        blocks: [
          {
            type: "p",
            text: "Yes. In the UK a private prescription for Wegovy can be issued after an online video consultation with a GMC-registered doctor, provided the treatment is clinically appropriate for you. The prescription is valid at any UK pharmacy.",
          },
          {
            type: "list",
            items: [
              "Book the first consultation free, with no GP referral needed.",
              "Video consultation with a GMC-registered doctor: history, BMI and goals.",
              "If appropriate, a private prescription valid at your local pharmacy.",
              "Continuous follow-up in the app: dose, side effects and adjustments.",
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is an online prescription legal in the UK?",
        a: "Yes. A private prescription issued by a GMC-registered doctor after a proper assessment is legal and valid at any UK pharmacy.",
      },
      {
        q: "Do I need a GP referral?",
        a: "No. The private online route is direct and does not require an NHS GP referral.",
      },
    ],
  },

  /* 10 ───────────────────────────────────────────── */
  {
    slug: "ozempic-for-weight-loss",
    title: "Ozempic for weight loss",
    h1: "Ozempic for weight loss: what you need to know",
    metaTitle: "Ozempic for Weight Loss: What to Know (2026)",
    metaDescription:
      "Ozempic for weight loss in the UK: how it works, what it is licensed for and safer alternatives. Get a medical assessment. First consultation free!",
    excerpt:
      "How Ozempic works, what it is licensed for, and why a doctor may recommend a weight-loss-licensed alternative.",
    category: "Weight loss",
    keyword: "ozempic for weight loss",
    readMins: 6,
    date: "2026-02-20",
    updated: "2026-06-16",
    cover: "/blog/ozempic-madrid.png",
    coverAlt: "Ozempic and healthy lifestyle for weight loss",
    place: "the UK",
    sections: [
      {
        h2: "Does Ozempic help with weight loss?",
        blocks: [
          {
            type: "p",
            text: "Ozempic contains semaglutide, the same active ingredient as Wegovy, and reduces appetite. However, Ozempic is licensed for type 2 diabetes, not weight loss. For weight loss specifically, doctors usually consider Wegovy or Mounjaro, which have the appropriate licences.",
          },
          {
            type: "p",
            text: "Whichever medicine is used, weight loss works best alongside medical follow-up and lifestyle changes.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Ozempic the same as Wegovy?",
        a: "Both contain semaglutide, but Wegovy is licensed for weight loss and uses a higher dose (2.4 mg), while Ozempic is licensed for type 2 diabetes.",
      },
      {
        q: "How much weight can I lose?",
        a: "Average weight loss with semaglutide is around 15% in trials, but individual results depend on dose, adherence and lifestyle.",
      },
    ],
  },

  /* 11 ───────────────────────────────────────────── */
  {
    slug: "ozempic-side-effects",
    title: "Ozempic side effects",
    h1: "Ozempic side effects: what to expect and how to manage them",
    metaTitle: "Ozempic Side Effects: What to Expect & How to Manage",
    metaDescription:
      "Common Ozempic side effects, how long they last and how a doctor helps manage them. Start with medical follow-up. First consultation free!",
    excerpt:
      "The most common Ozempic side effects, why they happen and how medical follow-up keeps treatment safe.",
    category: "Ozempic",
    keyword: "ozempic side effects",
    readMins: 6,
    date: "2026-02-26",
    updated: "2026-06-16",
    cover: "/blog/ozempic-madrid.png",
    coverAlt: "Patient reviewing Ozempic side effects with a doctor",
    place: "the UK",
    sections: [
      {
        h2: "Common side effects",
        blocks: [
          {
            type: "list",
            items: [
              "Nausea, especially in the first weeks.",
              "Slower digestion, bloating or constipation.",
              "Occasional diarrhoea or reflux.",
              "Reduced appetite (this is part of how it works).",
            ],
          },
          {
            type: "p",
            text: "Most side effects are mild and temporary. They are usually managed by escalating the dose slowly and adjusting timing and diet with your doctor's guidance.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long do Ozempic side effects last?",
        a: "They tend to be worst in the first weeks and after each dose increase, then ease as your body adjusts. Report persistent or severe symptoms to your doctor.",
      },
      {
        q: "When should I contact a doctor?",
        a: "Contact your doctor if you have severe or persistent vomiting, signs of dehydration, or severe abdominal pain. Medical follow-up is included with DoctorLife.",
      },
    ],
  },

  /* 12 ───────────────────────────────────────────── */
  {
    slug: "saxenda-price-uk",
    title: "Saxenda price in the UK",
    h1: "Saxenda price in the UK: how much it costs",
    metaTitle: "Saxenda Price UK (2026): How Much It Costs",
    metaDescription:
      "Saxenda (liraglutide) price in the UK: what it costs per month, how it is used and how to start with medical follow-up. First consultation free!",
    excerpt: "How much Saxenda costs in the UK and how it compares with weekly GLP-1 injections.",
    category: "Saxenda",
    keyword: "saxenda price uk",
    readMins: 5,
    date: "2026-03-04",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Saxenda pen with indicative UK pricing",
    place: "the UK",
    sections: [
      {
        h2: "How much does Saxenda cost in the UK?",
        blocks: [
          {
            type: "p",
            text: "Saxenda (liraglutide) is a daily injection and typically costs around £150–£220 per month at UK pharmacies. Because it is taken daily rather than weekly, some patients prefer a weekly GLP-1 such as Wegovy or Mounjaro.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Saxenda a daily or weekly injection?",
        a: "Saxenda (liraglutide) is a daily injection, unlike Wegovy, Ozempic or Mounjaro, which are weekly.",
      },
      {
        q: "Is Saxenda as effective as Wegovy?",
        a: "Average weight loss with Saxenda is generally lower than with semaglutide or tirzepatide, but a doctor will advise what is right for your case.",
      },
    ],
  },

  /* 13 ───────────────────────────────────────────── */
  {
    slug: "semaglutide-buy-uk",
    title: "Buy semaglutide in the UK",
    h1: "Buy semaglutide in the UK: Wegovy and Ozempic explained",
    metaTitle: "Buy Semaglutide in the UK: Wegovy & Ozempic (2026)",
    metaDescription:
      "How to buy semaglutide in the UK: the difference between Wegovy and Ozempic, price and how to start with a prescription. First consultation free!",
    excerpt:
      "Semaglutide is the active ingredient in Wegovy and Ozempic. Here is how to buy it in the UK legally and safely.",
    category: "Weight loss",
    keyword: "buy semaglutide uk",
    readMins: 6,
    date: "2026-03-10",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Semaglutide pens (Wegovy and Ozempic) in the UK",
    place: "the UK",
    sections: [
      {
        h2: "What is semaglutide?",
        blocks: [
          {
            type: "p",
            text: "Semaglutide is a GLP-1 medicine sold under the brand names Wegovy (licensed for weight loss, 2.4 mg) and Ozempic (licensed for type 2 diabetes). Both are prescription-only in the UK and require a medical assessment.",
          },
          {
            type: "links",
            title: "Keep reading",
            items: [
              { label: "Buy Wegovy in the UK", href: "/blog/buy-wegovy-uk" },
              { label: "Buy Ozempic in the UK", href: "/blog/buy-ozempic-uk" },
              { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I buy semaglutide without a prescription?",
        a: "No. Semaglutide (Wegovy, Ozempic) is prescription-only in the UK. A medical assessment is always required.",
      },
    ],
  },

  /* 14 ───────────────────────────────────────────── */
  {
    slug: "tirzepatide-for-weight-loss",
    title: "Tirzepatide for weight loss",
    h1: "Tirzepatide for weight loss: how Mounjaro works",
    metaTitle: "Tirzepatide for Weight Loss: How Mounjaro Works (2026)",
    metaDescription:
      "Tirzepatide (Mounjaro) for weight loss in the UK: how it works, average results and how to start with a prescription. First consultation free!",
    excerpt:
      "Tirzepatide is the active ingredient in Mounjaro and the most effective GLP-1 in trials. Here is how it works for weight loss.",
    category: "Weight loss",
    keyword: "tirzepatide for weight loss",
    readMins: 6,
    date: "2026-03-16",
    updated: "2026-06-16",
    cover: "/products/maren-pen.png",
    coverAlt: "Tirzepatide (Mounjaro) pen for weight loss in the UK",
    place: "the UK",
    sections: [
      {
        h2: "How does tirzepatide work?",
        blocks: [
          {
            type: "p",
            text: "Tirzepatide is a dual GIP/GLP-1 agonist, meaning it acts on two appetite-regulating pathways. In clinical trials it produced the greatest average weight loss of the current GLP-1 medicines (up to around 20%). It is sold in the UK as Mounjaro and is prescription-only.",
          },
          {
            type: "links",
            title: "Keep reading",
            items: [
              { label: "Buy Mounjaro in the UK", href: "/blog/buy-mounjaro-uk" },
              { label: "Wegovy vs Mounjaro", href: "/blog/wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is tirzepatide the same as Mounjaro?",
        a: "Yes. Tirzepatide is the active ingredient; Mounjaro is the brand name sold in the UK.",
      },
      {
        q: "How much weight can I lose with tirzepatide?",
        a: "Average weight loss in trials was up to around 20%, but individual results depend on dose, adherence and lifestyle.",
      },
    ],
  },
];

const basePosts: Post[] = [...manualPosts];

export const posts: Post[] = [
  ...basePosts,
  ...generateMunicipioPosts(new Set(basePosts.map((p) => p.slug))),
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/* ───────────────────────────────────────────────────────────
   Title optimisation for Google (SERP). Communicates that we
   SELL a medical service (consultation + prescription) rather
   than looking like a blog article. Puts the keyword and value
   proposition BEFORE Google's cut-off (~60 chars).
   ─────────────────────────────────────────────────────────── */
const VALUE_SUFFIX = "Online Doctor + Prescription";
const MAX_TITLE = 62;

export function seoTitle(post: Post): string {
  // Core of the keyword, without year or blog tail ("Price, Prescription…")
  const core = post.metaTitle
    .split(/[:|]/)[0]
    .replace(/\s*\(\s*\d{4}\s*\)\s*/g, " ") // remove "(2026)"
    .replace(/\s\b20\d{2}\b/g, " ") // remove loose "2026"
    .replace(/\s+/g, " ")
    .trim();

  const fit = (s: string) => (s.length <= MAX_TITLE ? s : null);

  const isComparison =
    /(?:-vs-|\bvs\b)/i.test(post.slug) || post.category === "Comparisons";
  if (isComparison) {
    return fit(`${core} · Which to Choose`) ?? fit(core) ?? core.slice(0, MAX_TITLE);
  }

  // For "prescription" keywords we highlight speed with a GMC-registered doctor
  if (/prescription/i.test(core)) {
    return (
      fit(`${core} · GMC-Registered Doctor`) ??
      fit(`${core} · Online Doctor`) ??
      fit(core) ??
      core.slice(0, MAX_TITLE)
    );
  }

  // Commercial value proposition: consultation + prescription online
  return (
    fit(`${core} · ${VALUE_SUFFIX}`) ??
    fit(`${core} · Online Prescription`) ??
    fit(core) ??
    core.slice(0, MAX_TITLE).replace(/\s+\S*$/, "").trim()
  );
}

/* ───────────────────────────────────────────────────────────
   Meta description optimisation for Google (SERP). A commercial
   hook ➤ that makes clear we offer the treatment + advantages
   with ✓, rather than looking like an article intro. Truncated
   below Google's cut-off (~158 chars) without cutting mid-word.
   ─────────────────────────────────────────────────────────── */
const MAX_DESC = 158;

const DRUGS = [
  "Wegovy",
  "Mounjaro",
  "Ozempic",
  "Saxenda",
  "Tirzepatide",
  "Semaglutide",
];

export function detectDrug(post: Post): string | null {
  const hay = `${post.title} ${post.metaTitle} ${post.keyword} ${post.slug}`;
  for (const d of DRUGS) {
    if (new RegExp(d, "i").test(hay)) return d;
  }
  if (/glp[\s-]?1/i.test(hay)) return "GLP-1";
  return null;
}

/* Brand name -> international non-proprietary name (active ingredient). */
const DRUG_INN: Record<string, string | undefined> = {
  Wegovy: "semaglutide",
  Ozempic: "semaglutide",
  Rybelsus: "semaglutide",
  Mounjaro: "tirzepatide",
  Saxenda: "liraglutide",
  Semaglutide: "semaglutide",
  Tirzepatide: "tirzepatide",
};

/** Returns the drug name and its INN (if detected) for JSON-LD Drug. */
export function drugInfo(post: Post): { name: string; inn?: string } | null {
  const name = detectDrug(post);
  if (!name || name === "GLP-1") return null;
  return { name, inn: DRUG_INN[name] };
}

function detectCity(post: Post): string | null {
  // The clean title ends in "… in <City>" (no trailing punctuation),
  // so the city is everything after the last " in ".
  if (!/\bin\s+/i.test(post.title)) return null;
  const city = post.title
    .split(/\bin\s+/i)
    .pop()!
    .replace(/[.:·|(].*$/, "") // cut any trailing punctuation
    .trim();
  if (!city) return null;
  if (/^the\s+uk$/i.test(city) || /^uk$/i.test(city)) return null; // "in the UK" is not a city
  if (/\d/.test(city)) return null; // avoid "24h", years, etc.
  if (city.length > 40) return null; // avoid long mis-detected phrases
  // Must start with a capital letter (proper noun)
  if (!/^[A-Z]/.test(city)) return null;
  return city;
}

function joinUnderLimit(lead: string, checks: string[], max: number): string {
  let out = lead;
  for (const c of checks) {
    const next = `${out} ${c}`;
    if (next.length > max) break;
    out = next;
  }
  return out;
}

export function seoDescription(post: Post): string {
  const drug = detectDrug(post);
  const city = detectCity(post);
  const slug = post.slug.toLowerCase();

  // Commercial advantages (priority order). Added until full.
  const checks = [
    "✓ Online private prescription",
    "✓ GMC-registered doctors",
    "✓ No waiting lists",
    "✓ First consultation free",
    "✓ App-based follow-up",
  ];

  let lead: string;
  const where = city ? ` in ${city}` : "";

  if (/(?:-vs-|\bvs\b)/.test(slug) || post.category === "Comparisons") {
    const compareName = post.title.split(/[:|]/)[0].replace(/\s+/g, " ").trim();
    lead = `➤ ${compareName}: which to choose, with a medical assessment.`;
  } else if (/price|cost/.test(slug)) {
    lead = `➤ ${drug ?? "GLP-1 treatment"}${where}: up-to-date price and how to get it legally.`;
  } else if (/prescription/.test(slug)) {
    lead = `➤ Get your ${drug ?? "GLP-1"} prescription online, fast and legal.`;
  } else if (/clinic|weight-loss|plan|side-effects/.test(slug)) {
    lead = `➤ Medical weight-loss treatment${where} with ${drug ?? "GLP-1"}.`;
  } else if (/buy/.test(slug)) {
    lead = `➤ Start your ${drug ?? "GLP-1"} treatment${where} today.`;
  } else {
    lead = `➤ ${drug ?? "GLP-1"} treatment${where} supervised by doctors.`;
  }

  const built = joinUnderLimit(lead, checks, MAX_DESC);

  if (built.length > MAX_DESC) {
    return built.slice(0, MAX_DESC).replace(/\s+\S*$/, "").trim();
  }
  return built;
}

export function getRelated(slug: string, limit = 3): Post[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}

export const SITE_URL = "https://doctorlife-uk.com";
