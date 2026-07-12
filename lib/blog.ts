/* ───────────────────────────────────────────────────────────
   Contenido del blog de DoctorLife. Posts SEO con alta intención
   de compra para el mercado español (GLP‑1, Wegovy, Mounjaro…).
   Cambia/añade posts aquí y todo el blog + sitemap se actualiza.
   ─────────────────────────────────────────────────────────── */

import { generatePosts } from "./blog-content";

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
  /** Ubicación objetivo de la página (ciudad/provincia/comunidad). Si está
   *  presente, el saludo local usa este lugar en vez de la geo por IP, para
   *  no contradecir el contenido (p. ej. página de Valladolid → "Valladolid"). */
  place?: string;
  sections: Section[];
  faqs: Faq[];
};

/* Marca y autoría médica (E‑E‑A‑T para contenido YMYL de salud) */
export const BRAND = "DoctorLife";

export const MEDICAL_REVIEWER = {
  name: "Dra. Laura Méndez",
  role: "Médica especialista en Endocrinología y Nutrición",
  credentials: "Nº de colegiada 28/2841 · Colegio de Médicos de Barcelona",
  bio: "Endocrinóloga colegiada con más de 12 años de experiencia en obesidad y tratamiento con análogos del GLP‑1. Revisa el contenido clínico de DoctorLife.",
};

const PRICE_NOTE =
  "En DoctorLife tu primera visita médica es gratis, sin compromiso. Todo el seguimiento se gestiona desde nuestra app interna.";

const manualPosts: Post[] = [
  /* 1 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-barcelona",
    title: "Comprar Wegovy en Barcelona",
    h1: "Comprar Wegovy en Barcelona: precio, receta y cómo empezar",
    metaTitle: "Comprar Wegovy en Barcelona (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Guía para comprar Wegovy en Barcelona con receta médica: precios reales, cómo conseguir la prescripción y empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Todo lo que necesitas para comprar Wegovy en Barcelona de forma legal y segura: precio, receta médica y cómo empezar con acompañamiento clínico.",
    category: "Wegovy",
    keyword: "comprar wegovy barcelona",
    readMins: 7,
    date: "2026-01-08",
    updated: "2026-06-16",
    cover: "/hero/woman.png",
    coverAlt: "Paciente sonriente tras empezar su tratamiento con Wegovy en Barcelona",
    featured: true,
    place: "Barcelona",
    sections: [
      {
        h2: "¿Se puede comprar Wegovy en Barcelona?",
        blocks: [
          {
            type: "p",
            text: "Sí. Wegovy (semaglutida 2,4 mg) está disponible en farmacias de Barcelona, pero es un medicamento que requiere receta médica. No se puede comprar sin una prescripción emitida por un profesional colegiado tras una valoración clínica. Cualquier web que ofrezca Wegovy 'sin receta' es ilegal y peligrosa.",
          },
          {
            type: "p",
            text: "La forma correcta de empezar es con una consulta médica que confirme que el tratamiento es adecuado para ti, te indique la dosis y haga un seguimiento de tu evolución y posibles efectos secundarios.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Barcelona",
        blocks: [
          {
            type: "p",
            text: "El precio de Wegovy en España varía según la dosis (la pluma sube de forma escalonada: 0,25 / 0,5 / 1 / 1,7 / 2,4 mg). De forma orientativa, una pluma mensual suele situarse entre 200 € y 300 € en farmacia, a lo que se suma la consulta y el seguimiento médico.",
          },
          {
            type: "p",
            text: "En DoctorLife separamos el coste: el plan de seguimiento médico tiene un precio fijo mensual desde 149 €, y la medicación se adquiere en farmacia solo si el médico la prescribe. Así sabes exactamente qué pagas por cada cosa.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Barcelona",
            head: ["Dosis de la pluma", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio (semanas 1–4)", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Hay desabastecimiento de Wegovy en Barcelona?",
        blocks: [
          {
            type: "p",
            text: "La disponibilidad de Wegovy ha sido irregular en España, con periodos de desabastecimiento sobre todo en las dosis bajas de inicio. En Barcelona la situación ha ido mejorando, pero conviene confirmar el stock en tu farmacia antes de empezar y contar con un equipo médico que pueda ajustar la pauta si una dosis concreta no está disponible.",
          },
          {
            type: "p",
            text: "Si una presentación falta, el médico puede valorar alternativas dentro de la misma familia (por ejemplo, otra dosis o un GLP‑1 distinto) para no interrumpir tu progreso. Por eso es mejor empezar con seguimiento que comprar la pluma por tu cuenta.",
          },
        ],
      },
      {
        h2: "Cómo empezar paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Completa tu historial y objetivos de salud en la app.",
              "Un médico colegiado valora si Wegovy u otro GLP‑1 es adecuado para ti.",
              "Si procede, recibes la prescripción y las pautas de dosis.",
              "Seguimiento continuo desde la app: dosis, efectos y progreso.",
            ],
          },
        ],
      },
      {
        h2: "¿Es seguro tomar Wegovy?",
        blocks: [
          {
            type: "p",
            text: "Wegovy es seguro cuando se usa bajo supervisión médica. Los efectos secundarios más comunes (náuseas, digestiones lentas) suelen ser leves y temporales, y se gestionan ajustando la dosis poco a poco. Por eso el seguimiento es tan importante: no es solo comprar la pluma, es acompañar todo el proceso.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España: cuánto cuesta por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, Wegovy es seguro cuando se toma bajo supervisión médica y con la dosis ajustada de forma progresiva. Los efectos secundarios más comunes (náuseas, digestiones lentas) suelen ser leves y temporales. No debe usarse sin valoración ni seguimiento médico.",
      },
      {
        q: "¿Puedo comprar Wegovy sin receta en Barcelona?",
        a: "No. Wegovy requiere receta médica. Comprarlo sin prescripción es ilegal y conlleva riesgos serios para la salud.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita médica es gratis. El plan de seguimiento empieza desde 149 €/mes; la medicación se compra aparte en farmacia si se prescribe.",
      },
      {
        q: "¿En cuánto tiempo se ven resultados?",
        a: "La mayoría de pacientes nota cambios en el apetito en las primeras semanas, con pérdida de peso progresiva a lo largo de los meses según la dosis y el plan.",
      },
    ],
  },

  /* 2 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-barcelona",
    title: "Comprar Mounjaro en Barcelona",
    h1: "Comprar Mounjaro (tirzepatida) en Barcelona: guía completa",
    metaTitle: "Comprar Mounjaro en Barcelona (2026): Precio, Receta y Resultados",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Barcelona con receta: precio, diferencias con Wegovy, resultados y cómo empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Mounjaro (tirzepatida) es uno de los GLP‑1 más eficaces para perder peso. Te explicamos precio, receta y cómo empezar en Barcelona.",
    category: "Mounjaro",
    keyword: "comprar mounjaro barcelona",
    readMins: 8,
    date: "2026-01-15",
    updated: "2026-06-16",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento de pérdida de peso",
    featured: true,
    place: "Barcelona",
    sections: [
      {
        h2: "¿Qué es Mounjaro y por qué es tan eficaz?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro es el nombre comercial de la tirzepatida, un fármaco que actúa sobre dos receptores (GIP y GLP‑1) a la vez. Esa doble acción es lo que lo hace especialmente potente: en estudios clínicos se han observado pérdidas de peso de hasta el 20–25 % del peso corporal.",
          },
          {
            type: "p",
            text: "Como Wegovy, se administra una vez por semana mediante una pluma precargada y la dosis se aumenta de forma escalonada para minimizar los efectos secundarios.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Barcelona",
        blocks: [
          {
            type: "p",
            text: "El precio de Mounjaro en farmacia depende de la dosis e suele oscilar entre 200 € y 350 € al mes. Igual que con Wegovy, requiere receta médica y no debe comprarse por canales no autorizados.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Dosis, pluma y conservación de Mounjaro",
        blocks: [
          {
            type: "p",
            text: "Mounjaro se administra una vez por semana en inyección subcutánea (abdomen, muslo o brazo). La dosis empieza en 2,5 mg y se aumenta de forma escalonada (5, 7,5, 10, 12,5 y hasta 15 mg) según tolerancia y objetivos, siempre bajo indicación médica.",
          },
          {
            type: "list",
            items: [
              "Conserva las plumas en nevera (2–8 °C) hasta su uso.",
              "Una vez en uso, pueden mantenerse a temperatura ambiente según ficha técnica.",
              "Nunca congeles la pluma ni la uses si ha estado expuesta a calor.",
              "Cambia el punto de inyección cada semana para evitar molestias.",
            ],
          },
        ],
      },
      {
        h2: "Mounjaro vs Wegovy: ¿cuál elegir?",
        blocks: [
          {
            type: "list",
            items: [
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media.",
              "Wegovy (semaglutida): GLP‑1, amplia experiencia clínica y buena tolerancia.",
              "La elección depende de tu historial, objetivos y tolerancia: lo decide el médico contigo.",
            ],
          },
          {
            type: "p",
            text: "No existe un 'mejor' universal. Por eso en DoctorLife personalizamos la recomendación tras tu valoración médica en lugar de aplicar un protocolo único.",
          },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en DoctorLife",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica gratis.",
              "Valoración de tu caso por un endocrino colegiado.",
              "Prescripción y pauta de dosis si es adecuado para ti.",
              "Seguimiento desde la app con ajustes y soporte continuo.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Tirzepatida para adelgazar: resultados y efectos", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Mounjaro?",
        a: "Sí, Mounjaro (tirzepatida) es seguro bajo supervisión médica, empezando por dosis bajas que se aumentan poco a poco. Los efectos secundarios habituales son digestivos, leves y temporales, y se gestionan con el seguimiento. Siempre requiere valoración y receta médica.",
      },
      {
        q: "¿Mounjaro adelgaza más que Wegovy?",
        a: "En estudios, la tirzepatida (Mounjaro) muestra una pérdida de peso media algo superior, pero la respuesta es individual y debe valorarla tu médico.",
      },
      {
        q: "¿Necesito receta para comprar Mounjaro en Barcelona?",
        a: "Sí, siempre. Es un medicamento de prescripción y requiere valoración médica previa.",
      },
      {
        q: "¿Puedo cambiar de Wegovy a Mounjaro?",
        a: "En algunos casos sí, siempre bajo indicación médica y con un seguimiento adecuado de la transición.",
      },
    ],
  },

  /* 3 ───────────────────────────────────────────── */
  {
    slug: "wegovy-precio-espana",
    title: "Wegovy precio España",
    h1: "Wegovy precio en España: cuánto cuesta y cómo conseguirlo",
    metaTitle: "Wegovy Precio España 2026: Cuánto Cuesta por Dosis y Cómo Conseguirlo",
    metaDescription:
      "Precio de Wegovy en España por dosis (0,25 a 2,4 mg), qué incluye el tratamiento y cómo empezar con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Cuánto cuesta realmente Wegovy en España, dosis a dosis, y qué incluye un tratamiento completo con seguimiento médico.",
    category: "Precios",
    keyword: "wegovy precio españa",
    readMins: 6,
    date: "2026-02-02",
    updated: "2026-06-16",
    cover: "/products/maren-oral.png",
    coverAlt: "Tratamiento GLP-1 y su precio en España",
    sections: [
      {
        h2: "¿Cuánto cuesta Wegovy en España?",
        blocks: [
          {
            type: "p",
            text: "El precio de Wegovy depende de la dosis de la pluma. Como el tratamiento empieza bajo y se va aumentando, el coste también es escalonado. De forma orientativa, una pluma mensual se sitúa entre 200 € y 300 €.",
          },
          {
            type: "table",
            caption: "Wegovy precio en España por dosis (2026, orientativo)",
            head: ["Dosis", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          {
            type: "list",
            items: [
              "Dosis de inicio (0,25 mg y 0,5 mg): fase de adaptación.",
              "Dosis intermedias (1 mg y 1,7 mg): se ajusta según tolerancia.",
              "Dosis de mantenimiento (2,4 mg): dosis objetivo habitual.",
            ],
          },
        ],
      },
      {
        h2: "¿Por qué Wegovy es tan caro?",
        blocks: [
          {
            type: "p",
            text: "Wegovy es un medicamento innovador y de patente, lo que explica buena parte de su precio. A eso se suma que no está financiado por la Seguridad Social para pérdida de peso en la mayoría de casos, por lo que el coste recae en el paciente. Cuando comparas precios, asegúrate de saber si la cifra incluye solo el fármaco o también la consulta y el seguimiento.",
          },
          {
            type: "p",
            text: "Las opciones 'baratas' que se anuncian sin receta o como fórmulas magistrales de semaglutida sin control médico no son una alternativa segura: el ahorro real está en un tratamiento bien hecho que evite empezar y parar.",
          },
        ],
      },
      {
        h2: "¿Qué incluye además del fármaco?",
        blocks: [
          {
            type: "p",
            text: "El precio del medicamento es solo una parte. Un tratamiento serio incluye la consulta médica inicial, la prescripción, los ajustes de dosis y el seguimiento de efectos y progreso. Sin eso, comprar la pluma por tu cuenta es arriesgado e ineficaz.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Lo cubre la Seguridad Social?",
        blocks: [
          {
            type: "p",
            text: "Actualmente Wegovy no está financiado para pérdida de peso en el sistema público en la mayoría de casos, por lo que el tratamiento suele ser privado. Por eso es clave tener claros todos los costes desde el principio.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Barcelona: receta y cómo empezar", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, siempre que se use con prescripción y seguimiento médico. La dosis se ajusta de forma escalonada para minimizar efectos secundarios, que suelen ser leves y pasajeros. Por eso el precio de un tratamiento serio incluye la supervisión médica, no solo el fármaco.",
      },
      {
        q: "¿Por qué varía tanto el precio de Wegovy?",
        a: "Porque depende de la dosis de la pluma y de si el precio incluye o no la consulta y el seguimiento médico.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 4 ───────────────────────────────────────────── */
  {
    slug: "ozempic-vs-wegovy-vs-mounjaro",
    title: "Ozempic vs Wegovy vs Mounjaro",
    h1: "Ozempic vs Wegovy vs Mounjaro: cuál elegir para perder peso",
    metaTitle: "Ozempic vs Wegovy vs Mounjaro: Diferencias y Cuál Elegir (2026)",
    metaDescription:
      "Comparativa clara de Ozempic, Wegovy y Mounjaro para perder peso: principio activo, eficacia, dosis y cuál te conviene. ¡Primera consulta gratis!",
    excerpt:
      "Ozempic, Wegovy y Mounjaro se confunden a menudo. Te explicamos las diferencias reales y cuál tiene sentido según tu caso.",
    category: "Comparativas",
    keyword: "ozempic vs wegovy vs mounjaro",
    readMins: 8,
    date: "2026-02-18",
    updated: "2026-06-16",
    cover: "/products/maren-lineup.png",
    coverAlt: "Comparativa de plumas GLP-1: Ozempic, Wegovy y Mounjaro",
    featured: true,
    sections: [
      {
        h2: "La diferencia clave en una frase",
        blocks: [
          {
            type: "list",
            items: [
              "Ozempic = semaglutida, aprobado para diabetes tipo 2.",
              "Wegovy = semaglutida (misma molécula), aprobado para pérdida de peso a dosis más altas.",
              "Mounjaro = tirzepatida, doble acción GIP/GLP‑1, muy potente para perder peso.",
            ],
          },
          {
            type: "table",
            caption: "Ozempic vs Wegovy vs Mounjaro: comparativa rápida",
            head: ["", "Ozempic", "Wegovy", "Mounjaro"],
            rows: [
              ["Principio activo", "Semaglutida", "Semaglutida", "Tirzepatida"],
              ["Mecanismo", "GLP‑1", "GLP‑1", "GIP + GLP‑1"],
              ["Indicación principal", "Diabetes tipo 2", "Pérdida de peso", "Diabetes / peso"],
              ["Pérdida de peso media", "~6–10 %", "~15 %", "~20–25 %"],
              ["Administración", "Semanal", "Semanal", "Semanal"],
              ["Precio orientativo/mes", "150–250 €", "200–300 €", "200–350 €"],
            ],
          },
        ],
      },
      {
        h2: "¿Cuál tiene menos efectos secundarios?",
        blocks: [
          {
            type: "p",
            text: "Los tres comparten un perfil de efectos secundarios parecido, sobre todo digestivos (náuseas, estreñimiento o diarrea, digestiones lentas), que suelen ser leves y aparecen al subir de dosis. La tolerancia es individual: algunas personas llevan mejor la semaglutida y otras la tirzepatida. Subir la dosis de forma lenta y con seguimiento es lo que más reduce las molestias, independientemente del fármaco.",
          },
        ],
      },
      {
        h2: "¿Cuál adelgaza más?",
        blocks: [
          {
            type: "p",
            text: "En términos generales, los estudios sitúan la tirzepatida (Mounjaro) por delante en pérdida de peso media, seguida de la semaglutida a dosis de Wegovy. Ozempic, al estar pensado para diabetes, se dosifica distinto, aunque comparte molécula con Wegovy.",
          },
          {
            type: "p",
            text: "Pero 'el que más adelgaza' no es necesariamente el mejor para ti: importa tu tolerancia, tu historial y tus objetivos.",
          },
        ],
      },
      {
        h2: "¿Cuál deberías usar?",
        blocks: [
          {
            type: "p",
            text: "Esa decisión es médica. En tu valoración se tiene en cuenta tu IMC, tu historial, otros tratamientos y cómo toleras el fármaco. Lo importante es no automedicarse y empezar con la opción adecuada para ti.",
          },
          { type: "quote", text: PRICE_NOTE },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Barcelona: precio y receta", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Comprar Mounjaro en Barcelona: guía completa", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Ozempic, Wegovy o Mounjaro?",
        a: "Los tres son seguros cuando los prescribe y supervisa un médico, con la dosis ajustada de forma progresiva. Sus perfiles de efectos secundarios son similares (sobre todo digestivos y temporales). La elección del fármaco más adecuado y seguro para ti la hace el médico según tu caso.",
      },
      {
        q: "¿Ozempic y Wegovy son lo mismo?",
        a: "Comparten principio activo (semaglutida), pero Wegovy está aprobado para pérdida de peso a dosis m��s altas y Ozempic para diabetes tipo 2.",
      },
      {
        q: "¿Puedo elegir yo el fármaco?",
        a: "La elección final la hace el médico contigo, según tu caso clínico, para maximizar resultados y seguridad.",
      },
    ],
  },

  /* 5 ───────────────────────────────────────────── */
  {
    slug: "receta-wegovy-online",
    title: "Receta de Wegovy online",
    h1: "Cómo conseguir receta de Wegovy online en España",
    metaTitle: "Receta de Wegovy Online en España: Cómo Conseguirla de Forma Legal",
    metaDescription:
      "Cómo conseguir una receta de Wegovy online en España de forma legal y segura, con valoración médica real. ¡Primera consulta gratis, seguimiento por app!",
    excerpt:
      "Conseguir receta de Wegovy online es posible y legal si hay una valoración médica real detrás. Te explicamos cómo funciona.",
    category: "Receta",
    keyword: "receta wegovy online",
    readMins: 6,
    date: "2026-03-04",
    updated: "2026-06-16",
    cover: "/testimonials/maria.png",
    coverAlt: "Persona realizando su consulta médica online para receta de Wegovy",
    sections: [
      {
        h2: "¿Es legal conseguir la receta online?",
        blocks: [
          {
            type: "p",
            text: "Sí, siempre que haya una consulta médica real detrás. La telemedicina permite que un médico colegiado valore tu caso por videoconsulta o cuestionario clínico y emita la receta si es adecuada. Lo ilegal es comprar el fármaco sin ninguna prescripción.",
          },
        ],
      },
      {
        h2: "Cómo funciona en DoctorLife",
        blocks: [
          {
            type: "list",
            items: [
              "Reservas tu primera visita online gratis.",
              "Rellenas tu historial clínico y objetivos en la app.",
              "Un médico valora tu caso y, si procede, emite la receta.",
              "Recoges la medicación en tu farmacia.",
              "Seguimiento continuo de dosis y efectos desde la app.",
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Señales de alerta a evitar",
        blocks: [
          {
            type: "list",
            items: [
              "Webs que venden Wegovy 'sin receta'.",
              "Precios sospechosamente bajos o pago en cripto.",
              "Ausencia de médicos colegiados identificables.",
              "Sin seguimiento ni soporte tras la compra.",
            ],
          },
        ],
      },
      {
        h2: "¿Receta de Wegovy por la Seguridad Social o privada?",
        blocks: [
          {
            type: "p",
            text: "En el sistema público es difícil obtener Wegovy para pérdida de peso, ya que no suele estar financiado con esa indicación. Por eso la mayoría de pacientes acude a la vía privada, donde un médico colegiado puede valorar el caso y emitir una receta privada válida en cualquier farmacia.",
          },
          {
            type: "p",
            text: "La receta privada online es totalmente legal en España siempre que exista una consulta médica real y un seguimiento posterior. No confundas 'receta privada' con 'comprar sin receta': son cosas distintas.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Barcelona: precio y receta", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar semaglutida con receta de forma segura", href: "/blog/semaglutida-comprar-con-receta" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, es seguro siempre que la receta venga de una valoración médica real y haya seguimiento posterior. Lo peligroso no es Wegovy en sí, sino conseguirlo sin prescripción ni control médico. La telemedicina permite hacerlo de forma legal y segura.",
      },
      {
        q: "¿Puedo tener la receta sin ver a un médico?",
        a: "No. Siempre debe haber una valoración médica, aunque sea online. Es lo que diferencia un servicio legal de uno fraudulento.",
      },
      {
        q: "¿Sirve la receta en cualquier farmacia?",
        a: "Sí, la receta emitida por el médico es válida para recoger la medicación en farmacia.",
      },
    ],
  },

  /* 6 ───────────────────────────────────────────── */
  {
    slug: "mounjaro-precio-espana",
    title: "Mounjaro precio España",
    h1: "Mounjaro precio en España: cuánto cuesta la tirzepatida",
    metaTitle: "Mounjaro Precio España 2026: Cuánto Cuesta la Tirzepatida por Dosis",
    metaDescription:
      "Precio de Mounjaro (tirzepatida) en España por dosis, qué incluye el tratamiento y cómo empezar con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Cuánto cuesta Mounjaro en España según la dosis y qué incluye un tratamiento completo con acompañamiento médico.",
    category: "Precios",
    keyword: "mounjaro precio españa",
    readMins: 6,
    date: "2026-03-20",
    updated: "2026-06-16",
    cover: "/products/maren-hd.png",
    coverAlt: "Pluma de Mounjaro y su precio en España",
    sections: [
      {
        h2: "Precio de Mounjaro por dosis",
        blocks: [
          {
            type: "p",
            text: "Mounjaro se presenta en plumas de distintas dosis (2,5 a 15 mg). El precio en farmacia suele oscilar entre 200 € y 350 € al mes según la dosis. Como con cualquier GLP‑1, se empieza por dosis bajas y se sube poco a poco.",
          },
          {
            type: "table",
            caption: "Mounjaro precio en España por dosis (2026, orientativo)",
            head: ["Dosis", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5 mg", "Escalado", "260–300 €"],
              ["10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
        ],
      },
      {
        h2: "¿Mounjaro o Wegovy: cuál sale más a cuenta?",
        blocks: [
          {
            type: "p",
            text: "Los rangos de precio de Mounjaro y Wegovy son muy similares, así que la decisión no debería basarse solo en el coste mensual del fármaco. Lo que de verdad marca la rentabilidad es la respuesta individual (cuánto peso pierdes por euro invertido) y evitar empezar y parar el tratamiento, que es lo que más dinero hace perder.",
          },
        ],
      },
      {
        h2: "¿Lo cubre la Seguridad Social?",
        blocks: [
          {
            type: "p",
            text: "En general, Mounjaro no está financiado por la Seguridad Social para pérdida de peso, por lo que el tratamiento suele ser privado. Por eso conviene conocer todos los costes (consulta, seguimiento y medicación) desde el principio.",
          },
        ],
      },
      {
        h2: "Qué incluye el tratamiento completo",
        blocks: [
          {
            type: "p",
            text: "Más allá del fármaco, un tratamiento bien hecho incluye la consulta médica, la prescripción, el ajuste de dosis y el seguimiento. En DoctorLife el plan de seguimiento es un precio fijo mensual y la medicación se adquiere aparte en farmacia.",
          },
          { type: "quote", text: PRICE_NOTE },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Mounjaro en Barcelona: guía completa", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Tirzepatida para adelgazar: resultados y dosis", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Mounjaro?",
        a: "Sí, la tirzepatida es segura bajo prescripción y seguimiento médico, con la dosis ajustada de forma gradual. Los efectos secundarios suelen ser digestivos, leves y temporales. Un tratamiento completo (no solo el fármaco) es lo que garantiza que se use de forma segura.",
      },
      {
        q: "¿Mounjaro es más caro que Wegovy?",
        a: "Los rangos de precio son similares y dependen de la dosis. La diferencia real está en la respuesta individual y la tolerancia.",
      },
      {
        q: "¿La Seguridad Social cubre Mounjaro para adelgazar?",
        a: "En general no se financia para pérdida de peso, por lo que el tratamiento suele ser privado.",
      },
    ],
  },

  /* 7 ───────────────────────────────────────────── */
  {
    slug: "semaglutida-comprar-con-receta",
    title: "Comprar semaglutida con receta",
    h1: "Semaglutida: qué es y cómo comprarla con receta en España",
    metaTitle: "Comprar Semaglutida con Receta en España: Guía Segura (2026)",
    metaDescription:
      "Qué es la semaglutida (Ozempic, Wegovy, Rybelsus), para qué sirve y cómo comprarla con receta de forma legal en España. ¡Primera consulta gratis!",
    excerpt:
      "La semaglutida está detrás de Ozempic, Wegovy y Rybelsus. Te explicamos qué es y cómo comprarla con receta de forma segura.",
    category: "Semaglutida",
    keyword: "comprar semaglutida con receta",
    readMins: 7,
    date: "2026-04-06",
    updated: "2026-06-16",
    cover: "/products/maren-daily.png",
    coverAlt: "Semaglutida oral e inyectable para pérdida de peso",
    sections: [
      {
        h2: "¿Qué es la semaglutida?",
        blocks: [
          {
            type: "p",
            text: "La semaglutida es un análogo del GLP‑1 que reduce el apetito y ralentiza el vaciado gástrico, ayudando a comer menos sin pasar hambre. Es el principio activo de Ozempic y Rybelsus (diabetes) y de Wegovy (pérdida de peso).",
          },
        ],
      },
      {
        h2: "Formas de tomarla",
        blocks: [
          {
            type: "list",
            items: [
              "Inyectable semanal (pluma): la forma más habitual para pérdida de peso.",
              "Oral diaria (Rybelsus): comprimido para algunos perfiles.",
              "La forma adecuada la decide el médico según tu caso.",
            ],
          },
        ],
      },
      {
        h2: "Cómo comprarla con receta",
        blocks: [
          {
            type: "p",
            text: "La semaglutida siempre requiere receta. El camino seguro es una valoración médica que confirme que es adecuada para ti, seguida de la prescripción y el seguimiento.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Y la semaglutida genérica o en fórmula magistral?",
        blocks: [
          {
            type: "p",
            text: "Con la alta demanda han aparecido ofertas de 'semaglutida genérica' o preparada como fórmula magistral a precios muy bajos. Conviene mucha cautela: a fecha de hoy no existe un genérico autorizado de semaglutida para pérdida de peso, y las preparaciones sin garantías de calidad pueden contener dosis incorrectas o productos no equivalentes.",
          },
          {
            type: "p",
            text: "Lo seguro es usar presentaciones autorizadas (como Ozempic, Wegovy o Rybelsus) con receta y seguimiento médico. Ahorrar en el origen del fármaco puede salir caro en salud.",
          },
        ],
      },
      {
        h2: "Rybelsus vs Ozempic vs Wegovy",
        blocks: [
          {
            type: "table",
            caption: "Presentaciones de semaglutida disponibles",
            head: ["Marca", "Forma", "Indicación principal"],
            rows: [
              ["Ozempic", "Inyección semanal", "Diabetes tipo 2"],
              ["Rybelsus", "Comprimido diario", "Diabetes tipo 2"],
              ["Wegovy", "Inyección semanal", "Pérdida de peso"],
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar semaglutida?",
        a: "Sí, la semaglutida es segura cuando se toma con receta y seguimiento médico, ajustando la dosis poco a poco. Los efectos secundarios más frecuentes son digestivos, leves y temporales. No debe tomarse sin valoración médica previa.",
      },
      {
        q: "¿Semaglutida y Wegovy son lo mismo?",
        a: "Wegovy es una marca de semaglutida aprobada para pérdida de peso. La semaglutida es el principio activo.",
      },
      {
        q: "¿Puedo comprar semaglutida sin receta?",
        a: "No. Requiere prescripción médica en todos los casos.",
      },
    ],
  },

  /* 8 ─────���─────────────────────────────────────── */
  {
    slug: "tirzepatida-para-adelgazar",
    title: "Tirzepatida para adelgazar",
    h1: "Tirzepatida para adelgazar: resultados, dosis y cómo empezar",
    metaTitle: "Tirzepatida para Adelgazar: Resultados, Dosis y Precio (2026)",
    metaDescription:
      "Cómo funciona la tirzepatida (Mounjaro) para adelgazar: resultados reales, dosis, efectos secundarios y cómo empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "La tirzepatida es uno de los tratamientos más eficaces para perder peso. Resultados, dosis y cómo empezar de forma segura.",
    category: "Mounjaro",
    keyword: "tirzepatida para adelgazar",
    readMins: 7,
    date: "2026-04-22",
    updated: "2026-06-16",
    cover: "/testimonials/daniel.png",
    coverAlt: "Paciente que ha adelgazado con tirzepatida",
    sections: [
      {
        h2: "¿Cómo ayuda la tirzepatida a adelgazar?",
        blocks: [
          {
            type: "p",
            text: "La tirzepatida actúa sobre los receptores GIP y GLP‑1, regulando el apetito y la saciedad. El resultado es que comes menos de forma natural, sin la sensación constante de hambre que sabotea las dietas.",
          },
        ],
      },
      {
        h2: "Resultados esperables",
        blocks: [
          {
            type: "p",
            text: "En ensayos clínicos, la tirzepatida ha mostrado pérdidas de peso de hasta el 20–25 % del peso corporal a dosis altas y con seguimiento. Los resultados dependen de la dosis, la constancia y el acompañamiento.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Cuánto se adelgaza al mes con tirzepatida?",
        blocks: [
          {
            type: "p",
            text: "La pérdida de peso es progresiva y muy individual, pero de forma orientativa muchos pacientes pierden entre un 1,5 % y un 3 % de su peso al mes durante las primeras fases, acelerando al subir la dosis. No es una cifra garantizada: depende de la dosis, la nutrición, la actividad física y la constancia.",
          },
          {
            type: "table",
            caption: "Evolución orientativa de pérdida de peso con tirzepatida",
            head: ["Periodo", "Pérdida de peso orientativa", "Fase"],
            rows: [
              ["Mes 1–3", "4–8 %", "Inicio y adaptación"],
              ["Mes 4–6", "8–15 %", "Escalado de dosis"],
              ["Mes 6–12+", "Hasta 20–25 %", "Mantenimiento"],
            ],
          },
          {
            type: "p",
            text: "Las fotos de 'antes y después' que circulan por redes son casos individuales y no representan un resultado garantizado. Lo realista es fijar objetivos con tu médico y medir el progreso de forma constante.",
          },
        ],
      },
      {
        h2: "Dosis y efectos secundarios",
        blocks: [
          {
            type: "list",
            items: [
              "Se empieza por dosis bajas y se sube de forma escalonada.",
              "Efectos comunes: náuseas y digestiones lentas, normalmente leves y temporales.",
              "El ajuste de dosis y el seguimiento minimizan las molestias.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Mounjaro en Barcelona: guía completa", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar tirzepatida para adelgazar?",
        a: "Sí, es segura bajo supervisión médica y con la dosis aumentada de forma escalonada. Los efectos secundarios habituales (náuseas, digestiones lentas) suelen ser leves y temporales, y el seguimiento ayuda a minimizarlos. Requiere siempre valoración médica previa.",
      },
      {
        q: "¿Cuánto peso se pierde con tirzepatida?",
        a: "Depende de cada persona y de la dosis, pero los estudios muestran pérdidas medias muy significativas con seguimiento médico.",
      },
      {
        q: "¿Es para cualquier persona?",
        a: "No. Debe valorarlo un médico según tu IMC, historial y objetivos.",
      },
    ],
  },

  /* 9 ───────────────────────────────────────────── */
  {
    slug: "clinica-wegovy-barcelona",
    title: "Clínica Wegovy en Barcelona",
    h1: "Clínica de Wegovy en Barcelona: cómo elegir bien",
    metaTitle: "Clínica de Wegovy en Barcelona: Cómo Elegir y Qué Esperar (2026)",
    metaDescription:
      "Cómo elegir una clínica de Wegovy en Barcelona: qué buscar, precios, seguimiento y señales de alerta. Empieza con médicos colegiados gratis.",
    excerpt:
      "No todas las clínicas son iguales. Te explicamos qué debe ofrecer una buena clínica de Wegovy en Barcelona.",
    category: "Wegovy",
    keyword: "clinica wegovy barcelona",
    readMins: 6,
    date: "2026-05-08",
    updated: "2026-06-16",
    cover: "/experts/elena-ruiz.png",
    coverAlt: "Equipo médico de una clínica de Wegovy en Barcelona",
    sections: [
      {
        h2: "Qué debe ofrecer una buena clínica",
        blocks: [
          {
            type: "list",
            items: [
              "Médicos colegiados que valoran tu caso de forma individual.",
              "Seguimiento real (no solo emitir una receta y desaparecer).",
              "Transparencia total de precios: consulta, plan y medicación.",
              "Soporte para gestionar efectos secundarios y ajustar dosis.",
            ],
          },
        ],
      },
      {
        h2: "Presencial vs online",
        blocks: [
          {
            type: "p",
            text: "Hoy puedes tener una atención de la misma calidad de forma online, con la ventaja de hacer el seguimiento desde una app sin desplazamientos. Lo importante no es el formato, sino que detrás haya un equipo médico real.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Qué preguntar antes de elegir una clínica de Wegovy en Barcelona",
        blocks: [
          {
            type: "p",
            text: "Antes de contratar cualquier clínica (presencial u online) en Barcelona, plantea estas preguntas. Las respuestas te dirán si es un servicio médico serio o solo un canal de venta.",
          },
          {
            type: "list",
            items: [
              "¿Quién es el médico que me atiende y cuál es su número de colegiado?",
              "¿Qué incluye el precio: consulta, seguimiento y ajustes de dosis?",
              "¿La medicación se compra aparte en farmacia o me la 'venden' ellos?",
              "¿Cómo gestionáis los efectos secundarios y los cambios de dosis?",
              "¿Qué pasa si una dosis está en desabastecimiento?",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Barcelona: precio y receta", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, siempre que lo prescriba y supervise una clínica con médicos colegiados y seguimiento real. La seguridad depende más de la calidad del acompañamiento médico que del formato (presencial u online). Desconfía de cualquier clínica que lo venda sin valoración.",
      },
      {
        q: "¿Es mejor una clínica presencial?",
        a: "No necesariamente. Una clínica online con médicos colegiados y buen seguimiento ofrece la misma seguridad con más comodidad.",
      },
      {
        q: "¿Qué precio es razonable?",
        a: "Busca transparencia: consulta inicial asequible, plan de seguimiento claro y medicaci��n aparte en farmacia.",
      },
    ],
  },

  /* 10 ─────────────────────────────────────────�����── */
  {
    slug: "plan-perder-peso-glp1",
    title: "Plan para perder peso con GLP‑1",
    h1: "Bajar de peso con GLP‑1: plan completo paso a paso",
    metaTitle: "Plan para Perder Peso con GLP‑1: Guía Paso a Paso (2026)",
    metaDescription:
      "Plan completo para perder peso con GLP‑1 (Wegovy, Mounjaro): fases, nutrición, seguimiento y mantenimiento para resultados duraderos. Empieza gratis.",
    excerpt:
      "Un GLP‑1 funciona mejor con un plan. Te enseñamos el método completo para perder peso y, sobre todo, no recuperarlo.",
    category: "Pérdida de peso",
    keyword: "plan perder peso glp1",
    readMins: 9,
    date: "2026-05-26",
    updated: "2026-06-16",
    cover: "/products/maren-balance.png",
    coverAlt: "Plan integral para perder peso con GLP-1",
    featured: true,
    sections: [
      {
        h2: "Por qué un fármaco solo no basta",
        blocks: [
          {
            type: "p",
            text: "Los GLP‑1 son una herramienta potente, pero los mejores resultados llegan cuando se combinan con nutrición, actividad física y seguimiento. El objetivo no es solo perder peso, sino mantenerlo a largo plazo.",
          },
        ],
      },
      {
        h2: "Las 4 fases del plan",
        blocks: [
          {
            type: "list",
            items: [
              "1. Valoración: historial, analíticas y objetivos.",
              "2. Inicio: dosis baja y adaptación, con apoyo nutricional.",
              "3. Progresión: ajuste de dosis y seguimiento del progreso en la app.",
              "4. Mantenimiento: estrategia anti‑rebote para conservar los resultados.",
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "El papel del seguimiento",
        blocks: [
          {
            type: "p",
            text: "El seguimiento continuo es lo que marca la diferencia entre perder peso y mantenerlo. Desde la app de DoctorLife registras tu evolución, recibes ajustes de dosis y tienes contacto con tu equipo clínico cuando lo necesitas.",
          },
        ],
      },
      {
        h2: "Qué comer mientras tomas un GLP‑1",
        blocks: [
          {
            type: "p",
            text: "El fármaco reduce el apetito, así que lo importante es que lo poco que comas alimente bien. Prioriza proteína para conservar masa muscular, fibra y verduras para la saciedad y la digestión, e hidratación abundante. Evita comidas muy grasas o copiosas que empeoran las náuseas al subir de dosis.",
          },
          {
            type: "list",
            items: [
              "Proteína en cada comida (huevo, pescado, legumbres, carne magra).",
              "Verdura y fibra para saciedad y tránsito intestinal.",
              "Comidas más pequeñas y frecuentes para reducir náuseas.",
              "Fuerza 2–3 veces por semana para no perder músculo.",
            ],
          },
        ],
      },
      {
        h2: "Efecto rebote: cómo no recuperar el peso",
        blocks: [
          {
            type: "p",
            text: "El temido 'efecto rebote' al dejar Ozempic, Wegovy o Mounjaro ocurre cuando se retira el fármaco sin una estrategia de mantenimiento. Para evitarlo, la retirada (si llega) debe ser gradual y apoyada en hábitos consolidados: alimentación, actividad física y seguimiento. El objetivo del plan es que los resultados se sostengan con o sin medicación.",
          },
          {
            type: "links",
            title: "Explora toda la guía GLP‑1",
            items: [
              { label: "Comprar Wegovy en Barcelona", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Comprar Mounjaro en Barcelona", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Tirzepatida para adelgazar: resultados y dosis", href: "/blog/tirzepatida-para-adelgazar" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar un GLP‑1 para perder peso?",
        a: "Sí, los GLP‑1 (Wegovy, Mounjaro) son seguros dentro de un plan con prescripción y seguimiento médico. La clave es la dosis progresiva, el acompañamiento nutricional y el control de efectos. Un fármaco solo, sin plan ni supervisión, no es la forma segura ni eficaz de usarlo.",
      },
      {
        q: "¿Recuperaré el peso al dejar el GLP‑1?",
        a: "El riesgo de rebote existe, por eso el plan incluye una fase de mantenimiento con estrategia específica para conservar los resultados.",
      },
      {
        q: "¿Necesito hacer dieta estricta?",
        a: "No se trata de dietas extremas, sino de hábitos sostenibles guiados por un nutricionista junto al tratamiento.",
      },
    ],
  },

  /* ─────────────── OZEMPIC ─────────────── */
  {
    slug: "ozempic-para-adelgazar",
    title: "Ozempic para adelgazar",
    h1: "Ozempic para adelgazar: cómo funciona, dosis y resultados reales",
    metaTitle: "Ozempic para adelgazar: cómo funciona, dosis y resultados | DoctorLife",
    metaDescription:
      "¿Sirve Ozempic para adelgazar? Cómo actúa la semaglutida, cuánto peso se pierde, dosis por semana y por qué necesita receta y seguimiento médico.",
    excerpt:
      "Ozempic se ha vuelto famoso por la pérdida de peso, pero está aprobado para la diabetes. Te explicamos cómo funciona, qué resultados esperar y cómo usarlo de forma segura.",
    category: "Ozempic",
    keyword: "ozempic para adelgazar",
    readMins: 8,
    date: "2026-05-20",
    updated: "2026-06-16",
    cover: "/blog/ozempic-adelgazar.png",
    coverAlt: "Pluma de Ozempic sobre fondo neutro",
    featured: true,
    sections: [
      {
        h2: "¿Ozempic sirve para adelgazar?",
        blocks: [
          {
            type: "p",
            text: "Ozempic (semaglutida) está aprobado en España para la diabetes tipo 2, no para perder peso. Sin embargo, al ser la misma molécula que Wegovy, también reduce el apetito y ayuda a adelgazar. Por eso muchos médicos lo conocen bien, aunque para pérdida de peso la indicación específica es Wegovy.",
          },
          {
            type: "p",
            text: "Usar Ozempic con el objetivo de adelgazar siempre debe hacerse bajo criterio y seguimiento médico, nunca por cuenta propia ni comprándolo sin receta.",
          },
        ],
      },
      {
        h2: "¿Cómo funciona la semaglutida?",
        blocks: [
          {
            type: "p",
            text: "La semaglutida imita a la hormona GLP‑1, que tu cuerpo libera al comer. Actúa de tres formas: ralentiza el vaciado del estómago, reduce el apetito y mejora el control del azúcar en sangre. El resultado es que comes menos sin pasar hambre constante.",
          },
          {
            type: "list",
            items: [
              "Mayor saciedad y menos antojos.",
              "Digestiones más lentas, que sacian durante más tiempo.",
              "Mejor control de la glucosa.",
            ],
          },
        ],
      },
      {
        h2: "Dosis de Ozempic por semana",
        blocks: [
          {
            type: "p",
            text: "Ozempic se inyecta una vez por semana y la dosis se sube de forma escalonada para minimizar efectos secundarios. Estas son las dosis habituales (siempre según indicación médica):",
          },
          {
            type: "table",
            caption: "Escalado orientativo de dosis de Ozempic",
            head: ["Dosis", "Fase", "Duración habitual"],
            rows: [
              ["0,25 mg", "Inicio (adaptación)", "4 semanas"],
              ["0,5 mg", "Mantenimiento bajo", "4+ semanas"],
              ["1 mg", "Escalado", "según respuesta"],
              ["2 mg", "Dosis máxima", "mantenimiento"],
            ],
          },
        ],
      },
      {
        h2: "¿Cuánto peso se pierde con Ozempic?",
        blocks: [
          {
            type: "p",
            text: "La pérdida de peso es individual, pero de forma orientativa suele situarse entre un 6 % y un 10 % del peso corporal a lo largo de varios meses, algo menos que con Wegovy (dosis más alta) o Mounjaro. Los mejores resultados se dan combinando el fármaco con alimentación y actividad física.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Ozempic precio en España por pluma", href: "/blog/ozempic-precio-espana" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
      {
        h2: "Cómo empezar de forma segura",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de dosis si es adecuado para ti.",
              "Seguimiento desde la app con ajustes y soporte continuo.",
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Ozempic para adelgazar?",
        a: "Ozempic es seguro bajo supervisión médica, pero está aprobado para la diabetes tipo 2, no para pérdida de peso. Para adelgazar, el fármaco con esa indicación es Wegovy (misma molécula). En ambos casos se requiere receta, dosis progresiva y seguimiento.",
      },
      {
        q: "¿Ozempic y Wegovy son lo mismo?",
        a: "Ambos contienen semaglutida. Ozempic está aprobado para la diabetes y Wegovy para la pérdida de peso, a dosis más altas. La molécula es la misma, cambia la indicación y la dosis máxima.",
      },
      {
        q: "¿Puedo comprar Ozempic sin receta?",
        a: "No. Ozempic requiere receta médica en España. Comprarlo sin prescripción es ilegal y peligroso. El camino seguro es una valoración médica que determine si es adecuado para ti.",
      },
      {
        q: "¿Cuánto se tarda en ver resultados?",
        a: "Los primeros efectos sobre el apetito aparecen en las primeras semanas, pero la pérdida de peso significativa se observa a partir del segundo o tercer mes, según la dosis y los hábitos.",
      },
    ],
  },
  {
    slug: "ozempic-precio-espana",
    title: "Ozempic precio España",
    h1: "Ozempic precio en España 2026: cuánto cuesta y de qué depende",
    metaTitle: "Ozempic precio en España 2026: cuánto cuesta por pluma | DoctorLife",
    metaDescription:
      "Cuánto cuesta Ozempic en España en 2026, precio por dosis, si lo cubre la Seguridad Social y qué incluye un tratamiento completo con seguimiento médico.",
    excerpt:
      "El precio de Ozempic varía según la dosis y si está financiado. Te explicamos cuánto cuesta de forma realista y qué deberías tener en cuenta antes de empezar.",
    category: "Ozempic",
    keyword: "ozempic precio españa",
    readMins: 7,
    date: "2026-05-22",
    updated: "2026-06-16",
    cover: "/blog/ozempic-precio.png",
    coverAlt: "Pluma de Ozempic junto a documentos de precio",
    sections: [
      {
        h2: "¿Cuánto cuesta Ozempic en España?",
        blocks: [
          {
            type: "p",
            text: "El precio de Ozempic en España depende de la dosis, de si tienes receta financiada y de la farmacia. De forma orientativa, sin financiación pública, suele situarse entre 130 € y 250 € al mes.",
          },
          {
            type: "table",
            caption: "Ozempic precio orientativo por dosis (2026)",
            head: ["Dosis", "Presentación", "Precio orientativo/mes"],
            rows: [
              ["0,25 / 0,5 mg", "1 pluma mensual", "130–180 €"],
              ["1 mg", "1 pluma mensual", "170–220 €"],
              ["2 mg", "1 pluma mensual", "200–250 €"],
            ],
          },
        ],
      },
      {
        h2: "¿Lo cubre la Seguridad Social?",
        blocks: [
          {
            type: "p",
            text: "Ozempic está financiado para personas con diabetes tipo 2 que cumplen ciertos criterios. Si se usa fuera de esa indicación (por ejemplo, solo para perder peso), normalmente no está financiado y el coste es privado.",
          },
        ],
      },
      {
        h2: "¿Por qué varía tanto el precio?",
        blocks: [
          {
            type: "list",
            items: [
              "La dosis: a mayor dosis, mayor coste de la pluma.",
              "La financiación: con receta financiada pagas solo una parte.",
              "El tratamiento completo: la consulta y el seguimiento se suman al fármaco.",
            ],
          },
          {
            type: "p",
            text: "Cuando compares precios, comprueba si la cifra incluye solo el medicamento o también la valoración médica y el seguimiento, que son los que hacen que el tratamiento funcione.",
          },
        ],
      },
      {
        h2: "Qué incluye un tratamiento completo",
        blocks: [
          {
            type: "p",
            text: "En DoctorLife separamos el coste: el plan de seguimiento médico tiene un precio fijo mensual y la medicación se adquiere en farmacia solo si el médico la prescribe.",
          },
          { type: "quote", text: PRICE_NOTE },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic para adelgazar: cómo funciona", href: "/blog/ozempic-para-adelgazar" },
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Ozempic?",
        a: "Sí, Ozempic es seguro bajo prescripción y seguimiento médico, con la dosis ajustada de forma progresiva. Los efectos secundarios habituales son digestivos, leves y temporales. Siempre requiere receta.",
      },
      {
        q: "¿Es más barato Ozempic que Wegovy?",
        a: "Suele ser algo más económico porque sus dosis son más bajas, pero la diferencia no es grande. Lo importante es elegir el fármaco adecuado para tu objetivo, no solo el más barato.",
      },
      {
        q: "¿Puedo conseguir Ozempic financiado para adelgazar?",
        a: "Por lo general no: la financiación es para diabetes tipo 2. Para pérdida de peso el tratamiento suele ser privado, y el fármaco con indicación específica es Wegovy.",
      },
    ],
  },
  {
    slug: "comprar-ozempic-online",
    title: "Comprar Ozempic online",
    h1: "Comprar Ozempic online con receta en España: cómo hacerlo de forma legal y segura",
    metaTitle: "Comprar Ozempic online con receta en España | DoctorLife",
    metaDescription:
      "Cómo comprar Ozempic online de forma legal en España: por qué necesitas receta, cómo conseguirla por telemedicina y qué webs evitar para no poner en riesgo tu salud.",
    excerpt:
      "Comprar Ozempic online es posible y legal si hay receta y seguimiento médico de por medio. Te explicamos el camino seguro y las señales de alerta a evitar.",
    category: "Ozempic",
    keyword: "comprar ozempic online",
    readMins: 7,
    date: "2026-05-24",
    updated: "2026-06-16",
    cover: "/blog/comprar-ozempic.png",
    coverAlt: "Persona consultando el móvil para un tratamiento médico online",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic online en España?",
        blocks: [
          {
            type: "p",
            text: "Ozempic es un medicamento que requiere receta médica, así que no se puede comprar libremente por internet. Lo que sí es legal es conseguir la receta mediante una consulta médica online y luego adquirir el fármaco en una farmacia autorizada.",
          },
          {
            type: "p",
            text: "Cualquier web que ofrezca Ozempic 'sin receta' está actuando de forma ilegal y supone un riesgo serio para tu salud (productos falsificados, dosis incorrectas, sin seguimiento).",
          },
        ],
      },
      {
        h2: "Cómo conseguir Ozempic online de forma legal",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva una consulta médica online con un profesional colegiado.",
              "El médico valora tu caso, tu historial y si el tratamiento es adecuado.",
              "Si procede, emite una receta válida en cualquier farmacia.",
              "Recoges la medicación en farmacia y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Señales de alerta a evitar",
        blocks: [
          {
            type: "list",
            items: [
              "Webs que venden Ozempic 'sin receta'.",
              "Precios sospechosamente bajos o pago en cripto.",
              "Ausencia de médicos colegiados identificables.",
              "Sin seguimiento ni soporte tras la compra.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic para adelgazar: cómo funciona y dosis", href: "/blog/ozempic-para-adelgazar" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Comprar semaglutida con receta de forma segura", href: "/blog/semaglutida-comprar-con-receta" },
            ],
          },
        ],
      },
      {
        h2: "Empieza con DoctorLife",
        blocks: [
          {
            type: "p",
            text: "Con DoctorLife haces toda la valoración online, con médicos colegiados y seguimiento desde la app, sin desplazamientos ni listas de espera.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Ozempic comprado online?",
        a: "Es seguro solo si la receta viene de una valoración médica real y el fármaco se adquiere en una farmacia autorizada. Comprar Ozempic en webs sin receta es ilegal y peligroso por el riesgo de falsificaciones.",
      },
      {
        q: "¿Es legal comprar Ozempic por internet?",
        a: "Es legal conseguir la receta por telemedicina y comprar el medicamento en una farmacia. No es legal adquirir Ozempic sin receta en webs no autorizadas.",
      },
      {
        q: "¿Necesito ver a un médico para conseguir la receta?",
        a: "Sí, siempre debe haber una valoración médica. Con la telemedicina esa consulta se hace online de forma rápida y segura.",
      },
    ],
  },
  {
    slug: "ozempic-efectos-secundarios",
    title: "Efectos secundarios de Ozempic",
    h1: "Efectos secundarios de Ozempic: cuáles son y cómo reducirlos",
    metaTitle: "Efectos secundarios de Ozempic: cuáles son y cómo evitarlos | DoctorLife",
    metaDescription:
      "Efectos secundarios de Ozempic (semaglutida): náuseas, digestiones lentas y otros síntomas, cuánto duran y cómo minimizarlos con dosis progresiva y seguimiento médico.",
    excerpt:
      "La mayoría de efectos secundarios de Ozempic son digestivos, leves y pasajeros. Te explicamos cuáles son, cuánto duran y cómo reducirlos con un buen seguimiento.",
    category: "Ozempic",
    keyword: "ozempic efectos secundarios",
    readMins: 7,
    date: "2026-05-26",
    updated: "2026-06-16",
    cover: "/blog/ozempic-efectos.png",
    coverAlt: "Persona revisando su tratamiento con apoyo médico",
    sections: [
      {
        h2: "¿Cuáles son los efectos secundarios más comunes?",
        blocks: [
          {
            type: "p",
            text: "La mayoría de efectos secundarios de Ozempic son digestivos y aparecen sobre todo al iniciar el tratamiento o al subir de dosis. Suelen ser leves y mejorar con el tiempo.",
          },
          {
            type: "table",
            caption: "Efectos secundarios de Ozempic por frecuencia",
            head: ["Frecuencia", "Síntomas habituales"],
            rows: [
              ["Muy frecuentes", "Náuseas, diarrea, vómitos, estreñimiento"],
              ["Frecuentes", "Digestiones lentas, hinchazón, dolor abdominal, fatiga"],
              ["Menos frecuentes", "Mareos, alteraciones del gusto, reacciones en el punto de inyección"],
            ],
          },
        ],
      },
      {
        h2: "¿Cuánto duran los efectos secundarios?",
        blocks: [
          {
            type: "p",
            text: "Lo más habitual es que las molestias digestivas aparezcan en las primeras semanas y se reduzcan a medida que el cuerpo se adapta. Subir la dosis demasiado rápido es la causa más frecuente de que se intensifiquen, por eso el escalado debe ser gradual y supervisado.",
          },
        ],
      },
      {
        h2: "Cómo reducir los efectos secundarios",
        blocks: [
          {
            type: "list",
            items: [
              "Subir la dosis poco a poco, según indicación médica.",
              "Comer raciones más pequeñas y evitar comidas muy grasas.",
              "Mantener una buena hidratación.",
              "Comunicar las molestias a tu equipo médico para ajustar la pauta.",
            ],
          },
          {
            type: "p",
            text: "Acude a urgencias si aparece dolor abdominal intenso y persistente, vómitos que no cesan o signos de reacción alérgica. Son poco frecuentes, pero conviene conocerlos.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic para adelgazar: cómo funciona y dosis", href: "/blog/ozempic-para-adelgazar" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
      {
        h2: "El seguimiento marca la diferencia",
        blocks: [
          {
            type: "p",
            text: "La mejor forma de evitar y gestionar los efectos secundarios es un buen acompañamiento: ajustar la dosis a tu tolerancia y tener a quién preguntar. Eso es justo lo que ofrece un tratamiento con seguimiento.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es seguro tomar Ozempic a pesar de los efectos secundarios?",
        a: "Sí, Ozempic es seguro bajo supervisión médica. La mayoría de efectos secundarios son digestivos, leves y temporales, y se reducen con una dosis progresiva y seguimiento. Los efectos graves son poco frecuentes.",
      },
      {
        q: "¿Las náuseas de Ozempic desaparecen?",
        a: "En la mayoría de personas las náuseas mejoran a medida que el cuerpo se adapta, sobre todo si la dosis se sube de forma gradual y se cuidan las comidas.",
      },
      {
        q: "¿Qué hago si los efectos secundarios son fuertes?",
        a: "Comunícalo a tu equipo médico: muchas veces basta con mantener la dosis más tiempo antes de subirla. Ante síntomas graves o persistentes, busca atención médica.",
      },
    ],
  },

  /* 15 ─── ZONA: MADRID / OZEMPIC ───────────────────── */
  {
    slug: "comprar-ozempic-madrid",
    title: "Comprar Ozempic en Madrid",
    h1: "Comprar Ozempic en Madrid: precio, receta y cómo empezar con seguimiento",
    metaTitle: "Comprar Ozempic en Madrid (2026): Precio, Receta y Clínica Online",
    metaDescription:
      "Cómo comprar Ozempic en Madrid de forma legal: precio en farmacia, cómo conseguir la receta médica y empezar con seguimiento online. ¡Primera consulta gratis!",
    excerpt:
      "Guía para comprar Ozempic en Madrid con receta: precios reales, farmacias, desabastecimiento y cómo empezar con acompañamiento médico desde cualquier distrito.",
    category: "Ozempic",
    keyword: "comprar ozempic madrid",
    readMins: 8,
    date: "2026-02-03",
    updated: "2026-06-16",
    cover: "/blog/ozempic-madrid.png",
    coverAlt: "Mujer sonriente paseando por el centro de Madrid tras empezar su tratamiento con Ozempic",
    featured: true,
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Madrid?",
        blocks: [
          {
            type: "p",
            text: "Sí, pero solo con receta médica. Ozempic (semaglutida) está autorizado en España para la diabetes tipo 2 y se dispensa en las farmacias de Madrid bajo prescripción. Ninguna farmacia de la Comunidad de Madrid —ni física ni online— puede venderlo legalmente sin una receta emitida por un médico colegiado tras valorarte.",
          },
          {
            type: "p",
            text: "Cuando el objetivo es perder peso y no hay diabetes, el médico valora si la semaglutida es adecuada para tu caso o si encaja mejor otra opción (por ejemplo Wegovy, la versión de semaglutida aprobada específicamente para obesidad). Esa decisión es clínica y debe hacerse en consulta, no comprando la pluma por tu cuenta.",
          },
          {
            type: "quote",
            text: "Desconfía de cualquier web o contacto que ofrezca Ozempic 'sin receta' o por mensajería en Madrid: es ilegal y supone un riesgo real para tu salud.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Madrid",
        blocks: [
          {
            type: "p",
            text: "El precio de Ozempic es el mismo en toda España al ser un medicamento de precio regulado: una pluma ronda los 100–130 € sin financiación (uso fuera de la indicación de diabetes). En Madrid no varía de una farmacia a otra del centro a la periferia; lo que cambia es el coste del acompañamiento médico, que es lo que de verdad marca la diferencia en los resultados.",
          },
          {
            type: "table",
            caption: "Qué pagas al empezar con Ozempic en Madrid",
            head: ["Concepto", "Dónde se paga", "Precio orientativo"],
            rows: [
              ["Primera visita médica", "DoctorLife (online)", "Gratis"],
              ["Plan de seguimiento mensual", "DoctorLife (online)", "desde 149 €/mes"],
              ["Medicación (pluma)", "Farmacia de Madrid", "≈100–130 €/pluma"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir la receta de Ozempic en Madrid",
        blocks: [
          {
            type: "p",
            text: "No necesitas desplazarte a una consulta física en pleno centro ni pedir cita con semanas de espera. Con DoctorLife haces la valoración online desde casa —vivas en Chamberí, Vallecas, Las Rozas o Alcalá de Henares— y, si el médico lo considera adecuado, recibes la prescripción electrónica para retirar el medicamento en tu farmacia habitual.",
          },
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica (gratis).",
              "Rellenas tu historial clínico y objetivos en la app.",
              "Un médico colegiado valora si la semaglutida es adecuada para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras la pluma en cualquier farmacia de Madrid y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Desabastecimiento de Ozempic en Madrid",
        blocks: [
          {
            type: "p",
            text: "Madrid, por su volumen de población, ha sido una de las zonas donde más se ha notado el desabastecimiento puntual de Ozempic, especialmente en dosis concretas. La recomendación oficial prioriza a pacientes con diabetes tipo 2, por lo que para uso en peso conviene contar con un equipo médico que pueda ajustar la pauta o valorar alternativas si una presentación no está disponible.",
          },
          {
            type: "p",
            text: "Tener seguimiento evita interrumpir el tratamiento: si tu farmacia del barrio no tiene stock, el médico puede orientarte sobre otra dosis o un GLP‑1 equivalente sin que pierdas el progreso conseguido.",
          },
        ],
      },
      {
        h2: "Empezar desde cualquier punto de Madrid",
        blocks: [
          {
            type: "p",
            text: "Una de las ventajas del seguimiento online es que no dependes de la ubicación de una clínica concreta. Da igual que estés en el centro, en un municipio del sur como Getafe o Leganés, o en la sierra: la consulta, el ajuste de dosis y el control de efectos secundarios se hacen íntegramente desde la app, con un médico colegiado detrás.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic precio en España por dosis", href: "/blog/ozempic-precio-espana" },
              { label: "Ozempic para adelgazar: cómo funciona", href: "/blog/ozempic-para-adelgazar" },
              { label: "Comprar tirzepatida en Getafe (área de Madrid)", href: "/blog/comprar-tirzepatida-getafe" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Ozempic sin receta en Madrid?",
        a: "No. Ozempic requiere receta médica en toda España. Comprarlo sin prescripción, por internet o por mensajería es ilegal y peligroso. La forma correcta es una valoración médica que determine si es adecuado para ti.",
      },
      {
        q: "¿Cuánto cuesta Ozempic en una farmacia de Madrid?",
        a: "El precio es regulado y similar en toda España: una pluma ronda los 100–130 € sin financiación. No varía de forma significativa entre farmacias de Madrid.",
      },
      {
        q: "¿Tengo que ir a una clínica física en Madrid?",
        a: "No. Con DoctorLife la valoración y el seguimiento son online. Si el médico lo considera adecuado, recibes la receta electrónica para retirar la medicación en cualquier farmacia de Madrid.",
      },
      {
        q: "¿Qué hago si hay desabastecimiento en mi farmacia?",
        a: "Tu equipo médico puede ajustar la dosis o valorar un GLP‑1 alternativo para no interrumpir el tratamiento. Por eso es mejor empezar con seguimiento que comprar la pluma por tu cuenta.",
      },
    ],
  },

  /* 16 ─── ZONA: VALENCIA / MOUNJARO ────────────────── */
  {
    slug: "comprar-mounjaro-valencia",
    title: "Comprar Mounjaro en Valencia",
    h1: "Comprar Mounjaro en Valencia: precio, receta y seguimiento médico",
    metaTitle: "Comprar Mounjaro en Valencia (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Guía para comprar Mounjaro (tirzepatida) en Valencia con receta: precio por dosis, cómo conseguir la prescripción y empezar con seguimiento online. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro en Valencia de forma legal y segura: precio de la tirzepatida, receta médica, disponibilidad y cómo empezar con acompañamiento clínico.",
    category: "Mounjaro",
    keyword: "comprar mounjaro valencia",
    readMins: 8,
    date: "2026-02-10",
    updated: "2026-06-16",
    cover: "/blog/mounjaro-valencia.png",
    coverAlt: "Hombre sonriente paseando por Valencia tras iniciar su tratamiento con Mounjaro",
    sections: [
      {
        h2: "¿Se puede comprar Mounjaro en Valencia?",
        blocks: [
          {
            type: "p",
            text: "Sí, en las farmacias de Valencia con receta médica. Mounjaro (tirzepatida) es un medicamento sujeto a prescripción: requiere que un médico colegiado valore tu caso, indique la dosis y haga el seguimiento. No existe forma legal de comprar Mounjaro sin receta, ni en farmacia física ni online.",
          },
          {
            type: "p",
            text: "Mounjaro actúa sobre dos vías hormonales (GIP y GLP‑1), lo que en los estudios se ha traducido en una pérdida de peso especialmente alta. Precisamente por su potencia, el escalado de dosis debe ser gradual y supervisado.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Valencia",
        blocks: [
          {
            type: "p",
            text: "El precio de Mounjaro depende de la dosis de la pluma y es homogéneo en toda España, así que en Valencia no encontrarás diferencias relevantes entre farmacias del Carmen, Ruzafa o de l'Horta. De forma orientativa, una pluma mensual suele situarse entre 180 € y 280 € según la concentración.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro por dosis en Valencia",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio (4 semanas)", "180–210 €"],
              ["5 mg", "Adaptación", "190–230 €"],
              ["7,5–10 mg", "Escalado", "220–260 €"],
              ["12,5–15 mg", "Mantenimiento", "250–280 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir la receta de Mounjaro en Valencia",
        blocks: [
          {
            type: "p",
            text: "Con DoctorLife no necesitas desplazarte ni esperar cita presencial. Haces la valoración online desde cualquier punto de la provincia —centro de Valencia, Torrent, Paterna, Gandía o Sagunto— y, si el médico lo considera adecuado, recibes la receta electrónica para retirar la pluma en tu farmacia.",
          },
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Completa historial y objetivos de salud en la app.",
              "Un médico valora si la tirzepatida es adecuada para ti.",
              "Si procede, recibes la prescripción y el plan de escalado de dosis.",
              "Retiras Mounjaro en tu farmacia de Valencia y sigues todo desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Disponibilidad de Mounjaro en Valencia",
        blocks: [
          {
            type: "p",
            text: "La incorporación de Mounjaro al mercado español es relativamente reciente y su demanda ha crecido rápido. En Valencia la disponibilidad ha sido en general buena, pero conviene confirmar el stock de tu dosis concreta antes de empezar y tener un equipo médico que pueda ajustar la pauta si una presentación falta puntualmente.",
          },
        ],
      },
      {
        h2: "Mounjaro frente a otras opciones",
        blocks: [
          {
            type: "p",
            text: "Mounjaro no siempre es la primera elección: depende de tu punto de partida, tu tolerancia y tus objetivos. En la consulta se valora si encaja mejor que una semaglutida (Ozempic/Wegovy) en tu caso concreto. Lo importante no es 'el más fuerte', sino el que mejor se adapta a ti con un seguimiento que minimice molestias.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Tirzepatida para adelgazar: cómo funciona", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Mounjaro sin receta en Valencia?",
        a: "No. Mounjaro (tirzepatida) requiere receta médica. Comprarlo sin prescripción es ilegal y peligroso. Necesitas una valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Valencia?",
        a: "El precio depende de la dosis y es similar en toda España: orientativamente entre 180 € y 280 € por pluma mensual. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Mounjaro adelgaza más que Ozempic?",
        a: "En los estudios la tirzepatida ha mostrado una pérdida de peso media alta, pero la mejor opción depende de cada persona. Es una decisión clínica que se valora en consulta.",
      },
      {
        q: "¿Necesito ir a una clínica en Valencia?",
        a: "No. La valoración y el seguimiento con DoctorLife son online. Si el médico lo considera adecuado, recibes la receta para retirar Mounjaro en tu farmacia de Valencia.",
      },
    ],
  },

  /* 17 ─── ZONA: SEVILLA / WEGOVY ───────────────────── */
  {
    slug: "comprar-wegovy-sevilla",
    title: "Comprar Wegovy en Sevilla",
    h1: "Comprar Wegovy en Sevilla: precio, receta y cómo empezar con seguimiento",
    metaTitle: "Comprar Wegovy en Sevilla (2026): Precio, Receta y Clínica Online",
    metaDescription:
      "Cómo comprar Wegovy en Sevilla con receta médica: precio por dosis, cómo conseguir la prescripción y empezar con seguimiento online. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Sevilla de forma legal y segura: precio de la semaglutida 2,4 mg, receta médica, desabastecimiento y cómo empezar con acompañamiento clínico.",
    category: "Wegovy",
    keyword: "comprar wegovy sevilla",
    readMins: 7,
    date: "2026-02-17",
    updated: "2026-06-16",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Mujer sonriente en Sevilla tras empezar su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Se puede comprar Wegovy en Sevilla?",
        blocks: [
          {
            type: "p",
            text: "Sí, en las farmacias de Sevilla con receta médica. Wegovy (semaglutida 2,4 mg) está aprobado en España para el control de peso, pero es un medicamento sujeto a prescripción: necesitas la valoración de un médico colegiado que confirme que es adecuado para ti y supervise el tratamiento.",
          },
          {
            type: "quote",
            text: "Ninguna farmacia de Sevilla puede dispensar Wegovy sin receta. Las ofertas 'sin prescripción' por internet son ilegales y un riesgo para la salud.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Sevilla",
        blocks: [
          {
            type: "p",
            text: "El precio de Wegovy en Sevilla es el mismo que en el resto de España, ya que la pluma sube de forma escalonada (0,25 / 0,5 / 1 / 1,7 / 2,4 mg). De forma orientativa, una pluma mensual ronda entre 200 € y 300 €, a lo que se suma la consulta y el seguimiento médico.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Sevilla",
            head: ["Dosis de la pluma", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio (semanas 1–4)", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir la receta de Wegovy en Sevilla",
        blocks: [
          {
            type: "p",
            text: "Con DoctorLife la valoración es online, así que no necesitas desplazarte al centro ni pedir cita presencial con semanas de espera. Estés en Triana, Nervión, Los Remedios o en municipios del área como Dos Hermanas o Alcalá de Guadaíra, haces la consulta desde casa y, si procede, recibes la receta electrónica para tu farmacia.",
          },
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la prescripción y las pautas de dosis.",
              "Retiras la pluma en tu farmacia de Sevilla y sigues el progreso desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Desabastecimiento de Wegovy en Sevilla",
        blocks: [
          {
            type: "p",
            text: "La disponibilidad de Wegovy ha sido irregular en España, con tensiones sobre todo en las dosis bajas de inicio. En Sevilla la situación ha ido normalizándose, pero conviene confirmar el stock en tu farmacia antes de empezar y contar con seguimiento médico que permita ajustar la pauta si una dosis concreta no está disponible.",
          },
        ],
      },
      {
        h2: "El calor y los hábitos: empezar bien en Sevilla",
        blocks: [
          {
            type: "p",
            text: "Wegovy reduce el apetito, pero el éxito a largo plazo se apoya en hábitos sostenibles. En una ciudad con veranos muy calurosos como Sevilla, cuidar la hidratación es especialmente importante durante el escalado de dosis, ya que ayuda a sobrellevar las molestias digestivas leves de las primeras semanas. Tu equipo médico te orienta en esto.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Plan para perder peso con GLP‑1 paso a paso", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Sevilla?",
        a: "No. Wegovy requiere receta médica. Comprarlo sin prescripción es ilegal y conlleva riesgos serios para la salud. Necesitas una valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Sevilla?",
        a: "El precio depende de la dosis y es similar en toda España: orientativamente entre 200 € y 300 € por pluma mensual. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Tengo que ir a una clínica física en Sevilla?",
        a: "No. Con DoctorLife la valoración y el seguimiento son online. Si el médico lo considera adecuado, recibes la receta electrónica para retirar Wegovy en tu farmacia de Sevilla.",
      },
      {
        q: "¿En cuánto tiempo se notan resultados con Wegovy?",
        a: "La mayoría de pacientes nota cambios en el apetito en las primeras semanas, con pérdida de peso progresiva a lo largo de los meses según la dosis y el plan de seguimiento.",
      },
    ],
  },

  /* 18 ─── ZONA: GETAFE / TIRZEPATIDA ───────────────── */
  {
    slug: "comprar-tirzepatida-getafe",
    title: "Comprar tirzepatida en Getafe",
    h1: "Comprar tirzepatida en Getafe: precio, receta y seguimiento médico online",
    metaTitle: "Comprar Tirzepatida en Getafe (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Cómo comprar tirzepatida (Mounjaro) en Getafe con receta: precio por dosis, cómo conseguir la prescripción y empezar con seguimiento online. ¡Primera consulta gratis!",
    excerpt:
      "Comprar tirzepatida en Getafe de forma legal y segura: precio de Mounjaro, receta médica y cómo empezar con acompañamiento clínico desde el área metropolitana de Madrid.",
    category: "Mounjaro",
    keyword: "comprar tirzepatida getafe",
    readMins: 7,
    date: "2026-02-24",
    updated: "2026-06-16",
    cover: "/blog/tirzepatida-getafe.png",
    coverAlt: "Persona sonriente en una zona residencial de Getafe tras empezar su tratamiento con tirzepatida",
    sections: [
      {
        h2: "¿Se puede comprar tirzepatida en Getafe?",
        blocks: [
          {
            type: "p",
            text: "Sí, en las farmacias de Getafe con receta médica. La tirzepatida se comercializa como Mounjaro y es un medicamento sujeto a prescripción: requiere que un médico colegiado valore tu caso, indique la dosis y supervise el tratamiento. No hay forma legal de comprar tirzepatida sin receta.",
          },
          {
            type: "p",
            text: "La tirzepatida actúa sobre dos vías hormonales (GIP y GLP‑1), lo que ayuda a reducir el apetito y mejorar el control del peso. Por su potencia, el escalado de dosis debe hacerse poco a poco y con seguimiento.",
          },
        ],
      },
      {
        h2: "Precio de la tirzepatida en Getafe",
        blocks: [
          {
            type: "p",
            text: "El precio de la tirzepatida (Mounjaro) es homogéneo en toda España, así que en Getafe es el mismo que en Madrid capital o en municipios vecinos como Leganés, Fuenlabrada o Alcorcón. De forma orientativa, una pluma mensual se sitúa entre 180 € y 280 € según la dosis.",
          },
          {
            type: "table",
            caption: "Precio orientativo de tirzepatida (Mounjaro) por dosis",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio (4 semanas)", "180–210 €"],
              ["5 mg", "Adaptación", "190–230 €"],
              ["7,5–10 mg", "Escalado", "220–260 €"],
              ["12,5–15 mg", "Mantenimiento", "250–280 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir la receta en Getafe sin desplazarte",
        blocks: [
          {
            type: "p",
            text: "Vivir en el sur de Madrid no debería complicar el acceso a un buen seguimiento médico. Con DoctorLife haces toda la valoración online desde Getafe —Sector III, Las Margaritas, Getafe Norte o cualquier barrio— sin desplazarte a Madrid centro ni depender de las listas de espera. Si el médico lo considera adecuado, recibes la receta electrónica para tu farmacia.",
          },
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si la tirzepatida es adecuada para ti.",
              "Si procede, recibes la prescripción y el plan de escalado de dosis.",
              "Retiras Mounjaro en tu farmacia de Getafe y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Una opción para el área metropolitana de Madrid",
        blocks: [
          {
            type: "p",
            text: "Getafe forma parte del cinturón sur de Madrid, una de las zonas con mayor demanda de tratamientos para el peso. La ventaja del modelo online es clara: el mismo seguimiento médico, sin coger Cercanías ni la Línea 12 de Metro para ir al centro. Da igual si estás en Getafe, Parla o Pinto: la consulta y los ajustes de dosis se hacen desde casa.",
          },
        ],
      },
      {
        h2: "Seguridad y seguimiento de la tirzepatida",
        blocks: [
          {
            type: "p",
            text: "Los efectos secundarios más habituales de la tirzepatida son digestivos (náuseas, digestiones lentas) y suelen ser leves y temporales si la dosis se sube de forma gradual. El seguimiento permite ajustar la pauta a tu tolerancia y resolver dudas, que es justo lo que diferencia un tratamiento bien hecho de comprar la pluma por tu cuenta.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Tirzepatida para adelgazar: cómo funciona", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Ozempic en Madrid", href: "/blog/comprar-ozempic-madrid" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar tirzepatida sin receta en Getafe?",
        a: "No. La tirzepatida (Mounjaro) requiere receta médica. Comprarla sin prescripción es ilegal y peligroso. Necesitas una valoración médica previa.",
      },
      {
        q: "¿La tirzepatida es lo mismo que Mounjaro?",
        a: "Sí. Tirzepatida es el principio activo y Mounjaro es el nombre comercial con el que se vende en las farmacias de España, incluida Getafe.",
      },
      {
        q: "¿Tengo que ir a Madrid centro para conseguir la receta?",
        a: "No. Con DoctorLife la valoración y el seguimiento son online desde Getafe o cualquier municipio del área metropolitana. Si procede, recibes la receta electrónica para tu farmacia.",
      },
      {
        q: "¿Cuánto cuesta la tirzepatida en Getafe?",
        a: "El precio es similar en toda España: orientativamente entre 180 € y 280 € por pluma mensual según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
    ],
  },

  /* 19 ─── ALTA INTENCIÓN: COMPRAR MOUNJARO ONLINE ──── */
  {
    slug: "comprar-mounjaro-online",
    title: "Comprar Mounjaro online",
    h1: "Comprar Mounjaro online en España: cómo hacerlo legal, seguro y con receta",
    metaTitle: "Comprar Mounjaro Online en España (2026): Receta, Precio y Cómo Empezar",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) online en España de forma legal: receta médica electrónica, precio por dosis y seguimiento. ¡Primera consulta gratis, sin esperas!",
    excerpt:
      "Comprar Mounjaro online en España paso a paso: cómo conseguir la receta de tirzepatida sin desplazarte, precio real y por qué el seguimiento médico marca la diferencia.",
    category: "Mounjaro",
    keyword: "comprar mounjaro online",
    readMins: 8,
    date: "2026-03-03",
    updated: "2026-06-16",
    cover: "/blog/comprar-mounjaro-online.png",
    coverAlt: "Persona comprando Mounjaro online con una app de telemedicina y una pluma de tirzepatida sobre la mesa",
    featured: true,
    sections: [
      {
        h2: "¿Se puede comprar Mounjaro online en España?",
        blocks: [
          {
            type: "p",
            text: "Sí, pero con un matiz importante: lo que se hace online es la consulta médica y la prescripción, no la compra directa del medicamento sin control. Mounjaro (tirzepatida) está sujeto a receta en España, así que ninguna web puede venderte la pluma sin una valoración médica previa. El modelo legal y seguro es: consulta online → receta electrónica si procede → retirada en tu farmacia.",
          },
          {
            type: "quote",
            text: "Cualquier web que ofrezca Mounjaro 'sin receta' o enviado directamente desde el extranjero sin valoración médica es ilegal y un riesgo serio para tu salud.",
          },
        ],
      },
      {
        h2: "Cómo comprar Mounjaro online paso a paso",
        blocks: [
          {
            type: "p",
            text: "El proceso con DoctorLife es 100% online y está pensado para que no pierdas tiempo en desplazamientos ni listas de espera, vivas donde vivas en España.",
          },
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online (gratis).",
              "Completas tu historial clínico y tus objetivos de peso en la app.",
              "Un médico colegiado valora si la tirzepatida es adecuada y segura para ti.",
              "Si procede, recibes la receta electrónica y el plan de escalado de dosis.",
              "Retiras Mounjaro en cualquier farmacia de España y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Precio de Mounjaro online",
        blocks: [
          {
            type: "p",
            text: "Comprar Mounjaro online no significa que el medicamento sea más caro o más barato: el precio de la pluma es regulado y lo pagas en tu farmacia. Lo que contratas online es la valoración y el seguimiento médico, que es justo lo que evita errores de dosis y abandonos.",
          },
          {
            type: "table",
            caption: "Qué pagas al comprar Mounjaro online",
            head: ["Concepto", "Dónde se paga", "Precio orientativo"],
            rows: [
              ["Primera visita médica", "DoctorLife (online)", "Gratis"],
              ["Plan de seguimiento mensual", "DoctorLife (online)", "desde 149 €/mes"],
              ["Medicación (pluma, según dosis)", "Farmacia", "≈180–280 €/pluma"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Ventajas de hacerlo online frente a buscar 'Mounjaro sin receta'",
        blocks: [
          {
            type: "p",
            text: "La tentación de buscar atajos es comprensible, pero comprar tirzepatida por canales no regulados expone a falsificaciones, dosis incorrectas y ausencia total de control médico. El modelo online legal te da lo mejor de los dos mundos: la comodidad de no desplazarte y la seguridad de un médico que ajusta la pauta a tu tolerancia.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Tirzepatida para adelgazar: cómo funciona", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Mounjaro online sin receta?",
        a: "No. Mounjaro requiere receta médica en España. Lo que se hace online es la consulta y la prescripción si procede; el medicamento se retira en farmacia. Comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Es seguro comprar Mounjaro online?",
        a: "Sí, siempre que sea a través de un servicio médico legal con médicos colegiados y receta electrónica. Evita webs que envíen el medicamento sin valoración médica previa.",
      },
      {
        q: "¿Cuánto tarda en llegar la receta?",
        a: "Tras la valoración online, si el médico lo considera adecuado, recibes la receta electrónica para retirar Mounjaro en tu farmacia, normalmente el mismo día o en muy poco tiempo.",
      },
      {
        q: "¿Cuánto cuesta comprar Mounjaro online?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma (≈180–280 € según dosis) se paga en la farmacia.",
      },
    ],
  },

  /* 20 ─── ALTA INTENCIÓN: COMPRAR WEGOVY ONLINE ────── */
  {
    slug: "comprar-wegovy-online",
    title: "Comprar Wegovy online",
    h1: "Comprar Wegovy online en España: receta, precio y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy Online en España (2026): Receta, Precio y Cómo Empezar",
    metaDescription:
      "Cómo comprar Wegovy (semaglutida 2,4 mg) online en España de forma legal: receta electrónica, precio por dosis y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy online en España de forma legal: cómo conseguir la receta de semaglutida 2,4 mg sin desplazarte, precio real y seguimiento médico paso a paso.",
    category: "Wegovy",
    keyword: "comprar wegovy online",
    readMins: 8,
    date: "2026-03-10",
    updated: "2026-06-16",
    cover: "/blog/comprar-wegovy-online.png",
    coverAlt: "Mujer en una videoconsulta médica online para comprar Wegovy con receta",
    featured: true,
    sections: [
      {
        h2: "¿Se puede comprar Wegovy online en España?",
        blocks: [
          {
            type: "p",
            text: "Sí, de forma legal lo que se realiza online es la consulta médica y la prescripción, no la venta directa del medicamento sin control. Wegovy (semaglutida 2,4 mg) está aprobado para el control de peso pero requiere receta. El proceso correcto es: valoración online → receta electrónica si procede → retirada en tu farmacia.",
          },
          {
            type: "p",
            text: "Wegovy es la versión de semaglutida específicamente indicada para la obesidad y el sobrepeso con factores de riesgo, a diferencia de Ozempic, que está aprobado para la diabetes. Por eso, cuando el objetivo es perder peso, muchas veces es la opción que el médico valora primero.",
          },
        ],
      },
      {
        h2: "Cómo comprar Wegovy online paso a paso",
        blocks: [
          {
            type: "p",
            text: "Con DoctorLife todo el proceso es online y sin esperas, desde cualquier punto de España.",
          },
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online (gratis).",
              "Completas tu historial clínico y tus objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado y seguro para ti.",
              "Si procede, recibes la receta electrónica y la pauta de escalado de dosis.",
              "Retiras la pluma en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Precio de Wegovy online por dosis",
        blocks: [
          {
            type: "p",
            text: "El precio de la pluma de Wegovy es regulado y depende de la dosis; lo pagas en la farmacia. Online contratas la consulta y el seguimiento médico, que es lo que asegura que el escalado se haga bien y minimices molestias.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis",
            head: ["Dosis de la pluma", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio (semanas 1–4)", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Comprar Wegovy online de forma segura",
        blocks: [
          {
            type: "p",
            text: "Huye de webs que prometan Wegovy 'sin receta' o envíos directos desde el extranjero sin valoración: además de ilegal, te expone a falsificaciones y a usar el medicamento sin supervisión. El modelo online legal combina la comodidad de no desplazarte con la seguridad de un médico que sigue tu evolución.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Comprar Wegovy en Sevilla", href: "/blog/comprar-wegovy-sevilla" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy online sin receta?",
        a: "No. Wegovy requiere receta médica en España. Online se hace la consulta y la prescripción si procede; el medicamento se retira en farmacia. Comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Wegovy es mejor que Ozempic para adelgazar?",
        a: "Wegovy es la versión de semaglutida aprobada específicamente para el control de peso, mientras que Ozempic está indicado para la diabetes. La mejor opción para tu caso la decide el médico en consulta.",
      },
      {
        q: "¿Cuánto cuesta comprar Wegovy online?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma (≈200–300 € según dosis) se paga en la farmacia.",
      },
      {
        q: "¿Cómo recibo la receta si compro Wegovy online?",
        a: "Tras la valoración médica online, si procede recibes una receta electrónica para retirar Wegovy en cualquier farmacia de España, normalmente sin esperas.",
      },
    ],
  },

  /* 21 ─── ALTA INTENCIÓN: COMPRAR TIRZEPATIDA ONLINE ─ */
  {
    slug: "comprar-tirzepatida-online",
    title: "Comprar tirzepatida online",
    h1: "Comprar tirzepatida online en España: receta, precio y seguimiento médico",
    metaTitle: "Comprar Tirzepatida Online en España (2026): Receta, Precio y Guía",
    metaDescription:
      "Cómo comprar tirzepatida (Mounjaro) online en España de forma legal: receta electrónica, precio por dosis y seguimiento médico. ¡Primera consulta gratis, sin esperas!",
    excerpt:
      "Comprar tirzepatida online en España de forma legal y segura: cómo conseguir la receta de Mounjaro sin desplazarte, precio real y seguimiento médico paso a paso.",
    category: "Mounjaro",
    keyword: "comprar tirzepatida online",
    readMins: 7,
    date: "2026-03-17",
    updated: "2026-06-16",
    cover: "/blog/comprar-tirzepatida-online.png",
    coverAlt: "Manos sosteniendo un móvil con una receta digital de tirzepatida y una pluma sobre la mesa",
    sections: [
      {
        h2: "¿Se puede comprar tirzepatida online en España?",
        blocks: [
          {
            type: "p",
            text: "Sí, a través del modelo legal: la consulta y la receta se gestionan online y el medicamento se retira en farmacia. La tirzepatida se comercializa como Mounjaro y está sujeta a receta médica, por lo que ninguna web puede vendértela sin una valoración previa de un médico colegiado.",
          },
          {
            type: "p",
            text: "La tirzepatida actúa sobre dos vías hormonales (GIP y GLP‑1), lo que ayuda a controlar el apetito y el peso. Por su potencia, el escalado de dosis debe ser gradual y supervisado, algo que solo garantiza un servicio médico real.",
          },
        ],
      },
      {
        h2: "Cómo comprar tirzepatida online paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online (gratis).",
              "Completas tu historial clínico y tus objetivos en la app.",
              "Un médico colegiado valora si la tirzepatida es adecuada y segura para ti.",
              "Si procede, recibes la receta electrónica y el plan de escalado de dosis.",
              "Retiras Mounjaro en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "Precio de la tirzepatida online por dosis",
        blocks: [
          {
            type: "p",
            text: "El precio de la pluma es regulado y lo pagas en la farmacia; online contratas la valoración y el seguimiento. Esta es la referencia orientativa por dosis.",
          },
          {
            type: "table",
            caption: "Precio orientativo de tirzepatida (Mounjaro) por dosis",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio (4 semanas)", "180–210 €"],
              ["5 mg", "Adaptación", "190–230 €"],
              ["7,5–10 mg", "Escalado", "220–260 €"],
              ["12,5–15 mg", "Mantenimiento", "250–280 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Tirzepatida online: legal y con seguimiento",
        blocks: [
          {
            type: "p",
            text: "Comprar tirzepatida por canales no regulados expone a falsificaciones y a usar el medicamento sin control médico. El modelo online legal te ofrece la comodidad de no desplazarte y la seguridad de un médico que ajusta la dosis a tu tolerancia y resuelve tus dudas durante todo el tratamiento.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Mounjaro online", href: "/blog/comprar-mounjaro-online" },
              { label: "Tirzepatida para adelgazar: cómo funciona", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Comprar tirzepatida en Getafe", href: "/blog/comprar-tirzepatida-getafe" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar tirzepatida online sin receta?",
        a: "No. La tirzepatida (Mounjaro) requiere receta médica. Online se hace la consulta y la prescripción si procede; el medicamento se retira en farmacia. Sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Tirzepatida y Mounjaro son lo mismo?",
        a: "Sí. Tirzepatida es el principio activo y Mounjaro es su nombre comercial en las farmacias de España.",
      },
      {
        q: "¿Es seguro comprar tirzepatida online?",
        a: "Sí, siempre que sea mediante un servicio médico legal con médicos colegiados y receta electrónica. Evita webs que envíen el medicamento sin valoración médica.",
      },
      {
        q: "¿Cuánto cuesta comprar tirzepatida online?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma (≈180–280 € según dosis) se paga en la farmacia.",
      },
    ],
  },

  /* 22 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-madrid",
    title: "Comprar Wegovy en Madrid",
    h1: "Comprar Wegovy en Madrid: precio, receta y cómo empezar hoy",
    metaTitle: "Comprar Wegovy en Madrid (2026): Precio, Receta y Sin Esperas",
    metaDescription:
      "Cómo comprar Wegovy en Madrid de forma legal y segura: precio por dosis, cómo conseguir la receta sin lista de espera y empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Madrid con receta médica y sin esperas: precio real por dosis, cómo conseguir la prescripción online y empezar con seguimiento clínico de verdad.",
    category: "Wegovy",
    keyword: "comprar wegovy madrid",
    readMins: 7,
    date: "2026-03-20",
    updated: "2026-06-17",
    cover: "/hero/woman.png",
    coverAlt: "Paciente en Madrid iniciando su tratamiento con Wegovy con seguimiento médico",
    featured: true,
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Madrid?",
        blocks: [
          {
            type: "p",
            text: "Wegovy (semaglutida 2,4 mg) se dispensa en farmacias de Madrid, pero siempre con receta médica. No es legal comprarlo sin prescripción, y cualquier web que ofrezca Wegovy 'sin receta' o lo envíe a casa sin valoración previa está fuera de la ley y pone en riesgo tu salud.",
          },
          {
            type: "p",
            text: "La vía más rápida en Madrid es hacer la consulta médica online: un médico colegiado valora tu caso, emite la receta electrónica si procede y tú retiras la pluma en la farmacia de tu barrio el mismo día, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Madrid por dosis",
        blocks: [
          {
            type: "p",
            text: "El precio de la pluma es regulado y lo pagas en la farmacia; aparte está la consulta y el seguimiento médico. De forma orientativa, una pluma mensual se sitúa entre 200 € y 300 € según la dosis.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Madrid",
            head: ["Dosis de la pluma", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio (semanas 1–4)", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar paso a paso en Madrid",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online (gratis).",
              "Completa tu historial clínico y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado y seguro para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Madrid y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
      {
        h2: "¿Hay desabastecimiento de Wegovy en Madrid?",
        blocks: [
          {
            type: "p",
            text: "La disponibilidad ha sido irregular, sobre todo en las dosis bajas de inicio. En Madrid la situación ha mejorado, pero conviene confirmar el stock en tu farmacia y contar con un equipo médico que pueda ajustar la pauta si una dosis concreta falta puntualmente.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Comprar Ozempic en Madrid", href: "/blog/comprar-ozempic-madrid" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Madrid?",
        a: "No. Wegovy requiere receta médica. Comprarlo sin prescripción es ilegal y peligroso. La forma legal es hacer una consulta médica, recibir la receta si procede y retirar la pluma en farmacia.",
      },
      {
        q: "¿Cuánto se tarda en conseguir la receta en Madrid?",
        a: "Con la consulta online puedes tener la valoración y, si procede, la receta electrónica el mismo día, sin listas de espera. Luego retiras Wegovy en tu farmacia.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento médico empieza desde 149 €/mes; la pluma se compra aparte en farmacia si se prescribe.",
      },
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, bajo supervisión médica y con la dosis ajustada de forma progresiva. Los efectos secundarios más comunes (náuseas, digestiones lentas) suelen ser leves y temporales.",
      },
    ],
  },

  /* 23 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-madrid",
    title: "Comprar Mounjaro en Madrid",
    h1: "Comprar Mounjaro (tirzepatida) en Madrid: precio, receta y resultados",
    metaTitle: "Comprar Mounjaro en Madrid (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Madrid con receta: precio por dosis, diferencias con Wegovy y cómo empezar con seguimiento médico sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Mounjaro (tirzepatida) es uno de los GLP‑1 más eficaces para perder peso. Te explicamos cómo comprarlo en Madrid con receta, su precio y cómo empezar con seguimiento médico.",
    category: "Mounjaro",
    keyword: "comprar mounjaro madrid",
    readMins: 7,
    date: "2026-03-22",
    updated: "2026-06-17",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) lista para tratamiento en Madrid",
    featured: true,
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Madrid?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Madrid con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico; ninguna web puede vendértelo legalmente sin una valoración previa.",
          },
          {
            type: "p",
            text: "La vía más cómoda es la consulta médica online: un endocrino o internista colegiado valora tu caso, emite la receta electrónica si procede y retiras la pluma en tu farmacia de Madrid sin lista de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Madrid por dosis",
        blocks: [
          {
            type: "p",
            text: "El precio de la pluma depende de la dosis y oscila de forma orientativa entre 200 € y 350 € al mes. Igual que Wegovy, requiere receta y no debe comprarse por canales no autorizados.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Madrid",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Mounjaro vs Wegovy: ¿cuál elegir en Madrid?",
        blocks: [
          {
            type: "list",
            items: [
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media en estudios.",
              "Wegovy (semaglutida): GLP‑1, amplia experiencia clínica y buena tolerancia.",
              "La elección depende de tu historial, objetivos y tolerancia: lo decide el médico contigo.",
            ],
          },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Madrid",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Tirzepatida para adelgazar: resultados y efectos", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Comprar Wegovy en Madrid", href: "/blog/comprar-wegovy-madrid" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Madrid?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa. La forma legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Mounjaro adelgaza más que Wegovy?",
        a: "En estudios, la tirzepatida (Mounjaro) muestra una pérdida de peso media algo superior, pero la respuesta es individual y debe valorarla tu médico.",
      },
      {
        q: "¿Puedo conseguir Mounjaro el mismo día en Madrid?",
        a: "Con la consulta online puedes recibir la receta electrónica el mismo día si procede y retirar la pluma en tu farmacia, sujeto a disponibilidad de stock.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento médico empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 24 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-barcelona",
    title: "Comprar Ozempic en Barcelona",
    h1: "Comprar Ozempic en Barcelona: precio, receta y qué debes saber",
    metaTitle: "Comprar Ozempic en Barcelona (2026): Precio, Receta y Alternativas",
    metaDescription:
      "Cómo comprar Ozempic en Barcelona con receta: precio, por qué es un fármaco para la diabetes y qué alternativa usar si tu objetivo es perder peso. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Ozempic en Barcelona con receta médica: precio real, por qué Ozempic está indicado para la diabetes y qué tratamiento es mejor si tu objetivo es adelgazar.",
    category: "Ozempic",
    keyword: "comprar ozempic barcelona",
    readMins: 7,
    date: "2026-03-24",
    updated: "2026-06-17",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de semaglutida (Ozempic) y receta médica en Barcelona",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Barcelona?",
        blocks: [
          {
            type: "p",
            text: "Sí, en farmacias de Barcelona con receta médica. Ozempic (semaglutida) está autorizado para la diabetes tipo 2, no para perder peso. Por eso es importante una valoración médica que confirme qué tratamiento es el adecuado para ti.",
          },
          {
            type: "p",
            text: "Si tu objetivo es adelgazar, el médico puede valorar la versión de semaglutida indicada para el peso (Wegovy) o la tirzepatida (Mounjaro), en lugar de usar Ozempic fuera de indicación.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Barcelona",
        blocks: [
          {
            type: "p",
            text: "El precio de Ozempic en farmacia se sitúa de forma orientativa entre 120 € y 170 € por pluma, según la dosis. Está financiado para diabetes con receta del especialista, pero no para uso estético o de pérdida de peso.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Barcelona",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Ozempic vs Wegovy para perder peso",
        blocks: [
          {
            type: "p",
            text: "Ozempic y Wegovy comparten el mismo principio activo (semaglutida), pero Wegovy llega a una dosis mayor (2,4 mg) y está aprobado específicamente para el control del peso. Usar Ozempic para adelgazar es una práctica fuera de ficha técnica que debe valorar siempre un médico.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Comprar Wegovy en Barcelona", href: "/blog/comprar-wegovy-barcelona" },
            ],
          },
        ],
      },
      {
        h2: "Cómo empezar con seguimiento en Barcelona",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Un médico colegiado valora tu caso y tu objetivo real.",
              "Si procede, recibes la prescripción del fármaco más adecuado.",
              "Seguimiento continuo desde la app con ajustes de dosis y soporte.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar Ozempic para adelgazar en Barcelona?",
        a: "Ozempic está indicado para la diabetes tipo 2, no para perder peso. Si tu objetivo es adelgazar, el médico suele recomendar Wegovy o Mounjaro, que sí están aprobados para el control del peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Barcelona?",
        a: "Sí, siempre. Ozempic es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Ozempic y Wegovy son lo mismo?",
        a: "Comparten el principio activo (semaglutida), pero Wegovy llega a dosis mayores y está aprobado para el peso, mientras que Ozempic está indicado para la diabetes.",
      },
      {
        q: "¿Cuánto cuesta la consulta en DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; el fármaco se compra aparte en farmacia.",
      },
    ],
  },

  /* 25 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-valencia",
    title: "Comprar Wegovy en Valencia",
    h1: "Comprar Wegovy en Valencia: precio, receta y cómo empezar",
    metaTitle: "Comprar Wegovy en Valencia (2026): Precio, Receta y Sin Esperas",
    metaDescription:
      "Cómo comprar Wegovy en Valencia con receta médica: precio por dosis, cómo conseguir la prescripción online sin esperas y empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Valencia de forma legal y segura: precio por dosis, cómo conseguir la receta online sin lista de espera y empezar con acompañamiento médico real.",
    category: "Wegovy",
    keyword: "comprar wegovy valencia",
    readMins: 6,
    date: "2026-03-26",
    updated: "2026-06-17",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Valencia comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Valencia?",
        blocks: [
          {
            type: "p",
            text: "Wegovy (semaglutida 2,4 mg) se dispensa en farmacias de Valencia, siempre con receta médica. No se puede comprar sin prescripción, y las webs que lo ofrecen 'sin receta' son ilegales y peligrosas.",
          },
          {
            type: "p",
            text: "Con la consulta médica online puedes conseguir la valoración y, si procede, la receta electrónica el mismo día, y retirar la pluma en tu farmacia de Valencia sin desplazarte ni esperar.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Valencia por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Valencia",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 ��"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Valencia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Comprar Mounjaro en Valencia", href: "/blog/comprar-mounjaro-valencia" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Valencia?",
        a: "No. Wegovy requiere receta médica. Comprarlo sin prescripción es ilegal y arriesgado. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Valencia?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento médico se pagan aparte.",
      },
      {
        q: "¿Puedo conseguir la receta sin desplazarme?",
        a: "Sí. La consulta es online y, si procede, recibes la receta electrónica el mismo día para retirar la pluma en tu farmacia de Valencia.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 26 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-sevilla",
    title: "Comprar Mounjaro en Sevilla",
    h1: "Comprar Mounjaro (tirzepatida) en Sevilla: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Sevilla (2026): Precio, Receta y Resultados",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Sevilla con receta: precio por dosis, resultados esperables y cómo empezar con seguimiento médico sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Sevilla con receta médica: precio por dosis, qué resultados esperar y cómo empezar con seguimiento médico y receta electrónica.",
    category: "Mounjaro",
    keyword: "comprar mounjaro sevilla",
    readMins: 6,
    date: "2026-03-28",
    updated: "2026-06-17",
    cover: "/blog/mounjaro-valencia.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Sevilla",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Sevilla?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Sevilla con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado; ninguna web puede vendértelo legalmente sin valoración médica previa.",
          },
          {
            type: "p",
            text: "Con la consulta online, un médico colegiado valora tu caso, emite la receta electrónica si procede y retiras la pluma en tu farmacia de Sevilla sin lista de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Sevilla por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Sevilla",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Qué resultados esperar con Mounjaro",
        blocks: [
          {
            type: "p",
            text: "En estudios clínicos, la tirzepatida ha mostrado pérdidas de peso de hasta el 20–25 % del peso corporal con la dosis máxima y un buen plan. Los resultados dependen de tu punto de partida, la dosis y los hábitos, por eso el seguimiento médico marca la diferencia.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Tirzepatida para adelgazar: resultados y efectos", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Wegovy en Sevilla", href: "/blog/comprar-wegovy-sevilla" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Sevilla?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa antes de poder dispensarse en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Sevilla?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis. La consulta y el seguimiento médico se pagan aparte.",
      },
      {
        q: "¿Cuánto peso se puede perder con Mounjaro?",
        a: "En estudios, hasta un 20–25 % del peso corporal con la dosis máxima, aunque la respuesta es individual y depende de la dosis, el plan y los hábitos.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. Si el médico lo considera adecuado, recibes la receta y empiezas el seguimiento desde 149 €/mes.",
      },
    ],
  },

  /* 27 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-malaga",
    title: "Comprar Wegovy en Málaga",
    h1: "Comprar Wegovy en Málaga: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Málaga (2026): Precio, Receta y Seguimiento Médico",
    metaDescription:
      "Cómo comprar Wegovy en Málaga con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Málaga de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy malaga",
    readMins: 6,
    date: "2026-03-30",
    updated: "2026-06-17",
    cover: "/hero/woman.png",
    coverAlt: "Paciente en Málaga iniciando tratamiento con Wegovy con seguimiento médico",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Málaga?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Málaga con receta médica. No se puede comprar sin prescripción; cualquier web que lo ofrezca 'sin receta' es ilegal. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Málaga.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Málaga por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Málaga",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Málaga paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Málaga y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Málaga?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Málaga?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "��Puedo hacerlo todo online desde Málaga?",
        a: "S����. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Málaga.",
      },
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, bajo supervisión médica y con la dosis ajustada de forma progresiva. Los efectos secundarios habituales son leves y temporales.",
      },
    ],
  },

  /* 28 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-bilbao",
    title: "Comprar Mounjaro en Bilbao",
    h1: "Comprar Mounjaro (tirzepatida) en Bilbao: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Bilbao (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Bilbao con receta: precio por dosis y cómo empezar con seguimiento médico y receta electrónica sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Bilbao con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar mounjaro bilbao",
    readMins: 6,
    date: "2026-04-01",
    updated: "2026-06-17",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Bilbao",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Bilbao?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Bilbao con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Bilbao, sin desplazamientos ni listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Bilbao por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Bilbao",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Bilbao",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia de Bilbao y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Mounjaro online en España", href: "/blog/comprar-mounjaro-online" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Bilbao?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Bilbao?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis; la consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo gestionar todo online desde Bilbao?",
        a: "Sí. La consulta y la receta electrónica son online; solo retiras la pluma en tu farmacia de Bilbao.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 29 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-valencia",
    title: "Comprar Ozempic en Valencia",
    h1: "Comprar Ozempic en Valencia: precio, receta y alternativas para el peso",
    metaTitle: "Comprar Ozempic en Valencia (2026): Precio, Receta y Alternativas",
    metaDescription:
      "Cómo comprar Ozempic en Valencia con receta: precio, por qué es un fármaco para diabetes y qué alternativa elegir si quieres perder peso. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Ozempic en Valencia con receta médica: precio real, por qué está indicado para la diabetes y qué tratamiento es mejor si tu objetivo es adelgazar.",
    category: "Ozempic",
    keyword: "comprar ozempic valencia",
    readMins: 6,
    date: "2026-04-03",
    updated: "2026-06-17",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de semaglutida (Ozempic) y receta médica en Valencia",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Valencia?",
        blocks: [
          {
            type: "p",
            text: "Sí, en farmacias de Valencia con receta médica. Ozempic (semaglutida) está autorizado para la diabetes tipo 2, no para perder peso. Por eso conviene una valoración médica que confirme el tratamiento adecuado para tu caso.",
          },
          {
            type: "p",
            text: "Si tu objetivo es adelgazar, el médico puede valorar Wegovy (semaglutida para el peso) o Mounjaro (tirzepatida) en lugar de usar Ozempic fuera de indicación.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Valencia",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Valencia",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Alternativas a Ozempic para perder peso",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (semaglutida 2,4 mg): aprobado específicamente para el control del peso.",
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media.",
              "La elección depende de tu historial y objetivos: lo decide el médico contigo.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Ozempic para adelgazar: qué debes saber", href: "/blog/ozempic-para-adelgazar" },
              { label: "Comprar Wegovy en Valencia", href: "/blog/comprar-wegovy-valencia" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar Ozempic para adelgazar en Valencia?",
        a: "Ozempic está indicado para la diabetes tipo 2. Si tu objetivo es perder peso, el médico suele recomendar Wegovy o Mounjaro, aprobados para el control del peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Valencia?",
        a: "Sí, siempre. Es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Cuánto cuesta Ozempic en Valencia?",
        a: "La pluma se sitúa de forma orientativa entre 120 € y 170 € según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 30 ───────────────────────────────────────────── */
  {
    slug: "comprar-semaglutida-online",
    title: "Comprar semaglutida online",
    h1: "Comprar semaglutida online en España: receta, precio y seguimiento médico",
    metaTitle: "Comprar Semaglutida Online en España (2026): Receta y Precio",
    metaDescription:
      "Cómo comprar semaglutida (Wegovy/Ozempic) online en España de forma legal: receta electrónica, precio por dosis y seguimiento médico. ¡Primera consulta gratis, sin esperas!",
    excerpt:
      "Comprar semaglutida online en España de forma legal: cómo conseguir la receta de Wegovy u Ozempic sin desplazarte, precio real y seguimiento médico paso a paso.",
    category: "Wegovy",
    keyword: "comprar semaglutida online",
    readMins: 7,
    date: "2026-04-05",
    updated: "2026-06-17",
    cover: "/products/maren-oral.png",
    coverAlt: "Móvil con receta electrónica de semaglutida y pluma sobre la mesa",
    sections: [
      {
        h2: "¿Se puede comprar semaglutida online en España?",
        blocks: [
          {
            type: "p",
            text: "Sí, mediante el modelo legal: la consulta y la receta se gestionan online y el medicamento se retira en farmacia. La semaglutida se comercializa como Wegovy (para el peso) y Ozempic (para la diabetes), y siempre requiere receta médica.",
          },
          {
            type: "p",
            text: "Ninguna web puede venderte semaglutida sin una valoración previa de un médico colegiado. Las fórmulas magistrales o los viales 'sin receta' que se anuncian online no son una alternativa segura.",
          },
        ],
      },
      {
        h2: "Precio de la semaglutida online por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de semaglutida (Wegovy) por dosis",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo comprar semaglutida online paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online gratis.",
              "Completas tu historial clínico y objetivos en la app.",
              "Un médico colegiado valora si la semaglutida es adecuada y segura para ti.",
              "Si procede, recibes la receta electrónica y el plan de dosis.",
              "Retiras Wegovy u Ozempic en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Semaglutida: comprar con receta", href: "/blog/semaglutida-comprar-con-receta" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Wegovy precio en España", href: "/blog/wegovy-precio-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar semaglutida online sin receta?",
        a: "No. La semaglutida (Wegovy/Ozempic) requiere receta médica. Online se hace la consulta y la prescripción si procede; el medicamento se retira en farmacia.",
      },
      {
        q: "¿Wegovy y Ozempic son semaglutida?",
        a: "Sí, ambos contienen semaglutida. Wegovy está aprobado para el control del peso (hasta 2,4 mg) y Ozempic para la diabetes tipo 2.",
      },
      {
        q: "¿Es seguro comprar semaglutida online?",
        a: "Sí, siempre que sea mediante un servicio médico legal con médicos colegiados y receta electrónica. Evita webs que envíen el medicamento sin valoración médica.",
      },
      {
        q: "¿Cuánto cuesta empezar?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma se paga en la farmacia según la dosis.",
      },
    ],
  },

  /* 31 ───────────────────────────────────────────── */
  {
    slug: "wegovy-vs-mounjaro",
    title: "Wegovy vs Mounjaro",
    h1: "Wegovy vs Mounjaro: cuál elegir para perder peso en 2026",
    metaTitle: "Wegovy vs Mounjaro: Diferencias, Eficacia y Cuál Elegir (2026)",
    metaDescription:
      "Comparativa clara de Wegovy y Mounjaro para perder peso: principio activo, eficacia, dosis, precio y cuál te conviene. ¡Primera consulta gratis!",
    excerpt:
      "Wegovy y Mounjaro son los dos GLP‑1 más usados para adelgazar. Te explicamos las diferencias reales en eficacia, dosis y precio, y cuál tiene sentido según tu caso.",
    category: "Comparativas",
    keyword: "wegovy vs mounjaro",
    readMins: 7,
    date: "2026-04-07",
    updated: "2026-06-17",
    cover: "/products/maren-lineup.png",
    coverAlt: "Comparativa de plumas GLP-1: Wegovy y Mounjaro",
    featured: true,
    sections: [
      {
        h2: "La diferencia clave en una frase",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (semaglutida): actúa sobre un receptor (GLP‑1), con amplia experiencia clínica.",
              "Mounjaro (tirzepatida): actúa sobre dos receptores (GIP y GLP‑1), con mayor pérdida de peso media.",
              "Ambos se inyectan una vez por semana y escalan la dosis de forma gradual.",
            ],
          },
        ],
      },
      {
        h2: "Eficacia: ¿cuál adelgaza más?",
        blocks: [
          {
            type: "p",
            text: "En los ensayos clínicos, la semaglutida 2,4 mg (Wegovy) logra pérdidas medias en torno al 15 % del peso corporal, mientras que la tirzepatida (Mounjaro) alcanza el 20–25 % con la dosis máxima. La tirzepatida tiende a ser algo más potente, pero la respuesta es muy individual.",
          },
          {
            type: "table",
            caption: "Wegovy vs Mounjaro: comparativa rápida",
            head: ["Característica", "Wegovy", "Mounjaro"],
            rows: [
              ["Principio activo", "Semaglutida", "Tirzepatida"],
              ["Mecanismo", "GLP‑1", "GIP + GLP‑1"],
              ["Pérdida de peso media", "~15 %", "~20–25 %"],
              ["Administración", "1 vez/semana", "1 vez/semana"],
              ["Precio orientativo/mes", "200–300 €", "200–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Cuál te conviene a ti?",
        blocks: [
          {
            type: "p",
            text: "No existe un 'mejor' universal. La elección depende de tu historial, tu tolerancia, la disponibilidad y tus objetivos. Algunas personas toleran mejor uno que otro, y la respuesta de peso varía. Por eso lo correcto es que un médico personalice la recomendación tras valorarte.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic vs Wegovy vs Mounjaro: comparativa completa", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Mounjaro precio en España", href: "/blog/mounjaro-precio-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Mounjaro adelgaza más que Wegovy?",
        a: "En estudios, la tirzepatida (Mounjaro) muestra una pérdida de peso media superior (20–25 % frente a ~15 %), pero la respuesta es individual y debe valorarla tu médico.",
      },
      {
        q: "¿Puedo cambiar de Wegovy a Mounjaro?",
        a: "En algunos casos sí, siempre bajo indicación médica y con un seguimiento adecuado de la transición de dosis.",
      },
      {
        q: "¿Cuál tiene menos efectos secundarios?",
        a: "Ambos comparten efectos digestivos leves y temporales (náuseas, digestiones lentas). La tolerancia es individual; el escalado gradual de dosis ayuda a minimizarlos.",
      },
      {
        q: "¿Cuál es más barato?",
        a: "Wegovy suele moverse entre 200 € y 300 €/mes y Mounjaro entre 200 € y 350 €/mes según la dosis. El coste real depende de la fase del tratamiento.",
      },
    ],
  },

  /* 32 ───────────────────────────────────────────── */
  {
    slug: "saxenda-precio-espana",
    title: "Saxenda precio España",
    h1: "Saxenda precio en España: cuánto cuesta y cómo conseguirlo con receta",
    metaTitle: "Saxenda Precio España 2026: Cuánto Cuesta y Cómo Conseguirlo",
    metaDescription:
      "Precio de Saxenda (liraglutida) en España, cómo se usa, diferencias con Wegovy y Mounjaro y cómo empezar con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Cuánto cuesta Saxenda (liraglutida) en España, cómo se administra y en qué se diferencia de Wegovy y Mounjaro, con receta y seguimiento médico real.",
    category: "Precios",
    keyword: "saxenda precio españa",
    readMins: 6,
    date: "2026-04-09",
    updated: "2026-06-17",
    cover: "/products/maren-daily.png",
    coverAlt: "Pluma de liraglutida (Saxenda) para tratamiento de pérdida de peso",
    sections: [
      {
        h2: "¿Cuánto cuesta Saxenda en España?",
        blocks: [
          {
            type: "p",
            text: "Saxenda (liraglutida) es un análogo del GLP‑1 de administración diaria, a diferencia de Wegovy o Mounjaro que son semanales. Su precio en farmacia se sitúa de forma orientativa entre 130 € y 200 € por caja, y como suele requerir varias cajas al mes el coste mensual puede ser más alto.",
          },
          {
            type: "table",
            caption: "Saxenda precio orientativo en España",
            head: ["Presentación", "Uso", "Precio orientativo"],
            rows: [
              ["Caja de plumas", "Tratamiento diario", "130–200 € /caja"],
              ["Coste mensual", "Dosis de mantenimiento (3,0 mg/día)", "200–300 €/mes"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Saxenda vs Wegovy vs Mounjaro",
        blocks: [
          {
            type: "list",
            items: [
              "Saxenda (liraglutida): inyección diaria, GLP‑1, pérdida de peso media menor.",
              "Wegovy (semaglutida): inyección semanal, mayor comodidad y eficacia que Saxenda.",
              "Mounjaro (tirzepatida): inyección semanal, doble acción GIP/GLP‑1, la mayor eficacia media.",
            ],
          },
          {
            type: "p",
            text: "Hoy, para muchas personas Wegovy y Mounjaro han desplazado a Saxenda por su comodidad (una inyección a la semana) y mayor pérdida de peso media. Aun así, Saxenda sigue siendo una opción válida en determinados casos que valora el médico.",
          },
        ],
      },
      {
        h2: "Cómo empezar con receta y seguimiento",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Un médico colegiado valora qué GLP‑1 encaja mejor en tu caso.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Seguimiento continuo desde la app con ajustes y soporte.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España", href: "/blog/wegovy-precio-espana" },
              { label: "Mounjaro precio en España", href: "/blog/mounjaro-precio-espana" },
              { label: "Wegovy vs Mounjaro: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta Saxenda en España?",
        a: "De forma orientativa, entre 130 € y 200 € por caja, con un coste mensual que puede llegar a 200–300 € según las cajas necesarias. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Saxenda es diario o semanal?",
        a: "Saxenda (liraglutida) se administra una vez al día, a diferencia de Wegovy y Mounjaro, que son inyecciones semanales.",
      },
      {
        q: "¿Saxenda o Wegovy: qué es mejor?",
        a: "Wegovy suele ofrecer mayor comodidad (1 vez/semana) y más pérdida de peso media, pero la elección la debe hacer el médico según tu caso, tolerancia y objetivos.",
      },
      {
        q: "¿Necesito receta para comprar Saxenda?",
        a: "Sí. Saxenda es un medicamento de prescripción y requiere valoración médica previa.",
      },
    ],
  },

  /* 33 ────────────────���──────────────────────────── */
  {
    slug: "clinica-perdida-peso-madrid",
    title: "Clínica de pérdida de peso en Madrid",
    h1: "Clínica de pérdida de peso en Madrid: tratamiento médico con GLP‑1",
    metaTitle: "Clínica de Pérdida de Peso en Madrid (2026): Tratamiento Médico GLP‑1",
    metaDescription:
      "Cómo elegir una clínica de pérdida de peso en Madrid con tratamiento médico real: GLP‑1 (Wegovy, Mounjaro), seguimiento y precios claros. ¡Primera consulta gratis!",
    excerpt:
      "Qué buscar en una clínica de pérdida de peso en Madrid: médicos colegiados, tratamiento GLP‑1 con receta, seguimiento real y precios transparentes, también online.",
    category: "Clínica",
    keyword: "clinica perdida de peso madrid",
    readMins: 6,
    date: "2026-04-11",
    updated: "2026-06-17",
    cover: "/hero/woman.png",
    coverAlt: "Consulta médica de pérdida de peso en Madrid con seguimiento GLP-1",
    sections: [
      {
        h2: "Qué debe ofrecer una buena clínica de pérdida de peso",
        blocks: [
          {
            type: "list",
            items: [
              "Médicos colegiados que valoran tu caso antes de prescribir.",
              "Tratamiento basado en evidencia, incluido GLP‑1 (Wegovy, Mounjaro) cuando procede.",
              "Receta médica legal y seguimiento real, no solo venta de un producto.",
              "Precios claros: qué pagas por la consulta, el seguimiento y la medicación.",
              "Atención continua para ajustar dosis y gestionar efectos secundarios.",
            ],
          },
        ],
      },
      {
        h2: "Clínica presencial u online en Madrid",
        blocks: [
          {
            type: "p",
            text: "Hoy muchas personas en Madrid eligen el modelo online: la consulta y el seguimiento se hacen desde la app y solo retiras la medicación en tu farmacia. Es igual de riguroso que una clínica presencial, evita listas de espera y desplazamientos, y mantiene la trazabilidad médica completa.",
          },
          {
            type: "table",
            caption: "Qué incluye un tratamiento médico de pérdida de peso",
            head: ["Concepto", "Qué cubre", "Precio orientativo"],
            rows: [
              ["Primera visita", "Valoración médica completa", "Gratis"],
              ["Seguimiento mensual", "Ajustes de dosis y soporte", "desde 149 €/mes"],
              ["Medicación GLP‑1", "Pluma según dosis (en farmacia)", "200–350 €/mes"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Madrid",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Un médico colegiado valora tu historial y descarta causas tratables.",
              "Si procede, recibes la prescripción del GLP‑1 más adecuado.",
              "Seguimiento continuo desde la app con un equipo médico real.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Madrid", href: "/blog/comprar-wegovy-madrid" },
              { label: "Comprar Mounjaro en Madrid", href: "/blog/comprar-mounjaro-madrid" },
              { label: "Plan para perder peso con GLP‑1", href: "/blog/plan-perder-peso-glp1" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito ir a una clínica presencial en Madrid?",
        a: "No es imprescindible. El modelo online ofrece la misma valoración médica colegiada, receta legal y seguimiento real, sin desplazamientos ni listas de espera. Solo retiras la medicación en farmacia.",
      },
      {
        q: "¿Qué tratamientos ofrece una clínica de pérdida de peso?",
        a: "Valoración médica, plan de hábitos y, cuando procede, tratamiento farmacológico con GLP‑1 (Wegovy, Mounjaro) bajo receta y seguimiento.",
      },
      {
        q: "¿Cuánto cuesta empezar en Madrid?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes y la medicación se paga aparte en farmacia.",
      },
      {
        q: "¿Cómo sé si una clínica es seria?",
        a: "Debe tener médicos colegiados, prescribir solo tras valoración, ofrecer seguimiento real y precios transparentes. Desconfía de quien venda medicación 'sin receta'.",
      },
    ],
  },

  /* 34 ───────────────────────────────────────────── */
  {
    slug: "comprar-tirzepatida-madrid",
    title: "Comprar tirzepatida en Madrid",
    h1: "Comprar tirzepatida en Madrid: precio, receta y cómo empezar",
    metaTitle: "Comprar Tirzepatida en Madrid (2026): Precio, Receta y Guía",
    metaDescription:
      "Cómo comprar tirzepatida (Mounjaro) en Madrid con receta: precio por dosis, cómo conseguir la prescripción y empezar con seguimiento médico sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar tirzepatida (Mounjaro) en Madrid con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar tirzepatida madrid",
    readMins: 6,
    date: "2026-04-13",
    updated: "2026-06-17",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Madrid",
    sections: [
      {
        h2: "¿Dónde comprar tirzepatida en Madrid?",
        blocks: [
          {
            type: "p",
            text: "La tirzepatida se comercializa como Mounjaro y se dispensa en farmacias de Madrid con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado; no se puede comprar sin valoración previa.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Madrid, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de la tirzepatida en Madrid por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de tirzepatida (Mounjaro) por dosis en Madrid",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial clínico y objetivos en la app.",
              "Un médico colegiado valora si la tirzepatida es adecuada para ti.",
              "Si procede, recibes la receta electrónica y el plan de escalado de dosis.",
              "Retiras Mounjaro en tu farmacia de Madrid y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Mounjaro en Madrid", href: "/blog/comprar-mounjaro-madrid" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Comprar tirzepatida online en España", href: "/blog/comprar-tirzepatida-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Tirzepatida y Mounjaro son lo mismo?",
        a: "Sí. Tirzepatida es el principio activo y Mounjaro es su nombre comercial en las farmacias de España.",
      },
      {
        q: "¿Necesito receta para comprar tirzepatida en Madrid?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta la tirzepatida en Madrid?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo conseguir la receta el mismo día?",
        a: "Con la consulta online, si el médico lo considera adecuado, puedes recibir la receta electrónica el mismo día y retirar la pluma en tu farmacia.",
      },
    ],
  },

  /* 35 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-sevilla",
    title: "Comprar Ozempic en Sevilla",
    h1: "Comprar Ozempic en Sevilla: precio, receta y alternativas para el peso",
    metaTitle: "Comprar Ozempic en Sevilla (2026): Precio, Receta y Alternativas",
    metaDescription:
      "Cómo comprar Ozempic en Sevilla con receta: precio, por qué está indicado para la diabetes y qu�� alternativa elegir si tu objetivo es perder peso. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Ozempic en Sevilla con receta médica: precio real, por qué está indicado para la diabetes y qué tratamiento es mejor si tu objetivo es adelgazar.",
    category: "Ozempic",
    keyword: "comprar ozempic sevilla",
    readMins: 6,
    date: "2026-04-15",
    updated: "2026-06-17",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de semaglutida (Ozempic) y receta médica en Sevilla",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Sevilla?",
        blocks: [
          {
            type: "p",
            text: "Sí, en farmacias de Sevilla con receta médica. Ozempic (semaglutida) está autorizado para la diabetes tipo 2, no para perder peso, por lo que conviene una valoración médica que confirme el tratamiento adecuado para ti.",
          },
          {
            type: "p",
            text: "Si tu objetivo es adelgazar, el médico puede valorar Wegovy (semaglutida para el peso) o Mounjaro (tirzepatida) en lugar de usar Ozempic fuera de indicación.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Sevilla",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Sevilla",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Alternativas a Ozempic para perder peso",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (semaglutida 2,4 mg): aprobado específicamente para el control del peso.",
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media.",
              "La elección la decide el médico según tu historial y objetivos.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Comprar Wegovy en Sevilla", href: "/blog/comprar-wegovy-sevilla" },
              { label: "Comprar Mounjaro en Sevilla", href: "/blog/comprar-mounjaro-sevilla" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar Ozempic para adelgazar en Sevilla?",
        a: "Ozempic está indicado para la diabetes tipo 2. Si tu objetivo es perder peso, el médico suele recomendar Wegovy o Mounjaro, aprobados para el control del peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Sevilla?",
        a: "Sí, siempre. Es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Cuánto cuesta Ozempic en Sevilla?",
        a: "La pluma se sitúa de forma orientativa entre 120 € y 170 € según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 36 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-zaragoza",
    title: "Comprar Wegovy en Zaragoza",
    h1: "Comprar Wegovy en Zaragoza: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Zaragoza (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Wegovy en Zaragoza con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Zaragoza de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy zaragoza",
    readMins: 6,
    date: "2026-04-17",
    updated: "2026-06-17",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Zaragoza comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Zaragoza?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Zaragoza con receta médica. No se puede comprar sin prescripción; las webs que lo ofrecen 'sin receta' son ilegales y peligrosas. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Zaragoza.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Zaragoza por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Zaragoza",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 ��"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Zaragoza paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Zaragoza y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Comprar semaglutida online", href: "/blog/comprar-semaglutida-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Zaragoza?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Zaragoza?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Zaragoza?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Zaragoza.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 37 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-granada",
    title: "Comprar Mounjaro en Granada",
    h1: "Comprar Mounjaro (tirzepatida) en Granada: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Granada (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Granada con receta: precio por dosis y cómo empezar con seguimiento médico y receta electrónica sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Granada con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar mounjaro granada",
    readMins: 6,
    date: "2026-04-19",
    updated: "2026-06-18",
    cover: "/blog/mounjaro-valencia.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Granada",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Granada?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Granada con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado; ninguna web puede vendértelo legalmente sin valoración previa.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Granada, sin desplazamientos ni listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Granada por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Granada",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Granada",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia de Granada y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Mounjaro en Málaga", href: "/blog/comprar-mounjaro-malaga" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Granada?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Granada?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis; la consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo gestionar todo online desde Granada?",
        a: "Sí. La consulta y la receta electrónica son online; solo retiras la pluma en tu farmacia de Granada.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 38 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-palma",
    title: "Comprar Wegovy en Palma de Mallorca",
    h1: "Comprar Wegovy en Palma de Mallorca: precio, receta y cómo empezar",
    metaTitle: "Comprar Wegovy en Palma (2026): Precio, Receta y Seguimiento Médico",
    metaDescription:
      "Cómo comprar Wegovy en Palma de Mallorca con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Palma de Mallorca de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy palma de mallorca",
    readMins: 6,
    date: "2026-04-21",
    updated: "2026-06-18",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Palma de Mallorca comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Palma de Mallorca?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Palma de Mallorca con receta médica. No se puede comprar sin prescripción; las webs que lo ofrecen 'sin receta' son ilegales y peligrosas. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Palma.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Palma de Mallorca por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Palma de Mallorca",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Palma paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Palma y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Comprar GLP-1 online en España", href: "/blog/comprar-glp1-online-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Palma de Mallorca?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Palma de Mallorca?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Palma?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Palma.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 39 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-cordoba",
    title: "Comprar Wegovy en Córdoba",
    h1: "Comprar Wegovy en Córdoba: precio, receta y cómo empezar hoy",
    metaTitle: "Comprar Wegovy en Córdoba (2026): Precio, Receta y Sin Esperas",
    metaDescription:
      "Cómo comprar Wegovy en Córdoba con receta médica: precio por dosis, cómo conseguir la prescripción online sin esperas y empezar con seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Córdoba de forma legal y segura: precio por dosis, cómo conseguir la receta online sin lista de espera y empezar con acompañamiento médico real.",
    category: "Wegovy",
    keyword: "comprar wegovy cordoba",
    readMins: 7,
    date: "2026-04-23",
    updated: "2026-06-18",
    cover: "/hero/woman.png",
    coverAlt: "Paciente en Córdoba iniciando su tratamiento con Wegovy con seguimiento médico",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Córdoba?",
        blocks: [
          {
            type: "p",
            text: "Wegovy (semaglutida 2,4 mg) se dispensa en farmacias de Córdoba, siempre con receta médica. No es legal comprarlo sin prescripción, y las webs que lo ofrecen 'sin receta' ponen en riesgo tu salud.",
          },
          {
            type: "p",
            text: "Con la consulta médica online consigues la valoración y, si procede, la receta electrónica el mismo día, y retiras la pluma en tu farmacia de Córdoba sin desplazarte ni esperar.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Córdoba por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Córdoba",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Córdoba paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Córdoba y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy en Sevilla", href: "/blog/comprar-wegovy-sevilla" },
              { label: "Comprar Mounjaro online en España", href: "/blog/comprar-mounjaro-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Córdoba?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto se tarda en conseguir la receta en Córdoba?",
        a: "Con la consulta online puedes tener la valoración y, si procede, la receta electrónica el mismo día, sin listas de espera.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Córdoba?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Es seguro tomar Wegovy?",
        a: "Sí, bajo supervisión médica y con la dosis ajustada de forma progresiva. Los efectos secundarios habituales son leves y temporales.",
      },
    ],
  },

  /* 40 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-las-palmas",
    title: "Comprar Mounjaro en Las Palmas",
    h1: "Comprar Mounjaro (tirzepatida) en Las Palmas: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Las Palmas (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Las Palmas con receta: precio por dosis y cómo empezar con seguimiento médico y receta electrónica sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Las Palmas de Gran Canaria con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico.",
    category: "Mounjaro",
    keyword: "comprar mounjaro las palmas",
    readMins: 6,
    date: "2026-04-25",
    updated: "2026-06-18",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Las Palmas",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Las Palmas?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Las Palmas con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Las Palmas, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Las Palmas por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Las Palmas",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Las Palmas",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia de Las Palmas y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Mounjaro online en España", href: "/blog/comprar-mounjaro-online" },
              { label: "Wegovy vs Mounjaro: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Las Palmas?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Las Palmas?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis; la consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo gestionar todo online desde Las Palmas?",
        a: "Sí. La consulta y la receta electrónica son online; solo retiras la pluma en tu farmacia de Las Palmas.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 41 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-malaga",
    title: "Comprar Ozempic en Málaga",
    h1: "Comprar Ozempic en Málaga: precio, receta y alternativas para el peso",
    metaTitle: "Comprar Ozempic en Málaga (2026): Precio, Receta y Alternativas",
    metaDescription:
      "Cómo comprar Ozempic en Málaga con receta: precio, por qué está indicado para la diabetes y qué alternativa elegir si tu objetivo es perder peso. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Ozempic en Málaga con receta médica: precio real, por qué está indicado para la diabetes y qué tratamiento es mejor si tu objetivo es adelgazar.",
    category: "Ozempic",
    keyword: "comprar ozempic malaga",
    readMins: 6,
    date: "2026-04-27",
    updated: "2026-06-18",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de semaglutida (Ozempic) y receta médica en Málaga",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Málaga?",
        blocks: [
          {
            type: "p",
            text: "Sí, en farmacias de Málaga con receta médica. Ozempic (semaglutida) está autorizado para la diabetes tipo 2, no para perder peso, por lo que conviene una valoración médica que confirme el tratamiento adecuado para ti.",
          },
          {
            type: "p",
            text: "Si tu objetivo es adelgazar, el médico puede valorar Wegovy (semaglutida para el peso) o Mounjaro (tirzepatida) en lugar de usar Ozempic fuera de indicación.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Málaga",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Málaga",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Alternativas a Ozempic para perder peso",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (semaglutida 2,4 mg): aprobado específicamente para el control del peso.",
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media.",
              "La elección la decide el médico según tu historial y objetivos.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Comprar Wegovy en Málaga", href: "/blog/comprar-wegovy-malaga" },
              { label: "Comprar Mounjaro en Málaga", href: "/blog/comprar-mounjaro-malaga" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar Ozempic para adelgazar en Málaga?",
        a: "Ozempic está indicado para la diabetes tipo 2. Si tu objetivo es perder peso, el médico suele recomendar Wegovy o Mounjaro, aprobados para el control del peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Málaga?",
        a: "Sí, siempre. Es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Cuánto cuesta Ozempic en Málaga?",
        a: "La pluma se sitúa de forma orientativa entre 120 € y 170 € según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 42 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-murcia",
    title: "Comprar Wegovy en Murcia",
    h1: "Comprar Wegovy en Murcia: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Murcia (2026): Precio, Receta y Seguimiento Médico",
    metaDescription:
      "Cómo comprar Wegovy en Murcia con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Murcia de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy murcia",
    readMins: 6,
    date: "2026-04-29",
    updated: "2026-06-18",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Murcia comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Murcia?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Murcia con receta médica. No se puede comprar sin prescripción; cualquier web que lo ofrezca 'sin receta' es ilegal. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Murcia.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Murcia por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Murcia",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Murcia paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Murcia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Comprar semaglutida online", href: "/blog/comprar-semaglutida-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Murcia?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Murcia?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Murcia?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Murcia.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 43 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-bilbao",
    title: "Comprar Wegovy en Bilbao",
    h1: "Comprar Wegovy en Bilbao: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Bilbao (2026): Precio, Receta y Seguimiento Médico",
    metaDescription:
      "Cómo comprar Wegovy en Bilbao con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Bilbao de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy bilbao",
    readMins: 6,
    date: "2026-05-01",
    updated: "2026-06-18",
    cover: "/hero/woman.png",
    coverAlt: "Paciente en Bilbao comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Bilbao?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Bilbao con receta médica. No se puede comprar sin prescripción; las webs que lo ofrecen 'sin receta' son ilegales y peligrosas. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Bilbao.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Bilbao por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Bilbao",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Bilbao paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Bilbao y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Mounjaro en Bilbao", href: "/blog/comprar-mounjaro-bilbao" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Bilbao?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Bilbao?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Bilbao?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Bilbao.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 44 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-zaragoza",
    title: "Comprar Ozempic en Zaragoza",
    h1: "Comprar Ozempic en Zaragoza: precio, receta y alternativas para el peso",
    metaTitle: "Comprar Ozempic en Zaragoza (2026): Precio, Receta y Alternativas",
    metaDescription:
      "Cómo comprar Ozempic en Zaragoza con receta: precio, por qué está indicado para la diabetes y qué alternativa elegir si tu objetivo es perder peso. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Ozempic en Zaragoza con receta médica: precio real, por qué está indicado para la diabetes y qué tratamiento es mejor si tu objetivo es adelgazar.",
    category: "Ozempic",
    keyword: "comprar ozempic zaragoza",
    readMins: 6,
    date: "2026-05-03",
    updated: "2026-06-18",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de semaglutida (Ozempic) y receta médica en Zaragoza",
    sections: [
      {
        h2: "¿Se puede comprar Ozempic en Zaragoza?",
        blocks: [
          {
            type: "p",
            text: "Sí, en farmacias de Zaragoza con receta médica. Ozempic (semaglutida) está autorizado para la diabetes tipo 2, no para perder peso, por lo que conviene una valoración médica que confirme el tratamiento adecuado para ti.",
          },
          {
            type: "p",
            text: "Si tu objetivo es adelgazar, el médico puede valorar Wegovy (semaglutida para el peso) o Mounjaro (tirzepatida) en lugar de usar Ozempic fuera de indicación.",
          },
        ],
      },
      {
        h2: "Precio de Ozempic en Zaragoza",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Zaragoza",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Alternativas a Ozempic para perder peso en Zaragoza",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (semaglutida 2,4 mg): aprobado específicamente para el control del peso.",
              "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, mayor pérdida de peso media.",
              "La elección la decide el médico según tu historial y objetivos.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Comprar Wegovy en Zaragoza", href: "/blog/comprar-wegovy-zaragoza" },
              { label: "Comprar Mounjaro en Zaragoza", href: "/blog/comprar-mounjaro-zaragoza" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar Ozempic para adelgazar en Zaragoza?",
        a: "Ozempic está indicado para la diabetes tipo 2. Para perder peso, el médico suele recomendar Wegovy o Mounjaro, aprobados para el control del peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Zaragoza?",
        a: "Sí, siempre. Es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Cuánto cuesta Ozempic en Zaragoza?",
        a: "La pluma se sitúa de forma orientativa entre 120 € y 170 € según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cuánto cuesta empezar?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma se paga en la farmacia según la dosis.",
      },
    ],
  },

  /* 45 ───────────────────────────────────────────── */
  {
    slug: "comprar-saxenda-espana",
    title: "Comprar Saxenda en España",
    h1: "Comprar Saxenda (liraglutida) en España: precio, receta y cómo empezar",
    metaTitle: "Comprar Saxenda en España (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Cómo comprar Saxenda (liraglutida) en España con receta: precio, cómo se usa y alternativas semanales como Wegovy y Mounjaro. ¡Primera consulta gratis, sin esperas!",
    excerpt:
      "Comprar Saxenda (liraglutida) en España con receta médica: precio, cómo se administra a diario y cuándo conviene una alternativa semanal como Wegovy o Mounjaro.",
    category: "Precios",
    keyword: "comprar saxenda españa",
    readMins: 6,
    date: "2026-05-05",
    updated: "2026-06-18",
    cover: "/products/maren-daily.png",
    coverAlt: "Pluma de liraglutida (Saxenda) para tratamiento de pérdida de peso",
    sections: [
      {
        h2: "¿Dónde comprar Saxenda en España?",
        blocks: [
          {
            type: "p",
            text: "Saxenda (liraglutida) se dispensa en farmacias de España con receta médica. Es un GLP‑1 de administración diaria, a diferencia de Wegovy o Mounjaro, que son semanales. No se puede comprar sin prescripción.",
          },
          {
            type: "p",
            text: "Con la consulta online, un médico colegiado valora si Saxenda es la mejor opción para ti o si conviene una alternativa semanal, y emite la receta electrónica si procede.",
          },
        ],
      },
      {
        h2: "Precio de Saxenda en España",
        blocks: [
          {
            type: "table",
            caption: "Saxenda precio orientativo en España",
            head: ["Presentación", "Uso", "Precio orientativo"],
            rows: [
              ["Caja de plumas", "Tratamiento diario", "130–200 €/caja"],
              ["Coste mensual", "Dosis de mantenimiento", "200–300 €/mes"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Saxenda o alternativa semanal",
        blocks: [
          {
            type: "list",
            items: [
              "Saxenda (liraglutida): inyección diaria, GLP‑1.",
              "Wegovy (semaglutida): inyección semanal, mayor comodidad y eficacia media.",
              "Mounjaro (tirzepatida): inyección semanal, la mayor pérdida de peso media.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Saxenda precio en España", href: "/blog/saxenda-precio-espana" },
              { label: "Wegovy precio en España", href: "/blog/wegovy-precio-espana" },
              { label: "Wegovy vs Mounjaro: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Saxenda en España?",
        a: "Sí. Saxenda es un medicamento de prescripción y requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Saxenda en España?",
        a: "De forma orientativa, entre 130 € y 200 € por caja, con un coste mensual que puede llegar a 200–300 € según las cajas necesarias.",
      },
      {
        q: "¿Saxenda es diario o semanal?",
        a: "Saxenda se administra una vez al día, a diferencia de Wegovy y Mounjaro, que son inyecciones semanales.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 46 ───────────────────────────────────────────── */
  {
    slug: "comprar-tirzepatida-barcelona",
    title: "Comprar tirzepatida en Barcelona",
    h1: "Comprar tirzepatida (Mounjaro) en Barcelona: precio, receta y cómo empezar",
    metaTitle: "Comprar Tirzepatida en Barcelona (2026): Precio, Receta y Guía",
    metaDescription:
      "Cómo comprar tirzepatida (Mounjaro) en Barcelona con receta: precio por dosis, cómo conseguir la prescripción y empezar con seguimiento médico sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar tirzepatida (Mounjaro) en Barcelona con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar tirzepatida barcelona",
    readMins: 6,
    date: "2026-05-07",
    updated: "2026-06-18",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Barcelona",
    sections: [
      {
        h2: "¿Dónde comprar tirzepatida en Barcelona?",
        blocks: [
          {
            type: "p",
            text: "La tirzepatida se comercializa como Mounjaro y se dispensa en farmacias de Barcelona con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado; no se puede comprar sin valoración previa.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Barcelona, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de la tirzepatida en Barcelona por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de tirzepatida (Mounjaro) por dosis en Barcelona",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230��280 ��"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Barcelona paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online gratis.",
              "Completas tu historial clínico y objetivos en la app.",
              "Un médico colegiado valora si la tirzepatida es adecuada y segura para ti.",
              "Si procede, recibes la receta electrónica y el plan de escalado de dosis.",
              "Retiras Mounjaro en tu farmacia de Barcelona y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Mounjaro en Barcelona", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
              { label: "Mounjaro precio en España", href: "/blog/mounjaro-precio-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar tirzepatida sin receta en Barcelona?",
        a: "No. La tirzepatida (Mounjaro) requiere receta médica. Se hace la consulta y la prescripción si procede; el medicamento se retira en farmacia.",
      },
      {
        q: "¿Tirzepatida y Mounjaro son lo mismo?",
        a: "Sí. Tirzepatida es el principio activo y Mounjaro es su nombre comercial en España.",
      },
      {
        q: "¿Cuánto cuesta la tirzepatida en Barcelona?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cuánto cuesta empezar?",
        a: "La primera visita es gratis y el seguimiento desde 149 €/mes. La pluma se paga en la farmacia según la dosis.",
      },
    ],
  },

  /* 47 ───────────────────────────────────────────── */
  {
    slug: "clinica-perdida-peso-barcelona",
    title: "Clínica de pérdida de peso en Barcelona",
    h1: "Clínica de pérdida de peso en Barcelona: tratamiento médico con GLP‑1",
    metaTitle: "Clínica de Pérdida de Peso en Barcelona (2026): Tratamiento GLP‑1",
    metaDescription:
      "Cómo elegir una clínica de pérdida de peso en Barcelona con tratamiento médico real: GLP‑1 (Wegovy, Mounjaro), seguimiento y precios claros. ¡Primera consulta gratis!",
    excerpt:
      "Qué buscar en una clínica de pérdida de peso en Barcelona: médicos colegiados, tratamiento GLP‑1 con receta, seguimiento real y precios transparentes, también online.",
    category: "Clínica",
    keyword: "clinica perdida de peso barcelona",
    readMins: 6,
    date: "2026-05-09",
    updated: "2026-06-18",
    cover: "/hero/woman.png",
    coverAlt: "Consulta médica de pérdida de peso en Barcelona con seguimiento GLP-1",
    sections: [
      {
        h2: "Qué debe ofrecer una buena clínica de pérdida de peso",
        blocks: [
          {
            type: "list",
            items: [
              "Médicos colegiados que valoran tu caso antes de prescribir.",
              "Tratamiento basado en evidencia, incluido GLP‑1 (Wegovy, Mounjaro) cuando procede.",
              "Receta médica legal y seguimiento real, no solo venta de un producto.",
              "Precios claros: qué pagas por la consulta, el seguimiento y la medicación.",
              "Atención continua para ajustar dosis y gestionar efectos secundarios.",
            ],
          },
        ],
      },
      {
        h2: "Clínica presencial u online en Barcelona",
        blocks: [
          {
            type: "p",
            text: "Muchas personas en Barcelona eligen el modelo online: la consulta y el seguimiento se hacen desde la app y solo retiras la medicación en tu farmacia. Es igual de riguroso que una clínica presencial, evita listas de espera y desplazamientos, y mantiene la trazabilidad médica completa.",
          },
          {
            type: "table",
            caption: "Qué incluye un tratamiento médico de pérdida de peso",
            head: ["Concepto", "Qué cubre", "Precio orientativo"],
            rows: [
              ["Primera visita", "Valoración médica completa", "Gratis"],
              ["Seguimiento mensual", "Ajustes de dosis y soporte", "desde 149 €/mes"],
              ["Medicación GLP‑1", "Pluma según dosis (en farmacia)", "200–350 €/mes"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Barcelona",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica (gratis).",
              "Un médico colegiado valora tu historial y descarta causas tratables.",
              "Si procede, recibes la prescripción del GLP‑1 más adecuado.",
              "Seguimiento continuo desde la app con un equipo médico real.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Wegovy en Barcelona", href: "/blog/comprar-wegovy-barcelona" },
              { label: "Comprar Mounjaro en Barcelona", href: "/blog/comprar-mounjaro-barcelona" },
              { label: "Clínica de pérdida de peso en Madrid", href: "/blog/clinica-perdida-peso-madrid" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito ir a una clínica presencial en Barcelona?",
        a: "No es imprescindible. El modelo online ofrece la misma valoración médica colegiada, receta legal y seguimiento real, sin desplazamientos ni listas de espera.",
      },
      {
        q: "¿Qué tratamientos ofrece una clínica de pérdida de peso?",
        a: "Valoración médica, plan de hábitos y, cuando procede, tratamiento farmacológico con GLP‑1 (Wegovy, Mounjaro) bajo receta y seguimiento.",
      },
      {
        q: "¿Cuánto cuesta empezar en Barcelona?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes y la medicación se paga aparte en farmacia.",
      },
      {
        q: "¿Cómo sé si una clínica es seria?",
        a: "Debe tener médicos colegiados, prescribir solo tras valoración, ofrecer seguimiento real y precios transparentes. Desconfía de quien venda medicación 'sin receta'.",
      },
    ],
  },

  /* 48 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-alicante",
    title: "Comprar Wegovy en Alicante",
    h1: "Comprar Wegovy en Alicante: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Alicante (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Wegovy en Alicante con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Alicante de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy alicante",
    readMins: 6,
    date: "2026-05-11",
    updated: "2026-06-18",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Alicante comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Alicante?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Alicante con receta médica. No se puede comprar sin prescripción; cualquier web que lo ofrezca 'sin receta' es ilegal. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Alicante.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Alicante por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Alicante",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Alicante paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Alicante y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy en Valencia", href: "/blog/comprar-wegovy-valencia" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Alicante?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Alicante?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Alicante?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Alicante.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 49 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-malaga",
    title: "Comprar Mounjaro en Málaga",
    h1: "Comprar Mounjaro (tirzepatida) en Málaga: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Málaga (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Málaga con receta: precio por dosis y cómo empezar con seguimiento médico y receta electrónica sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Málaga con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar mounjaro malaga",
    readMins: 6,
    date: "2026-05-13",
    updated: "2026-06-18",
    cover: "/blog/mounjaro-valencia.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Málaga",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Málaga?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Málaga con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Málaga, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Málaga por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Málaga",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Málaga",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia de Málaga y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Wegovy en Málaga", href: "/blog/comprar-wegovy-malaga" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Málaga?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Málaga?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis; la consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo gestionar todo online desde Málaga?",
        a: "Sí. La consulta y la receta electrónica son online; solo retiras la pluma en tu farmacia de Málaga.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 50 ───────────────────────────────────────────── */
  {
    slug: "ozempic-vs-saxenda",
    title: "Ozempic vs Saxenda",
    h1: "Ozempic vs Saxenda: diferencias, eficacia y cuál elegir",
    metaTitle: "Ozempic vs Saxenda: Diferencias, Eficacia y Cuál Elegir (2026)",
    metaDescription:
      "Comparativa de Ozempic y Saxenda: principio activo, frecuencia, eficacia, precio e indicaciones. Descubre cuál encaja en tu caso con valoración médica gratis.",
    excerpt:
      "Ozempic y Saxenda son dos GLP‑1 muy distintos en frecuencia e indicación. Te explicamos las diferencias en eficacia, dosis y precio, y cuál tiene sentido según tu objetivo.",
    category: "Comparativas",
    keyword: "ozempic vs saxenda",
    readMins: 6,
    date: "2026-05-15",
    updated: "2026-06-18",
    cover: "/products/maren-lineup.png",
    coverAlt: "Comparativa de plumas GLP-1: Ozempic y Saxenda",
    sections: [
      {
        h2: "La diferencia clave en una frase",
        blocks: [
          {
            type: "list",
            items: [
              "Ozempic (semaglutida): inyección semanal, indicado para la diabetes tipo 2.",
              "Saxenda (liraglutida): inyección diaria, indicado para el control del peso.",
              "Comparten la familia GLP‑1, pero su frecuencia e indicación son diferentes.",
            ],
          },
        ],
      },
      {
        h2: "Eficacia y comodidad",
        blocks: [
          {
            type: "p",
            text: "La semaglutida (Ozempic) tiende a ofrecer una pérdida de peso media superior a la liraglutida (Saxenda) y la comodidad de una sola inyección semanal frente a la diaria. Aun así, Ozempic está indicado para diabetes; para perder peso suele valorarse Wegovy (la versión de semaglutida para el peso).",
          },
          {
            type: "table",
            caption: "Ozempic vs Saxenda: comparativa rápida",
            head: ["Característica", "Ozempic", "Saxenda"],
            rows: [
              ["Principio activo", "Semaglutida", "Liraglutida"],
              ["Frecuencia", "Semanal", "Diaria"],
              ["Indicación", "Diabetes tipo 2", "Control del peso"],
              ["Precio orientativo/mes", "120–170 €", "200–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Cuál te conviene a ti?",
        blocks: [
          {
            type: "p",
            text: "Si tu objetivo es perder peso, lo habitual es valorar Wegovy o Mounjaro en lugar de Ozempic o Saxenda directamente. La decisión depende de tu historial, tolerancia y objetivos, y debe tomarla un médico tras valorarte.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Saxenda precio en España", href: "/blog/saxenda-precio-espana" },
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Ozempic o Saxenda adelgaza más?",
        a: "La semaglutida (Ozempic) suele mostrar una pérdida de peso media superior a la liraglutida (Saxenda), pero para el peso se valora Wegovy. La decisión la toma el médico.",
      },
      {
        q: "¿Cuál es más cómodo?",
        a: "Ozempic se inyecta una vez por semana, mientras que Saxenda es una inyección diaria.",
      },
      {
        q: "¿Cuál está indicado para perder peso?",
        a: "Saxenda está indicado para el control del peso; Ozempic, para la diabetes. Para el peso también se valora Wegovy (semaglutida) o Mounjaro (tirzepatida).",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 51 ───────────────────────────────────────────── */
  {
    slug: "comprar-ozempic-valencia-precio",
    title: "Precio de Ozempic en Valencia",
    h1: "Precio de Ozempic en Valencia: cuánto cuesta y cómo conseguirlo con receta",
    metaTitle: "Precio de Ozempic en Valencia (2026): Cuánto Cuesta con Receta",
    metaDescription:
      "Precio de Ozempic en Valencia por dosis, qué cubre la financiación para diabetes y cómo conseguirlo con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Cuánto cuesta Ozempic en Valencia por dosis, qué cubre la financiación para diabetes y cómo conseguirlo de forma legal con receta y seguimiento médico.",
    category: "Precios",
    keyword: "precio ozempic valencia",
    readMins: 5,
    date: "2026-05-17",
    updated: "2026-06-18",
    cover: "/products/maren-oral.png",
    coverAlt: "Pluma de Ozempic con etiqueta de precio en una farmacia de Valencia",
    sections: [
      {
        h2: "¿Cuánto cuesta Ozempic en Valencia?",
        blocks: [
          {
            type: "p",
            text: "El precio de Ozempic en las farmacias de Valencia es regulado y se sitúa de forma orientativa entre 120 € y 170 € por pluma, según la dosis. Está financiado para diabetes con receta del especialista, pero no para uso estético o de pérdida de peso.",
          },
          {
            type: "table",
            caption: "Precio orientativo de Ozempic por dosis en Valencia",
            head: ["Dosis", "Uso", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "120–140 €"],
              ["0,5 mg", "Mantenimiento", "130–150 €"],
              ["1 mg", "Mantenimiento", "150–170 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguirlo con receta en Valencia",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Un médico colegiado valora tu caso y tu objetivo real.",
              "Si procede, recibes la prescripción del fármaco más adecuado.",
              "Retiras el medicamento en tu farmacia de Valencia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar Ozempic en Valencia", href: "/blog/comprar-ozempic-valencia" },
              { label: "Ozempic precio en España", href: "/blog/ozempic-precio-espana" },
              { label: "Comprar Wegovy en Valencia", href: "/blog/comprar-wegovy-valencia" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta Ozempic en Valencia?",
        a: "De forma orientativa, entre 120 € y 170 € por pluma según la dosis. La consulta y el seguimiento médico se pagan aparte.",
      },
      {
        q: "¿Ozempic está financiado en Valencia?",
        a: "Está financiado para la diabetes tipo 2 con receta del especialista, pero no para uso de pérdida de peso.",
      },
      {
        q: "¿Necesito receta para comprar Ozempic en Valencia?",
        a: "Sí, siempre. Es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
      },
    ],
  },

  /* 52 ───────────────────────────────────────────── */
  {
    slug: "comprar-glp1-online-espana",
    title: "Comprar GLP-1 online en España",
    h1: "Comprar GLP‑1 online en España: opciones, receta y precios",
    metaTitle: "Comprar GLP-1 Online en España (2026): Opciones, Receta y Precios",
    metaDescription:
      "Guía para comprar medicamentos GLP‑1 online en España de forma legal: Wegovy, Mounjaro, Ozempic y Saxenda, con receta electrónica y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Qué medicamentos GLP‑1 puedes conseguir online en España (Wegovy, Mounjaro, Ozempic, Saxenda), cómo funciona la receta electrónica y cuánto cuesta cada opción.",
    category: "Wegovy",
    keyword: "comprar glp1 online españa",
    readMins: 7,
    date: "2026-05-19",
    updated: "2026-06-18",
    cover: "/products/maren-lineup.png",
    coverAlt: "Gama de medicamentos GLP-1 disponibles con receta en España",
    featured: true,
    sections: [
      {
        h2: "¿Qué son los GLP‑1 y cuáles hay en España?",
        blocks: [
          {
            type: "p",
            text: "Los GLP‑1 son medicamentos que regulan el apetito y la glucosa. En España, los más usados son Wegovy y Mounjaro (para el peso), Ozempic (para la diabetes) y Saxenda (para el peso, de uso diario). Todos requieren receta médica.",
          },
          {
            type: "table",
            caption: "Principales GLP‑1 disponibles en España",
            head: ["Fármaco", "Principio activo", "Indicación", "Precio orientativo/mes"],
            rows: [
              ["Wegovy", "Semaglutida", "Control del peso", "200–300 €"],
              ["Mounjaro", "Tirzepatida", "Control del peso", "200–350 €"],
              ["Ozempic", "Semaglutida", "Diabetes tipo 2", "120–170 €"],
              ["Saxenda", "Liraglutida", "Control del peso", "200–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo comprar GLP‑1 online de forma legal",
        blocks: [
          {
            type: "p",
            text: "La única vía legal es: consulta médica online, receta electrónica si procede y retirada del medicamento en la farmacia. Ninguna web puede enviarte un GLP‑1 sin valoración médica previa; hacerlo es ilegal y arriesgado.",
          },
          {
            type: "list",
            items: [
              "Reservas tu primera visita médica online gratis.",
              "Un médico colegiado valora qué GLP‑1 encaja en tu caso.",
              "Si procede, recibes la receta electrónica y el plan de dosis.",
              "Retiras el medicamento en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Comprar semaglutida online", href: "/blog/comprar-semaglutida-online" },
              { label: "Comprar tirzepatida online", href: "/blog/comprar-tirzepatida-online" },
              { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar GLP‑1 online sin receta en España?",
        a: "No. Todos los GLP‑1 (Wegovy, Mounjaro, Ozempic, Saxenda) requieren receta médica. Online se hace la consulta y la prescripción si procede; el medicamento se retira en farmacia.",
      },
      {
        q: "¿Qué GLP‑1 es mejor para perder peso?",
        a: "Wegovy y Mounjaro están aprobados para el control del peso. Mounjaro suele mostrar mayor pérdida media, pero la elección la decide el médico según tu caso.",
      },
      {
        q: "¿Cuánto cuesta un GLP‑1 al mes?",
        a: "De forma orientativa, entre 120 € y 350 €/mes según el fármaco y la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el GLP‑1 más adecuado.",
      },
    ],
  },

  /* 53 ───────────────────────────────────────────── */
  {
    slug: "wegovy-financiado-seguridad-social",
    title: "¿Wegovy está financiado por la Seguridad Social?",
    h1: "¿Wegovy está financiado por la Seguridad Social en España?",
    metaTitle: "¿Wegovy Financiado por la Seguridad Social? (España 2026)",
    metaDescription:
      "Resolvemos si Wegovy está financiado por la Seguridad Social en España, cuánto cuesta de forma privada y cómo conseguirlo con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "¿Cubre la Seguridad Social el Wegovy? Te explicamos la situación de la financiación en España, el coste privado real y cómo conseguirlo de forma legal con receta médica.",
    category: "Wegovy",
    keyword: "wegovy financiado seguridad social",
    readMins: 5,
    date: "2026-05-21",
    updated: "2026-06-18",
    cover: "/hero/woman.png",
    coverAlt: "Paciente consultando la financiación de Wegovy en España",
    sections: [
      {
        h2: "¿La Seguridad Social cubre Wegovy?",
        blocks: [
          {
            type: "p",
            text: "A día de hoy, Wegovy no está financiado por la Seguridad Social para el control del peso en España. Esto significa que el tratamiento se asume de forma privada, igual que otros medicamentos para adelgazar. La situación puede cambiar, por lo que conviene confirmarlo con tu médico.",
          },
        ],
      },
      {
        h2: "Cuánto cuesta Wegovy de forma privada",
        blocks: [
          {
            type: "table",
            caption: "Coste privado orientativo de Wegovy por dosis",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir Wegovy con receta y seguimiento",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Cómo conseguir la receta de Wegovy online", href: "/blog/receta-wegovy-online" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Wegovy está financiado por la Seguridad Social?",
        a: "No para el control del peso. El tratamiento se asume de forma privada. La situación puede cambiar, por lo que conviene confirmarlo con tu médico.",
      },
      {
        q: "¿Cuánto cuesta Wegovy de forma privada?",
        a: "De forma orientativa, entre 200 € y 300 €/mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Necesito receta para comprar Wegovy?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe Wegovy con seguimiento.",
      },
    ],
  },

  /* 54 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-vigo",
    title: "Comprar Wegovy en Vigo",
    h1: "Comprar Wegovy en Vigo: precio, receta y cómo empezar sin esperas",
    metaTitle: "Comprar Wegovy en Vigo (2026): Precio, Receta y Seguimiento Médico",
    metaDescription:
      "Cómo comprar Wegovy en Vigo con receta médica: precio por dosis, cómo conseguir la prescripción online y empezar con seguimiento médico real. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Wegovy en Vigo de forma legal: precio por dosis, cómo conseguir la receta electrónica sin desplazarte y empezar con seguimiento médico continuo.",
    category: "Wegovy",
    keyword: "comprar wegovy vigo",
    readMins: 6,
    date: "2026-05-23",
    updated: "2026-06-18",
    cover: "/blog/wegovy-sevilla.png",
    coverAlt: "Paciente en Vigo comenzando su tratamiento con Wegovy",
    sections: [
      {
        h2: "¿Dónde comprar Wegovy en Vigo?",
        blocks: [
          {
            type: "p",
            text: "Wegovy se dispensa en farmacias de Vigo con receta médica. No se puede comprar sin prescripción; cualquier web que lo ofrezca 'sin receta' es ilegal. La vía segura es la consulta médica, la receta si procede y la retirada en farmacia.",
          },
          {
            type: "p",
            text: "Con la consulta online evitas listas de espera: la valoración y la receta electrónica pueden gestionarse el mismo día y retiras la pluma en tu farmacia de Vigo.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy en Vigo por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy por dosis en Vigo",
            head: ["Dosis de la pluma", "Fase", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio", "200–230 €"],
              ["0,5 mg", "Adaptación", "200–250 €"],
              ["1 mg", "Escalado", "230–270 €"],
              ["1,7 mg", "Escalado", "250–290 €"],
              ["2,4 mg", "Mantenimiento", "270–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar en Vigo paso a paso",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Completa tu historial y objetivos en la app.",
              "Un médico colegiado valora si Wegovy es adecuado para ti.",
              "Si procede, recibes la receta electrónica y la pauta de dosis.",
              "Retiras Wegovy en tu farmacia de Vigo y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy precio en España por dosis", href: "/blog/wegovy-precio-espana" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Comprar GLP-1 online en España", href: "/blog/comprar-glp1-online-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Vigo?",
        a: "No. Wegovy requiere receta médica. La vía legal es la consulta, la receta si procede y la retirada en farmacia.",
      },
      {
        q: "¿Cuánto cuesta Wegovy en Vigo?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 300 € al mes según la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo hacerlo todo online desde Vigo?",
        a: "Sí. La consulta y la receta electrónica se gestionan online; solo retiras la pluma en tu farmacia de Vigo.",
      },
      {
        q: "¿La primera visita tiene algún coste?",
        a: "No, la primera visita es gratis, sin compromiso.",
      },
    ],
  },

  /* 55 ───────────────────────────────────────────── */
  {
    slug: "comprar-mounjaro-zaragoza",
    title: "Comprar Mounjaro en Zaragoza",
    h1: "Comprar Mounjaro (tirzepatida) en Zaragoza: precio, receta y cómo empezar",
    metaTitle: "Comprar Mounjaro en Zaragoza (2026): Precio, Receta y Seguimiento",
    metaDescription:
      "Cómo comprar Mounjaro (tirzepatida) en Zaragoza con receta: precio por dosis y cómo empezar con seguimiento médico y receta electrónica sin esperas. ¡Primera consulta gratis!",
    excerpt:
      "Comprar Mounjaro (tirzepatida) en Zaragoza con receta médica: precio por dosis, cómo conseguir la receta electrónica y empezar con seguimiento médico continuo.",
    category: "Mounjaro",
    keyword: "comprar mounjaro zaragoza",
    readMins: 6,
    date: "2026-05-25",
    updated: "2026-06-18",
    cover: "/products/maren-pen.png",
    coverAlt: "Pluma de tirzepatida (Mounjaro) para tratamiento en Zaragoza",
    sections: [
      {
        h2: "¿Dónde comprar Mounjaro en Zaragoza?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) se dispensa en farmacias de Zaragoza con receta médica. Por su potencia, el escalado de dosis debe ser gradual y supervisado por un médico colegiado.",
          },
          {
            type: "p",
            text: "Con la consulta online, la valoración y la receta electrónica se gestionan el mismo día y retiras la pluma en tu farmacia de Zaragoza, sin listas de espera.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro en Zaragoza por dosis",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro (tirzepatida) por dosis en Zaragoza",
            head: ["Dosis", "Fase", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Inicio", "200–250 €"],
              ["5 mg", "Adaptación", "230–280 €"],
              ["7,5–10 mg", "Escalado", "280–330 €"],
              ["12,5–15 mg", "Mantenimiento", "300–350 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Zaragoza",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica online gratis.",
              "Valoración de tu caso por un médico colegiado.",
              "Prescripción y pauta de escalado de dosis si es adecuado para ti.",
              "Retiras Mounjaro en tu farmacia de Zaragoza y haces el seguimiento desde la app.",
            ],
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Mounjaro precio en España por dosis", href: "/blog/mounjaro-precio-espana" },
              { label: "Comprar Wegovy en Zaragoza", href: "/blog/comprar-wegovy-zaragoza" },
              { label: "Comprar tirzepatida online", href: "/blog/comprar-tirzepatida-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito receta para comprar Mounjaro en Zaragoza?",
        a: "Sí, siempre. Es un medicamento de prescripción que requiere valoración médica previa.",
      },
      {
        q: "¿Cuánto cuesta Mounjaro en Zaragoza?",
        a: "La pluma se sitúa de forma orientativa entre 200 € y 350 € al mes según la dosis; la consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Puedo gestionar todo online desde Zaragoza?",
        a: "Sí. La consulta y la receta electrónica son online; solo retiras la pluma en tu farmacia de Zaragoza.",
      },
      {
        q: "¿Cuánto cuesta empezar con DoctorLife?",
        a: "La primera visita es gratis. El seguimiento empieza desde 149 €/mes; la pluma se paga aparte en farmacia.",
      },
    ],
  },

  /* 56 ───────────────────────────────────────────── */
  {
    slug: "inyeccion-para-adelgazar-precio",
    title: "Inyección para adelgazar: precio en España",
    h1: "Inyección para adelgazar: qué es, precio en España y cómo conseguirla",
    metaTitle: "Inyección para Adelgazar: Precio en España y Cómo Conseguirla (2026)",
    metaDescription:
      "Qué inyecciones para adelgazar existen en España (Wegovy, Mounjaro, Saxenda), cuánto cuestan por dosis y cómo conseguirlas con receta y seguimiento médico. ¡Primera consulta gratis!",
    excerpt:
      "Las inyecciones para adelgazar (GLP‑1) son lo más eficaz hoy. Te explicamos cuáles existen en España, su precio por dosis y cómo conseguirlas de forma legal con receta.",
    category: "Precios",
    keyword: "inyeccion para adelgazar precio",
    readMins: 6,
    date: "2026-05-27",
    updated: "2026-06-18",
    cover: "/products/maren-lineup.png",
    coverAlt: "Inyecciones para adelgazar tipo GLP-1 disponibles con receta en España",
    featured: true,
    sections: [
      {
        h2: "¿Qué inyecciones para adelgazar existen en España?",
        blocks: [
          {
            type: "p",
            text: "Las inyecciones para adelgazar más usadas son los GLP‑1: Wegovy (semaglutida) y Mounjaro (tirzepatida), semanales, y Saxenda (liraglutida), diaria. Regulan el apetito y ayudan a perder peso de forma sostenida, siempre con receta y seguimiento médico.",
          },
          {
            type: "table",
            caption: "Inyecciones para adelgazar: precio orientativo en España",
            head: ["Inyección", "Frecuencia", "Precio orientativo/mes"],
            rows: [
              ["Wegovy (semaglutida)", "Semanal", "200–300 €"],
              ["Mounjaro (tirzepatida)", "Semanal", "200–350 €"],
              ["Saxenda (liraglutida)", "Diaria", "200–300 €"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Cuál es la mejor inyección para adelgazar?",
        blocks: [
          {
            type: "p",
            text: "No hay una respuesta única. Mounjaro suele mostrar la mayor pérdida de peso media, Wegovy tiene amplia experiencia y buena tolerancia, y Saxenda es una opción diaria. La elección depende de tu caso y la decide el médico tras valorarte.",
          },
          {
            type: "links",
            title: "Sigue informándote",
            items: [
              { label: "Wegovy vs Mounjaro: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
              { label: "Comprar GLP-1 online en España", href: "/blog/comprar-glp1-online-espana" },
              { label: "Tirzepatida para adelgazar", href: "/blog/tirzepatida-para-adelgazar" },
            ],
          },
        ],
      },
      {
        h2: "Cómo conseguir la inyección con receta",
        blocks: [
          {
            type: "list",
            items: [
              "Reserva tu primera visita médica online gratis.",
              "Un médico colegiado valora qué inyección encaja en tu caso.",
              "Si procede, recibes la receta electrónica y el plan de dosis.",
              "Retiras la medicación en tu farmacia y haces el seguimiento desde la app.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta una inyección para adelgazar en España?",
        a: "De forma orientativa, entre 200 € y 350 €/mes según el fármaco y la dosis. La consulta y el seguimiento se pagan aparte.",
      },
      {
        q: "¿Cuál es la mejor inyección para adelgazar?",
        a: "Mounjaro suele mostrar la mayor pérdida de peso media, pero la elección depende de tu caso y la decide el médico tras valorarte.",
      },
      {
        q: "¿Necesito receta para una inyección para adelgazar?",
        a: "Sí, siempre. Todas las inyecciones GLP‑1 son medicamentos de prescripción que requieren valoración médica previa.",
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe la inyección más adecuada.",
      },
    ],
  },
];

/* Posts manuales + cientos de guías generadas (comprar/precio por ciudad)
   que actúan como funnel hacia la consulta médica de DoctorLife. */
export const posts: Post[] = [
  ...manualPosts,
  ...generatePosts(new Set(manualPosts.map((p) => p.slug))),
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/* ───────────────────────────────────────────────────────────
   Optimización del título para Google (SERP).
   Comunica que VENDEMOS un servicio médico (consulta + receta)
   en vez de parecer un artículo de blog. Antepone la keyword y
   la propuesta de valor ANTES del corte de Google (~60 chars).
   ─────────────────────────────────────────────────────────── */
const VALUE_SUFFIX = "Consulta + Receta Online";
const MAX_TITLE = 62;

export function seoTitle(post: Post): string {
  // Núcleo de la keyword, sin año ni cola de blog ("Precio, Receta y…")
  const core = post.metaTitle
    .split(/[:|]/)[0]
    .replace(/\s*\(\s*\d{4}\s*\)\s*/g, " ") // quita "(2026)"
    .replace(/\s\b20\d{2}\b/g, " ") // quita "2026" suelto
    .replace(/\s+/g, " ")
    .trim();

  const fit = (s: string) => (s.length <= MAX_TITLE ? s : null);

  const isComparison =
    /(?:-vs-|\bvs\b)/i.test(post.slug) || post.category === "Comparativas";
  if (isComparison) {
    // "Wegovy vs Mounjaro · Cuál Elegir con Receta"
    return fit(`${core} · Cuál Elegir con Receta`) ?? fit(core) ?? core.slice(0, MAX_TITLE);
  }

  // Para keywords de "receta" remarcamos rapidez con médico colegiado
  if (/receta/i.test(core)) {
    return (
      fit(`${core} con Médico Colegiado en 24h`) ??
      fit(`${core} con Médico en 24h`) ??
      fit(core) ??
      core.slice(0, MAX_TITLE)
    );
  }

  // Propuesta de valor comercial: consulta + receta online
  return (
    fit(`${core} · ${VALUE_SUFFIX}`) ??
    fit(`${core} · Receta Online`) ??
    fit(core) ??
    core.slice(0, MAX_TITLE).replace(/\s+\S*$/, "").trim()
  );
}

/* ───────────────────────────────────────────────────────────
   Optimización de la meta description para Google (SERP).
   Estilo "comercial" (tipo Benaes): un gancho ➤ que deja claro
   que ofrecemos el tratamiento + ventajas con ✓, en lugar de
   parecer la entradilla de un artículo. Se trunca por debajo del
   corte de Google (~158 chars) sin cortar a media palabra.
   ─────────────────────────────────────────────────────────── */
const MAX_DESC = 158;

const DRUGS = [
  "Wegovy",
  "Mounjaro",
  "Ozempic",
  "Saxenda",
  "Tirzepatida",
  "Semaglutida",
];

export function detectDrug(post: Post): string | null {
  const hay = `${post.title} ${post.metaTitle} ${post.keyword} ${post.slug}`;
  for (const d of DRUGS) {
    if (new RegExp(d, "i").test(hay)) return d;
  }
  if (/glp[\s-]?1/i.test(hay)) return "GLP‑1";
  return null;
}

/* Marca comercial -> denominación común internacional (principio activo). */
const DRUG_INN: Record<string, string | undefined> = {
  Wegovy: "semaglutida",
  Ozempic: "semaglutida",
  Rybelsus: "semaglutida",
  Mounjaro: "tirzepatida",
  Saxenda: "liraglutida",
  Semaglutida: "semaglutida",
  Tirzepatida: "tirzepatida",
};

/** Devuelve el nombre del fármaco y su INN (si se detecta) para JSON-LD Drug. */
export function drugInfo(post: Post): { name: string; inn?: string } | null {
  const name = detectDrug(post);
  if (!name || name === "GLP‑1") return null;
  return { name, inn: DRUG_INN[name] };
}

function detectCity(post: Post): string | null {
  // El título limpio termina en "… en <Ciudad>" (sin puntuación final),
  // así que la ciudad es todo lo que sigue al último " en ".
  // Esto captura nombres compuestos: "Molina de Segura", "El Ejido",
  // "San Vicente del Raspeig", "Vila-real", "Sant Boi de Llobregat".
  if (!/\ben\s+/i.test(post.title)) return null;
  const city = post.title
    .split(/\ben\s+/i)
    .pop()!
    .replace(/[.:·|(].*$/, "") // corta cualquier cola de puntuación
    .trim();
  if (!city) return null;
  if (/^Espa/i.test(city)) return null; // "en España" no es ciudad
  if (/\d/.test(city)) return null; // evita "24h", años, etc.
  if (city.length > 40) return null; // evita frases largas mal detectadas
  // Debe empezar por mayúscula (nombre propio)
  if (!/^[A-ZÁ��ÍÓÚÑ]/.test(city)) return null;
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

  // Ventajas comerciales (orden de prioridad). Se añaden hasta llenar.
  const checks = [
    "✓ Receta médica online",
    "✓ Médicos colegiados",
    "✓ Sin listas de espera",
    "✓ 1ª visita gratis",
    "✓ Seguimiento en nuestra app",
  ];

  let lead: string;
  const where = city ? ` en ${city}` : "";

  if (/(?:-vs-|\bvs\b)/.test(slug) || post.category === "Comparativas") {
    // Nombre limpio de la comparativa a partir del título ("Wegovy vs Mounjaro")
    const compareName = post.title.split(/[:|]/)[0].replace(/\s+/g, " ").trim();
    lead = `➤ ${compareName}: cuál elegir y empieza con valoración médica.`;
  } else if (/precio|cuanto-cuesta|coste/.test(slug)) {
    lead = `➤ ${drug ?? "Tratamiento GLP‑1"}${where}: precio actualizado y cómo conseguirlo legalmente.`;
  } else if (/receta/.test(slug)) {
    lead = `➤ Consigue tu receta de ${drug ?? "GLP‑1"} online, rápido y legal.`;
  } else if (/clinica|perder-peso|plan|adelgazar|inyeccion/.test(slug)) {
    lead = `➤ Tratamiento médico para adelgazar${where} con ${drug ?? "GLP‑1"}.`;
  } else if (/comprar/.test(slug)) {
    lead = `➤ Empieza tu tratamiento con ${drug ?? "GLP‑1"}${where} hoy mismo.`;
  } else {
    lead = `➤ Tratamiento con ${drug ?? "GLP‑1"}${where} supervisado por médicos.`;
  }

  const built = joinUnderLimit(lead, checks, MAX_DESC);

  // Fallback de seguridad: si el lead ya excede, recortamos por palabra.
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

export const SITE_URL = "https://doctorlife.io";
