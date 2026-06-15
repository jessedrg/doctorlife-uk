/* ───────────────────────────────────────────────────────────
   Contenido del blog de Maren. Posts SEO con alta intención de
   compra para el mercado español (GLP‑1, Wegovy, Mounjaro…).
   Cambia/añade posts aquí y todo el blog + sitemap se actualiza.
   ─────────────────────────────────────────────────────────── */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

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
  sections: Section[];
  faqs: Faq[];
};

const PRICE_NOTE =
  "En Maren tu primera visita médica son solo 25 € y se descuentan íntegramente del tratamiento si decides empezar. Todo el seguimiento se gestiona desde nuestra app interna.";

export const posts: Post[] = [
  /* 1 ───────────────────────────────────────────── */
  {
    slug: "comprar-wegovy-barcelona",
    title: "Comprar Wegovy en Barcelona",
    h1: "Comprar Wegovy en Barcelona: precio, receta y cómo empezar",
    metaTitle: "Comprar Wegovy en Barcelona (2026): Precio, Receta y Cómo Empezar",
    metaDescription:
      "Guía para comprar Wegovy en Barcelona con receta médica: precios reales, cómo conseguir la prescripción y empezar con seguimiento médico. Primera visita 25 €.",
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
            text: "En Maren separamos el coste: el plan de seguimiento médico tiene un precio fijo mensual desde 149 €, y la medicación se adquiere en farmacia solo si el médico la prescribe. Así sabes exactamente qué pagas por cada cosa.",
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
              "Reserva tu primera visita médica (25 €, descontables del tratamiento).",
              "Completa tu historial y objetivos de salud en la app.",
              "Un médico colegiado valora si Wegovy u otro GLP‑1 es adecuado para ti.",
              "Si procede, recibes la prescripción y las pautas de dosis.",
              "Seguimiento continuo desde la app: dosis, efectos y progreso.",
            ],
          },
        ],
      },
      {
        h2: "¿Es seguro?",
        blocks: [
          {
            type: "p",
            text: "Wegovy es seguro cuando se usa bajo supervisión médica. Los efectos secundarios más comunes (náuseas, digestiones lentas) suelen ser leves y temporales, y se gestionan ajustando la dosis poco a poco. Por eso el seguimiento es tan importante: no es solo comprar la pluma, es acompañar todo el proceso.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo comprar Wegovy sin receta en Barcelona?",
        a: "No. Wegovy requiere receta médica. Comprarlo sin prescripción es ilegal y conlleva riesgos serios para la salud.",
      },
      {
        q: "¿Cuánto cuesta empezar con Maren?",
        a: "La primera visita médica son 25 € y se descuentan del tratamiento. El plan de seguimiento empieza desde 149 €/mes; la medicación se compra aparte en farmacia si se prescribe.",
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
      "Cómo comprar Mounjaro (tirzepatida) en Barcelona con receta: precio, diferencias con Wegovy, resultados y cómo empezar con seguimiento médico. Primera visita 25 €.",
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
          { type: "quote", text: PRICE_NOTE },
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
            text: "No existe un 'mejor' universal. Por eso en Maren personalizamos la recomendación tras tu valoración médica en lugar de aplicar un protocolo único.",
          },
        ],
      },
      {
        h2: "Cómo empezar con Mounjaro en Maren",
        blocks: [
          {
            type: "list",
            items: [
              "Primera visita médica por 25 € (descontables del tratamiento).",
              "Valoración de tu caso por un endocrino colegiado.",
              "Prescripción y pauta de dosis si es adecuado para ti.",
              "Seguimiento desde la app con ajustes y soporte continuo.",
            ],
          },
        ],
      },
    ],
    faqs: [
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
      "Precio de Wegovy en España por dosis (0,25 a 2,4 mg), qué incluye el tratamiento y cómo empezar con receta y seguimiento médico. Primera visita 25 €.",
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
        ],
      },
    ],
    faqs: [
      {
        q: "¿Por qué varía tanto el precio de Wegovy?",
        a: "Porque depende de la dosis de la pluma y de si el precio incluye o no la consulta y el seguimiento médico.",
      },
      {
        q: "¿La primera visita en Maren se descuenta?",
        a: "Sí. Los 25 € de la primera visita se descuentan íntegramente del tratamiento si decides empezar.",
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
      "Comparativa clara de Ozempic, Wegovy y Mounjaro para perder peso: principio activo, eficacia, dosis y cuál te conviene. Valoración médica desde 25 €.",
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
        ],
      },
    ],
    faqs: [
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
      "Cómo conseguir una receta de Wegovy online en España de forma legal y segura, con valoración médica real. Primera visita 25 €, seguimiento por app.",
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
        h2: "Cómo funciona en Maren",
        blocks: [
          {
            type: "list",
            items: [
              "Reservas tu primera visita online (25 €, descontables).",
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
    ],
    faqs: [
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
      "Precio de Mounjaro (tirzepatida) en España por dosis, qué incluye el tratamiento y cómo empezar con receta y seguimiento médico. Primera visita 25 €.",
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
        ],
      },
      {
        h2: "Qué incluye el tratamiento completo",
        blocks: [
          {
            type: "p",
            text: "Más allá del fármaco, un tratamiento bien hecho incluye la consulta médica, la prescripción, el ajuste de dosis y el seguimiento. En Maren el plan de seguimiento es un precio fijo mensual y la medicación se adquiere aparte en farmacia.",
          },
          { type: "quote", text: PRICE_NOTE },
        ],
      },
    ],
    faqs: [
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
      "Qué es la semaglutida (Ozempic, Wegovy, Rybelsus), para qué sirve y cómo comprarla con receta de forma legal en España. Valoración médica desde 25 €.",
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
    ],
    faqs: [
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

  /* 8 ───────────────────────────────────────────── */
  {
    slug: "tirzepatida-para-adelgazar",
    title: "Tirzepatida para adelgazar",
    h1: "Tirzepatida para adelgazar: resultados, dosis y cómo empezar",
    metaTitle: "Tirzepatida para Adelgazar: Resultados, Dosis y Precio (2026)",
    metaDescription:
      "Cómo funciona la tirzepatida (Mounjaro) para adelgazar: resultados reales, dosis, efectos secundarios y cómo empezar con seguimiento médico. Primera visita 25 €.",
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
        ],
      },
    ],
    faqs: [
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
      "Cómo elegir una clínica de Wegovy en Barcelona: qué buscar, precios, seguimiento y señales de alerta. Empieza con médicos colegiados desde 25 €.",
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
    ],
    faqs: [
      {
        q: "¿Es mejor una clínica presencial?",
        a: "No necesariamente. Una clínica online con médicos colegiados y buen seguimiento ofrece la misma seguridad con más comodidad.",
      },
      {
        q: "¿Qué precio es razonable?",
        a: "Busca transparencia: consulta inicial asequible, plan de seguimiento claro y medicación aparte en farmacia.",
      },
    ],
  },

  /* 10 ──────────────────────────────────────────── */
  {
    slug: "plan-perder-peso-glp1",
    title: "Plan para perder peso con GLP‑1",
    h1: "Bajar de peso con GLP‑1: plan completo paso a paso",
    metaTitle: "Plan para Perder Peso con GLP‑1: Guía Paso a Paso (2026)",
    metaDescription:
      "Plan completo para perder peso con GLP‑1 (Wegovy, Mounjaro): fases, nutrición, seguimiento y mantenimiento para resultados duraderos. Empieza desde 25 €.",
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
            text: "El seguimiento continuo es lo que marca la diferencia entre perder peso y mantenerlo. Desde la app de Maren registras tu evolución, recibes ajustes de dosis y tienes contacto con tu equipo clínico cuando lo necesitas.",
          },
        ],
      },
    ],
    faqs: [
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
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 3): Post[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}

export const SITE_URL = "https://doctorlife.io";
