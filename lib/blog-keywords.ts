/* ───────────────────────────────────────────────────────────
   Generador de artículos SEO por CLUSTER DE KEYWORDS.
   Cubre búsquedas comerciales e informativas de alto volumen que
   no estaban cubiertas por las páginas de ciudad/provincia:
     - Precio por dosis (mg) de Mounjaro y Wegovy
     - Ficha técnica / vademécum (Mounjaro, Wegovy, semaglutida)
     - Wegovy "clicks" / dosis por clics
     - Zepbound en España (disponibilidad y precio)
     - Semaglutida oral / pastillas (Rybelsus)
     - GLP‑1 "natural" / bebible / "6 en 1" (informativo honesto)
     - Comprar GLP‑1 en el extranjero (Andorra, Gibraltar, Portugal)
     - ¿Mounjaro/Wegovy necesitan agujas?
     - ¿Se puede comprar Mounjaro/Wegovy en Amazon?

   Cada artículo es largo, único y con sentido (tablas, listas, FAQs)
   para evitar "thin content" y funcionar como funnel a DoctorLife.
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq, Block } from "./blog";

const BRAND = "DoctorLife";

const PRICE_NOTE =
  "En DoctorLife tu primera visita médica son solo 25 € y se descuentan íntegramente del tratamiento si decides empezar. Todo el seguimiento se gestiona desde nuestra app interna.";

const SERVICE_CTA =
  "En DoctorLife, un endocrino colegiado valora tu caso por videoconsulta y, si el tratamiento es adecuado para ti, te lo prescribe con receta electrónica y seguimiento desde la app. La primera visita son 25 € y se descuentan del tratamiento.";

const ILLEGAL_NOTE =
  "Cualquier web, app o particular que ofrezca estos fármacos 'sin receta' en España actúa de forma ilegal y pone en riesgo tu salud. La receta siempre exige una valoración médica previa.";

/* ── utilidades deterministas ── */
function hash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}
function isoDate(offset: number): string {
  const d = new Date(Date.UTC(2025, 6, 1));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

const COVERS = [
  "/blog/wegovy-sevilla.png",
  "/blog/mounjaro-valencia.png",
  "/blog/ozempic-madrid.png",
  "/products/maren-lineup.png",
  "/products/maren-pen.png",
];

/* ── bloques reutilizables ── */
function glp1Links(): Block {
  return {
    type: "links",
    title: "Sigue informándote",
    items: [
      { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
      { label: "Wegovy: precio en España por dosis", href: "/blog/wegovy-precio-espana" },
      { label: "Ozempic vs Wegovy vs Mounjaro: cuál elegir", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
      { label: "Endocrino online: cómo funciona", href: "/blog/endocrino-online" },
    ],
  };
}

function ctaSection(): Section {
  return {
    h2: "Cómo empezar con seguimiento médico real",
    blocks: [
      {
        type: "list",
        items: [
          "Reservas tu primera visita online por 25 € (descontables del tratamiento).",
          "Completas tu historial clínico y tus objetivos desde la app.",
          "Un endocrino colegiado valora tu caso y, si procede, define el tratamiento y la dosis de inicio.",
          "Recibes la receta electrónica, válida en cualquier farmacia de España.",
          "Haces el seguimiento y los ajustes de dosis desde la app, sin esperas.",
        ],
      },
      { type: "p", text: SERVICE_CTA },
      glp1Links(),
    ],
  };
}

type Draft = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  keyword: string;
  sections: Section[];
  faqs: Faq[];
};

function mkPost(d: Draft, index: number): Post {
  const cover = COVERS[hash(d.slug) % COVERS.length];
  return {
    slug: d.slug,
    title: d.title,
    h1: d.h1,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    excerpt: d.excerpt,
    category: d.category,
    keyword: d.keyword,
    readMins: 8 + (hash(d.slug) % 4),
    date: isoDate(index),
    updated: "2026-06-21",
    cover,
    coverAlt: d.title,
    sections: d.sections,
    faqs: d.faqs,
  };
}

/* ═══════════════════════════════════════════════════════════
   1) MOUNJARO: PRECIO POR DOSIS (2,5 a 15 mg)
   ═══════════════════════════════════════════════════════════ */
function mounjaroDosisPrecio(): Draft {
  return {
    slug: "mounjaro-dosis-precio",
    title: "Mounjaro: precio por dosis (2,5 a 15 mg) en España",
    h1: "Mounjaro precio por dosis: 2,5, 5, 7,5, 10, 12,5 y 15 mg en España",
    metaTitle: "Mounjaro precio por dosis (2,5 a 15 mg) en España 2026 | DoctorLife",
    metaDescription:
      "Precio de Mounjaro (tirzepatida) por dosis en España: 2,5 mg, 5 mg, 7,5 mg, 10 mg, 12,5 mg y 15 mg. Cómo funciona el escalado, qué incluye y cómo conseguirlo con receta.",
    excerpt:
      "Cuánto cuesta Mounjaro en España según la dosis (2,5 a 15 mg), por qué el precio es similar entre dosis y cómo conseguirlo de forma legal con seguimiento médico.",
    category: "Mounjaro",
    keyword: "mounjaro precio",
    sections: [
      {
        h2: "¿Cuánto cuesta Mounjaro en España?",
        blocks: [
          {
            type: "p",
            text: "Mounjaro (tirzepatida) es un análogo de doble acción GIP/GLP‑1 que se administra en una inyección semanal mediante una pluma precargada (KwikPen). En España se vende bajo receta y su precio orientativo en farmacia se sitúa entre 200 y 350 € al mes, dependiendo de la dosis y de la farmacia.",
          },
          {
            type: "p",
            text: "Una duda muy frecuente es si las dosis altas (10, 12,5 o 15 mg) cuestan mucho más que las bajas (2,5 o 5 mg). La respuesta es que el precio por presentación es bastante parecido entre dosis: cada caja contiene cuatro plumas (un mes de tratamiento), independientemente de los miligramos.",
          },
        ],
      },
      {
        h2: "Precio de Mounjaro por dosis (orientativo, 2026)",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Mounjaro en farmacia según la dosis (4 plumas = 1 mes)",
            head: ["Dosis", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["2,5 mg", "Dosis de inicio (primeras 4 semanas)", "200–260 €"],
              ["5 mg", "Primera dosis de mantenimiento", "210–280 €"],
              ["7,5 mg", "Escalado intermedio", "220–300 €"],
              ["10 mg", "Mantenimiento", "230–320 €"],
              ["12,5 mg", "Escalado alto", "240–340 €"],
              ["15 mg", "Dosis máxima", "250–350 €"],
            ],
          },
          {
            type: "p",
            text: "Las cifras son orientativas y pueden variar entre farmacias y según disponibilidad. Mounjaro no está financiado por la Seguridad Social para la pérdida de peso, así que el coste corre a cargo del paciente.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Por qué la dosis sube poco a poco (escalado)",
        blocks: [
          {
            type: "p",
            text: "El tratamiento con Mounjaro siempre empieza por la dosis más baja (2,5 mg) y se aumenta de forma progresiva cada cierto número de semanas. Este escalado no es opcional: reduce los efectos secundarios digestivos (náuseas, digestiones lentas) y permite que el cuerpo se adapte.",
          },
          {
            type: "list",
            items: [
              "2,5 mg: dosis de inicio, no es la dosis terapéutica final; sirve para tolerar el fármaco.",
              "5 mg: primera dosis de mantenimiento, donde muchos pacientes ya notan efecto.",
              "7,5 mg y 10 mg: escalado según respuesta y tolerancia.",
              "12,5 mg y 15 mg: dosis altas, solo si el médico lo considera necesario.",
            ],
          },
          {
            type: "p",
            text: "Subir de dosis demasiado rápido o saltarse pasos aumenta el riesgo de efectos adversos. Por eso el escalado debe supervisarlo siempre un médico.",
          },
        ],
      },
      {
        h2: "Qué incluye (y qué no) el precio de la pluma",
        blocks: [
          {
            type: "p",
            text: "El precio que ves en la farmacia es solo el del medicamento. Un tratamiento bien hecho incluye además la consulta médica, la prescripción, el escalado de dosis y el seguimiento de los efectos. Comprar la pluma por tu cuenta, sin ese acompañamiento, es ineficaz y arriesgado.",
          },
          {
            type: "p",
            text: "Además, la pluma KwikPen de Mounjaro es precargada y multidosis: no necesitas comprar agujas por separado para administrarla, un punto que genera muchas dudas y sobre el que conviene no dejarse engañar por productos de terceros.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Cuál es la dosis de Mounjaro más cara?",
        a: "La de 15 mg suele ser la más cara, pero la diferencia con las dosis bajas es pequeña: todas las presentaciones traen cuatro plumas para un mes. El rango orientativo va de 200 a 350 €/mes.",
      },
      {
        q: "¿Mounjaro 2,5 mg sirve para adelgazar?",
        a: "La dosis de 2,5 mg es de inicio: su objetivo es que el cuerpo tolere el fármaco, no es la dosis terapéutica final. El efecto sobre el peso aparece al subir a dosis de mantenimiento.",
      },
      {
        q: "¿Se puede comprar Mounjaro sin receta?",
        a: "No. En España requiere receta médica. Necesitas una valoración previa por un médico, que decidirá la dosis y el escalado.",
      },
      {
        q: "¿Cubre la Seguridad Social el precio de Mounjaro?",
        a: "Para la pérdida de peso, no está financiado, por lo que el coste lo asume el paciente. En diabetes tipo 2 la situación puede ser distinta según el caso.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   2) WEGOVY: PRECIO POR DOSIS (0,25 a 2,4 mg)
   ═══════════════════════════════════════════════════════════ */
function wegovyDosisPrecio(): Draft {
  return {
    slug: "wegovy-dosis-precio",
    title: "Wegovy: precio por dosis (0,25 a 2,4 mg) en España",
    h1: "Wegovy precio por dosis: 0,25, 0,5, 1, 1,7 y 2,4 mg en España",
    metaTitle: "Wegovy precio por dosis (0,25 a 2,4 mg) en España 2026 | DoctorLife",
    metaDescription:
      "Precio de Wegovy (semaglutida) por dosis en España: 0,25 mg, 0,5 mg, 1 mg, 1,7 mg y 2,4 mg. Cómo funciona el escalado de dosis, qué incluye y cómo conseguirlo con receta.",
    excerpt:
      "Cuánto cuesta Wegovy en España según la dosis (0,25 a 2,4 mg), cómo es el escalado mensual y cómo conseguirlo de forma legal con seguimiento médico.",
    category: "Wegovy",
    keyword: "wegovy precio en euros",
    sections: [
      {
        h2: "¿Cuánto cuesta Wegovy en España?",
        blocks: [
          {
            type: "p",
            text: "Wegovy (semaglutida 2,4 mg) es un análogo del GLP‑1 indicado específicamente para la pérdida de peso. Se administra en una inyección semanal con una pluma precargada de un solo uso (FlexTouch). En España se dispensa con receta y su precio orientativo se sitúa entre 200 y 300 € al mes según la dosis y la farmacia.",
          },
          {
            type: "p",
            text: "El tratamiento se organiza en cinco escalones de dosis (0,25, 0,5, 1, 1,7 y 2,4 mg). Cada presentación corresponde a un mes y el precio entre dosis es similar, porque lo que cambia es la concentración de la pluma, no el número de plumas.",
          },
        ],
      },
      {
        h2: "Precio de Wegovy por dosis (orientativo, 2026)",
        blocks: [
          {
            type: "table",
            caption: "Precio orientativo de Wegovy en farmacia según la dosis (1 mes de tratamiento)",
            head: ["Dosis", "Fase del tratamiento", "Precio orientativo/mes"],
            rows: [
              ["0,25 mg", "Inicio (mes 1)", "200–260 €"],
              ["0,5 mg", "Escalado (mes 2)", "200–270 €"],
              ["1 mg", "Escalado (mes 3)", "210–280 €"],
              ["1,7 mg", "Escalado (mes 4)", "220–290 €"],
              ["2,4 mg", "Dosis de mantenimiento", "230–300 €"],
            ],
          },
          {
            type: "p",
            text: "Cifras orientativas; pueden variar entre farmacias. Wegovy no está financiado por la Seguridad Social para adelgazar, así que el coste corre a cargo del paciente.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "El escalado de dosis de Wegovy, mes a mes",
        blocks: [
          {
            type: "p",
            text: "Wegovy sigue un escalado fijo de aproximadamente cuatro semanas por dosis hasta llegar a la dosis de mantenimiento de 2,4 mg. Este aumento gradual es clave para minimizar las náuseas y otros efectos digestivos del inicio.",
          },
          {
            type: "list",
            items: [
              "Mes 1: 0,25 mg semanal (dosis de inicio, no terapéutica).",
              "Mes 2: 0,5 mg semanal.",
              "Mes 3: 1 mg semanal.",
              "Mes 4: 1,7 mg semanal.",
              "Mes 5 en adelante: 2,4 mg semanal (mantenimiento).",
            ],
          },
          {
            type: "p",
            text: "Si una dosis no se tolera bien, el médico puede ralentizar el escalado. Nunca debes acelerarlo por tu cuenta.",
          },
        ],
      },
      {
        h2: "Wegovy vs otras opciones",
        blocks: [
          {
            type: "table",
            caption: "Wegovy frente a otros tratamientos GLP‑1 para el peso",
            head: ["Tratamiento", "Principio activo", "Administración", "Precio orientativo"],
            rows: [
              ["Wegovy", "Semaglutida 2,4 mg", "Semanal", "200–300 €/mes"],
              ["Mounjaro", "Tirzepatida", "Semanal", "200–350 €/mes"],
              ["Saxenda", "Liraglutida", "Diaria", "200–300 €/mes"],
            ],
          },
          {
            type: "p",
            text: "La elección entre Wegovy y otras opciones depende de tu objetivo, tu tolerancia y tu historial. Debe decidirla siempre un médico, no la publicidad ni lo que le funcionó a un conocido.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta Wegovy 2,4 mg en España?",
        a: "La dosis de mantenimiento de 2,4 mg cuesta de forma orientativa entre 230 y 300 €/mes en farmacia. No está financiada para la pérdida de peso.",
      },
      {
        q: "¿La dosis de 0,25 mg de Wegovy ya hace adelgazar?",
        a: "Es la dosis de inicio: su función es que toleres el fármaco. El efecto sobre el peso se nota al avanzar en el escalado hacia dosis más altas.",
      },
      {
        q: "¿Por qué hay cinco precios distintos de Wegovy?",
        a: "Porque hay cinco concentraciones de pluma (0,25 a 2,4 mg). El precio entre ellas es parecido; cada una corresponde aproximadamente a un mes de tratamiento.",
      },
      {
        q: "¿Puedo comprar directamente la dosis de 2,4 mg?",
        a: "No se recomienda ni se prescribe así: hay que escalar desde 0,25 mg para evitar efectos secundarios. El médico define el ritmo del escalado.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   3-5) FICHA TÉCNICA / VADEMÉCUM
   ═══════════════════════════════════════════════════════════ */
function fichaTecnica(
  slug: string,
  name: string,
  inn: string,
  category: string,
  keyword: string,
  data: {
    indicacion: string;
    forma: string;
    posologia: string[];
    contraindicaciones: string[];
    adversos: string[];
    intro: string;
  },
): Draft {
  return {
    slug,
    title: `Ficha técnica de ${name}: resumen claro`,
    h1: `${name}: ficha técnica y vademécum explicados de forma sencilla`,
    metaTitle: `Ficha técnica de ${name} (${inn}): resumen claro | DoctorLife`,
    metaDescription: `Resumen de la ficha técnica de ${name} (${inn}): para qué sirve, posología, contraindicaciones y efectos adversos, explicado de forma sencilla. No sustituye al prospecto oficial.`,
    excerpt: `Qué dice la ficha técnica de ${name} (${inn}) en lenguaje claro: indicaciones, posología, contraindicaciones y efectos secundarios.`,
    category,
    keyword,
    sections: [
      {
        h2: `¿Qué es ${name} y para qué sirve?`,
        blocks: [
          { type: "p", text: data.intro },
          {
            type: "p",
            text: `Indicación principal: ${data.indicacion}. ${name} debe usarse siempre bajo prescripción y supervisión médica.`,
          },
          {
            type: "quote",
            text: "Este artículo es un resumen divulgativo y no sustituye a la ficha técnica oficial (AEMPS/EMA) ni al consejo de tu médico o farmacéutico.",
          },
        ],
      },
      {
        h2: "Composición y forma de administración",
        blocks: [{ type: "p", text: data.forma }],
      },
      {
        h2: "Posología y escalado de dosis",
        blocks: [
          { type: "p", text: `La posología de ${name} es progresiva. A grandes rasgos:` },
          { type: "list", items: data.posologia },
          {
            type: "p",
            text: "La dosis exacta y el ritmo de aumento los define el médico según tu tolerancia y tu respuesta. Nunca debes ajustar la dosis por tu cuenta.",
          },
        ],
      },
      {
        h2: "Contraindicaciones y precauciones",
        blocks: [
          { type: "p", text: `${name} no es adecuado para todo el mundo. Entre las situaciones a tener en cuenta:` },
          { type: "list", items: data.contraindicaciones },
        ],
      },
      {
        h2: "Efectos adversos más frecuentes",
        blocks: [
          {
            type: "p",
            text: "Los efectos secundarios más comunes son digestivos, suelen ser leves y temporales, y se reducen con un escalado de dosis adecuado:",
          },
          { type: "list", items: data.adversos },
          {
            type: "p",
            text: "Si aparecen síntomas intensos o persistentes (dolor abdominal fuerte, vómitos continuos), hay que contactar con el médico.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: `¿${name} necesita receta?`,
        a: "Sí. Es un medicamento de prescripción: requiere una valoración médica previa y no puede dispensarse sin receta.",
      },
      {
        q: `¿Dónde está la ficha técnica oficial de ${name}?`,
        a: "La ficha técnica y el prospecto oficiales están disponibles en el CIMA de la AEMPS y en la web de la EMA. Este artículo es solo un resumen divulgativo.",
      },
      {
        q: `¿Puedo usar ${name} solo para adelgazar?`,
        a: `Depende de la indicación y de tu caso clínico. ${name} debe valorarlo un médico, que decidirá si es adecuado y seguro para ti.`,
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   6) WEGOVY CLICKS / DOSIS POR CLICS
   ═══════════════════════════════════════════════════════════ */
function wegovyClicks(): Draft {
  return {
    slug: "wegovy-clicks-dosis",
    title: "Wegovy y los 'clicks': cómo funciona la pluma y la dosis",
    h1: "Wegovy 'clicks' y dosis: cómo funciona realmente la pluma",
    metaTitle: "Wegovy clicks y dosis: cómo funciona la pluma FlexTouch | DoctorLife",
    metaDescription:
      "Qué son los 'clicks' de Wegovy, por qué la pluma de Wegovy en España es de dosis única (no se cuenta por clics) y por qué partir o reutilizar dosis es peligroso.",
    excerpt:
      "La verdad sobre los 'clicks' de Wegovy: la pluma europea es de dosis fija preestablecida, no se dosifica por clics, y manipularla es arriesgado.",
    category: "Wegovy",
    keyword: "calculadora clicks wegovy",
    sections: [
      {
        h2: "¿Por qué se habla de 'clicks' en Wegovy?",
        blocks: [
          {
            type: "p",
            text: "Mucha gente busca 'clicks de Wegovy' o una 'calculadora de clics' porque ha visto ese sistema en otras plumas inyectables o en vídeos que enseñan a 'partir' dosis. La idea sería ir contando clics para administrar una cantidad concreta de fármaco.",
          },
          {
            type: "p",
            text: "Conviene aclararlo desde el principio: la pluma de Wegovy comercializada en Europa (FlexTouch) es de dosis única preestablecida. Cada pluma libera automáticamente una dosis fija (0,25, 0,5, 1, 1,7 o 2,4 mg) y se desecha tras su uso. No se dosifica contando clics.",
          },
        ],
      },
      {
        h2: "Cómo funciona realmente la pluma de Wegovy",
        blocks: [
          {
            type: "list",
            items: [
              "Cada pluma corresponde a una sola dosis semanal de una concentración concreta.",
              "Mantienes el botón pulsado hasta que el indicador marca '0' y la inyección ha terminado.",
              "No hay que seleccionar unidades ni contar clics: la dosis ya viene fijada de fábrica.",
              "Una vez usada, la pluma se desecha en un contenedor adecuado.",
            ],
          },
          {
            type: "p",
            text: "Esto es distinto de algunas plumas de insulina o de otros formatos donde sí se giran unidades. Por eso intentar aplicar a Wegovy una 'lógica de clics' lleva a errores de dosis.",
          },
        ],
      },
      {
        h2: "Por qué partir o 'estirar' dosis es peligroso",
        blocks: [
          {
            type: "p",
            text: "Algunas personas, para ahorrar, intentan dividir una pluma en varias dosis o reutilizarla. Esto es desaconsejable y arriesgado por varios motivos:",
          },
          {
            type: "list",
            items: [
              "Pierdes precisión: no puedes garantizar la cantidad real administrada en cada pinchazo.",
              "Riesgo de infección al reutilizar agujas o manipular el cartucho.",
              "Puedes acelerar el escalado sin querer y disparar los efectos secundarios.",
              "El fabricante no garantiza la estabilidad del fármaco fuera de su uso previsto.",
            ],
          },
          { type: "quote", text: ILLEGAL_NOTE },
        ],
      },
      {
        h2: "La forma correcta de ajustar la dosis",
        blocks: [
          {
            type: "p",
            text: "El ajuste de dosis de Wegovy se hace cambiando de pluma según el escalado pautado (0,25 → 0,5 → 1 → 1,7 → 2,4 mg), no manipulando una misma pluma. Si una dosis te sienta mal, el médico decide si mantener, ralentizar o ajustar.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Cuántos clicks tiene una pluma de Wegovy?",
        a: "La pluma de Wegovy en España (FlexTouch) no funciona por clics: es de dosis única preestablecida. Cada pluma administra automáticamente una dosis fija y luego se desecha.",
      },
      {
        q: "¿Puedo dividir una pluma de Wegovy en varias dosis?",
        a: "No es seguro ni se recomienda. Pierdes precisión de dosis y aumentas el riesgo de infección y de efectos secundarios. El escalado se hace cambiando de pluma, no partiéndola.",
      },
      {
        q: "¿Existe una calculadora de clics para Wegovy?",
        a: "No tiene sentido para Wegovy, porque la pluma no se dosifica por clics. Esas calculadoras suelen referirse a otros formatos o a prácticas de dosificación no recomendadas.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   7) ZEPBOUND EN ESPAÑA
   ═══════════════════════════════════════════════════════════ */
function zepboundEspana(): Draft {
  return {
    slug: "zepbound-precio-espana",
    title: "Zepbound en España: precio, disponibilidad y alternativa",
    h1: "Zepbound en España: ¿se vende? Precio y alternativa equivalente",
    metaTitle: "Zepbound precio en España: disponibilidad y alternativa | DoctorLife",
    metaDescription:
      "¿Se puede comprar Zepbound en España y a qué precio? Te explicamos su disponibilidad, qué es (tirzepatida) y por qué Mounjaro es la alternativa equivalente accesible aquí.",
    excerpt:
      "Qué es Zepbound, por qué no se comercializa con ese nombre en España y cuál es su equivalente disponible (Mounjaro), con precios orientativos.",
    category: "Guías",
    keyword: "zepbound precio españa",
    sections: [
      {
        h2: "¿Qué es Zepbound?",
        blocks: [
          {
            type: "p",
            text: "Zepbound es el nombre comercial con el que se vende la tirzepatida para la pérdida de peso en Estados Unidos. Su principio activo es exactamente el mismo que el de Mounjaro: tirzepatida, un análogo de doble acción GIP/GLP‑1 que se administra en inyección semanal.",
          },
          {
            type: "p",
            text: "Es decir, Zepbound y Mounjaro comparten molécula. La diferencia es de marca y de mercado: en EE. UU. se separó la marca para obesidad (Zepbound) de la de diabetes (Mounjaro).",
          },
        ],
      },
      {
        h2: "¿Se puede comprar Zepbound en España?",
        blocks: [
          {
            type: "p",
            text: "A día de hoy, Zepbound como tal no se comercializa en España. Lo que sí está disponible aquí es Mounjaro (la misma tirzepatida), que se prescribe con receta médica. Por eso buscar 'Zepbound precio España' lleva, en la práctica, a la información de Mounjaro.",
          },
          {
            type: "table",
            caption: "Zepbound frente a su equivalente en España",
            head: ["Nombre", "Principio activo", "Mercado", "Disponible en España"],
            rows: [
              ["Zepbound", "Tirzepatida", "EE. UU. (obesidad)", "No"],
              ["Mounjaro", "Tirzepatida", "Europa/España", "Sí, con receta"],
            ],
          },
          { type: "quote", text: "Comprar Zepbound importado por canales no autorizados es arriesgado e ilegal. La alternativa correcta en España es Mounjaro con receta." },
        ],
      },
      {
        h2: "Precio de la alternativa (Mounjaro) en España",
        blocks: [
          {
            type: "p",
            text: "Como Mounjaro es el equivalente disponible, su precio orientativo es la referencia útil: entre 200 y 350 €/mes según la dosis. No está financiado por la Seguridad Social para la pérdida de peso.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Zepbound y Mounjaro son lo mismo?",
        a: "Comparten el mismo principio activo (tirzepatida). Zepbound es la marca para obesidad en EE. UU.; Mounjaro es la marca disponible en España. La molécula es la misma.",
      },
      {
        q: "¿Cuánto cuesta Zepbound en España?",
        a: "Zepbound no se vende en España. La referencia válida es Mounjaro (misma tirzepatida), con un precio orientativo de 200–350 €/mes según dosis.",
      },
      {
        q: "¿Puedo importar Zepbound de EE. UU.?",
        a: "No es recomendable ni legal por canales no autorizados. Lo seguro es usar Mounjaro con receta y seguimiento médico en España.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   8) SEMAGLUTIDA ORAL / PASTILLAS (RYBELSUS)
   ═══════════════════════════════════════════════════════════ */
function semaglutidaOral(): Draft {
  return {
    slug: "semaglutida-oral-pastillas-precio",
    title: "Semaglutida oral (pastillas): qué es y precio",
    h1: "Semaglutida oral en pastillas: qué es, precio y diferencias con la inyectable",
    metaTitle: "Semaglutida oral (pastillas) precio en España: Rybelsus | DoctorLife",
    metaDescription:
      "Qué es la semaglutida oral en pastillas (Rybelsus), su precio orientativo en España, cómo se toma y en qué se diferencia de la semaglutida inyectable (Ozempic/Wegovy).",
    excerpt:
      "La semaglutida también existe en pastillas (Rybelsus): cómo se toma, su precio orientativo y cuándo tiene sentido frente a la versión inyectable.",
    category: "Guías",
    keyword: "semaglutida oral precio",
    sections: [
      {
        h2: "¿Existe la semaglutida en pastillas?",
        blocks: [
          {
            type: "p",
            text: "Sí. La semaglutida, el principio activo de Ozempic y Wegovy, también existe en formato oral (en comprimidos) bajo el nombre comercial Rybelsus. Está indicada principalmente para la diabetes tipo 2 y se toma una vez al día.",
          },
          {
            type: "p",
            text: "A diferencia de la versión inyectable semanal, las pastillas se toman a diario y con unas condiciones concretas: en ayunas, con un sorbo de agua y esperando un rato antes de desayunar para que se absorba bien.",
          },
        ],
      },
      {
        h2: "Semaglutida oral vs inyectable",
        blocks: [
          {
            type: "table",
            caption: "Diferencias entre semaglutida oral e inyectable",
            head: ["Característica", "Oral (Rybelsus)", "Inyectable (Ozempic/Wegovy)"],
            rows: [
              ["Forma", "Comprimido diario", "Inyección semanal"],
              ["Toma", "En ayunas, con poca agua", "Cualquier momento"],
              ["Indicación principal", "Diabetes tipo 2", "Diabetes (Ozempic) / peso (Wegovy)"],
              ["Precio orientativo", "100��150 €/mes", "120–300 €/mes"],
            ],
          },
          {
            type: "p",
            text: "La elección entre oral e inyectable depende del objetivo terapéutico, la comodidad y la tolerancia. Para pérdida de peso, la evidencia más sólida está con las versiones inyectables a dosis específicas.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "¿Cómo conseguir semaglutida oral?",
        blocks: [
          {
            type: "p",
            text: "Como cualquier presentación de semaglutida, las pastillas requieren receta médica. No se venden libremente ni 'sin receta', y comprar pastillas de semaglutida por canales no autorizados es ilegal y peligroso.",
          },
          { type: "quote", text: ILLEGAL_NOTE },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿La semaglutida en pastillas sirve para adelgazar?",
        a: "Rybelsus está indicada sobre todo para la diabetes tipo 2. Su uso para perder peso debe valorarlo un médico; para adelgazar, la evidencia más fuerte está en las versiones inyectables a dosis específicas.",
      },
      {
        q: "¿Cuánto cuesta la semaglutida oral en España?",
        a: "De forma orientativa, entre 100 y 150 €/mes, según dosis y farmacia. Requiere receta médica.",
      },
      {
        q: "¿Puedo comprar semaglutida en pastillas sin receta?",
        a: "No. Es un medicamento de prescripción. Comprarlo sin receta es ilegal y arriesgado.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   9) GLP-1 "NATURAL" / BEBIBLE / 6 EN 1
   ═══════════════════════════════════════════════════════════ */
function glp1Natural(): Draft {
  return {
    slug: "glp1-natural-funciona",
    title: "GLP‑1 'natural', bebible y '6 en 1': ¿funcionan?",
    h1: "GLP‑1 'natural', bebible y '6 en 1': qué son y si funcionan de verdad",
    metaTitle: "GLP‑1 natural, bebible y '6 en 1': ¿funcionan? La verdad | DoctorLife",
    metaDescription:
      "Análisis honesto de los productos 'GLP‑1 natural', ampollas bebibles y '6 en 1': qué contienen, qué dice la evidencia y por qué no equivalen al GLP‑1 médico.",
    excerpt:
      "Los suplementos de 'GLP‑1 natural', bebibles y '6 en 1' no son medicamentos GLP‑1. Te explicamos qué son realmente y qué esperar de ellos.",
    category: "Guías",
    keyword: "glp 1 natural",
    sections: [
      {
        h2: "¿Qué es el 'GLP‑1 natural' que se anuncia?",
        blocks: [
          {
            type: "p",
            text: "En los últimos meses han proliferado productos que se venden como 'GLP‑1 natural', 'GLP‑1 bebible', 'ampollas' o fórmulas '6 en 1'. Se promocionan como una forma 'natural' de obtener los efectos de fármacos como Ozempic o Wegovy sin receta ni inyecciones.",
          },
          {
            type: "p",
            text: "Es importante entenderlo bien: estos productos son suplementos alimenticios, no medicamentos. No contienen semaglutida ni tirzepatida, y no son equivalentes al GLP‑1 que prescribe un médico.",
          },
        ],
      },
      {
        h2: "Qué suelen contener realmente",
        blocks: [
          {
            type: "p",
            text: "La mayoría combina ingredientes que pueden tener un efecto saciante leve o sobre la digestión, pero que no actúan como los análogos del GLP‑1 farmacológicos:",
          },
          {
            type: "list",
            items: [
              "Fibras como el glucomanano, que hinchan en el estómago y dan sensación de saciedad.",
              "Extractos vegetales y plantas (té verde, alga, etc.) con efecto marginal.",
              "Vitaminas y minerales (de ahí lo de '6 en 1' o multifórmula).",
              "Probióticos o ingredientes para la digestión.",
            ],
          },
          {
            type: "p",
            text: "Pueden ayudar de forma muy modesta dentro de una dieta, pero no provocan la pérdida de peso clínicamente relevante de los fármacos GLP‑1 reales.",
          },
        ],
      },
      {
        h2: "Diferencia con el GLP‑1 médico",
        blocks: [
          {
            type: "table",
            caption: "Suplemento 'GLP‑1 natural' vs medicamento GLP‑1",
            head: ["Aspecto", "'GLP‑1 natural' (suplemento)", "GLP‑1 médico (Wegovy/Mounjaro)"],
            rows: [
              ["Principio activo", "Fibras, plantas, vitaminas", "Semaglutida / tirzepatida"],
              ["Evidencia de pérdida de peso", "Escasa o anecdótica", "Sólida, en ensayos clínicos"],
              ["Regulación", "Suplemento alimenticio", "Medicamento aprobado (AEMPS/EMA)"],
              ["Necesita receta", "No", "Sí"],
            ],
          },
          {
            type: "p",
            text: "Que algo se llame 'GLP‑1' en el envase no significa que actúe como el fármaco. La denominación se usa con fines comerciales.",
          },
        ],
      },
      {
        h2: "¿Entonces qué hago si quiero resultados reales?",
        blocks: [
          {
            type: "p",
            text: "Si buscas una pérdida de peso significativa y sostenible, lo eficaz es combinar hábitos con un abordaje médico y, si está indicado, un tratamiento GLP‑1 real prescrito y supervisado. No hay atajos 'naturales' equivalentes.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿El 'GLP‑1 natural' funciona para adelgazar?",
        a: "No como un fármaco GLP‑1. Son suplementos con efecto saciante leve; no provocan la pérdida de peso de Wegovy o Mounjaro y su evidencia es escasa.",
      },
      {
        q: "¿Las ampollas bebibles de GLP‑1 contienen semaglutida?",
        a: "No. Son suplementos alimenticios sin semaglutida ni tirzepatida. La semaglutida es un medicamento de prescripción y no se vende en ampollas bebibles de parafarmacia.",
      },
      {
        q: "¿Es seguro tomar estos productos '6 en 1'?",
        a: "Suelen ser seguros como suplementos, pero no esperes resultados de medicamento. Si tienes patologías o tomas otros fármacos, consulta antes con un profesional.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   10) COMPRAR GLP-1 EN EL EXTRANJERO
   ═══════════════════════════════════════════════════════════ */
function comprarExtranjero(): Draft {
  return {
    slug: "comprar-glp1-extranjero",
    title: "Comprar Wegovy u Ozempic en Andorra, Gibraltar o Portugal",
    h1: "Comprar GLP‑1 en el extranjero (Andorra, Gibraltar, Portugal): qué debes saber",
    metaTitle: "Comprar Wegovy/Ozempic en Andorra, Gibraltar o Portugal | DoctorLife",
    metaDescription:
      "¿Merece la pena comprar Wegovy, Ozempic o Mounjaro en Andorra, Gibraltar o Portugal? Diferencias de precio, requisitos de receta, legalidad y riesgos de importar.",
    excerpt:
      "Precios y reglas de comprar GLP‑1 en Andorra, Gibraltar y Portugal: por qué sigues necesitando receta y por qué importar no suele compensar.",
    category: "Guías",
    keyword: "comprar wegovy andorra",
    sections: [
      {
        h2: "Por qué se busca comprar GLP‑1 fuera de España",
        blocks: [
          {
            type: "p",
            text: "Muchas personas buscan comprar Wegovy, Ozempic o Mounjaro en Andorra, Gibraltar o Portugal pensando que será más barato o más fácil de conseguir. Conviene analizarlo con calma, porque hay matices de precio, de receta y de legalidad.",
          },
        ],
      },
      {
        h2: "Diferencias por territorio",
        blocks: [
          {
            type: "table",
            caption: "Comprar GLP‑1 en territorios cercanos: panorama orientativo",
            head: ["Territorio", "¿Receta necesaria?", "Precio frente a España", "Importar a España"],
            rows: [
              ["Andorra", "Sí, receta médica", "Variable, no siempre menor", "Solo uso personal y con receta"],
              ["Gibraltar", "Sí, receta médica", "Variable", "Sujeto a control aduanero"],
              ["Portugal", "Sí, receta médica", "Similar (mercado UE)", "Mismo marco UE"],
            ],
          },
          {
            type: "p",
            text: "En todos los casos sigue siendo un medicamento de prescripción: necesitas una receta válida. La idea de 'comprar sin receta en el país de al lado' no es real para estos fármacos.",
          },
        ],
      },
      {
        h2: "Riesgos de importar por tu cuenta",
        blocks: [
          {
            type: "list",
            items: [
              "Ruptura de la cadena de frío: estos fármacos deben conservarse refrigerados; un mal transporte los inutiliza.",
              "Falsificaciones: comprar fuera de circuitos regulados expone a producto falso o adulterado.",
              "Sin seguimiento médico: sin escalado ni control de efectos, el tratamiento es ineficaz y arriesgado.",
              "Problemas legales y aduaneros al cruzar fronteras con medicamentos.",
            ],
          },
          { type: "quote", text: ILLEGAL_NOTE },
        ],
      },
      {
        h2: "La alternativa sensata en España",
        blocks: [
          {
            type: "p",
            text: "En la práctica, desplazarse a otro territorio rara vez compensa: sigues necesitando receta, el ahorro no está garantizado y pierdes el seguimiento. Conseguir el tratamiento en España con valoración médica y receta electrónica es más seguro y, a menudo, igual de accesible.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Es más barato comprar Wegovy en Andorra?",
        a: "No necesariamente. El precio es variable y sigues necesitando receta. Al sumar el desplazamiento y la falta de seguimiento, rara vez compensa frente a conseguirlo en España.",
      },
      {
        q: "¿Puedo comprar Ozempic en Gibraltar sin receta?",
        a: "No. También allí es un medicamento de prescripción. Además, cruzar la frontera con medicamentos está sujeto a control aduanero.",
      },
      {
        q: "¿Y comprarlo en Portugal?",
        a: "Portugal está en el mismo marco de la UE: requiere receta y los precios son similares. No aporta una ventaja real frente a España.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   11) ¿NECESITAN AGUJAS?
   ═══════════════════════════════════════════════════════════ */
function necesitanAgujas(): Draft {
  return {
    slug: "mounjaro-wegovy-necesitan-agujas",
    title: "¿Mounjaro y Wegovy necesitan agujas aparte?",
    h1: "¿Mounjaro y Wegovy necesitan comprar agujas? Lo que debes saber",
    metaTitle: "¿Mounjaro y Wegovy necesitan agujas aparte? | DoctorLife",
    metaDescription:
      "¿Hay que comprar agujas para Mounjaro o Wegovy? Te explicamos cómo son sus plumas precargadas, cuándo se necesitan agujas y por qué desconfiar de packs de Amazon.",
    excerpt:
      "Aclaramos la duda de las 'agujas para Mounjaro/Wegovy': cómo funcionan las plumas precargadas y cuándo (y cuándo no) necesitas agujas aparte.",
    category: "Guías",
    keyword: "agujas para mounjaro precio",
    sections: [
      {
        h2: "La duda de las agujas",
        blocks: [
          {
            type: "p",
            text: "Es muy habitual buscar 'agujas para Mounjaro' o 'agujas para Wegovy', a veces incluso en Amazon. La duda viene de que algunas plumas inyectables sí requieren enroscar una aguja desechable en cada uso, como ocurre con muchas plumas de insulina.",
          },
        ],
      },
      {
        h2: "Cómo son realmente las plumas",
        blocks: [
          {
            type: "list",
            items: [
              "Wegovy (FlexTouch): pluma precargada de un solo uso con aguja oculta integrada. No necesitas comprar agujas aparte.",
              "Mounjaro (KwikPen multidosis o pluma precargada según presentación): diseñada para administrarse sin que tengas que adquirir agujas por separado en el uso habitual.",
            ],
          },
          {
            type: "p",
            text: "En el uso normal, estas plumas vienen listas para inyectar. Por eso desconfía de packs de 'agujas para Mounjaro/Wegovy' vendidos como imprescindibles: en muchos casos no lo son.",
          },
        ],
      },
      {
        h2: "Cuándo sí puede hacer falta material adicional",
        blocks: [
          {
            type: "p",
            text: "Lo que sí conviene tener es un contenedor de objetos punzantes para desechar las plumas de forma segura. Tu médico o farmacéutico te indicará el material exacto según la presentación que te prescriban.",
          },
          { type: "quote", text: "Sigue siempre las instrucciones del prospecto y de tu profesional sanitario sobre cómo administrar y desechar la pluma." },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Tengo que comprar agujas para Wegovy?",
        a: "No. La pluma de Wegovy es precargada de un solo uso con la aguja integrada. No necesitas agujas aparte.",
      },
      {
        q: "¿Y para Mounjaro?",
        a: "En su uso habitual, la pluma de Mounjaro está diseñada para administrarse sin comprar agujas por separado. Sigue las instrucciones del prospecto y de tu farmacéutico.",
      },
      {
        q: "¿Por qué venden agujas para Mounjaro en Amazon?",
        a: "Suelen ser productos genéricos no necesarios para el uso normal de la pluma. Desconfía y consulta con tu farmacéutico antes de comprar nada por tu cuenta.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   12) ¿SE PUEDE COMPRAR EN AMAZON?
   ═══════════════════════════════════════════════════════════ */
function comprarAmazon(): Draft {
  return {
    slug: "comprar-mounjaro-wegovy-amazon",
    title: "¿Se puede comprar Mounjaro o Wegovy en Amazon?",
    h1: "¿Se puede comprar Mounjaro o Wegovy en Amazon o supermercados?",
    metaTitle: "¿Comprar Mounjaro o Wegovy en Amazon? La respuesta clara | DoctorLife",
    metaDescription:
      "¿Se puede comprar Mounjaro o Wegovy en Amazon, Boots o supermercados? Por qué no, qué riesgos tiene lo que sí aparece a la venta y cómo conseguirlo de forma legal.",
    excerpt:
      "Mounjaro y Wegovy no se compran en Amazon ni en supermercados: son medicamentos con receta. Te explicamos qué se vende realmente y cómo conseguirlos bien.",
    category: "Guías",
    keyword: "mounjaro comprar amazon",
    sections: [
      {
        h2: "La respuesta corta: no",
        blocks: [
          {
            type: "p",
            text: "No se puede comprar Mounjaro ni Wegovy en Amazon, ni en supermercados como Asda, ni en cadenas como Boots sin una receta médica válida. Son medicamentos de prescripción, no productos de venta libre.",
          },
          {
            type: "p",
            text: "Si en alguna web aparecen 'a la venta' sin pedir receta, es una señal de alarma: o es producto falsificado, o se trata de una operación ilegal. En ambos casos, el riesgo para tu salud (y tu bolsillo) es alto.",
          },
        ],
      },
      {
        h2: "Qué se vende realmente bajo esas búsquedas",
        blocks: [
          {
            type: "list",
            items: [
              "Accesorios y material genérico (fundas, agujas, neceseres) que no son el fármaco.",
              "Suplementos 'tipo GLP‑1' que no contienen semaglutida ni tirzepatida.",
              "Listados fraudulentos que simulan vender el medicamento para estafar.",
            ],
          },
          { type: "quote", text: ILLEGAL_NOTE },
        ],
      },
      {
        h2: "Cómo conseguir Mounjaro o Wegovy de forma legal",
        blocks: [
          {
            type: "p",
            text: "El único camino seguro y legal es: valoración por un médico, receta si el tratamiento está indicado, y dispensación en una farmacia. La parte buena es que ese proceso hoy puede hacerse online, sin esperas y con seguimiento.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Mounjaro está a la venta en Amazon?",
        a: "No. Mounjaro requiere receta médica y no se vende como producto de consumo en Amazon ni en supermercados. Lo que aparece suele ser accesorios o listados fraudulentos.",
      },
      {
        q: "¿Puedo comprar Wegovy en Boots o Asda sin receta?",
        a: "No sin receta. Aunque algunas farmacias internacionales lo dispensan, siempre exige prescripción médica válida.",
      },
      {
        q: "¿Cómo consigo Mounjaro o Wegovy legalmente?",
        a: "Con una valoración médica que, si procede, emita la receta, y recogiéndolo en farmacia. En DoctorLife ese proceso es online: primera visita 25 €, descontables del tratamiento.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   API pública
   ═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   14) ¿MOUNJARO EN PASTILLAS?
   ═══════════════════════════════════════════════════════════ */
function mounjaroPastillas(): Draft {
  return {
    slug: "mounjaro-pastillas-existe",
    title: "¿Mounjaro en pastillas? Lo que debes saber",
    h1: "¿Existe Mounjaro en pastillas para comprar?",
    metaTitle: "¿Mounjaro en pastillas? Existe o no y alternativas | DoctorLife",
    metaDescription:
      "¿Se puede comprar Mounjaro en pastillas? Te explicamos por qué Mounjaro solo existe inyectable, qué GLP‑1 sí hay en pastilla y cómo conseguir tratamiento con receta.",
    excerpt:
      "Mucha gente busca 'Mounjaro pastillas comprar'. Aclaramos que Mounjaro es inyectable, qué opciones orales existen y cómo empezar con seguimiento médico.",
    category: "Guías",
    keyword: "mounjaro pastillas comprar",
    sections: [
      {
        h2: "¿Mounjaro se vende en pastillas?",
        blocks: [
          {
            type: "p",
            text: "No. Mounjaro (tirzepatida) solo está disponible como pluma inyectable de aplicación subcutánea semanal. No existe ninguna presentación en pastillas o comprimidos de Mounjaro aprobada ni a la venta en España ni en Europa.",
          },
          {
            type: "p",
            text: "Las búsquedas de 'Mounjaro pastillas comprar' suelen confundir Mounjaro con otros fármacos GLP‑1 que sí tienen forma oral, o con suplementos sin evidencia que se anuncian como 'alternativas en pastilla'.",
          },
        ],
      },
      {
        h2: "Qué GLP‑1 sí existen en pastilla",
        blocks: [
          {
            type: "p",
            text: "Hoy, el único análogo del GLP‑1 con forma oral aprobada es la semaglutida en comprimidos (Rybelsus), indicada para diabetes tipo 2. No es lo mismo que Mounjaro ni está aprobada específicamente para adelgazar.",
          },
          {
            type: "table",
            caption: "Formas disponibles de los principales GLP‑1",
            head: ["Fármaco", "Principio activo", "Forma", "Frecuencia"],
            rows: [
              ["Mounjaro", "Tirzepatida", "Inyectable (pluma)", "Semanal"],
              ["Wegovy", "Semaglutida", "Inyectable (pluma)", "Semanal"],
              ["Ozempic", "Semaglutida", "Inyectable (pluma)", "Semanal"],
              ["Rybelsus", "Semaglutida", "Comprimido oral", "Diario"],
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Cuidado con las 'pastillas alternativas'",
        blocks: [
          {
            type: "list",
            items: [
              "Los suplementos que se venden como 'Mounjaro en pastilla' o 'tirzepatida oral' no son medicamentos aprobados y no tienen su eficacia.",
              "Ningún producto sin receta equivale a un tratamiento GLP‑1 real.",
              "La inyección semanal es sencilla: la pluma es precargada y no requiere mezclar ni cargar dosis.",
            ],
          },
          { type: "quote", text: ILLEGAL_NOTE },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Puedo comprar Mounjaro en pastillas?",
        a: "No. Mounjaro solo existe como pluma inyectable semanal. No hay versión en pastilla aprobada.",
      },
      {
        q: "¿Hay algún GLP‑1 en pastilla?",
        a: "Sí, la semaglutida oral (Rybelsus), aunque está indicada para diabetes tipo 2 y no es equivalente a Mounjaro.",
      },
      {
        q: "¿Las pastillas 'tipo Mounjaro' de internet funcionan?",
        a: "No. Son suplementos sin evidencia ni aprobación. Para un tratamiento real necesitas valoración médica y receta.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   15) PRECIO DE LOS GLP‑1 (visión general)
   ═══════════════════════════════════════════════════════════ */
function glp1Precio(): Draft {
  return {
    slug: "glp1-precio-espana",
    title: "GLP‑1: precio en España (guía comparativa)",
    h1: "GLP‑1: precio en España y qué incluye cada opción",
    metaTitle: "GLP‑1 precio en España: comparativa por fármaco | DoctorLife",
    metaDescription:
      "¿Cuánto cuesta un GLP‑1 en España? Comparamos el precio orientativo de Wegovy, Mounjaro, Ozempic y semaglutida oral, y qué incluye el tratamiento con receta.",
    excerpt:
      "Precio orientativo de los principales GLP‑1 en España (Wegovy, Mounjaro, Ozempic, Rybelsus) y qué cubre realmente el tratamiento con seguimiento médico.",
    category: "Precios",
    keyword: "glp-1 precio españa",
    sections: [
      {
        h2: "¿Cuánto cuesta un GLP‑1 en España?",
        blocks: [
          {
            type: "p",
            text: "Los GLP‑1 son fármacos de prescripción y su precio depende del medicamento concreto y de la dosis. Para el control del peso no están financiados por la Seguridad Social, así que el coste corre por cuenta del paciente. A continuación tienes una comparativa orientativa.",
          },
          {
            type: "table",
            caption: "Precio orientativo mensual de los principales GLP‑1 (autofinanciado)",
            head: ["Fármaco", "Principio activo", "Forma", "Precio orientativo/mes"],
            rows: [
              ["Wegovy", "Semaglutida", "Inyectable semanal", "200–300 €"],
              ["Mounjaro", "Tirzepatida", "Inyectable semanal", "200–350 €"],
              ["Ozempic", "Semaglutida", "Inyectable semanal", "100–150 € (indicado en diabetes)"],
              ["Rybelsus", "Semaglutida oral", "Comprimido diario", "100–150 € (indicado en diabetes)"],
            ],
          },
          {
            type: "p",
            text: "Son cifras orientativas: el precio real varía según la farmacia, la dosis y la disponibilidad. El precio sube con las dosis más altas, ya que se ajustan de forma progresiva.",
          },
        ],
      },
      {
        h2: "Por qué el precio no lo es todo",
        blocks: [
          {
            type: "list",
            items: [
              "El éxito del tratamiento depende del seguimiento médico, no solo del fármaco.",
              "Un escalado de dosis bien hecho reduce efectos secundarios y abandonos.",
              "Comprar 'barato' sin receta expone a falsificaciones y a romper la cadena de frío.",
              "El acompañamiento en hábitos evita el efecto rebote al terminar.",
            ],
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
      {
        h2: "Qué incluye el precio en DoctorLife",
        blocks: [
          {
            type: "p",
            text: "En DoctorLife el modelo es transparente: la primera visita son 25 € (descontables del tratamiento) e incluye la valoración del endocrino. Si el tratamiento es adecuado, recibes la receta y el seguimiento desde la app, sin permanencia.",
          },
        ],
      },
      ctaSection(),
    ],
    faqs: [
      {
        q: "¿Cuál es el GLP‑1 más barato?",
        a: "Depende de la dosis y la indicación. Ozempic y Rybelsus suelen ser más económicos, pero están indicados para diabetes; para el peso se usan Wegovy o Mounjaro.",
      },
      {
        q: "¿Financia la Seguridad Social los GLP‑1 para adelgazar?",
        a: "No. Para el control del peso no están financiados, por lo que el coste es a cargo del paciente.",
      },
      {
        q: "¿Por qué varía tanto el precio?",
        a: "Influyen la dosis (sube con dosis altas), la farmacia y la disponibilidad. Las cifras son siempre orientativas.",
      },
    ],
  };
}

export function buildKeywordPosts(startIndex: number): Post[] {
  const drafts: Draft[] = [
    mounjaroDosisPrecio(),
    wegovyDosisPrecio(),
    fichaTecnica("ficha-tecnica-mounjaro", "Mounjaro", "tirzepatida", "Mounjaro", "ficha tecnica mounjaro", {
      intro:
        "Mounjaro es el nombre comercial de la tirzepatida, un análogo de doble acción que activa los receptores GIP y GLP‑1. Se administra en inyección subcutánea semanal y ayuda a controlar el apetito y la glucemia.",
      indicacion: "diabetes tipo 2 y, según indicación y criterio médico, control del peso",
      forma:
        "Tirzepatida en solución inyectable, en pluma precargada para administración subcutánea semanal. Se conserva refrigerada antes de su uso. La composición y excipientes detallados constan en la ficha técnica oficial.",
      posologia: [
        "Inicio en 2,5 mg semanales durante las primeras 4 semanas (dosis de inicio, no terapéutica).",
        "Aumento progresivo a 5, 7,5, 10, 12,5 y hasta 15 mg según tolerancia y respuesta.",
        "Cada incremento se mantiene un mínimo de semanas antes de subir.",
      ],
      contraindicaciones: [
        "Hipersensibilidad a la tirzepatida o a algún excipiente.",
        "Antecedentes personales o familiares de carcinoma medular de tiroides o MEN 2 (precaución, según ficha técnica).",
        "Embarazo y lactancia (consultar siempre con el médico).",
        "Pancreatitis previa o patología digestiva grave (valoración individual).",
      ],
      adversos: [
        "Náuseas, vómitos y diarrea, sobre todo al inicio o al subir dosis.",
        "Estreñimiento y digestiones lentas.",
        "Disminución del apetito.",
        "Reacciones leves en la zona de inyección.",
      ],
    }),
    fichaTecnica("ficha-tecnica-wegovy", "Wegovy", "semaglutida 2,4 mg", "Wegovy", "ficha tecnica wegovy", {
      intro:
        "Wegovy es el nombre comercial de la semaglutida a dosis de 2,4 mg, un análogo del GLP‑1 indicado para el control del peso. Se administra en inyección subcutánea semanal y actúa reduciendo el apetito.",
      indicacion: "control del peso en adultos con obesidad o sobrepeso con comorbilidades, junto a dieta y ejercicio",
      forma:
        "Semaglutida en solución inyectable, en pluma precargada de un solo uso (FlexTouch) para administración subcutánea semanal. Conservación refrigerada antes del primer uso. Composición y excipientes según ficha técnica oficial.",
      posologia: [
        "Escalado mensual: 0,25 → 0,5 → 1 → 1,7 → 2,4 mg semanales.",
        "0,25 mg es dosis de inicio para mejorar la tolerancia, no terapéutica.",
        "2,4 mg semanal es la dosis de mantenimiento objetivo.",
      ],
      contraindicaciones: [
        "Hipersensibilidad a la semaglutida o a algún excipiente.",
        "Antecedentes de carcinoma medular de tiroides o MEN 2 (precaución, según ficha técnica).",
        "Embarazo y lactancia.",
        "Antecedentes de pancreatitis (valoración individual).",
      ],
      adversos: [
        "Náuseas, diarrea, vómitos y estreñimiento, especialmente al inicio.",
        "Dolor abdominal y digestiones lentas.",
        "Disminución del apetito y, a veces, fatiga.",
        "Reacciones leves en el punto de inyección.",
      ],
    }),
    fichaTecnica("ficha-tecnica-semaglutida", "la semaglutida", "semaglutida", "Guías", "semaglutida ficha tecnica", {
      intro:
        "La semaglutida es un análogo del GLP‑1 presente en varios medicamentos: Ozempic y Rybelsus (diabetes) y Wegovy (control del peso). Imita una hormona que regula el apetito y la glucemia.",
      indicacion: "diabetes tipo 2 (Ozempic, Rybelsus) y control del peso (Wegovy), según el medicamento concreto",
      forma:
        "Disponible como solución inyectable subcutánea semanal (Ozempic, Wegovy) y como comprimido oral diario (Rybelsus). Cada presentación tiene su propia ficha técnica oficial con composición y excipientes.",
      posologia: [
        "Siempre con escalado progresivo de dosis para mejorar la tolerancia.",
        "Las dosis y el ritmo varían según el medicamento (Ozempic, Wegovy o Rybelsus) y el objetivo.",
        "El médico individualiza la pauta en cada caso.",
      ],
      contraindicaciones: [
        "Hipersensibilidad a la semaglutida o excipientes.",
        "Antecedentes de carcinoma medular de tiroides o MEN 2 (precaución).",
        "Embarazo y lactancia.",
        "Pancreatitis previa (valoración individual).",
      ],
      adversos: [
        "Molestias digestivas (náuseas, diarrea, estreñimiento), sobre todo al inicio.",
        "Disminución del apetito.",
        "Dolor abdominal y digestiones lentas.",
        "Reacciones leves en la zona de inyección (formas inyectables).",
      ],
    }),
    wegovyClicks(),
    zepboundEspana(),
    semaglutidaOral(),
    glp1Natural(),
    comprarExtranjero(),
    necesitanAgujas(),
    comprarAmazon(),
    mounjaroPastillas(),
    glp1Precio(),
  ];
  return drafts.map((d, i) => mkPost(d, startIndex + i));
}
