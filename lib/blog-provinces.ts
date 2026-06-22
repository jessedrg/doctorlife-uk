/* ───────────────────────────────────────────────────────────
   Generador de guías SEO por PROVINCIA (las 50 de España).
   A diferencia de las páginas de ciudad, cada provincia incluye
   DATOS REALES Y ÚNICOS (capital, población, municipios principales,
   comunidad autónoma y prevalencia orientativa de obesidad por CCAA),
   de modo que cada artículo es largo, informativo y no "thin content".

   Objetivo: rankear para búsquedas amplias de intención de compra
   ("comprar ozempic en {provincia}", "wegovy {provincia}",
   "tratamiento para adelgazar {provincia}", "endocrino {provincia}")
   y funcionar como funnel hacia la consulta médica de DoctorLife.
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq, Block } from "./blog";

const BRAND = "DoctorLife";

const PRICE_NOTE =
  "En DoctorLife tu primera visita médica son solo 25 € y se descuentan íntegramente del tratamiento si decides empezar. Todo el seguimiento se gestiona desde nuestra app interna.";

const SERVICE_CTA =
  "En DoctorLife, un endocrino colegiado valora tu caso por videoconsulta y, si el tratamiento es adecuado para ti, te lo prescribe con receta electrónica y seguimiento desde la app. La primera visita son 25 € y se descuentan del tratamiento.";

/* ── utilidades deterministas (independientes de blog-content) ── */
function hash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}
function pick<T>(arr: T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}
function pick2<T>(arr: T[], seed: string): T {
  return arr[hash(seed + "x2") % arr.length];
}
function tpl(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
function isoDate(offset: number): string {
  const d = new Date(Date.UTC(2025, 5, 1));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}
function listToText(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return items.slice(0, -1).join(", ") + " y " + items[items.length - 1];
}

/* ── precios orientativos de los GLP‑1 (coherentes con el resto del blog) ── */
const DRUG_PRICING = [
  { name: "Wegovy", inn: "semaglutida 2,4 mg", freq: "Inyección semanal", use: "Pérdida de peso", price: "200–300 €/mes" },
  { name: "Mounjaro", inn: "tirzepatida", freq: "Inyección semanal", use: "Pérdida de peso", price: "200–350 €/mes" },
  { name: "Ozempic", inn: "semaglutida", freq: "Inyección semanal", use: "Diabetes tipo 2", price: "120–170 €/mes" },
  { name: "Saxenda", inn: "liraglutida", freq: "Inyección diaria", use: "Pérdida de peso", price: "200–300 €/mes" },
];

const COVERS = [
  "/blog/wegovy-sevilla.png",
  "/blog/mounjaro-valencia.png",
  "/blog/ozempic-madrid.png",
  "/products/maren-lineup.png",
  "/hero/woman.png",
];

/* ═══════════════════════════════════════════════════════════
   DATOS REALES POR COMUNIDAD AUTÓNOMA
   Prevalencia ORIENTATIVA de obesidad adulta (%), en línea con las
   encuestas de salud disponibles. Se presenta siempre como aproximada.
   ═══════════════════════════════════════════════════════════ */
type Ccaa = { obesity: number; health: string };
const CCAA: Record<string, Ccaa> = {
  "Andalucía": { obesity: 18, health: "Servicio Andaluz de Salud (SAS)" },
  "Aragón": { obesity: 14, health: "Servicio Aragonés de Salud (SALUD)" },
  "Principado de Asturias": { obesity: 16, health: "Servicio de Salud del Principado de Asturias (SESPA)" },
  "Islas Baleares": { obesity: 13, health: "Servei de Salut de les Illes Balears (IB-Salut)" },
  "Canarias": { obesity: 17, health: "Servicio Canario de la Salud (SCS)" },
  "Cantabria": { obesity: 14, health: "Servicio Cántabro de Salud (SCS)" },
  "Castilla y León": { obesity: 16, health: "Sanidad de Castilla y León (Sacyl)" },
  "Castilla-La Mancha": { obesity: 18, health: "Servicio de Salud de Castilla-La Mancha (SESCAM)" },
  "Cataluña": { obesity: 14, health: "Servei Català de la Salut (CatSalut)" },
  "Comunidad Valenciana": { obesity: 15, health: "Conselleria de Sanitat (Generalitat Valenciana)" },
  "Extremadura": { obesity: 18, health: "Servicio Extremeño de Salud (SES)" },
  "Galicia": { obesity: 16, health: "Servizo Galego de Saúde (Sergas)" },
  "Comunidad de Madrid": { obesity: 12, health: "Servicio Madrileño de Salud (SERMAS)" },
  "Región de Murcia": { obesity: 17, health: "Servicio Murciano de Salud (SMS)" },
  "Comunidad Foral de Navarra": { obesity: 13, health: "Servicio Navarro de Salud (Osasunbidea)" },
  "País Vasco": { obesity: 13, health: "Osakidetza" },
  "La Rioja": { obesity: 14, health: "Servicio Riojano de Salud (Seris)" },
};

/* ═══════════════════════════════════════════════════════════
   DATOS REALES DE LAS 50 PROVINCIAS
   pop = población aproximada (habitantes). capitalSlug solo se rellena
   cuando la capital tiene páginas de ciudad propias (para enlazar sin 404).
   ═══════════════════════════════════════════════════════════ */
type Province = {
  name: string;
  slug: string;
  capital: string;
  capitalSlug?: string;
  community: string;
  pop: number;
  cities: string[];
};

const PROVINCES: Province[] = [
  { name: "Álava", slug: "alava", capital: "Vitoria-Gasteiz", capitalSlug: "vitoria", community: "País Vasco", pop: 335000, cities: ["Llodio", "Amurrio", "Salvatierra"] },
  { name: "Albacete", slug: "albacete", capital: "Albacete", capitalSlug: "albacete", community: "Castilla-La Mancha", pop: 388000, cities: ["Hellín", "Villarrobledo", "Almansa", "La Roda"] },
  { name: "Alicante", slug: "alicante", capital: "Alicante", capitalSlug: "alicante", community: "Comunidad Valenciana", pop: 1920000, cities: ["Elche", "Torrevieja", "Orihuela", "Benidorm", "Alcoy"] },
  { name: "Almería", slug: "almeria", capital: "Almería", capitalSlug: "almeria", community: "Andalucía", pop: 740000, cities: ["Roquetas de Mar", "El Ejido", "Níjar", "Vícar"] },
  { name: "Asturias", slug: "asturias", capital: "Oviedo", capitalSlug: "oviedo", community: "Principado de Asturias", pop: 1010000, cities: ["Gijón", "Avilés", "Siero", "Langreo"] },
  { name: "Ávila", slug: "avila", capital: "Ávila", community: "Castilla y León", pop: 158000, cities: ["Arévalo", "Arenas de San Pedro", "Las Navas del Marqués"] },
  { name: "Badajoz", slug: "badajoz", capital: "Badajoz", capitalSlug: "badajoz", community: "Extremadura", pop: 670000, cities: ["Mérida", "Don Benito", "Almendralejo", "Villanueva de la Serena"] },
  { name: "Baleares", slug: "baleares", capital: "Palma", capitalSlug: "palma-de-mallorca", community: "Islas Baleares", pop: 1210000, cities: ["Calvià", "Manacor", "Ibiza", "Mahón", "Marratxí"] },
  { name: "Barcelona", slug: "barcelona", capital: "Barcelona", capitalSlug: "barcelona", community: "Cataluña", pop: 5750000, cities: ["L'Hospitalet de Llobregat", "Badalona", "Terrassa", "Sabadell", "Mataró"] },
  { name: "Vizcaya", slug: "vizcaya", capital: "Bilbao", capitalSlug: "bilbao", community: "País Vasco", pop: 1140000, cities: ["Barakaldo", "Getxo", "Portugalete", "Santurtzi"] },
  { name: "Burgos", slug: "burgos", capital: "Burgos", capitalSlug: "burgos", community: "Castilla y León", pop: 356000, cities: ["Miranda de Ebro", "Aranda de Duero"] },
  { name: "Cáceres", slug: "caceres", capital: "Cáceres", capitalSlug: "caceres", community: "Extremadura", pop: 390000, cities: ["Plasencia", "Navalmoral de la Mata", "Trujillo"] },
  { name: "Cádiz", slug: "cadiz", capital: "Cádiz", capitalSlug: "cadiz", community: "Andalucía", pop: 1250000, cities: ["Jerez de la Frontera", "Algeciras", "San Fernando", "El Puerto de Santa María", "Chiclana"] },
  { name: "Cantabria", slug: "cantabria", capital: "Santander", capitalSlug: "santander", community: "Cantabria", pop: 588000, cities: ["Torrelavega", "Castro-Urdiales", "Camargo"] },
  { name: "Castellón", slug: "castellon", capital: "Castellón de la Plana", capitalSlug: "castellon", community: "Comunidad Valenciana", pop: 600000, cities: ["Vila-real", "Burriana", "Vinaròs", "Benicàssim"] },
  { name: "Ciudad Real", slug: "ciudad-real", capital: "Ciudad Real", community: "Castilla-La Mancha", pop: 495000, cities: ["Puertollano", "Tomelloso", "Alcázar de San Juan", "Valdepeñas"] },
  { name: "Córdoba", slug: "cordoba", capital: "Córdoba", capitalSlug: "cordoba", community: "Andalucía", pop: 775000, cities: ["Lucena", "Puente Genil", "Montilla", "Priego de Córdoba"] },
  { name: "A Coruña", slug: "a-coruna", capital: "A Coruña", capitalSlug: "a-coruna", community: "Galicia", pop: 1120000, cities: ["Santiago de Compostela", "Ferrol", "Narón", "Oleiros"] },
  { name: "Cuenca", slug: "cuenca", capital: "Cuenca", community: "Castilla-La Mancha", pop: 195000, cities: ["Tarancón", "Quintanar del Rey", "Motilla del Palancar"] },
  { name: "Gipuzkoa", slug: "gipuzkoa", capital: "San Sebastián", capitalSlug: "san-sebastian", community: "País Vasco", pop: 720000, cities: ["Irun", "Errenteria", "Eibar", "Zarautz"] },
  { name: "Girona", slug: "girona", capital: "Girona", capitalSlug: "girona", community: "Cataluña", pop: 790000, cities: ["Figueres", "Blanes", "Lloret de Mar", "Salt", "Olot"] },
  { name: "Granada", slug: "granada", capital: "Granada", capitalSlug: "granada", community: "Andalucía", pop: 920000, cities: ["Motril", "Almuñécar", "Baza", "Loja", "Maracena"] },
  { name: "Guadalajara", slug: "guadalajara", capital: "Guadalajara", capitalSlug: "guadalajara", community: "Castilla-La Mancha", pop: 265000, cities: ["Azuqueca de Henares", "Alovera", "El Casar"] },
  { name: "Huelva", slug: "huelva", capital: "Huelva", capitalSlug: "huelva", community: "Andalucía", pop: 525000, cities: ["Lepe", "Almonte", "Isla Cristina", "Moguer"] },
  { name: "Huesca", slug: "huesca", capital: "Huesca", community: "Aragón", pop: 225000, cities: ["Monzón", "Barbastro", "Fraga", "Jaca"] },
  { name: "Jaén", slug: "jaen", capital: "Jaén", capitalSlug: "jaen", community: "Andalucía", pop: 625000, cities: ["Linares", "Andújar", "Úbeda", "Martos"] },
  { name: "León", slug: "leon", capital: "León", capitalSlug: "leon", community: "Castilla y León", pop: 445000, cities: ["Ponferrada", "San Andrés del Rabanedo", "Astorga"] },
  { name: "Lleida", slug: "lleida", capital: "Lleida", capitalSlug: "lleida", community: "Cataluña", pop: 440000, cities: ["Balaguer", "Tàrrega", "Mollerussa", "La Seu d'Urgell"] },
  { name: "Lugo", slug: "lugo", capital: "Lugo", capitalSlug: "lugo", community: "Galicia", pop: 325000, cities: ["Monforte de Lemos", "Viveiro", "Vilalba"] },
  { name: "Madrid", slug: "madrid", capital: "Madrid", capitalSlug: "madrid", community: "Comunidad de Madrid", pop: 6870000, cities: ["Móstoles", "Alcalá de Henares", "Fuenlabrada", "Leganés", "Getafe", "Alcorcón"] },
  { name: "Málaga", slug: "malaga", capital: "Málaga", capitalSlug: "malaga", community: "Andalucía", pop: 1720000, cities: ["Marbella", "Mijas", "Fuengirola", "Vélez-Málaga", "Torremolinos", "Estepona"] },
  { name: "Murcia", slug: "murcia", capital: "Murcia", capitalSlug: "murcia", community: "Región de Murcia", pop: 1560000, cities: ["Cartagena", "Lorca", "Molina de Segura", "Alcantarilla"] },
  { name: "Navarra", slug: "navarra", capital: "Pamplona", capitalSlug: "pamplona", community: "Comunidad Foral de Navarra", pop: 665000, cities: ["Tudela", "Barañáin", "Estella", "Burlada"] },
  { name: "Ourense", slug: "ourense", capital: "Ourense", capitalSlug: "ourense", community: "Galicia", pop: 305000, cities: ["O Barco de Valdeorras", "Verín", "O Carballiño"] },
  { name: "Palencia", slug: "palencia", capital: "Palencia", community: "Castilla y León", pop: 160000, cities: ["Aguilar de Campoo", "Guardo", "Venta de Baños"] },
  { name: "Las Palmas", slug: "las-palmas", capital: "Las Palmas de Gran Canaria", capitalSlug: "las-palmas", community: "Canarias", pop: 1130000, cities: ["Telde", "Santa Lucía de Tirajana", "Arrecife", "Puerto del Rosario"] },
  { name: "Pontevedra", slug: "pontevedra", capital: "Pontevedra", capitalSlug: "pontevedra", community: "Galicia", pop: 945000, cities: ["Vigo", "Vilagarcía de Arousa", "Marín", "Redondela"] },
  { name: "La Rioja", slug: "la-rioja", capital: "Logroño", capitalSlug: "logrono", community: "La Rioja", pop: 320000, cities: ["Calahorra", "Arnedo", "Haro", "Lardero"] },
  { name: "Salamanca", slug: "salamanca", capital: "Salamanca", capitalSlug: "salamanca", community: "Castilla y León", pop: 330000, cities: ["Béjar", "Ciudad Rodrigo", "Santa Marta de Tormes"] },
  { name: "Santa Cruz de Tenerife", slug: "santa-cruz-de-tenerife", capital: "Santa Cruz de Tenerife", capitalSlug: "santa-cruz-de-tenerife", community: "Canarias", pop: 1030000, cities: ["San Cristóbal de La Laguna", "Arona", "Adeje", "Granadilla de Abona"] },
  { name: "Segovia", slug: "segovia", capital: "Segovia", community: "Castilla y León", pop: 155000, cities: ["Cuéllar", "El Espinar", "Cantalejo"] },
  { name: "Sevilla", slug: "sevilla", capital: "Sevilla", capitalSlug: "sevilla", community: "Andalucía", pop: 1950000, cities: ["Dos Hermanas", "Alcalá de Guadaíra", "Utrera", "Mairena del Aljarafe", "Écija"] },
  { name: "Soria", slug: "soria", capital: "Soria", community: "Castilla y León", pop: 88000, cities: ["Almazán", "Ágreda", "El Burgo de Osma"] },
  { name: "Tarragona", slug: "tarragona", capital: "Tarragona", capitalSlug: "tarragona", community: "Cataluña", pop: 830000, cities: ["Reus", "Tortosa", "Cambrils", "Salou", "El Vendrell"] },
  { name: "Teruel", slug: "teruel", capital: "Teruel", community: "Aragón", pop: 134000, cities: ["Alcañiz", "Andorra", "Calamocha"] },
  { name: "Toledo", slug: "toledo", capital: "Toledo", capitalSlug: "toledo", community: "Castilla-La Mancha", pop: 720000, cities: ["Talavera de la Reina", "Illescas", "Seseña", "Torrijos"] },
  { name: "Valencia", slug: "valencia", capital: "Valencia", capitalSlug: "valencia", community: "Comunidad Valenciana", pop: 2650000, cities: ["Torrent", "Gandía", "Paterna", "Sagunto", "Alzira"] },
  { name: "Valladolid", slug: "valladolid", capital: "Valladolid", capitalSlug: "valladolid", community: "Castilla y León", pop: 520000, cities: ["Medina del Campo", "Laguna de Duero", "Tordesillas"] },
  { name: "Zamora", slug: "zamora", capital: "Zamora", community: "Castilla y León", pop: 165000, cities: ["Benavente", "Toro", "Morales del Vino"] },
  { name: "Zaragoza", slug: "zaragoza", capital: "Zaragoza", capitalSlug: "zaragoza", community: "Aragón", pop: 975000, cities: ["Calatayud", "Utebo", "Ejea de los Caballeros", "Tarazona"] },
];

/* ── formato de población en español ── */
function formatPop(n: number): string {
  if (n >= 1000000) {
    const m = (n / 1000000).toFixed(1).replace(".", ",");
    return `${m} millones de habitantes`;
  }
  return `${Math.round(n / 1000)}.000 habitantes`;
}

/* ── bloques reutilizables ── */
function pricingTable(): Block {
  return {
    type: "table",
    caption: "Precios orientativos de los tratamientos GLP‑1 en farmacia (2026)",
    head: ["Tratamiento", "Principio activo", "Administración", "Indicación", "Precio orientativo"],
    rows: DRUG_PRICING.map((d) => [d.name, d.inn, d.freq, d.use, d.price]),
  };
}

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

function capitalLinks(p: Province): Block | null {
  if (!p.capitalSlug) return null;
  return {
    type: "links",
    title: `Guías locales de ${p.capital}`,
    items: [
      { label: `Comprar Wegovy en ${p.capital}`, href: `/blog/comprar-wegovy-${p.capitalSlug}` },
      { label: `Comprar Mounjaro en ${p.capital}`, href: `/blog/comprar-mounjaro-${p.capitalSlug}` },
      { label: `Clínica para adelgazar en ${p.capital}`, href: `/blog/clinica-adelgazar-${p.capitalSlug}` },
      { label: `Endocrino en ${p.capital}`, href: `/blog/endocrino-${p.capitalSlug}` },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   POOLS DE TEXTO (variantes deterministas por slug → unicidad)
   ═══════════════════════════════════════════════════════════ */
const INTRO_P1 = [
  "La provincia de {Name}, con cerca de {pop} y capital en {capital}, concentra una demanda creciente de tratamientos médicos para perder peso. Cada vez más personas buscan cómo empezar con un análogo del GLP‑1 (Wegovy, Mounjaro, Ozempic o Saxenda) de forma legal, segura y con seguimiento médico real.",
  "En {Name} viven alrededor de {pop}, repartidos entre {capital} y un amplio conjunto de municipios. En toda la provincia ha aumentado el interés por los tratamientos GLP‑1 para adelgazar, y con él la necesidad de información fiable sobre precios, recetas y cómo iniciarlos con garantías.",
  "Con una población aproximada de {pop} y {capital} como capital, la provincia de {Name} es uno de los territorios donde más ha crecido la búsqueda de tratamientos médicos del peso. La clave está en hacerlo bien: con valoración profesional, receta y seguimiento, no por canales sin control.",
];
const INTRO_P2 = [
  "En {BRAND} atendemos a pacientes de toda la provincia de {Name} mediante consulta online: no necesitas desplazarte a {capital} ni esperar semanas por una cita. Un endocrino colegiado valora tu caso y, si procede, te prescribe el tratamiento con receta electrónica válida en cualquier farmacia.",
  "{BRAND} cubre toda la provincia de {Name} con un modelo 100 % online. Tanto si vives en {capital} como en cualquier otro municipio, accedes a la misma valoración médica, a la prescripción si está indicada y al seguimiento, sin colas y sin desplazamientos.",
  "Desde {BRAND} damos servicio a toda la provincia de {Name} por videoconsulta. Vivas donde vivas —en {capital} o en una localidad más pequeña— el proceso es el mismo: valoración por un médico colegiado, receta electrónica si procede y seguimiento continuo desde la app.",
];
const INTRO_P3 = [
  "Esta guía reúne lo que necesitas saber en {Name}: qué tratamientos existen, cuánto cuestan, cómo conseguir la receta, qué pasa con las listas de espera y cómo empezar paso a paso.",
  "A continuación encontrarás, aplicado a {Name}, los precios orientativos de cada fármaco, las opciones para conseguir la receta, el contexto de salud de la zona y el proceso completo para empezar con seguridad.",
  "En las próximas secciones detallamos, para la provincia de {Name}, los precios de cada GLP‑1, cómo obtener la prescripción, la situación de la obesidad en la región y la forma más segura de iniciar el tratamiento.",
];

const PRICE_P = [
  "Los precios de los GLP‑1 en {Name} son los mismos que en el resto de España, porque dependen del fármaco y la dosis, no del municipio. Lo que cambia entre opciones es la potencia, la indicación y la frecuencia de administración.",
  "En {Name}, como en toda España, el precio de estos tratamientos lo marca la farmacia y la dosis, no la ciudad. Conviene comparar bien, porque el coste varía mucho de un fármaco a otro.",
  "El coste de los tratamientos GLP‑1 en la provincia de {Name} no depende de dónde vivas, sino del medicamento prescrito y de la fase de tratamiento. Esta tabla resume las opciones disponibles.",
];
const PRICE_P2 = [
  "Ten en cuenta que el precio del fármaco en farmacia es solo una parte: un tratamiento serio incluye la consulta médica, la prescripción, los ajustes de dosis y el seguimiento de efectos. Sin eso, comprar la pluma por tu cuenta es arriesgado e ineficaz.",
  "Recuerda que estas cifras son solo del medicamento. El valor real está en el acompañamiento médico: la valoración, el escalado de dosis y el seguimiento que evitan empezar y parar, que es lo que de verdad encarece (y arruina) un tratamiento mal hecho.",
  "Estos importes corresponden únicamente al fármaco. Un tratamiento completo y seguro suma la consulta y el seguimiento médico, que son los que garantizan que el dinero invertido se traduzca en resultados sostenidos.",
];

const RECETA_P1 = [
  "En {Name} hay dos vías para conseguir la receta de Wegovy, Mounjaro u Ozempic: la sanidad pública ({health}) y la medicina privada. Por la vía pública, estos fármacos rara vez se financian para perder peso y el acceso al especialista puede demorarse semanas o meses.",
  "Para obtener la prescripción en {Name} puedes acudir a {health} o a la sanidad privada. El problema de la vía pública es doble: estos tratamientos no suelen estar financiados para adelgazar y la lista de espera de endocrinología suele ser larga.",
  "Conseguir la receta en {Name} pasa por {health} o por una consulta privada. La realidad es que, por lo público, los GLP‑1 casi nunca se financian para pérdida de peso y la cita con el endocrino puede tardar bastante.",
];
const RECETA_P2 = [
  "La consulta online de {BRAND} es la vía rápida: un endocrino valora tu caso en poco tiempo y, si el tratamiento está indicado, emite una receta electrónica válida en cualquier farmacia de {Name}. Nada de desplazamientos ni de esperas interminables.",
  "Con {BRAND} evitas esa espera: la valoración es online, la realiza un médico colegiado y, si procede, recibes la receta electrónica para recogerlo en tu farmacia de {Name}. Todo sin moverte de casa.",
  "Por eso muchos pacientes de {Name} eligen la vía online de {BRAND}: misma especialidad, médico colegiado, sin colas y con receta electrónica válida en toda la provincia.",
];

const OBESITY_INTRO = [
  "El sobrepeso y la obesidad son un problema de salud pública en toda España, y {community} no es una excepción. Según las encuestas de salud disponibles, en torno al {obesity} % de la población adulta de la comunidad vive con obesidad (un dato orientativo que no incluye el sobrepeso, cuya prevalencia es bastante mayor).",
  "La obesidad afecta a una parte importante de la población en {community}. Las encuestas de salud sitúan la obesidad adulta en torno al {obesity} % de forma orientativa; si se suma el sobrepeso, la cifra de personas con exceso de peso es notablemente más alta.",
  "En {community}, como en el conjunto del país, el exceso de peso es muy frecuente. De forma aproximada, alrededor del {obesity} % de los adultos de la comunidad presenta obesidad según las encuestas de salud, sin contar el sobrepeso.",
];
const OBESITY_P2 = [
  "Estos datos explican por qué la demanda de tratamientos eficaces ha crecido tanto en {Name}. La obesidad es una enfermedad crónica con base biológica, no una cuestión de fuerza de voluntad, y por eso el abordaje más eficaz combina hábitos, apoyo médico y, cuando está indicado, fármacos GLP‑1.",
  "Frente a estas cifras, en {Name} cada vez más personas buscan un enfoque médico real. La evidencia es clara: la obesidad responde mejor a un tratamiento que combine cambios de estilo de vida con seguimiento profesional y, si procede, medicación.",
  "Ese contexto hace que en {Name} tenga todo el sentido un abordaje médico del peso. La obesidad es una condición crónica y multifactorial; tratarla con criterio clínico —y no con productos milagro— es lo que marca la diferencia a largo plazo.",
];

const ENDO_P = [
  "El endocrino es el especialista en metabolismo y, por tanto, en el tratamiento del peso. En {Name}, acceder a uno por la vía pública puede llevar tiempo; por eso la videoconsulta se ha convertido en una alternativa cómoda para valorar el caso, ajustar el tratamiento y hacer seguimiento.",
  "Para tratar el peso con GLP‑1, lo ideal es la valoración de un endocrino. En {Name}, conseguir cita pública con este especialista no siempre es rápido, y ahí la consulta online aporta agilidad sin renunciar al rigor médico.",
  "Un endocrino colegiado es quien debe valorar si un GLP‑1 está indicado en tu caso. En {Name}, la opción online permite acceder a esa valoración sin las esperas habituales de la endocrinología pública.",
];

const SAFETY_P = [
  "Estos fármacos son seguros y eficaces cuando se usan bajo supervisión médica, empezando por dosis bajas que se aumentan poco a poco. Los efectos secundarios más comunes son digestivos (náuseas, digestiones lentas), suelen ser leves y se gestionan ajustando la pauta. Comprar la pluma sin receta ni seguimiento es ilegal y peligroso.",
  "La seguridad depende del seguimiento. Bien indicados y con un escalado de dosis progresivo, los GLP‑1 tienen un buen perfil; los efectos digestivos iniciales suelen remitir. Lo arriesgado es automedicarse o comprar por canales no autorizados, algo que en {Name} —como en toda España— es ilegal.",
  "Usados con criterio médico, estos tratamientos son seguros: la clave está en ajustar la dosis poco a poco y vigilar la tolerancia. Los efectos secundarios habituales son leves y temporales. Lo que nunca debe hacerse es comprarlos sin receta ni control profesional.",
];

/* ═══════════════════════════════════════════════════════════
   BUILDER PRINCIPAL
   ═══════════════════════════════════════════════════════════ */
function buildProvincePost(p: Province, index: number): Post {
  const slug = `tratamiento-adelgazar-provincia-${p.slug}`;
  const ccaa = CCAA[p.community] ?? { obesity: 16, health: "el servicio de salud autonómico" };
  const popText = formatPop(p.pop);
  const allMunis = [p.capital, ...p.cities];
  const vars: Record<string, string> = {
    Name: p.name,
    capital: p.capital,
    community: p.community,
    health: ccaa.health,
    pop: popText,
    obesity: String(ccaa.obesity),
    BRAND,
  };

  const sections: Section[] = [
    {
      h2: tpl("Tratamiento para adelgazar con GLP‑1 en la provincia de {Name}", vars),
      blocks: [
        { type: "p", text: tpl(pick(INTRO_P1, slug), vars) },
        { type: "p", text: tpl(pick(INTRO_P2, slug), vars) },
        { type: "p", text: tpl(pick(INTRO_P3, slug), vars) },
      ],
    },
    {
      h2: tpl("Precios de Wegovy, Mounjaro, Ozempic y Saxenda en {Name} (2026)", vars),
      blocks: [
        { type: "p", text: tpl(pick(PRICE_P, slug), vars) },
        pricingTable(),
        { type: "p", text: tpl(pick(PRICE_P2, slug), vars) },
        { type: "quote", text: PRICE_NOTE },
      ],
    },
    {
      h2: tpl("Cobertura en toda la provincia de {Name}", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            `Atendemos a pacientes de {capital} y de todos los municipios de la provincia. Entre las localidades con más demanda de la zona se encuentran ${listToText(allMunis)}, pero al ser una consulta online llegamos a cualquier punto de {Name}, incluidas las comarcas rurales.`,
            vars,
          ),
        },
        {
          type: "list",
          items: allMunis.map((m) =>
            tpl(`{drug} con receta y seguimiento médico en ${m}`, { drug: "Tratamiento GLP‑1" }),
          ),
        },
        {
          type: "p",
          text: tpl(
            "No importa si vives en la capital o en un pueblo pequeño: la receta electrónica que emite el médico es válida en cualquier farmacia de {Name} y de toda España.",
            vars,
          ),
        },
      ],
    },
    {
      h2: tpl("Obesidad y sobrepeso en {community}", vars),
      blocks: [
        { type: "p", text: tpl(pick(OBESITY_INTRO, slug), vars) },
        {
          type: "table",
          caption: tpl("Datos de contexto de la provincia de {Name}", vars),
          head: ["Dato", "Valor"],
          rows: [
            ["Capital", p.capital],
            ["Comunidad autónoma", p.community],
            ["Población aproximada", popText],
            ["Servicio público de salud", ccaa.health],
            ["Obesidad adulta (orientativo)", `~${ccaa.obesity} %`],
            ["Municipios principales", listToText(allMunis)],
          ],
        },
        { type: "p", text: tpl(pick(OBESITY_P2, slug), vars) },
      ],
    },
    {
      h2: tpl("¿Cómo conseguir la receta de Wegovy, Mounjaro u Ozempic en {Name}?", vars),
      blocks: [
        { type: "p", text: tpl(pick(RECETA_P1, slug), vars) },
        { type: "p", text: tpl(pick(RECETA_P2, slug), vars) },
        {
          type: "quote",
          text: "Cualquier web o particular que ofrezca estos fármacos 'sin receta' en España actúa de forma ilegal y pone en riesgo tu salud. La receta siempre exige una valoración médica previa.",
        },
      ],
    },
    {
      h2: tpl("Endocrino en {Name}: sanidad pública vs. consulta online", vars),
      blocks: [
        { type: "p", text: tpl(pick(ENDO_P, slug), vars) },
        {
          type: "list",
          items: [
            tpl("Sin listas de espera: valoración en poco tiempo, frente a las semanas de la pública en {Name}.", vars),
            tpl("Sin desplazamientos a {capital} ni a hospitales de referencia.", vars),
            "Receta electrónica válida en cualquier farmacia de España.",
            "Seguimiento continuo por chat, no solo en la visita.",
            "Mismo rigor: médicos colegiados y tratamiento personalizado.",
          ],
        },
      ],
    },
    {
      h2: "Qué tratamientos puede valorar el médico",
      blocks: [
        {
          type: "p",
          text: tpl(
            "Si tras la valoración el tratamiento farmacológico está indicado, el endocrino elige la opción más adecuada para ti en función de tu objetivo, tu tolerancia y tu presupuesto. Estas son las principales opciones disponibles para pacientes de {Name}:",
            vars,
          ),
        },
        {
          type: "list",
          items: [
            "Wegovy (semaglutida 2,4 mg): inyección semanal específica para pérdida de peso, con amplia experiencia clínica.",
            "Mounjaro (tirzepatida): doble acción GIP/GLP‑1, una inyección semanal, con la mayor pérdida de peso media en estudios.",
            "Ozempic (semaglutida): inyección semanal indicada para diabetes tipo 2; su uso para adelgazar es fuera de indicación y lo decide el médico.",
            "Saxenda (liraglutida): inyección diaria para control del peso, útil en determinados perfiles.",
          ],
        },
        glp1Links(),
      ],
    },
    {
      h2: tpl("Cómo empezar tu tratamiento en {Name}, paso a paso", vars),
      blocks: [
        {
          type: "list",
          items: [
            tpl("Reservas tu primera visita online por 25 € (descontables del tratamiento) desde cualquier punto de {Name}.", vars),
            "Completas tu historial clínico y tus objetivos desde la app, sin desplazarte.",
            "Un endocrino colegiado valora tu caso y, si procede, define el tratamiento y la dosis de inicio.",
            tpl("Recibes la receta electrónica, válida en cualquier farmacia de {Name}.", vars),
            "Haces el seguimiento y los ajustes de dosis desde la app, sin nuevas esperas.",
          ],
        },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
      ],
    },
    {
      h2: "Seguridad y acompañamiento médico",
      blocks: [
        { type: "p", text: tpl(pick(SAFETY_P, slug), vars) },
        { type: "p", text: tpl("En {BRAND} no te vendemos una caja y te dejamos solo: te acompañamos en cada ajuste de dosis y en los hábitos, para que los resultados se mantengan y evites el efecto rebote.", vars) },
      ],
    },
  ];

  // Enlazado interno a las guías de la capital (cuando existen)
  const capLinks = capitalLinks(p);
  const nearbyBlocks: Block[] = [
    {
      type: "p",
      text: tpl(
        `Si buscas información más local, también tenemos guías centradas en ${p.capitalSlug ? p.capital : "las principales ciudades"} y otras localidades. La provincia de {Name} forma parte de {community}, donde damos cobertura completa.`,
        vars,
      ),
    },
  ];
  if (capLinks) nearbyBlocks.push(capLinks);
  nearbyBlocks.push(glp1Links());
  sections.push({
    h2: tpl("{Name} y las localidades cercanas", vars),
    blocks: nearbyBlocks,
  });

  const faqs: Faq[] = [
    {
      q: tpl("¿Se puede comprar Ozempic o Wegovy sin receta en {Name}?", vars),
      a: "No. En toda España, incluida esta provincia, estos fármacos requieren receta médica. Comprarlos sin prescripción es ilegal y peligroso; siempre debe haber una valoración médica previa.",
    },
    {
      q: tpl("¿Cuánto cuesta el tratamiento para adelgazar en {Name}?", vars),
      a: "La medicación en farmacia oscila entre 120 € y 350 €/mes según el fármaco y la dosis. En DoctorLife la primera visita médica son 25 € (descontables del tratamiento) y el seguimiento se gestiona desde la app.",
    },
    {
      q: tpl("¿Atendéis toda la provincia de {Name}?", vars),
      a: tpl(`Sí. Al ser una consulta online, atendemos {capital} y el resto de municipios (${listToText(p.cities)} y muchos más), incluidas las zonas rurales. La receta electrónica es válida en cualquier farmacia.`, vars),
    },
    {
      q: tpl("¿Tengo que desplazarme a {capital}?", vars),
      a: "No. Toda la valoración, la prescripción y el seguimiento son online. Solo acudes a tu farmacia habitual a recoger el tratamiento.",
    },
    {
      q: tpl("¿Cuánto tarda frente a la lista de espera pública en {Name}?", vars),
      a: tpl("Por la vía online de DoctorLife, la valoración se realiza en poco tiempo, frente a las semanas o meses que puede tardar la cita de endocrinología en {health}.", vars),
    },
    {
      q: "¿Qué fármaco GLP‑1 es mejor para mí?",
      a: "No existe un 'mejor' universal: depende de tu objetivo, tu historial y tu tolerancia. Por eso la elección debe ser siempre médica e individual, nunca basada en lo que le funcionó a otra persona.",
    },
  ];

  const cover = COVERS[hash(slug) % COVERS.length];

  return {
    slug,
    title: tpl("Tratamiento para adelgazar en la provincia de {Name}", vars),
    h1: tpl("Adelgazar con GLP‑1 en la provincia de {Name}: precios, receta y cómo empezar", vars),
    metaTitle: tpl("Tratamiento para adelgazar en {Name}: Wegovy, Mounjaro y Ozempic | DoctorLife", vars),
    metaDescription: tpl(
      "Cómo empezar un tratamiento GLP‑1 para adelgazar en la provincia de {Name}: precios de Wegovy, Mounjaro y Ozempic, cómo conseguir la receta, endocrino online y cobertura en {capital} y toda la provincia. Primera visita 25 €.",
      vars,
    ),
    excerpt: tpl(
      "Guía completa del tratamiento médico para adelgazar (GLP‑1) en la provincia de {Name}: precios, receta, endocrino online y cobertura en {capital} y comarcas.",
      vars,
    ),
    category: "Adelgazar",
    keyword: tpl("tratamiento para adelgazar {Name}", vars),
    readMins: 9 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-06-21",
    cover,
    coverAlt: tpl("Tratamiento médico para adelgazar con GLP‑1 en la provincia de {Name}", vars),
    sections,
    faqs,
  };
}

/* ── API pública: devuelve las 50 guías de provincia ── */
export function buildProvincePosts(startIndex: number): Post[] {
  return PROVINCES.map((p, i) => buildProvincePost(p, startIndex + i));
}
