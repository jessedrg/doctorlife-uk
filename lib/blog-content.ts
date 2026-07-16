/* ───────────────────────────────────────────────────────────
   Generador programático de posts SEO de alta intención de compra
   para el mercado español (GLP‑1). Crea cientos de guías únicas
   "comprar {fármaco} en {ciudad}" + "precio de {fármaco} en {ciudad}"
   que funcionan como funnel hacia la consulta médica de DoctorLife.

   El contenido se construye con variantes deterministas (hash del
   slug) para que cada artículo sea distinto pero estable entre builds.
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq, Block } from "./blog";
import { buildProvincePosts, buildGeoHubPosts } from "./blog-provinces";
import { buildKeywordPosts } from "./blog-keywords";
import {
  getCityFacts,
  healthServiceFor,
  formatCityPop,
  EXTRA_CITIES,
} from "./blog-city-facts";

const BRAND = "DoctorLife";

const PRICE_NOTE =
  "En DoctorLife tu primera visita médica es gratis, sin compromiso. Todo el seguimiento se gestiona desde nuestra app interna.";

/* ── utilidades deterministas ── */
function hash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}
function pick<T>(arr: T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}
function tpl(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
function isoDate(offset: number): string {
  const d = new Date(Date.UTC(2025, 1, 1));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

/* ── ciudades de España ── */
export type City = { name: string; slug: string; prep?: string };
const CITIES_BASE: City[] = [
  { name: "Madrid", slug: "madrid" },
  { name: "Barcelona", slug: "barcelona" },
  { name: "Valencia", slug: "valencia" },
  { name: "Sevilla", slug: "sevilla" },
  { name: "Zaragoza", slug: "zaragoza" },
  { name: "Málaga", slug: "malaga" },
  { name: "Murcia", slug: "murcia" },
  { name: "Palma de Mallorca", slug: "palma-de-mallorca" },
  { name: "Las Palmas de Gran Canaria", slug: "las-palmas" },
  { name: "Bilbao", slug: "bilbao" },
  { name: "Alicante", slug: "alicante" },
  { name: "Córdoba", slug: "cordoba" },
  { name: "Valladolid", slug: "valladolid" },
  { name: "Vigo", slug: "vigo" },
  { name: "Gijón", slug: "gijon" },
  { name: "L'Hospitalet de Llobregat", slug: "hospitalet" },
  { name: "Vitoria-Gasteiz", slug: "vitoria" },
  { name: "A Coruña", slug: "a-coruna" },
  { name: "Granada", slug: "granada" },
  { name: "Elche", slug: "elche" },
  { name: "Oviedo", slug: "oviedo" },
  { name: "Badalona", slug: "badalona" },
  { name: "Cartagena", slug: "cartagena" },
  { name: "Terrassa", slug: "terrassa" },
  { name: "Jerez de la Frontera", slug: "jerez" },
  { name: "Sabadell", slug: "sabadell" },
  { name: "Móstoles", slug: "mostoles" },
  { name: "Santa Cruz de Tenerife", slug: "santa-cruz-de-tenerife" },
  { name: "Pamplona", slug: "pamplona" },
  { name: "Almería", slug: "almeria" },
  { name: "Alcalá de Henares", slug: "alcala-de-henares" },
  { name: "Fuenlabrada", slug: "fuenlabrada" },
  { name: "Leganés", slug: "leganes" },
  { name: "San Sebastián", slug: "san-sebastian" },
  { name: "Getafe", slug: "getafe" },
  { name: "Burgos", slug: "burgos" },
  { name: "Santander", slug: "santander" },
  { name: "Castellón de la Plana", slug: "castellon" },
  { name: "Albacete", slug: "albacete" },
  { name: "Alcorcón", slug: "alcorcon" },
  { name: "Logroño", slug: "logrono" },
  { name: "Badajoz", slug: "badajoz" },
  { name: "Salamanca", slug: "salamanca" },
  { name: "Huelva", slug: "huelva" },
  { name: "Marbella", slug: "marbella" },
  { name: "Lleida", slug: "lleida" },
  { name: "Tarragona", slug: "tarragona" },
  { name: "León", slug: "leon" },
  { name: "Cádiz", slug: "cadiz" },
  { name: "Jaén", slug: "jaen" },
  { name: "Ourense", slug: "ourense" },
  { name: "Girona", slug: "girona" },
  { name: "Lugo", slug: "lugo" },
  { name: "Cáceres", slug: "caceres" },
  { name: "Toledo", slug: "toledo" },
  { name: "Guadalajara", slug: "guadalajara" },
  { name: "Pontevedra", slug: "pontevedra" },
  // Batch 2 — ciudades medianas con búsquedas GLP-1 reales
  { name: "Dos Hermanas", slug: "dos-hermanas" },
  { name: "Parla", slug: "parla" },
  { name: "Torrejón de Ardoz", slug: "torrejon-de-ardoz" },
  { name: "Alcobendas", slug: "alcobendas" },
  { name: "Pozuelo de Alarcón", slug: "pozuelo-de-alarcon" },
  { name: "San Sebastián de los Reyes", slug: "san-sebastian-de-los-reyes" },
  { name: "Torrent", slug: "torrent" },
  { name: "Mataró", slug: "mataro" },
  { name: "Cornellà de Llobregat", slug: "cornella" },
  { name: "Sant Boi de Llobregat", slug: "sant-boi" },
  { name: "Manresa", slug: "manresa" },
  { name: "Reus", slug: "reus" },
  { name: "Granollers", slug: "granollers" },
  { name: "Rubí", slug: "rubi" },
  { name: "Sant Cugat del Vallès", slug: "sant-cugat" },
  { name: "Castelldefels", slug: "castelldefels" },
  { name: "Barakaldo", slug: "barakaldo" },
  { name: "Getxo", slug: "getxo" },
  { name: "Irún", slug: "irun" },
  { name: "Fuengirola", slug: "fuengirola" },
  { name: "Torremolinos", slug: "torremolinos" },
  { name: "Benalmádena", slug: "benalmadena" },
  { name: "Vélez-Málaga", slug: "velez-malaga" },
  { name: "Estepona", slug: "estepona" },
  { name: "Torrevieja", slug: "torrevieja" },
  { name: "Orihuela", slug: "orihuela" },
  { name: "Benidorm", slug: "benidorm" },
  { name: "Lorca", slug: "lorca" },
  { name: "Roquetas de Mar", slug: "roquetas-de-mar" },
  { name: "El Puerto de Santa María", slug: "el-puerto-de-santa-maria" },
  { name: "Chiclana de la Frontera", slug: "chiclana" },
  { name: "Algeciras", slug: "algeciras" },
  { name: "Mérida", slug: "merida" },
  { name: "Talavera de la Reina", slug: "talavera-de-la-reina" },
  { name: "Cuenca", slug: "cuenca" },
  { name: "Ciudad Real", slug: "ciudad-real" },
  { name: "Palencia", slug: "palencia" },
  { name: "Zamora", slug: "zamora" },
  { name: "Ávila", slug: "avila" },
  { name: "Segovia", slug: "segovia" },
  { name: "Soria", slug: "soria" },
  // Batch 3 — 100 ciudades adicionales
  { name: "Pinto", slug: "pinto" },
  { name: "Rivas-Vaciamadrid", slug: "rivas-vaciamadrid" },
  { name: "Majadahonda", slug: "majadahonda" },
  { name: "Las Rozas de Madrid", slug: "las-rozas" },
  { name: "Collado Villalba", slug: "collado-villalba" },
  { name: "Alcalá de Guadaíra", slug: "alcala-de-guadaira" },
  { name: "Utrera", slug: "utrera" },
  { name: "San Fernando", slug: "san-fernando" },
  { name: "La Línea de la Concepción", slug: "la-linea" },
  { name: "Motril", slug: "motril" },
  { name: "Linares", slug: "linares" },
  { name: "Andújar", slug: "andujar" },
  { name: "Úbeda", slug: "ubeda" },
  { name: "Baeza", slug: "baeza" },
  { name: "Écija", slug: "ecija" },
  { name: "Lucena", slug: "lucena" },
  { name: "Puente Genil", slug: "puente-genil" },
  { name: "Antequera", slug: "antequera" },
  { name: "Ronda", slug: "ronda" },
  { name: "Nerja", slug: "nerja" },
  { name: "La Laguna", slug: "la-laguna" },
  { name: "Arona", slug: "arona" },
  { name: "Adeje", slug: "adeje" },
  { name: "Arrecife", slug: "arrecife" },
  { name: "Puerto del Rosario", slug: "puerto-del-rosario" },
  { name: "Telde", slug: "telde" },
  { name: "Santa Lucía de Tirajana", slug: "santa-lucia" },
  { name: "Manacor", slug: "manacor" },
  { name: "Ibiza", slug: "ibiza" },
  { name: "Mahón", slug: "mahon" },
  { name: "Ciutadella", slug: "ciutadella" },
  { name: "Gandía", slug: "gandia" },
  { name: "Sagunto", slug: "sagunto" },
  { name: "Paterna", slug: "paterna" },
  { name: "Burjassot", slug: "burjassot" },
  { name: "Alzira", slug: "alzira" },
  { name: "Ontinyent", slug: "ontinyent" },
  { name: "Dénia", slug: "denia" },
  { name: "Calpe", slug: "calpe" },
  { name: "Villena", slug: "villena" },
  { name: "Petrer", slug: "petrer" },
  { name: "Novelda", slug: "novelda" },
  { name: "Crevillent", slug: "crevillent" },
  { name: "Alcoy", slug: "alcoy" },
  { name: "Ibi", slug: "ibi" },
  { name: "Mollet del Vallès", slug: "mollet" },
  { name: "Vilafranca del Penedès", slug: "vilafranca" },
  { name: "Vilanova i la Geltrú", slug: "vilanova" },
  { name: "Sitges", slug: "sitges" },
  { name: "Cerdanyola del Vallès", slug: "cerdanyola" },
  { name: "El Prat de Llobregat", slug: "el-prat" },
  { name: "Ripollet", slug: "ripollet" },
  { name: "Vic", slug: "vic" },
  { name: "Igualada", slug: "igualada" },
  { name: "Figueres", slug: "figueres" },
  { name: "Blanes", slug: "blanes" },
  { name: "Lloret de Mar", slug: "lloret-de-mar" },
  { name: "Calafell", slug: "calafell" },
  { name: "Tortosa", slug: "tortosa" },
  { name: "Cambrils", slug: "cambrils" },
  { name: "Salou", slug: "salou" },
  { name: "Bilbao La Vieja", slug: "bilbao-la-vieja" },
  { name: "Basauri", slug: "basauri" },
  { name: "Sestao", slug: "sestao" },
  { name: "Eibar", slug: "eibar" },
  { name: "Mondragón", slug: "mondragon" },
  { name: "Zarautz", slug: "zarautz" },
  { name: "Tolosa", slug: "tolosa" },
  { name: "Rentería", slug: "renteria" },
  { name: "Durango", slug: "durango" },
  { name: "Portugalete", slug: "portugalete" },
  { name: "Santurce", slug: "santurce" },
  { name: "Tudela", slug: "tudela" },
  { name: "Estella", slug: "estella" },
  { name: "Calahorra", slug: "calahorra" },
  { name: "Arnedo", slug: "arnedo" },
  { name: "Huesca", slug: "huesca" },
  { name: "Teruel", slug: "teruel" },
  { name: "Calatayud", slug: "calatayud" },
  { name: "Barbastro", slug: "barbastro" },
  { name: "Monzón", slug: "monzon" },
  { name: "Avilés", slug: "aviles" },
  { name: "Langreo", slug: "langreo" },
  { name: "Mieres", slug: "mieres" },
  { name: "Siero", slug: "siero" },
  { name: "Ferrol", slug: "ferrol" },
  { name: "Santiago de Compostela", slug: "santiago-de-compostela" },
  { name: "Vilagarcía de Arousa", slug: "vilagarcia" },
  { name: "Narón", slug: "naron" },
  { name: "Oleiros", slug: "oleiros" },
  { name: "Torrelavega", slug: "torrelavega" },
  { name: "Miranda de Ebro", slug: "miranda-de-ebro" },
  { name: "Aranda de Duero", slug: "aranda-de-duero" },
  { name: "Ponferrada", slug: "ponferrada" },
  { name: "Medina del Campo", slug: "medina-del-campo" },
  { name: "Ávila ciudad", slug: "avila-ciudad" },
  { name: "Plasencia", slug: "plasencia" },
  { name: "Don Benito", slug: "don-benito" },
  { name: "Villanueva de la Serena", slug: "villanueva-de-la-serena" },
  { name: "Ceuta", slug: "ceuta" },
  { name: "Melilla", slug: "melilla" },
  // Batch 4 — municipios de 30.000+ habitantes que faltaban (todas con ficha real en CITY_FACTS)
  // Comunidad de Madrid
  { name: "Coslada", slug: "coslada" },
  { name: "Valdemoro", slug: "valdemoro" },
  { name: "Aranjuez", slug: "aranjuez" },
  { name: "Arganda del Rey", slug: "arganda-del-rey" },
  { name: "Boadilla del Monte", slug: "boadilla-del-monte" },
  { name: "Colmenar Viejo", slug: "colmenar-viejo" },
  { name: "Tres Cantos", slug: "tres-cantos" },
  { name: "Galapagar", slug: "galapagar" },
  { name: "San Fernando de Henares", slug: "san-fernando-de-henares" },
  // Cataluña
  { name: "Santa Coloma de Gramenet", slug: "santa-coloma-de-gramenet" },
  { name: "Sant Adrià de Besòs", slug: "sant-adria-de-besos" },
  { name: "Viladecans", slug: "viladecans" },
  { name: "Gavà", slug: "gava" },
  { name: "Barberà del Vallès", slug: "barbera-del-valles" },
  { name: "Montcada i Reixac", slug: "montcada-i-reixac" },
  { name: "Sant Feliu de Llobregat", slug: "sant-feliu-de-llobregat" },
  { name: "Esplugues de Llobregat", slug: "esplugues-de-llobregat" },
  { name: "Sant Joan Despí", slug: "sant-joan-despi" },
  { name: "Olot", slug: "olot" },
  { name: "El Vendrell", slug: "el-vendrell" },
  { name: "Sant Pere de Ribes", slug: "sant-pere-de-ribes" },
  // Comunidad Valenciana
  { name: "Elda", slug: "elda" },
  { name: "Mislata", slug: "mislata" },
  { name: "San Vicente del Raspeig", slug: "san-vicente-del-raspeig" },
  { name: "Vila-real", slug: "vila-real" },
  { name: "Villajoyosa", slug: "villajoyosa" },
  { name: "Manises", slug: "manises" },
  { name: "Aldaia", slug: "aldaia" },
  { name: "Alaquàs", slug: "alaquas" },
  { name: "Santa Pola", slug: "santa-pola" },
  // Andalucía
  { name: "Mijas", slug: "mijas" },
  { name: "El Ejido", slug: "el-ejido" },
  { name: "Sanlúcar de Barrameda", slug: "sanlucar-de-barrameda" },
  { name: "Mairena del Aljarafe", slug: "mairena-del-aljarafe" },
  { name: "Rincón de la Victoria", slug: "rincon-de-la-victoria" },
  { name: "Alhaurín de la Torre", slug: "alhaurin-de-la-torre" },
  { name: "Puerto Real", slug: "puerto-real" },
  { name: "La Rinconada", slug: "la-rinconada" },
  { name: "Los Palacios y Villafranca", slug: "los-palacios-y-villafranca" },
  { name: "Arcos de la Frontera", slug: "arcos-de-la-frontera" },
  { name: "Cártama", slug: "cartama" },
  { name: "Coria del Río", slug: "coria-del-rio" },
  { name: "Níjar", slug: "nijar" },
  // Región de Murcia
  { name: "Molina de Segura", slug: "molina-de-segura" },
  { name: "Alcantarilla", slug: "alcantarilla" },
  { name: "Cieza", slug: "cieza" },
  { name: "Águilas", slug: "aguilas" },
  { name: "Yecla", slug: "yecla" },
  { name: "Totana", slug: "totana" },
  { name: "Mazarrón", slug: "mazarron" },
  { name: "San Javier", slug: "san-javier" },
  { name: "Torre-Pacheco", slug: "torre-pacheco" },
  // País Vasco
  { name: "Leioa", slug: "leioa" },
  // Galicia
  { name: "Arteixo", slug: "arteixo" },
  { name: "Ames", slug: "ames" },
  { name: "Culleredo", slug: "culleredo" },
  // Castilla y León
  { name: "San Andrés del Rabanedo", slug: "san-andres-del-rabanedo" },
  // Castilla-La Mancha
  { name: "Puertollano", slug: "puertollano" },
  { name: "Tomelloso", slug: "tomelloso" },
  { name: "Alcázar de San Juan", slug: "alcazar-de-san-juan" },
  { name: "Valdepeñas", slug: "valdepenas" },
  { name: "Azuqueca de Henares", slug: "azuqueca-de-henares" },
  { name: "Hellín", slug: "hellin" },
  { name: "Illescas", slug: "illescas" },
  // Extremadura
  { name: "Almendralejo", slug: "almendralejo" },
  // Cantabria
  { name: "Camargo", slug: "camargo" },
  { name: "Castro-Urdiales", slug: "castro-urdiales" },
  // Islas Baleares
  { name: "Calvià", slug: "calvia" },
  { name: "Marratxí", slug: "marratxi" },
  { name: "Llucmajor", slug: "llucmajor" },
  { name: "Santa Eulària des Riu", slug: "santa-eularia-des-riu" },
  { name: "Inca", slug: "inca" },
  // Canarias
  { name: "San Bartolomé de Tirajana", slug: "san-bartolome-de-tirajana" },
  { name: "Granadilla de Abona", slug: "granadilla-de-abona" },
  { name: "La Orotava", slug: "la-orotava" },
  { name: "Los Realejos", slug: "los-realejos" },
  { name: "Arucas", slug: "arucas" },
  { name: "Agüimes", slug: "aguimes" },
  { name: "Ingenio", slug: "ingenio" },
  { name: "Puerto de la Cruz", slug: "puerto-de-la-cruz" },
  // Batch 5 — municipios de ~20.000–30.000 habitantes (todas con ficha real en CITY_FACTS)
  // Andalucía
  { name: "Adra", slug: "adra" },
  { name: "Vícar", slug: "vicar" },
  { name: "Baza", slug: "baza" },
  { name: "Armilla", slug: "armilla" },
  { name: "Maracena", slug: "maracena" },
  { name: "Las Gabias", slug: "las-gabias" },
  { name: "Loja", slug: "loja" },
  { name: "Alhaurín el Grande", slug: "alhaurin-el-grande" },
  { name: "Coín", slug: "coin" },
  { name: "Barbate", slug: "barbate" },
  { name: "Rota", slug: "rota" },
  { name: "Conil de la Frontera", slug: "conil-de-la-frontera" },
  { name: "Isla Cristina", slug: "isla-cristina" },
  { name: "Lepe", slug: "lepe" },
  { name: "Ayamonte", slug: "ayamonte" },
  { name: "Moguer", slug: "moguer" },
  { name: "Cartaya", slug: "cartaya" },
  { name: "Bormujos", slug: "bormujos" },
  { name: "Camas", slug: "camas" },
  { name: "Tomares", slug: "tomares" },
  { name: "Morón de la Frontera", slug: "moron-de-la-frontera" },
  { name: "Lebrija", slug: "lebrija" },
  { name: "Carmona", slug: "carmona" },
  { name: "Cabra", slug: "cabra" },
  { name: "Priego de Córdoba", slug: "priego-de-cordoba" },
  { name: "Montilla", slug: "montilla" },
  { name: "Palma del Río", slug: "palma-del-rio" },
  { name: "Alcalá la Real", slug: "alcala-la-real" },
  { name: "Martos", slug: "martos" },
  // Comunidad Valenciana
  { name: "Almassora", slug: "almassora" },
  { name: "Burriana", slug: "burriana" },
  { name: "Vinaròs", slug: "vinaros" },
  { name: "La Vall d'Uixó", slug: "la-vall-duixo" },
  { name: "Onda", slug: "onda" },
  { name: "Alboraya", slug: "alboraya" },
  { name: "Xirivella", slug: "xirivella" },
  { name: "Catarroja", slug: "catarroja" },
  { name: "Paiporta", slug: "paiporta" },
  { name: "Cullera", slug: "cullera" },
  { name: "Xàtiva", slug: "xativa" },
  { name: "Oliva", slug: "oliva" },
  { name: "Algemesí", slug: "algemesi" },
  { name: "Bétera", slug: "betera" },
  { name: "Riba-roja de Túria", slug: "riba-roja-de-turia" },
  { name: "Almoradí", slug: "almoradi" },
  { name: "Xàbia", slug: "xabia" },
  { name: "Mutxamel", slug: "mutxamel" },
  { name: "El Campello", slug: "el-campello" },
  { name: "Aspe", slug: "aspe" },
  // Cataluña
  { name: "Premià de Mar", slug: "premia-de-mar" },
  { name: "El Masnou", slug: "el-masnou" },
  { name: "Vilassar de Mar", slug: "vilassar-de-mar" },
  { name: "Pineda de Mar", slug: "pineda-de-mar" },
  { name: "Sant Vicenç dels Horts", slug: "sant-vicenc-dels-horts" },
  { name: "Molins de Rei", slug: "molins-de-rei" },
  { name: "Sant Andreu de la Barca", slug: "sant-andreu-de-la-barca" },
  { name: "Martorell", slug: "martorell" },
  { name: "Esparreguera", slug: "esparreguera" },
  { name: "Olesa de Montserrat", slug: "olesa-de-montserrat" },
  { name: "Sant Just Desvern", slug: "sant-just-desvern" },
  { name: "Manlleu", slug: "manlleu" },
  { name: "Banyoles", slug: "banyoles" },
  { name: "Salt", slug: "salt" },
  { name: "Palafrugell", slug: "palafrugell" },
  { name: "Amposta", slug: "amposta" },
  { name: "Valls", slug: "valls" },
  { name: "Vila-seca", slug: "vila-seca" },
  // Comunidad de Madrid
  { name: "Ciempozuelos", slug: "ciempozuelos" },
  { name: "Navalcarnero", slug: "navalcarnero" },
  { name: "Villaviciosa de Odón", slug: "villaviciosa-de-odon" },
  { name: "Mejorada del Campo", slug: "mejorada-del-campo" },
  { name: "Paracuellos de Jarama", slug: "paracuellos-de-jarama" },
  { name: "Villanueva de la Cañada", slug: "villanueva-de-la-canada" },
  { name: "Humanes de Madrid", slug: "humanes-de-madrid" },
  // País Vasco
  { name: "Galdakao", slug: "galdakao" },
  { name: "Erandio", slug: "erandio" },
  { name: "Hernani", slug: "hernani" },
  { name: "Lasarte-Oria", slug: "lasarte-oria" },
  { name: "Amorebieta-Etxano", slug: "amorebieta-etxano" },
  { name: "Llodio", slug: "llodio" },
  // Galicia
  { name: "Redondela", slug: "redondela" },
  { name: "Cangas", slug: "cangas" },
  { name: "Marín", slug: "marin" },
  { name: "Ponteareas", slug: "ponteareas" },
  { name: "Lalín", slug: "lalin" },
  { name: "A Estrada", slug: "a-estrada" },
  { name: "Carballo", slug: "carballo" },
  { name: "Ribeira", slug: "ribeira" },
  { name: "Cambre", slug: "cambre" },
  // Castilla y León
  { name: "Laguna de Duero", slug: "laguna-de-duero" },
  { name: "Arroyo de la Encomienda", slug: "arroyo-de-la-encomienda" },
  { name: "Villaquilambre", slug: "villaquilambre" },
  // Castilla-La Mancha
  { name: "Villarrobledo", slug: "villarrobledo" },
  { name: "Almansa", slug: "almansa" },
  { name: "Manzanares", slug: "manzanares" },
  { name: "Seseña", slug: "sesena" },
  // Aragón
  { name: "Utebo", slug: "utebo" },
  // Extremadura
  { name: "Zafra", slug: "zafra" },
  { name: "Navalmoral de la Mata", slug: "navalmoral-de-la-mata" },
  // Región de Murcia
  { name: "Caravaca de la Cruz", slug: "caravaca-de-la-cruz" },
  { name: "Jumilla", slug: "jumilla" },
  { name: "Archena", slug: "archena" },
  { name: "Las Torres de Cotillas", slug: "las-torres-de-cotillas" },
  { name: "Alhama de Murcia", slug: "alhama-de-murcia" },
  // Islas Baleares
  { name: "Sant Antoni de Portmany", slug: "sant-antoni-de-portmany" },
  { name: "Sant Josep de sa Talaia", slug: "sant-josep-de-sa-talaia" },
  // Canarias
  { name: "Candelaria", slug: "candelaria" },
  { name: "Tacoronte", slug: "tacoronte" },
  { name: "Icod de los Vinos", slug: "icod-de-los-vinos" },
  { name: "Güímar", slug: "guimar" },
  { name: "Los Llanos de Aridane", slug: "los-llanos-de-aridane" },
  { name: "Gáldar", slug: "galdar" },
  { name: "La Oliva", slug: "la-oliva" },
  { name: "Pájara", slug: "pajara" },
  { name: "Teguise", slug: "teguise" },
  { name: "Tías", slug: "tias" },
  // Asturias
  { name: "Castrillón", slug: "castrillon" },
  // Cantabria
  { name: "Piélagos", slug: "pielagos" },
  { name: "El Astillero", slug: "el-astillero" },
  // Navarra
  { name: "Barañáin", slug: "baranain" },
  { name: "Burlada", slug: "burlada" },
  // Batch 6 — municipios >20.000 hab. que faltaban (todas con ficha real en CITY_FACTS)
  // Comunidad de Madrid
  { name: "Arroyomolinos", slug: "arroyomolinos" },
  { name: "Torrelodones", slug: "torrelodones" },
  { name: "Algete", slug: "algete" },
  { name: "San Martín de la Vega", slug: "san-martin-de-la-vega" },
  // Comunidad Valenciana
  { name: "Benicarló", slug: "benicarlo" },
  { name: "Sueca", slug: "sueca" },
  { name: "La Pobla de Vallbona", slug: "puebla-de-vallbona" },
  { name: "Quart de Poblet", slug: "quart-de-poblet" },
  { name: "Sant Joan d'Alacant", slug: "san-juan-de-alicante" },
  { name: "Altea", slug: "altea" },
  { name: "Pilar de la Horadada", slug: "pilar-de-la-horadada" },
  { name: "Picassent", slug: "picasent" },
  { name: "Alfafar", slug: "alfafar" },
  { name: "Moncada", slug: "moncada" },
  { name: "Carcaixent", slug: "carcaixent" },
  { name: "Puçol", slug: "puzol" },
  { name: "Llíria", slug: "liria" },
  { name: "Requena", slug: "requena" },
  { name: "l'Alfàs del Pi", slug: "alfaz-del-pi" },
  { name: "Benicàssim", slug: "benicasim" },
  // Andalucía
  { name: "San Roque", slug: "san-roque" },
  { name: "Almuñécar", slug: "almunecar" },
  { name: "Almonte", slug: "almonte" },
  { name: "Los Barrios", slug: "los-barrios" },
  { name: "Mairena del Alcor", slug: "mairena-del-alcor" },
  { name: "San Juan de Aznalfarache", slug: "san-juan-de-aznalfarache" },
  { name: "Aljaraque", slug: "aljaraque" },
  { name: "Torrox", slug: "torrox" },
  { name: "Atarfe", slug: "atarfe" },
  { name: "Huércal-Overa", slug: "huercal-overa" },
  // Cataluña
  { name: "Santa Perpètua de Mogoda", slug: "santa-perpetua-de-mogoda" },
  { name: "Castellar del Vallès", slug: "castellar-del-valles" },
  { name: "Sant Feliu de Guíxols", slug: "sant-feliu-de-guixols" },
  { name: "Les Franqueses del Vallès", slug: "les-franqueses-del-valles" },
  { name: "Roses", slug: "roses" },
  { name: "Sant Quirze del Vallès", slug: "sant-quirze-del-valles" },
  // Región de Murcia
  { name: "San Pedro del Pinatar", slug: "san-pedro-del-pinatar" },
  { name: "La Unión", slug: "la-union" },
  // Canarias
  { name: "San Miguel de Abona", slug: "san-miguel-de-abona" },
  { name: "Guía de Isora", slug: "guia-de-isora" },
  { name: "Mogán", slug: "mogan" },
  // Islas Baleares
  { name: "Alcúdia", slug: "alcudia" },
  // Comunidad Foral de Navarra
  { name: "Valle de Egüés", slug: "valle-de-egues" },
  // Galicia
  { name: "O Porriño", slug: "porrino" },
];

/* CITIES = base + municipios adicionales (provincia-conscientes), deduplicados
   por slug para no generar URLs repetidas ni canibalizar. */
export const CITIES: City[] = (() => {
  const seen = new Set(CITIES_BASE.map((c) => c.slug));
  const merged = [...CITIES_BASE];
  for (const c of EXTRA_CITIES) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    merged.push(c);
  }
  return merged;
})();

/* ── fármacos ── */
type Drug = {
  key: string;
  name: string;
  inn: string;
  category: string;
  kind: "weight" | "diabetes";
  frequency: string;
  cover: string;
  rows: string[][];
  priceLow: string;
  priceHigh: string;
  pillarBuy: string;
  pillarPrice: string;
  compare: string;
};

const WEGOVY_ROWS: string[][] = [
  ["0,25 mg", "Inicio (semanas 1–4)", "200–230 €"],
  ["0,5 mg", "Adaptación", "200–250 €"],
  ["1 mg", "Escalado", "230–270 €"],
  ["1,7 mg", "Escalado", "250–290 €"],
  ["2,4 mg", "Mantenimiento", "270–300 €"],
];
const MOUNJARO_ROWS: string[][] = [
  ["2,5 mg", "Inicio", "200–250 €"],
  ["5 mg", "Adaptación", "230–280 €"],
  ["7,5–10 mg", "Escalado", "280–330 €"],
  ["12,5–15 mg", "Mantenimiento", "300–350 €"],
];
const OZEMPIC_ROWS: string[][] = [
  ["0,25 mg", "Inicio", "120–140 €"],
  ["0,5 mg", "Mantenimiento", "130–150 €"],
  ["1 mg", "Mantenimiento", "150–170 €"],
];
const SAXENDA_ROWS: string[][] = [
  ["Caja de plumas", "Tratamiento diario", "130–200 €/caja"],
  ["Coste mensual", "Dosis de mantenimiento (3,0 mg/día)", "200–300 €/mes"],
];
const RYBELSUS_ROWS: string[][] = [
  ["3 mg", "Inicio (30 días)", "120–140 €"],
  ["7 mg", "Mantenimiento", "130–160 €"],
  ["14 mg", "Mantenimiento (dosis alta)", "160–190 €"],
];
const TRULICITY_ROWS: string[][] = [
  ["0,75 mg", "Inicio", "110–130 €"],
  ["1,5 mg", "Mantenimiento", "110–140 €"],
  ["3 mg", "Escalado", "130–160 €"],
  ["4,5 mg", "Dosis máxima", "150–180 €"],
];
const VICTOZA_ROWS: string[][] = [
  ["1,2 mg/día", "Mantenimiento estándar", "120–150 €/mes"],
  ["1,8 mg/día", "Dosis máxima", "150–190 €/mes"],
];

const DRUGS: Drug[] = [
  {
    key: "wegovy",
    name: "Wegovy",
    inn: "semaglutida 2,4 mg",
    category: "Wegovy",
    kind: "weight",
    frequency: "una inyección semanal",
    cover: "/blog/wegovy-sevilla.png",
    rows: WEGOVY_ROWS,
    priceLow: "200 €",
    priceHigh: "300 €",
    pillarBuy: "comprar-wegovy-online",
    pillarPrice: "wegovy-precio-espana",
    compare: "wegovy-vs-mounjaro",
  },
  {
    key: "mounjaro",
    name: "Mounjaro",
    inn: "tirzepatida",
    category: "Mounjaro",
    kind: "weight",
    frequency: "una inyección semanal",
    cover: "/blog/mounjaro-valencia.png",
    rows: MOUNJARO_ROWS,
    priceLow: "200 €",
    priceHigh: "350 €",
    pillarBuy: "comprar-mounjaro-online",
    pillarPrice: "mounjaro-precio-espana",
    compare: "wegovy-vs-mounjaro",
  },
  {
    key: "ozempic",
    name: "Ozempic",
    inn: "semaglutida",
    category: "Ozempic",
    kind: "diabetes",
    frequency: "una inyección semanal",
    cover: "/blog/ozempic-madrid.png",
    rows: OZEMPIC_ROWS,
    priceLow: "120 €",
    priceHigh: "170 €",
    pillarBuy: "comprar-ozempic-online",
    pillarPrice: "ozempic-precio-espana",
    compare: "ozempic-vs-wegovy-vs-mounjaro",
  },
  {
    key: "saxenda",
    name: "Saxenda",
    inn: "liraglutida",
    category: "Saxenda",
    kind: "weight",
    frequency: "una inyección diaria",
    cover: "/products/maren-daily.png",
    rows: SAXENDA_ROWS,
    priceLow: "200 €",
    priceHigh: "300 €",
    pillarBuy: "comprar-saxenda-espana",
    pillarPrice: "saxenda-precio-espana",
    compare: "ozempic-vs-saxenda",
  },
  {
    key: "tirzepatida",
    name: "tirzepatida",
    inn: "Mounjaro",
    category: "Mounjaro",
    kind: "weight",
    frequency: "una inyección semanal",
    cover: "/products/maren-pen.png",
    rows: MOUNJARO_ROWS,
    priceLow: "200 €",
    priceHigh: "350 €",
    pillarBuy: "comprar-tirzepatida-online",
    pillarPrice: "mounjaro-precio-espana",
    compare: "wegovy-vs-mounjaro",
  },
  {
    key: "semaglutida",
    name: "semaglutida",
    inn: "Wegovy/Ozempic",
    category: "Wegovy",
    kind: "weight",
    frequency: "una inyección semanal",
    cover: "/products/maren-oral.png",
    rows: WEGOVY_ROWS,
    priceLow: "200 €",
    priceHigh: "300 €",
    pillarBuy: "comprar-semaglutida-online",
    pillarPrice: "wegovy-precio-espana",
    compare: "ozempic-vs-wegovy-vs-mounjaro",
  },
  {
    key: "rybelsus",
    name: "Rybelsus",
    inn: "semaglutida oral",
    category: "Rybelsus",
    kind: "diabetes",
    frequency: "un comprimido diario en ayunas",
    cover: "/products/maren-oral.png",
    rows: RYBELSUS_ROWS,
    priceLow: "120 €",
    priceHigh: "190 €",
    pillarBuy: "comprar-semaglutida-online",
    pillarPrice: "wegovy-precio-espana",
    compare: "ozempic-vs-wegovy-vs-mounjaro",
  },
  {
    key: "trulicity",
    name: "Trulicity",
    inn: "dulaglutida",
    category: "Trulicity",
    kind: "diabetes",
    frequency: "una inyección semanal",
    cover: "/products/maren-pen.png",
    rows: TRULICITY_ROWS,
    priceLow: "110 €",
    priceHigh: "180 €",
    pillarBuy: "comprar-ozempic-online",
    pillarPrice: "ozempic-precio-espana",
    compare: "ozempic-vs-wegovy-vs-mounjaro",
  },
  {
    key: "victoza",
    name: "Victoza",
    inn: "liraglutida",
    category: "Victoza",
    kind: "diabetes",
    frequency: "una inyección diaria",
    cover: "/products/maren-daily.png",
    rows: VICTOZA_ROWS,
    priceLow: "120 €",
    priceHigh: "190 €",
    pillarBuy: "comprar-saxenda-espana",
    pillarPrice: "saxenda-precio-espana",
    compare: "ozempic-vs-saxenda",
  },
  {
    key: "zepbound",
    name: "Zepbound",
    inn: "tirzepatida",
    category: "Mounjaro",
    kind: "weight",
    frequency: "una inyección semanal",
    cover: "/products/maren-pen.png",
    rows: MOUNJARO_ROWS,
    priceLow: "200 €",
    priceHigh: "350 €",
    pillarBuy: "comprar-tirzepatida-online",
    pillarPrice: "mounjaro-precio-espana",
    compare: "wegovy-vs-mounjaro",
  },
];

/* ── variantes de contenido ── */
const INTRO_WEIGHT_A =
  "{Drug} ({inn}) se dispensa en las farmacias de {City} únicamente con receta médica. Es un análogo del GLP‑1 indicado para el control del peso, por lo que necesita la valoración previa de un médico colegiado: no es legal ni seguro comprarlo «sin receta» por internet.";
const INTRO_WEIGHT_A2 =
  "La vía más rápida en {City} es la consulta médica online de {BRAND}: un médico valora tu caso, emite la receta electrónica si procede y retiras {Drug} en tu farmacia habitual, sin listas de espera ni desplazamientos.";
const INTRO_WEIGHT_B =
  "¿Quieres comprar {Drug} en {City}? Lo primero que debes saber es que {Drug} ({inn}) requiere receta médica en toda España. Cualquier web que te lo ofrezca sin una valoración médica está operando de forma ilegal y pone en riesgo tu salud.";
const INTRO_WEIGHT_B2 =
  "Con {BRAND} el proceso es sencillo y totalmente legal: haces la consulta online desde {City}, un médico colegiado revisa tu historial y, si {Drug} es adecuado para ti, recibes la receta para retirarlo en tu farmacia.";
const INTRO_WEIGHT_C =
  "En {City} cada vez más personas recurren a {Drug} ({inn}) para perder peso de forma sostenible. Es un tratamiento de prescripción que actúa sobre el apetito y la saciedad, y que siempre debe iniciarse y ajustarse bajo supervisión médica.";
const INTRO_WEIGHT_C2 =
  "No hace falta acudir a una clínica presencial: con la consulta online de {BRAND} obtienes valoración médica, receta electrónica (si procede) y seguimiento real, y solo tienes que recoger {Drug} en una farmacia de {City}.";

const INTRO_DIAB_A =
  "{Drug} ({inn}) se vende en las farmacias de {City} con receta médica. Está autorizado para la diabetes tipo 2, no para perder peso, así que conviene una valoración médica que confirme cuál es el tratamiento adecuado para tu caso.";
const INTRO_DIAB_A2 =
  "Si tu objetivo es adelgazar, en {City} el médico puede valorar Wegovy (semaglutida para el peso) o Mounjaro (tirzepatida) en lugar de usar {Drug} fuera de su indicación.";
const INTRO_DIAB_B =
  "Comprar {Drug} en {City} requiere siempre receta médica. {Drug} ({inn}) es un medicamento para la diabetes tipo 2 y comprarlo sin prescripción es ilegal y peligroso, además de poco eficaz si no se acompaña de seguimiento.";
const INTRO_DIAB_B2 =
  "Con la consulta online de {BRAND}, un médico colegiado valora tu situación desde {City} y, si procede, emite la receta electrónica para que retires el tratamiento en tu farmacia.";

const WEIGHT_INTROS: [string, string][] = [
  [INTRO_WEIGHT_A, INTRO_WEIGHT_A2],
  [INTRO_WEIGHT_B, INTRO_WEIGHT_B2],
  [INTRO_WEIGHT_C, INTRO_WEIGHT_C2],
];
const DIAB_INTROS: [string, string][] = [
  [INTRO_DIAB_A, INTRO_DIAB_A2],
  [INTRO_DIAB_B, INTRO_DIAB_B2],
];

const STEPS_V1 = [
  "Reservas tu primera visita médica online gratis.",
  "Completas tu historial clínico y tus objetivos desde la app, sin moverte de {City}.",
  "Un médico colegiado valora si {Drug} es adecuado y seguro para ti.",
  "Si procede, recibes la receta electrónica y una pauta de dosis personalizada.",
  "Retiras {Drug} en tu farmacia de {City} y haces todo el seguimiento desde la app.",
];
const STEPS_V2 = [
  "Haces la consulta online gratis desde cualquier punto de {City}.",
  "Respondes a un cuestionario médico sobre tu salud, tu peso y tus objetivos.",
  "El médico revisa tu caso y decide si {Drug} encaja contigo.",
  "Recibes la prescripción y el plan de inicio si el tratamiento es adecuado.",
  "Recoges {Drug} en tu farmacia de {City} y te acompañamos en cada ajuste de dosis.",
];
const STEPS_V3 = [
  "Reservas tu valoración médica online gratis.",
  "Cuentas tu historia clínica y tu objetivo de peso en pocos minutos.",
  "Un médico colegiado confirma si {Drug} es la mejor opción para ti.",
  "Si procede, te llega la receta electrónica lista para tu farmacia de {City}.",
  "Empiezas con seguimiento continuo y ajustes de dosis desde la app.",
];
const STEPS = [STEPS_V1, STEPS_V2, STEPS_V3];

const BENEFIT_WEIGHT_TITLES = [
  "Por qué comprar {Drug} con seguimiento médico",
  "Qué resultados puedes esperar con {Drug}",
  "{Drug} en {City}: tratamiento, no solo medicación",
];
const BENEFIT_WEIGHT_P = [
  "Comprar {Drug} es solo el principio. Los mejores resultados llegan cuando la dosis se ajusta de forma gradual y se acompaña de hábitos sostenibles. Por eso en {BRAND} no vendemos un producto suelto: ofrecemos un tratamiento con médico colegiado, ajustes de dosis y soporte continuo desde la app.",
  "En los estudios clínicos, los análogos del GLP‑1 como {Drug} logran pérdidas de peso relevantes y sostenidas cuando se usan con seguimiento. La respuesta es individual y depende de tu punto de partida, la dosis y tus hábitos: un médico te ayuda a sacarle el máximo partido de forma segura.",
  "Iniciar {Drug} por tu cuenta, sin pauta ni control, multiplica los efectos secundarios y reduce los resultados. Con un equipo médico detrás, el escalado de dosis es progresivo, los efectos digestivos se minimizan y el tratamiento se adapta a tu evolución en {City}.",
];
const BENEFIT_DIAB_TITLES = [
  "{Drug} y pérdida de peso: lo que debes saber",
  "Alternativas a {Drug} si tu objetivo es adelgazar",
];
const BENEFIT_DIAB_P = [
  "Aunque mucha gente busca {Drug} para adelgazar, su indicación aprobada es la diabetes tipo 2. Para el control del peso existen opciones específicamente aprobadas ��Wegovy (semaglutida) y Mounjaro (tirzepatida)— que el médico puede valorar en tu consulta desde {City}.",
  "Usar {Drug} fuera de indicación, sin control médico, no es la vía recomendable. Lo correcto es que un médico valore tu caso y elija entre las opciones disponibles la más adecuada para ti, ya sea para diabetes o para el control del peso.",
];

/* ── mecanismo de acción ── */
const MECH_WEIGHT = [
  "{Drug} contiene {inn}, un análogo del GLP‑1 que imita a una hormona intestinal que tu cuerpo libera de forma natural al comer. Actúa sobre los centros del apetito del cerebro y ralentiza el vaciado del estómago, de modo que te sientes saciado antes y durante más tiempo. El resultado es que comes menos sin la sensación constante de hambre que hace fracasar la mayoría de las dietas.",
  "El principio activo de {Drug} ({inn}) pertenece a la familia de los agonistas del receptor GLP‑1. Reduce las señales de hambre, mejora el control de la glucosa tras las comidas y enlentece la digestión. Por eso, administrado mediante {frequency} y con la dosis bien ajustada, ayuda a reducir la ingesta calórica de forma natural y sostenible en {City}.",
  "{Drug} funciona reproduciendo la acción del GLP‑1, una hormona que regula el apetito y la saciedad. Al activar sus receptores disminuye el «ruido alimentario» —esos pensamientos constantes sobre comida—, estabiliza el azúcar en sangre y prolonga la sensaci��n de plenitud. No es un quemagrasas ni un producto milagro: es un tratamiento médico que cambia tu relación con el hambre.",
];
const MECH_DIAB = [
  "{Drug} ({inn}) es un análogo del GLP‑1 indicado para la diabetes tipo 2. Estimula la liberación de insulina cuando el azúcar en sangre está alto, frena la producción hepática de glucosa y ralentiza el vaciado gástrico. Como efecto secundario frecuente reduce el apetito, motivo por el que mucha gente lo asocia a la pérdida de peso.",
  "El mecanismo de {Drug} se basa en imitar la hormona GLP‑1: mejora el control glucémico tras las comidas y reduce la sensación de hambre. Su indicación aprobada es la diabetes tipo 2; para el control del peso existen fármacos específicos que el médico puede valorar en {City}.",
];

/* ���─ efectos secundarios ── */
const SIDE_INTRO = [
  "Como todo análogo del GLP‑1, {Drug} puede provocar efectos secundarios, sobre todo digestivos, al inicio del tratamiento y tras cada subida de dosis. La mayoría son leves y desaparecen cuando el cuerpo se adapta; un escalado lento de la dosis ayuda a minimizarlos.",
  "Los efectos adversos de {Drug} suelen ser leves y transitorios. Aparecen con más frecuencia en las primeras semanas y al aumentar la dosis, y tienden a remitir a medida que el organismo se acostumbra al tratamiento.",
];
const SIDE_LIST = [
  "Náuseas, sobre todo en las primeras semanas y tras cada subida de dosis.",
  "Digestiones más lentas, sensación de plenitud o hinchazón abdominal.",
  "Estreñimiento o diarrea pasajeros.",
  "Episodios de acidez, eructos o reflujo.",
  "Cansancio o ligeros dolores de cabeza los primeros días.",
];
const SIDE_OUTRO = [
  "Para reducirlos conviene comer despacio y en raciones pequeñas, evitar comidas muy grasas o copiosas y mantenerse bien hidratado. Si algún síntoma es intenso o persistente, el médico de {BRAND} ajusta la pauta o la dosis desde la app, sin que tengas que desplazarte por {City}.",
  "El seguimiento médico marca la diferencia: ante efectos molestos, el equipo de {BRAND} puede frenar el escalado de dosis, espaciar los aumentos o recomendar pautas dietéticas para que el tratamiento sea llevadero. Por eso comprar {Drug} sin control médico es contraproducente.",
];

/* ── contraindicaciones ── */
const CONTRA_P = [
  "{Drug} no es adecuado para todo el mundo. Por eso la valoración médica previa es imprescindible: el médico revisa tu historial, tus enfermedades y tu medicación habitual antes de decidir si puedes empezar y con qué dosis.",
  "Antes de recetar {Drug}, el médico descarta una serie de situaciones en las que el tratamiento no está recomendado. Esta es una de las razones por las que comprarlo «sin receta» en {City} es tan arriesgado: nadie comprueba si es seguro para ti.",
];
const CONTRA_LIST = [
  "Antecedentes personales o familiares de cáncer medular de tiroides o síndrome MEN2.",
  "Pancreatitis previa o enfermedad grave de la vesícula biliar.",
  "Embarazo, búsqueda de embarazo o lactancia.",
  "Antecedentes de trastornos de la conducta alimentaria activos.",
  "Insuficiencia renal o hepática grave sin valorar por un médico.",
];

/* ── conservación y administración ── */
const STORAGE_LIST = [
  "Conserva las plumas de {Drug} en la nevera (entre 2 y 8 °C) y nunca las congeles.",
  "Una vez en uso, muchas plumas pueden mantenerse a temperatura ambiente un número limitado de días; consulta siempre el prospecto.",
  "Administra {Drug} mediante {frequency}, en abdomen, muslo o brazo, rotando el punto de inyección.",
  "No reutilices las agujas y desecha el material usado en un contenedor adecuado.",
  "Si olvidas una dosis, no dupliques: sigue las instrucciones del prospecto o consulta con tu médico de {BRAND}.",
];

/* ── resultados ── */
const RESULTS_WEIGHT = [
  "En los ensayos clínicos, los tratamientos con {inn} han mostrado pérdidas de peso medias relevantes a lo largo de varios meses cuando se combinan con cambios de hábitos. Los primeros efectos sobre el apetito suelen notarse en pocas semanas, pero la pérdida de peso es progresiva: la constancia y el ajuste de dosis son la clave.",
  "Los resultados con {Drug} dependen de tu punto de partida, de la dosis alcanzada y de tus hábitos. No es realista esperar grandes cambios en los primeros días: el tratamiento despliega su efecto a lo largo de semanas y meses, y por eso el seguimiento médico continuado es tan importante como el propio medicamento.",
];

/* ── contexto local ── */
const LOCAL_BUY = [
  "En {City}, como en el resto de España, {Drug} no se vende en parafarmacias ni en webs sin receta: solo en farmacias y con prescripción médica. La ventaja de {BRAND} es que evitas las listas de espera para endocrinología y gestionas todo —valoración, receta y seguimiento— sin desplazarte por {City}.",
  "Muchos pacientes de {City} descubren que {Drug} está agotado en algunas farmacias o que conseguir cita con el especialista lleva semanas. Con la consulta online de {BRAND} obtienes la valoración médica en poco tiempo y, si procede, la receta electrónica para buscar el tratamiento en cualquier farmacia de {City}.",
  "Si vives o trabajas en {City} y quieres empezar con {Drug}, el principal obstáculo no suele ser el precio, sino conseguir una valoración médica seria sin esperas. {BRAND} resuelve precisamente eso: consulta online con médico colegiado y receta electrónica válida en toda España.",
];
const COMPARE_P = [
  "{Drug} no es la única opción. Según tu caso, el médico puede comparar distintos análogos del GLP‑1 y elegir el que mejor se ajusta a tu objetivo, tu tolerancia y tu presupuesto. Esa decisión debe ser individual y siempre médica, nunca basada en lo que le funcionó a otra persona.",
  "Antes de comprar {Drug} en {City} conviene saber cómo se compara con otras alternativas (Wegovy, Mounjaro, Ozempic o Saxenda). Cada una tiene su perfil de eficacia, frecuencia y precio; en la consulta de {BRAND} el médico te ayuda a elegir con criterio.",
];

/* ── construcción de bloques ── */
function buyLinks(drug: Drug, city: City, hasPrice: boolean): Block {
  const items = [
    { label: tpl("{Drug} precio en España por dosis", { Drug: cap(drug.name) }), href: `/blog/${drug.pillarPrice}` },
    { label: tpl("Comprar {Drug} online en España", { Drug: cap(drug.name) }), href: `/blog/${drug.pillarBuy}` },
    { label: "Comparativa de GLP‑1: cuál elegir", href: `/blog/${drug.compare}` },
    { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
  ];
  if (hasPrice) {
    items.unshift({
      label: tpl("Precio de {Drug} en {City}", { Drug: cap(drug.name), City: city.name }),
      href: `/blog/precio-${drug.key}-${city.slug}`,
    });
  }
  return { type: "links", title: "Sigue informándote", items: items.slice(0, 4) };
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function priceTable(drug: Drug, city: City): Block {
  return {
    type: "table",
    caption: tpl("Precio orientativo de {Drug} por dosis en {City}", { Drug: cap(drug.name), City: city.name }),
    head: drug.key === "saxenda" ? ["Presentación", "Uso", "Precio orientativo"] : ["Dosis", "Fase", "Precio orientativo/mes"],
    rows: drug.rows,
  };
}

/* ── post "comprar {drug} en {city}" ── */
function buildBuyPost(drug: Drug, city: City, index: number, hasPrice: boolean): Post {
  const slug = `comprar-${drug.key}-${city.slug}`;
  const vars = {
    Drug: cap(drug.name),
    drug: drug.name,
    inn: drug.inn,
    City: city.name,
    BRAND,
    frequency: drug.frequency,
  };

  const intros = drug.kind === "weight" ? WEIGHT_INTROS : DIAB_INTROS;
  const intro = pick(intros, slug + "intro");

  const steps = pick(STEPS, slug + "steps").map((s) => tpl(s, vars));

  const benefitTitle =
    drug.kind === "weight"
      ? tpl(pick(BENEFIT_WEIGHT_TITLES, slug + "bt"), vars)
      : tpl(pick(BENEFIT_DIAB_TITLES, slug + "bt"), vars);
  const benefitP =
    drug.kind === "weight"
      ? tpl(pick(BENEFIT_WEIGHT_P, slug + "bp"), vars)
      : tpl(pick(BENEFIT_DIAB_P, slug + "bp"), vars);

  const mech = drug.kind === "weight" ? MECH_WEIGHT : MECH_DIAB;

  const sections: Section[] = [
    {
      h2: tpl("¿Dónde comprar {Drug} en {City}?", vars),
      blocks: [
        { type: "p", text: tpl(intro[0], vars) },
        { type: "p", text: tpl(intro[1], vars) },
        { type: "p", text: tpl(pick(LOCAL_BUY, slug + "local"), vars) },
      ],
    },
    {
      h2: tpl("¿Qué es {Drug} y cómo funciona?", vars),
      blocks: [
        { type: "p", text: tpl(pick(mech, slug + "mech"), vars) },
        { type: "p", text: tpl(pick(COMPARE_P, slug + "cmp"), vars) },
      ],
    },
    localContextSection(city, slug),
    {
      h2: tpl("Precio de {Drug} en {City} por dosis", vars),
      blocks: [priceTable(drug, city), { type: "quote", text: PRICE_NOTE }],
    },
    {
      h2: tpl("Cómo comprar {Drug} en {City} paso a paso", vars),
      blocks: [{ type: "list", items: steps }, buyLinks(drug, city, hasPrice)],
    },
    {
      h2: tpl("Efectos secundarios de {Drug}", vars),
      blocks: [
        { type: "p", text: tpl(pick(SIDE_INTRO, slug + "si"), vars) },
        { type: "list", items: SIDE_LIST.map((s) => tpl(s, vars)) },
        { type: "p", text: tpl(pick(SIDE_OUTRO, slug + "so"), vars) },
      ],
    },
    {
      h2: tpl("¿Quién puede usar {Drug}? Contraindicaciones", vars),
      blocks: [
        { type: "p", text: tpl(pick(CONTRA_P, slug + "cp"), vars) },
        { type: "list", items: CONTRA_LIST.map((s) => tpl(s, vars)) },
      ],
    },
    {
      h2: tpl("Cómo conservar y administrar {Drug}", vars),
      blocks: [{ type: "list", items: STORAGE_LIST.map((s) => tpl(s, vars)) }],
    },
    {
      h2: benefitTitle,
      blocks: [
        { type: "p", text: benefitP },
        ...(drug.kind === "weight"
          ? [{ type: "p", text: tpl(pick(RESULTS_WEIGHT, slug + "res"), vars) } as Block]
          : []),
        buyLinks(drug, city, hasPrice),
      ],
    },
  ];

  const faqs: Faq[] = [
    ...(drug.kind === "weight" ? weightFaqs(drug, city) : diabetesFaqs(drug, city)),
    localFaqs(city)[hash(slug) % 3],
  ];

  return {
    slug,
    title: tpl("Comprar {Drug} en {City}", vars),
    h1: tpl("Comprar {Drug} en {City}: precio, receta y cómo empezar", vars),
    metaTitle: tpl("Comprar {Drug} en {City}: Receta Online con Médico en 24h", vars),
    metaDescription: tpl(
      "Consigue {Drug} en {City} con una cita médica online: receta electrónica en 24h, sin listas de espera ni desplazamientos. Médicos colegiados y seguimiento real. ¡Primera consulta gratis!",
      vars,
    ),
    excerpt: tpl(
      "Guía para comprar {Drug} en {City} con receta médica: precio real por dosis, cómo conseguir la prescripción online sin desplazarte y empezar con seguimiento clínico.",
      vars,
    ),
    category: drug.category,
    keyword: `comprar ${drug.name.toLowerCase()} ${city.name.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 4),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: drug.cover,
    coverAlt: tpl("{Drug} con receta médica para tratamiento en {City}", vars),
    sections,
    faqs,
  };
}

/* ── post "precio de {drug} en {city}" ── */
function buildPricePost(drug: Drug, city: City, index: number): Post {
  const slug = `precio-${drug.key}-${city.slug}`;
  const vars = {
    Drug: cap(drug.name),
    drug: drug.name,
    inn: drug.inn,
    City: city.name,
    BRAND,
    frequency: drug.frequency,
  };
  const mech = drug.kind === "weight" ? MECH_WEIGHT : MECH_DIAB;

  const sections: Section[] = [
    {
      h2: tpl("¿Cuánto cuesta {Drug} en {City}?", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "El precio de {Drug} en las farmacias de {City} es regulado y se sitúa de forma orientativa entre {low} y {high} al mes, según la dosis. A ese coste se suma la consulta y el seguimiento médico, necesarios para una prescripción segura.",
            { ...vars, low: drug.priceLow, high: drug.priceHigh },
          ),
        },
        priceTable(drug, city),
        { type: "quote", text: PRICE_NOTE },
      ],
    },
    {
      h2: tpl("¿De qué depende el precio de {Drug}?", vars),
      blocks: [
        {
          type: "list",
          items: [
            tpl("La dosis: a medida que se escala, el precio de la pluma de {Drug} sube.", vars),
            "Si necesitas consulta y seguimiento médico (incluido en el tratamiento de DoctorLife).",
            tpl("La disponibilidad en tu farmacia de {City} y la presentación concreta.", vars),
            "Que sea para el control del peso (no financiado) o para diabetes (financiado con receta del especialista).",
          ],
        },
      ],
    },
    localContextSection(city, slug),
    {
      h2: tpl("¿Qué es {Drug} y por qué necesita receta?", vars),
      blocks: [
        { type: "p", text: tpl(pick(mech, slug + "mech"), vars) },
        { type: "p", text: tpl(pick(CONTRA_P, slug + "cp"), vars) },
      ],
    },
    {
      h2: tpl("Cómo ahorrar en el tratamiento con {Drug}", vars),
      blocks: [
        {
          type: "list",
          items: [
            "Evita las webs «sin receta»: además de ilegales, suelen vender producto falso o caducado y acabas pagando dos veces.",
            tpl("Empieza con la dosis mínima eficaz y escálala solo cuando el médico lo indique: pagar de más por dosis altas innecesarias es un error frecuente.", vars),
            "Aprovecha que en DoctorLife la primera visita es gratis.",
            tpl("Compara presentaciones y stock entre varias farmacias de {City} antes de comprar.", vars),
          ],
        },
      ],
    },
    {
      h2: tpl("Cómo conseguir {Drug} con receta en {City}", vars),
      blocks: [
        { type: "list", items: pick(STEPS, slug + "steps").map((s) => tpl(s, vars)) },
        buyLinks(drug, city, false),
      ],
    },
  ];

  const faqs: Faq[] = [
    {
      q: tpl("¿Cuánto cuesta {Drug} en {City}?", vars),
      a: tpl(
        "De forma orientativa, entre {low} y {high} al mes según la dosis. La consulta y el seguimiento médico se pagan aparte; en DoctorLife la primera visita es gratis.",
        { ...vars, low: drug.priceLow, high: drug.priceHigh },
      ),
    },
    {
      q: tpl("¿Necesito receta para comprar {Drug} en {City}?", vars),
      a: tpl("Sí, siempre. {Drug} es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.", vars),
    },
    {
      q: tpl("¿Puedo conseguir la receta de {Drug} sin desplazarme?", vars),
      a: tpl(
        "Sí. La consulta es online y, si el médico lo considera adecuado, recibes la receta electrónica para retirar {Drug} en tu farmacia de {City}.",
        vars,
      ),
    },
    {
      q: "¿La primera visita tiene algún coste?",
      a: "No, la primera visita es gratis, sin compromiso.",
    },
    localFaqs(city)[hash(slug) % 3],
  ];

  return {
    slug,
    title: tpl("Precio de {Drug} en {City}", vars),
    h1: tpl("Precio de {Drug} en {City}: cuánto cuesta y cómo conseguirlo con receta", vars),
    metaTitle: tpl("{Drug} Precio en {City} 2026 | Receta Online con Médico", vars),
    metaDescription: tpl(
      "Precio de {Drug} en {City} por dosis y cómo conseguirlo legal: cita médica online y receta electrónica sin esperas. Médicos colegiados y seguimiento incluido. ¡Primera consulta gratis!",
      vars,
    ),
    excerpt: tpl(
      "Cuánto cuesta {Drug} en {City} por dosis, de qué depende el precio y cómo conseguirlo de forma legal con receta médica y seguimiento real.",
      vars,
    ),
    category: "Precios",
    keyword: `precio ${drug.name.toLowerCase()} ${city.name.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: drug.cover,
    coverAlt: tpl("Pluma de {Drug} con etiqueta de precio en una farmacia de {City}", vars),
    sections,
    faqs,
  };
}

/* ── post "{drug} en {city}" (marca + geo, ángulo disponibilidad) ── */
const DRUGCITY_INTRO = [
  "Buscar «{drug} en {City}» suele responder a una de dos cosas: o quieres empezar el tratamiento y no sabes por dónde, o llevas tiempo intentando conseguirlo y te has topado con el desabastecimiento. En esta guía verás cómo acceder a {Drug} en {City} de forma legal, qué hacer si tu farmacia no tiene stock y cuándo conviene valorar una alternativa.",
  "Si has llegado hasta aquí escribiendo «{drug} {City}», probablemente quieras saber dónde conseguir {Drug} cerca de ti, a qué precio y qué pasa con la disponibilidad. Vamos al grano: te explicamos la situación de {Drug} en {City} y la vía más rápida y segura para empezar con receta y seguimiento.",
  "{Drug} es uno de los tratamientos más buscados en {City}, y también uno de los que más dudas genera: disponibilidad irregular en farmacias, precio, receta… En esta guía resolvemos cómo conseguir {Drug} en {City} sin caer en webs ilegales y con respaldo médico real.",
];
const DRUGCITY_STOCK = [
  "{Drug} ha sufrido episodios de desabastecimiento en toda España, y {City} no es una excepción: es habitual que una farmacia no tenga la dosis concreta y sí otra. La buena noticia es que la receta electrónica es válida en cualquier farmacia, así que puedes consultar el stock en varias de {City} sin perder la prescripción.",
  "La disponibilidad de {Drug} en las farmacias de {City} varía según la dosis y el momento. Ante la falta de stock puntual, lo eficaz es preguntar en distintas farmacias de la ciudad o esperar reposición; nunca recurrir a webs que lo venden «sin receta», porque suelen ser falsificaciones.",
  "En {City}, como en el resto del país, {Drug} puede faltar puntualmente en algunas farmacias. Con la receta electrónica puedes recorrer varias farmacias de {City} hasta localizar tu dosis, y tu médico puede ajustar la pauta o proponer una alternativa equivalente si el desabastecimiento se alarga.",
];

function buildDrugCityPost(drug: Drug, city: City, index: number): Post {
  const slug = `${drug.key}-${city.slug}`;
  const vars = {
    Drug: cap(drug.name),
    drug: drug.name,
    inn: drug.inn,
    City: city.name,
    BRAND,
    frequency: drug.frequency,
  };
  const mech = drug.kind === "weight" ? MECH_WEIGHT : MECH_DIAB;
  const steps = pick(STEPS, slug + "steps").map((s) => tpl(s, vars));

  const sections: Section[] = [
    {
      h2: tpl("{Drug} en {City}: cómo conseguirlo", vars),
      blocks: [
        { type: "p", text: tpl(pick(DRUGCITY_INTRO, slug + "intro"), vars) },
        { type: "p", text: tpl(pick(LOCAL_BUY, slug + "local"), vars) },
      ],
    },
    localContextSection(city, slug),
    {
      h2: tpl("Disponibilidad de {Drug} en las farmacias de {City}", vars),
      blocks: [
        { type: "p", text: tpl(pick(DRUGCITY_STOCK, slug + "stock"), vars) },
      ],
    },
    {
      h2: tpl("¿Qué es {Drug} y cómo actúa?", vars),
      blocks: [
        { type: "p", text: tpl(pick(mech, slug + "mech"), vars) },
        { type: "p", text: tpl(pick(COMPARE_P, slug + "cmp"), vars) },
      ],
    },
    {
      h2: tpl("Precio de {Drug} en {City}", vars),
      blocks: [priceTable(drug, city), { type: "quote", text: PRICE_NOTE }],
    },
    {
      h2: tpl("Cómo empezar con {Drug} en {City} paso a paso", vars),
      blocks: [{ type: "list", items: steps }, buyLinks(drug, city, true)],
    },
  ];

  const faqs: Faq[] = [
    {
      q: tpl("¿Hay {Drug} disponible en {City}?", vars),
      a: tpl(
        "La disponibilidad varía por dosis y farmacia. Con la receta electrónica puedes consultar el stock en varias farmacias de {City}; si falta tu dosis, el médico puede ajustar la pauta o proponer una alternativa.",
        vars,
      ),
    },
    {
      q: tpl("¿Puedo conseguir {Drug} en {City} sin desplazarme al médico?", vars),
      a: tpl(
        "Sí. En DoctorLife la valoración es online y, si {Drug} está indicado, recibes la receta electrónica para retirarlo en tu farmacia de {City}.",
        vars,
      ),
    },
    {
      q: tpl("¿Es legal comprar {Drug} por internet en {City}?", vars),
      a: tpl(
        "Solo con receta y a través de farmacia. Las webs que venden {Drug} «sin receta» son ilegales y suelen vender producto falsificado.",
        vars,
      ),
    },
    localFaqs(city)[hash(slug) % 3],
  ];

  return {
    slug,
    title: tpl("{Drug} en {City}", vars),
    h1: tpl("{Drug} en {City}: dónde conseguirlo, precio y disponibilidad", vars),
    metaTitle: tpl("{Drug} en {City} | Cita y Receta Online sin Esperas", vars),
    metaDescription: tpl(
      "{Drug} en {City}: consíguelo con receta a través de una cita médica online, sin listas de espera. Precio por dosis, disponibilidad y seguimiento real. ¡Primera consulta gratis!",
      vars,
    ),
    excerpt: tpl(
      "Todo sobre {Drug} en {City}: dónde conseguirlo de forma legal, precio orientativo, disponibilidad en farmacias y cómo empezar con receta y seguimiento médico.",
      vars,
    ),
    category: drug.category,
    keyword: `${drug.name.toLowerCase()} ${city.name.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 4),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: drug.cover,
    coverAlt: tpl("Pluma de {Drug} disponible en una farmacia de {City}", vars),
    sections,
    faqs,
  };
}

/* ── cluster "receta {drug} online {city}" (alta intención: conseguir la receta) ── */
const RXCITY_INTRO = [
  "Para conseguir la receta de {Drug} ({inn}) en {City} no necesitas esperar semanas a una cita presencial: la consulta médica online de {BRAND} permite que un médico colegiado valore tu caso el mismo día y, si el tratamiento está indicado, emita la receta electrónica válida en cualquier farmacia de {City}.",
  "¿Buscas receta de {Drug} online en {City}? El proceso es más sencillo de lo que parece: una videoconsulta con un médico colegiado, una valoración clínica seria (historial, medicación actual, objetivos) y, si procede, la receta electrónica de {Drug} lista para usar en tu farmacia de {City}.",
  "La receta de {Drug} ({inn}) es obligatoria en España, también en {City}. La buena noticia: no hace falta lista de espera. Con {BRAND} la valoración médica se hace online, el médico revisa si {Drug} encaja en tu caso y emite la receta electrónica en el momento si es adecuado.",
  "En {City} puedes conseguir la receta de {Drug} sin desplazamientos: la consulta online de {BRAND} conecta con médicos colegiados que valoran tu caso, resuelven tus dudas sobre {inn} y, si está indicado, prescriben con receta electrónica que funciona en todas las farmacias de {City}.",
];
const RXCITY_REQUIREMENTS = [
  "El médico valorará tu IMC, historial clínico, medicación actual y objetivos. {Drug} no se prescribe a cualquier persona: hay criterios clínicos claros y contraindicaciones (embarazo, antecedentes de pancreatitis, ciertos problemas tiroideos) que el médico revisa contigo antes de emitir la receta.",
  "No todas las personas son candidatas a {Drug}. En la consulta se revisan criterios como el IMC, las comorbilidades (hipertensión, prediabetes, apnea del sueño), la medicación actual y las contraindicaciones. Si {Drug} no procede, el médico te propondrá la alternativa adecuada.",
  "Para prescribir {Drug} el médico necesita una foto clínica completa: peso y altura, enfermedades previas, medicación habitual y objetivos realistas. La consulta online de {BRAND} recoge todo esto de forma estructurada para que la decisión sea segura.",
];
const RXCITY_VALIDITY = [
  "La receta electrónica emitida online es válida en cualquier farmacia de {City} y del resto de España: funciona igual que la de tu centro de salud. Solo tienes que dar tu DNI o el código de la receta en el mostrador.",
  "Una vez emitida, la receta electrónica de {Drug} se puede usar en la farmacia que prefieras de {City}. Si tu farmacia no tiene stock de tu dosis, puede pedirla o puedes retirarla en otra; la receta no caduca por cambiar de establecimiento.",
  "La receta electrónica privada es plenamente legal y funciona en todas las farmacias de {City}. La diferencia con la pública es quién financia el medicamento: los GLP‑1 para pérdida de peso no los cubre la Seguridad Social, por lo que el precio de farmacia es el mismo por ambas vías.",
];
function buildRxCityPost(drug: Drug, city: City, index: number): Post {
  const slug = `receta-${drug.key}-online-${city.slug}`;
  const vars = {
    Drug: cap(drug.name),
    drug: drug.name,
    inn: drug.inn,
    City: city.name,
    BRAND,
    frequency: drug.frequency,
  };
  const mech = drug.kind === "weight" ? MECH_WEIGHT : MECH_DIAB;
  const steps = pick(STEPS, slug + "steps").map((s) => tpl(s, vars));

  const sections: Section[] = [
    {
      h2: tpl("Receta de {Drug} online en {City}: cómo funciona", vars),
      blocks: [
        { type: "p", text: tpl(pick(RXCITY_INTRO, slug + "intro"), vars) },
        { type: "p", text: tpl(pick(RXCITY_VALIDITY, slug + "valid"), vars) },
      ],
    },
    localContextSection(city, slug),
    {
      h2: tpl("Requisitos para que te receten {Drug}", vars),
      blocks: [
        { type: "p", text: tpl(pick(RXCITY_REQUIREMENTS, slug + "req"), vars) },
        { type: "p", text: tpl(pick(mech, slug + "mech"), vars) },
      ],
    },
    {
      h2: tpl("Cuánto cuesta {Drug} con receta en {City}", vars),
      blocks: [priceTable(drug, city), { type: "quote", text: PRICE_NOTE }],
    },
    {
      h2: tpl("Conseguir la receta de {Drug} en {City} paso a paso", vars),
      blocks: [{ type: "list", items: steps }, buyLinks(drug, city, true)],
    },
  ];

  const faqs: Faq[] = [
    {
      q: tpl("¿Es legal conseguir la receta de {Drug} online en {City}?", vars),
      a: tpl(
        "Sí, siempre que la emita un médico colegiado tras una valoración real. La receta electrónica privada es válida en todas las farmacias de {City}. Lo ilegal es comprar {Drug} sin receta en webs que no exigen consulta médica.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuánto tarda la receta de {Drug} online?", vars),
      a: tpl(
        "Con {BRAND}, la valoración médica puede hacerse el mismo día. Si el médico considera indicado {Drug}, la receta electrónica se emite en la misma consulta y puedes retirar el medicamento en tu farmacia de {City} de inmediato.",
        vars,
      ),
    },
    {
      q: tpl("¿Me pueden negar la receta de {Drug}?", vars),
      a: tpl(
        "Sí. Si el médico detecta contraindicaciones o considera que {Drug} no es adecuado para tu caso, no lo prescribirá y te propondrá alternativas. Es la garantía de que el tratamiento es seguro.",
        vars,
      ),
    },
    localFaqs(city)[hash(slug) % 3],
  ];

  return {
    slug,
    title: tpl("Receta de {Drug} online en {City}", vars),
    h1: tpl("Receta de {Drug} online en {City}: requisitos, precio y pasos", vars),
    metaTitle: tpl("Receta {Drug} Online en {City} | Médico Colegiado Hoy", vars),
    metaDescription: tpl(
      "Consigue la receta de {Drug} online en {City} con valoración de un médico colegiado, hoy mismo y sin listas de espera. Receta electrónica válida en tu farmacia. ¡Primera consulta gratis!",
      vars,
    ),
    excerpt: tpl(
      "Cómo conseguir la receta de {Drug} online en {City}: requisitos clínicos, validez de la receta electrónica, precio en farmacia y pasos para empezar hoy con valoración médica.",
      vars,
    ),
    category: drug.category,
    keyword: `receta ${drug.name.toLowerCase()} online ${city.name.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 4),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: drug.cover,
    coverAlt: tpl("Receta electrónica de {Drug} emitida online en {City}", vars),
    sections,
    faqs,
  };
}

/* ── FAQs ── */
function weightFaqs(drug: Drug, city: City): Faq[] {
  const vars = { Drug: cap(drug.name), drug: drug.name, inn: drug.inn, City: city.name, BRAND };
  return [
    {
      q: tpl("¿Puedo comprar {Drug} sin receta en {City}?", vars),
      a: tpl(
        "No. {Drug} requiere receta médica. La vía legal es la consulta médica, la receta si procede y la retirada en farmacia. Comprarlo «sin receta» por internet es ilegal y arriesgado.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuánto cuesta {Drug} en {City}?", vars),
      a: tpl(
        "La pluma se sitúa de forma orientativa entre {low} y {high} al mes según la dosis. La consulta y el seguimiento se pagan aparte; en DoctorLife la primera visita es gratis.",
        { ...vars, low: drug.priceLow, high: drug.priceHigh },
      ),
    },
    {
      q: tpl("¿Puedo hacerlo todo online desde {City}?", vars),
      a: tpl(
        "Sí. La consulta y la receta electrónica se gestionan online; solo tienes que retirar {Drug} en tu farmacia de {City}.",
        vars,
      ),
    },
    {
      q: tpl("¿Es seguro tomar {Drug}?", vars),
      a: tpl(
        "Sí, bajo supervisión médica y con la dosis ajustada de forma progresiva. Los efectos secundarios habituales (náuseas, digestiones lentas) suelen ser leves y temporales.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuánto se tarda en ver resultados con {Drug}?", vars),
      a: tpl(
        "El efecto sobre el apetito suele notarse en pocas semanas, pero la pérdida de peso es progresiva y se prolonga durante meses. Depende de tu punto de partida, la dosis y tus hábitos; por eso el seguimiento médico es clave.",
        vars,
      ),
    },
    {
      q: tpl("¿Qué efectos secundarios tiene {Drug}?", vars),
      a: tpl(
        "Los más frecuentes son digestivos (náuseas, digestiones lentas, estreñimiento o diarrea), sobre todo al inicio y tras subir de dosis. Suelen ser leves y temporales, y un escalado lento ayuda a minimizarlos.",
        vars,
      ),
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: tpl(
        "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe {Drug} con seguimiento desde la app.",
        vars,
      ),
    },
  ];
}
function diabetesFaqs(drug: Drug, city: City): Faq[] {
  const vars = { Drug: cap(drug.name), drug: drug.name, inn: drug.inn, City: city.name, BRAND };
  return [
    {
      q: tpl("¿Puedo usar {Drug} para adelgazar en {City}?", vars),
      a: tpl(
        "{Drug} está indicado para la diabetes tipo 2. Si tu objetivo es perder peso, el médico suele recomendar Wegovy o Mounjaro, aprobados para el control del peso.",
        vars,
      ),
    },
    {
      q: tpl("¿Necesito receta para comprar {Drug} en {City}?", vars),
      a: tpl("Sí, siempre. {Drug} es un medicamento de prescripción y comprarlo sin receta es ilegal y peligroso.", vars),
    },
    {
      q: tpl("¿Cuánto cuesta {Drug} en {City}?", vars),
      a: tpl(
        "La pluma se sitúa de forma orientativa entre {low} y {high} según la dosis. La consulta y el seguimiento se pagan aparte.",
        { ...vars, low: drug.priceLow, high: drug.priceHigh },
      ),
    },
    {
      q: tpl("¿Qué efectos secundarios tiene {Drug}?", vars),
      a: tpl(
        "Los más habituales son digestivos (náuseas, digestiones lentas, diarrea o estreñimiento), sobre todo al inicio. Suelen ser leves y mejoran con el tiempo y un escalado de dosis progresivo bajo control médico.",
        vars,
      ),
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado.",
    },
  ];
}

/* ═══════════════════════════════════════════════════════════
   CLUSTER "EN INVESTIGACIÓN" + "SIN RECETA"
   Capta el tráfico de fármacos NO aprobados (retatrutide, CagriSema,
   orforglipron, survodutida) y de búsquedas "sin receta / péptidos /
   compuesta", de forma 100% legal: informa con honestidad, advierte de
   los peligros de comprar productos ilegales y redirige a las
   alternativas que un médico SÍ puede recetar hoy (funnel a DoctorLife).
   ═══════════════════════════════════════════════════════════ */

const CAT_RESEARCH = "En investigación";
const CAT_NORX = "Sin receta";

/* Peligros comunes del mercado gris (se reutilizan en ambos clusters). */
const GRAY_DANGERS = [
  "No hay ninguna garantía de que el producto sea auténtico: las falsificaciones de fármacos GLP‑1 son cada vez más frecuentes.",
  "Sin control de dosis, pureza ni conservación: la cadena de frío puede romperse y el producto degradarse.",
  "Nadie valora tus contraindicaciones, tu historial ni tu medicación habitual antes de usarlo.",
  "Sin seguimiento médico, los efectos adversos pueden agravarse sin que nadie los detecte a tiempo.",
  "Comprar un medicamento de prescripción sin receta es ilegal en España y puede acarrear sanciones.",
];

const LEGAL_REDIRECT = [
  "La buena noticia es que sí existen tratamientos GLP‑1 aprobados, seguros y disponibles hoy en España. Un endocrino puede valorar tu caso y, si procede, prescribirte una alternativa con receta y seguimiento real.",
  "En lugar de arriesgarte con productos ilegales, lo sensato es hablar con un médico: hay opciones aprobadas por la EMA y la AEMPS que pueden ajustarse a tu objetivo, con receta electrónica y control profesional.",
  "Mientras tanto, lo que un médico SÍ puede ofrecerte hoy es un tratamiento aprobado con acompañamiento clínico: valoración, receta si es adecuada y seguimiento continuo para que sea seguro y eficaz.",
];

const APPROVAL_EXPLAIN = [
  "En Europa, un medicamento solo llega a la farmacia tras ser autorizado por la Agencia Europea del Medicamento (EMA) y, en España, por la Agencia Española de Medicamentos y Productos Sanitarios (AEMPS). Ese proceso exige completar los ensayos de fase III y demostrar eficacia y seguridad.",
  "El camino hasta la farmacia pasa por la aprobación de la EMA y la AEMPS, que revisan los datos de los ensayos clínicos antes de permitir su comercialización. Hasta que eso ocurra, el fármaco solo está disponible dentro de estudios clínicos controlados.",
];

/* ── fármacos en investigación ── */
type Research = {
  key: string;
  name: string; // minúscula para texto inline: "retatrutide"
  Name: string; // capitalizado: "Retatrutide"
  maker: string;
  klass: string;
  route: string;
  altKey: string; // alternativa legal a la que redirigir
  resultsP: string;
};

const INVESTIGATIONAL: Research[] = [
  {
    key: "retatrutide",
    name: "retatrutide",
    Name: "Retatrutide",
    maker: "Eli Lilly",
    klass: "triple agonista de los receptores GLP‑1, GIP y glucagón",
    route: "una inyección subcutánea semanal",
    altKey: "mounjaro",
    resultsP:
      "En ensayos clínicos de fase II, las personas con obesidad tratadas con las dosis más altas de retatrutide alcanzaron reducciones de peso medias muy notables a lo largo de casi un año, de las mayores observadas hasta la fecha con un fármaco de este tipo. Aun así, son datos preliminares: los ensayos de fase III deben confirmar su eficacia y seguridad reales.",
  },
  {
    key: "cagrisema",
    name: "CagriSema",
    Name: "CagriSema",
    maker: "Novo Nordisk",
    klass: "combinación de cagrilintida (un análogo de la amilina) y semaglutida",
    route: "una inyección subcutánea semanal",
    altKey: "wegovy",
    resultsP:
      "CagriSema combina dos mecanismos complementarios para el control del apetito y, en los estudios, ha mostrado reducciones de peso destacadas. Los resultados definitivos dependen de los ensayos de fase III que la compañía tiene en marcha.",
  },
  {
    key: "orforglipron",
    name: "orforglipron",
    Name: "Orforglipron",
    maker: "Eli Lilly",
    klass: "agonista del receptor de GLP‑1 en pastilla (una molécula pequeña de administración oral)",
    route: "una pastilla diaria por vía oral",
    altKey: "mounjaro",
    resultsP:
      "Al ser una pastilla y no una inyección, orforglipron podría facilitar el acceso al tratamiento en el futuro. En los estudios iniciales ha mostrado pérdidas de peso relevantes, pendientes de confirmar en los ensayos de fase III.",
  },
  {
    key: "survodutida",
    name: "survodutida",
    Name: "Survodutida",
    maker: "Boehringer Ingelheim y Zealand Pharma",
    klass: "doble agonista de los receptores GLP‑1 y glucagón",
    route: "una inyección subcutánea semanal",
    altKey: "wegovy",
    resultsP:
      "Survodutida ha mostrado resultados prometedores tanto en obesidad como en hígado graso (MASH) en estudios iniciales. Habrá que esperar a los datos de fase III para conocer su alcance real.",
  },
];

function getAlt(key: string): Drug {
  return DRUGS.find((d) => d.key === key) as Drug;
}

function researchLinks(drug: Research): Block {
  const alt = getAlt(drug.altKey);
  return {
    type: "links",
    title: "Alternativas disponibles hoy",
    items: [
      { label: tpl("Comprar {Alt} online en España", { Alt: cap(alt.name) }), href: `/blog/${alt.pillarBuy}` },
      { label: tpl("{Alt} precio en España por dosis", { Alt: cap(alt.name) }), href: `/blog/${alt.pillarPrice}` },
      { label: "Nuevos GLP‑1 en investigación", href: "/blog/glp1-en-investigacion" },
      { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
    ],
  };
}

type Intent = "que-es" | "comprar" | "precio" | "cuando" | "vs" | "efectos";
const INTENTS: Intent[] = ["que-es", "comprar", "precio", "cuando", "vs", "efectos"];

function researchSlug(drug: Research, intent: Intent): string {
  switch (intent) {
    case "que-es":
      return `que-es-${drug.key.toLowerCase()}`;
    case "comprar":
      return `comprar-${drug.key.toLowerCase()}-espana`;
    case "precio":
      return `${drug.key.toLowerCase()}-precio-espana`;
    case "cuando":
      return `cuando-sale-${drug.key.toLowerCase()}-espana`;
    case "vs":
      return `${drug.key.toLowerCase()}-vs-${drug.altKey}`;
    case "efectos":
      return `efectos-secundarios-${drug.key.toLowerCase()}`;
  }
}

function buildResearchPost(drug: Research, intent: Intent, index: number): Post {
  const alt = getAlt(drug.altKey);
  const slug = researchSlug(drug, intent);
  const vars = {
    Name: drug.Name,
    name: drug.name,
    maker: drug.maker,
    klass: drug.klass,
    route: drug.route,
    Alt: cap(alt.name),
    alt: alt.name,
    altInn: alt.inn,
    BRAND,
  };

  const dangers = { type: "list" as const, items: GRAY_DANGERS };
  const redirectP = { type: "p" as const, text: tpl(pick(LEGAL_REDIRECT, slug + "rd"), vars) };
  const links = researchLinks(drug);

  const whatIs: Section = {
    h2: tpl("¿Qué es {Name}?", vars),
    blocks: [
      {
        type: "p",
        text: tpl(
          "{Name} es un fármaco en investigación desarrollado por {maker}. Se trata de un {klass} que se administra mediante {route} y que se está estudiando para el control del peso y de la diabetes tipo 2.",
          vars,
        ),
      },
      {
        type: "p",
        text: tpl(
          "Pertenece a la nueva generación de tratamientos basados en hormonas intestinales —la misma familia que Wegovy, Mounjaro u Ozempic— pero todavía no ha completado todo el proceso de aprobación, por lo que aún no está disponible en las farmacias españolas.",
          vars,
        ),
      },
    ],
  };

  const notApproved: Section = {
    h2: tpl("¿Está aprobada {Name} en España?", vars),
    blocks: [
      {
        type: "p",
        text: tpl(
          "No. A día de hoy {Name} NO está aprobada por la EMA ni por la AEMPS y no se vende legalmente en España, ni en farmacias ni por internet. Solo está disponible dentro de ensayos clínicos.",
          vars,
        ),
      },
      { type: "p", text: tpl(pick(APPROVAL_EXPLAIN, slug + "ap"), vars) },
      {
        type: "quote",
        text: tpl(
          "Cualquier web que diga venderte {Name} en España está operando fuera de la ley: el producto no tiene garantías y puede ser peligroso para tu salud.",
          vars,
        ),
      },
    ],
  };

  const resultsSec: Section = {
    h2: tpl("{Name} y la pérdida de peso: qué dicen los estudios", vars),
    blocks: [{ type: "p", text: drug.resultsP }],
  };

  const alternativeSec: Section = {
    h2: tpl("Mientras llega {Name}: alternativas aprobadas", vars),
    blocks: [
      redirectP,
      {
        type: "p",
        text: tpl(
          "Por ejemplo, {Alt} ({altInn}) es una opción aprobada y disponible con receta. En DoctorLife, un endocrino colegiado valora tu caso y, si es adecuado, te prescribe el tratamiento con seguimiento desde la app.",
          vars,
        ),
      },
      links,
    ],
  };

  let sections: Section[];
  let h1: string;
  let title: string;
  let metaTitle: string;
  let metaDescription: string;
  let keyword: string;
  let excerpt: string;

  switch (intent) {
    case "que-es":
      h1 = tpl("Qué es {Name} y para qué sirve", vars);
      title = tpl("Qué es {Name}", vars);
      keyword = tpl("qué es {name}", vars);
      metaTitle = tpl("Qué es {Name}: para qué sirve y si está disponible | {BRAND}", vars);
      metaDescription = tpl(
        "{Name}: qué es, cómo funciona, qué dicen los estudios y por qué aún no está disponible en España. Alternativas aprobadas con receta y seguimiento médico.",
        vars,
      );
      excerpt = tpl(
        "Todo lo que se sabe sobre {Name}: qué es, cómo actúa y, sobre todo, qué alternativas aprobadas puedes usar hoy mientras llega.",
        vars,
      );
      sections = [whatIs, resultsSec, notApproved, alternativeSec];
      break;

    case "comprar":
      h1 = tpl("Comprar {Name} en España: ¿es posible?", vars);
      title = tpl("Comprar {Name} en España", vars);
      keyword = tpl("comprar {name}", vars);
      metaTitle = tpl("Comprar {Name} en España: por qué no puedes (y qué hacer) | {BRAND}", vars);
      metaDescription = tpl(
        "¿Se puede comprar {Name} en España? No, no está aprobada. Te explicamos los riesgos de comprarla online y las alternativas legales con receta médica.",
        vars,
      );
      excerpt = tpl(
        "¿Se puede comprar {Name} en España? Te contamos la verdad sin rodeos y qué tratamientos aprobados puedes empezar hoy de forma segura.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Se puede comprar {Name} en España?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "No. {Name} es un fármaco en investigación de {maker} que aún no ha sido aprobado por la EMA ni la AEMPS, así que no se vende legalmente en España. No la encontrarás en ninguna farmacia y cualquier oferta online es ilegal.",
                vars,
              ),
            },
            { type: "p", text: tpl(pick(APPROVAL_EXPLAIN, slug + "ap"), vars) },
          ],
        },
        {
          h2: tpl("Por qué NO debes comprar {Name} por internet", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Las webs que dicen vender {Name} suelen mover producto del mercado gris, sin ningún control sanitario. Los riesgos son serios:",
                vars,
              ),
            },
            dangers,
          ],
        },
        alternativeSec,
        {
          h2: "Cómo empezar un tratamiento legal y seguro",
          blocks: [
            {
              type: "list",
              items: [
                "Reserva una primera visita online con un médico colegiado (gratis en DoctorLife).",
                "El endocrino valora tu caso, tu historial y tus objetivos.",
                "Si es adecuado, te prescribe un GLP‑1 aprobado con receta electrónica.",
                "Sigues tu evolución y ajustas la dosis desde la app, con tu equipo médico.",
              ],
            },
            links,
          ],
        },
      ];
      break;

    case "precio":
      h1 = tpl("{Name} precio en España: lo que debes saber", vars);
      title = tpl("Precio de {Name} en España", vars);
      keyword = tpl("{name} precio", vars);
      metaTitle = tpl("{Name} precio en España: por qué no hay precio oficial | {BRAND}", vars);
      metaDescription = tpl(
        "¿Cuánto cuesta {Name} en España? Al no estar aprobada, no tiene precio oficial. Cuidado con los precios que ves online y descubre alternativas legales.",
        vars,
      );
      excerpt = tpl(
        "¿Cuánto costará {Name} en España? Aclaramos por qué todavía no tiene precio oficial y cuánto cuestan las alternativas que sí puedes usar.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Cuánto cuesta {Name} en España?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Hoy {Name} no tiene un precio oficial en España, sencillamente porque no está aprobada ni a la venta. Cualquier cifra que aparezca en webs o foros es especulación o, peor, una oferta del mercado ilegal.",
                vars,
              ),
            },
            { type: "p", text: tpl(pick(APPROVAL_EXPLAIN, slug + "ap"), vars) },
          ],
        },
        {
          h2: tpl("Cuidado con los «precios» de {Name} que ves online", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Si ves {Name} «a la venta» con un precio, desconfía: es producto sin garantías. Comprarlo no solo es ilegal, sino que puede salirte muy caro en términos de salud:",
                vars,
              ),
            },
            dangers,
          ],
        },
        {
          h2: "Precios reales de los GLP‑1 que SÍ puedes usar",
          blocks: [
            {
              type: "p",
              text: tpl(
                "En lugar de arriesgarte, estos son los tratamientos aprobados y sus precios orientativos. Por ejemplo, {Alt}:",
                vars,
              ),
            },
            priceTable(alt, { name: "España", slug: "espana" }),
            { type: "quote", text: PRICE_NOTE },
            links,
          ],
        },
      ];
      break;

    case "cuando":
      h1 = tpl("¿Cuándo sale {Name} en España?", vars);
      title = tpl("Cuándo sale {Name} en España", vars);
      keyword = tpl("cuándo sale {name}", vars);
      metaTitle = tpl("¿Cuándo sale {Name} en España? Aprobación y fechas | {BRAND}", vars);
      metaDescription = tpl(
        "¿Cuándo se aprobará {Name} en España? Te explicamos en qué fase está, cómo es el proceso de la EMA y la AEMPS y qué puedes hacer mientras tanto.",
        vars,
      );
      excerpt = tpl(
        "¿Cuándo llegará {Name} a España? Repasamos en qué fase está su aprobación y qué alternativas tienes disponibles ahora mismo.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Cuándo se aprobará {Name}?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "{Name}, de {maker}, se encuentra en fase de ensayos clínicos avanzados. No hay una fecha confirmada de comercialización en España y, de forma realista, no se espera disponible a corto plazo: dependerá de los resultados de los estudios y del visto bueno de las agencias reguladoras.",
                vars,
              ),
            },
            {
              type: "p",
              text: "Conviene ser prudente con las fechas que circulan por internet: hasta que la EMA y la AEMPS no emitan su decisión, cualquier calendario es una estimación.",
            },
          ],
        },
        {
          h2: "El proceso de aprobación en Europa y España",
          blocks: [
            { type: "p", text: tpl(pick(APPROVAL_EXPLAIN, slug + "ap"), vars) },
            {
              type: "list",
              items: [
                "Ensayos de fase III: se confirma eficacia y seguridad en miles de pacientes.",
                "Revisión de la EMA: evalúa todos los datos y emite una opinión.",
                "Autorización europea y, después, decisión de precio y financiación en España (AEMPS).",
                "Llegada a farmacias con receta médica.",
              ],
            },
          ],
        },
        alternativeSec,
      ];
      break;

    case "vs":
      h1 = tpl("{Name} vs {Alt}: diferencias y cuál puedes usar", vars);
      title = tpl("{Name} vs {Alt}", vars);
      keyword = tpl("{name} vs {alt}", vars);
      metaTitle = tpl("{Name} vs {Alt}: diferencias, eficacia y disponibilidad | {BRAND}", vars);
      metaDescription = tpl(
        "Comparativa entre {Name} y {Alt}: clase, vía, eficacia y, sobre todo, disponibilidad. Descubre cuál puedes usar hoy con receta médica en España.",
        vars,
      );
      excerpt = tpl(
        "{Name} frente a {Alt}: en qué se parecen, en qué se diferencian y cuál puedes empezar realmente hoy en España.",
        vars,
      );
      sections = [
        {
          h2: tpl("{Name} vs {Alt}: ¿en qué se diferencian?", vars),
          blocks: [
            {
              type: "table",
              caption: tpl("Comparativa de {Name} y {Alt}", vars),
              head: ["", drug.Name, cap(alt.name)],
              rows: [
                ["Estado regulatorio", "En investigación", "Aprobado (EMA/AEMPS)"],
                ["Disponible en España", "No", "Sí, con receta"],
                ["Clase", drug.klass, alt.inn],
                ["Administración", drug.route, alt.frequency],
              ],
            },
          ],
        },
        { ...resultsSec },
        {
          h2: "Disponibilidad: la diferencia que más importa",
          blocks: [
            {
              type: "p",
              text: tpl(
                "Por muy prometedora que sea {Name}, hoy no puedes conseguirla legalmente. {Alt}, en cambio, está aprobada y disponible con receta, así que es la opción realista si quieres empezar ya.",
                vars,
              ),
            },
            redirectP,
            links,
          ],
        },
      ];
      break;

    case "efectos":
      h1 = tpl("Efectos secundarios de {Name}", vars);
      title = tpl("Efectos secundarios de {Name}", vars);
      keyword = tpl("efectos secundarios {name}", vars);
      metaTitle = tpl("Efectos secundarios de {Name} según los estudios | {BRAND}", vars);
      metaDescription = tpl(
        "¿Qué efectos secundarios tiene {Name}? Resumen de lo observado en los ensayos y por qué el control médico es clave. Alternativas aprobadas con seguimiento.",
        vars,
      );
      excerpt = tpl(
        "Qué se sabe de los efectos secundarios de {Name} según los estudios y por qué cualquier GLP‑1 debe usarse siempre bajo control médico.",
        vars,
      );
      sections = [
        {
          h2: tpl("Efectos secundarios de {Name} según los estudios", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Como el resto de fármacos de su familia, en los ensayos {Name} ha mostrado sobre todo efectos digestivos, especialmente al inicio y al subir la dosis. Los más frecuentes son:",
                vars,
              ),
            },
            { type: "list", items: SIDE_LIST.map((s) => tpl(s, { ...vars, Drug: drug.Name })) },
            {
              type: "p",
              text: "Al tratarse de un fármaco en investigación, su perfil de seguridad completo todavía se está estudiando en los ensayos de fase III.",
            },
          ],
        },
        {
          h2: "Por qué el control médico es imprescindible",
          blocks: [
            {
              type: "p",
              text: "Ningún GLP‑1 debería usarse por libre. El escalado de dosis, la detección precoz de efectos adversos y la valoración de contraindicaciones requieren un profesional. Por eso comprar estos fármacos sin receta es tan arriesgado.",
            },
            { type: "list", items: CONTRA_LIST.map((s) => tpl(s, { ...vars, Drug: drug.Name })) },
          ],
        },
        alternativeSec,
      ];
      break;
  }

  return {
    slug,
    title,
    h1,
    metaTitle,
    metaDescription,
    excerpt,
    category: CAT_RESEARCH,
    keyword,
    readMins: 7,
    date: isoDate(index),
    updated: isoDate(index + 200),
    cover: alt.cover,
    coverAlt: tpl("{Name}, fármaco GLP‑1 en investigación", vars),
    sections,
    faqs: researchFaqs(drug, intent),
  };
}

function researchFaqs(drug: Research, intent: Intent): Faq[] {
  const alt = getAlt(drug.altKey);
  const vars = { Name: drug.Name, name: drug.name, Alt: cap(alt.name), maker: drug.maker };
  return [
    {
      q: tpl("¿Se puede comprar {Name} en España?", vars),
      a: tpl(
        "No. {Name} no está aprobada por la EMA ni la AEMPS y no se vende legalmente en España. Comprarla por internet es ilegal y peligroso.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuándo estará disponible {Name}?", vars),
      a: tpl(
        "Está en investigación y no hay fecha confirmada. Dependerá de los resultados de los ensayos de fase III y de la aprobación de las agencias reguladoras.",
        vars,
      ),
    },
    {
      q: tpl("¿Qu���� alternativa a {Name} puedo usar ahora?", vars),
      a: tpl(
        "Hay GLP‑1 aprobados como {Alt}. Un endocrino puede valorar tu caso y, si procede, prescribírtelo con receta y seguimiento.",
        vars,
      ),
    },
    {
      q: tpl("¿Es segura {Name}?", vars),
      a: tpl(
        "Su perfil de seguridad todavía se está estudiando. Por eso solo se administra dentro de ensayos clínicos controlados y no debe comprarse por internet.",
        vars,
      ),
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe un tratamiento aprobado con seguimiento desde la app.",
    },
  ];
}

/* ���─ cluster "sin receta" ── */
type NoRx = { key: string; Name: string; name: string; inn: string; altKey: string };
const NORX: NoRx[] = [
  { key: "wegovy", Name: "Wegovy", name: "Wegovy", inn: "semaglutida 2,4 mg", altKey: "wegovy" },
  { key: "mounjaro", Name: "Mounjaro", name: "Mounjaro", inn: "tirzepatida", altKey: "mounjaro" },
  { key: "ozempic", Name: "Ozempic", name: "Ozempic", inn: "semaglutida", altKey: "ozempic" },
  { key: "semaglutida", Name: "Semaglutida", name: "semaglutida", inn: "semaglutida", altKey: "wegovy" },
  { key: "tirzepatida", Name: "Tirzepatida", name: "tirzepatida", inn: "tirzepatida", altKey: "mounjaro" },
];

function norxLinks(alt: Drug): Block {
  return {
    type: "links",
    title: "Hazlo de forma legal",
    items: [
      { label: tpl("Comprar {Alt} online en España", { Alt: cap(alt.name) }), href: `/blog/${alt.pillarBuy}` },
      { label: tpl("{Alt} precio en España por dosis", { Alt: cap(alt.name) }), href: `/blog/${alt.pillarPrice}` },
      { label: "Comprar GLP‑1 sin receta: la verdad", href: "/blog/comprar-glp1-sin-receta" },
      { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
    ],
  };
}

function buildNoRxPost(d: NoRx, index: number): Post {
  const alt = getAlt(d.altKey);
  const slug = `comprar-${d.key}-sin-receta`;
  const vars = { Name: d.Name, name: d.name, inn: d.inn, Alt: cap(alt.name), alt: alt.name, BRAND };

  const sections: Section[] = [
    {
      h2: tpl("¿Se puede comprar {Name} sin receta en España?", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "No. {Name} ({inn}) es un medicamento de prescripción: por ley solo puede dispensarse en farmacias y con receta médica. Cualquier web que ofrezca {Name} «sin receta» está actuando de forma ilegal.",
            vars,
          ),
        },
        {
          type: "p",
          text: tpl(
            "Que pidan o no receta es, de hecho, la señal más clara para distinguir una farmacia legal de una estafa. Un canal serio SIEMPRE exige prescripción de {Name}.",
            vars,
          ),
        },
      ],
    },
    {
      h2: tpl("Los peligros de comprar {Name} sin receta", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "Saltarse la receta no es un atajo, es un riesgo. Esto es lo que te juegas al comprar {Name} en webs sin control:",
            vars,
          ),
        },
        { type: "list", items: GRAY_DANGERS },
      ],
    },
    {
      h2: tpl("Cómo conseguir {Name} de forma legal y rápida", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "La alternativa legal es tan rápida como la ilegal, pero segura: una consulta médica online. En {BRAND}, un endocrino colegiado valora tu caso y, si es adecuado, te da la receta electrónica de {Name} para recogerlo en cualquier farmacia.",
            vars,
          ),
        },
        {
          type: "list",
          items: [
            "Reserva tu primera visita gratis.",
            tpl("El médico valora si {Name} es adecuado para ti.", vars),
            "Si procede, recibes la receta electrónica válida en toda España.",
            "Seguimiento y ajustes de dosis desde la app, sin desplazamientos.",
          ],
        },
        norxLinks(alt),
      ],
    },
    {
      h2: tpl("Precio de {Name} con receta", vars),
      blocks: [priceTable(alt, { name: "España", slug: "espana" }), { type: "quote", text: PRICE_NOTE }],
    },
  ];

  return {
    slug,
    title: tpl("Comprar {Name} sin receta", vars),
    h1: tpl("Comprar {Name} sin receta: por qué es un error", vars),
    metaTitle: tpl("Comprar {Name} sin receta en España: riesgos y alternativa legal | {BRAND}", vars),
    metaDescription: tpl(
      "¿Se puede comprar {Name} sin receta? No, y es peligroso. Te explicamos los riesgos y cómo conseguir {Name} legalmente con receta médica online.",
      vars,
    ),
    excerpt: tpl(
      "Comprar {Name} sin receta es ilegal y arriesgado. Te contamos por qué y cómo conseguirlo de forma legal y segura, con receta médica online.",
      vars,
    ),
    category: CAT_NORX,
    keyword: tpl("comprar {name} sin receta", vars),
    readMins: 6,
    date: isoDate(index),
    updated: isoDate(index + 200),
    cover: alt.cover,
    coverAlt: tpl("Comprar {Name} sin receta en España", vars),
    sections,
    faqs: [
      {
        q: tpl("¿Es legal comprar {Name} sin receta?", vars),
        a: tpl("No. {Name} es un medicamento de prescripción y venderlo sin receta es ilegal en España.", vars),
      },
      {
        q: tpl("¿Puedo conseguir la receta de {Name} online?", vars),
        a: tpl(
          "Sí. En {BRAND} un médico colegiado valora tu caso por videoconsulta y, si es adecuado, emite la receta electrónica de {Name}.",
          vars,
        ),
      },
      {
        q: tpl("¿Cuánto cuesta {Name}?", vars),
        a: tpl(
          "El precio orientativo va de {low} a {high} según la dosis, más la consulta y el seguimiento.",
          { ...vars, low: alt.priceLow, high: alt.priceHigh },
        ),
      },
      {
        q: "¿Cómo empiezo con DoctorLife?",
        a: "Reservas la primera visita gratis y, si procede, recibes tu receta con seguimiento desde la app.",
      },
    ],
  };
}

/* ── posts bespoke: péptidos y semaglutida compuesta ── */
function buildGrayPosts(): Post[] {
  const wegovy = getAlt("wegovy");
  const links: Block = norxLinks(wegovy);
  return [
    {
      slug: "peptidos-para-adelgazar",
      title: "Péptidos para adelgazar",
      h1: "Péptidos para adelgazar: qué son y por qué evitarlos",
      metaTitle: "Péptidos para adelgazar: qué son, riesgos y alternativa legal | DoctorLife",
      metaDescription:
        "Los «péptidos para adelgazar» que se venden online (semaglutida o tirzepatida sin marca) son ilegales y peligrosos. Te explicamos por qué y qué hacer.",
      excerpt:
        "Cada vez más webs venden «péptidos para adelgazar» como semaglutida o tirzepatida sin marca. Te explicamos qué son, por qué son peligrosos y la alternativa legal.",
      category: CAT_NORX,
      keyword: "péptidos para adelgazar",
      readMins: 6,
      date: isoDate(900),
      updated: isoDate(1100),
      cover: wegovy.cover,
      coverAlt: "Péptidos para adelgazar vendidos online",
      sections: [
        {
          h2: "¿Qué son los «péptidos para adelgazar»?",
          blocks: [
            {
              type: "p",
              text: "Bajo el término «péptidos» se venden online versiones sin marca de fármacos GLP‑1 como la semaglutida o la tirzepatida, a menudo etiquetadas como «solo para investigación» («research use only»). No son medicamentos aprobados ni aptos para uso humano.",
            },
            {
              type: "p",
              text: "Es decir, te ofrecen el principio activo de Wegovy, Ozempic o Mounjaro, pero fabricado y vendido sin ningún control sanitario, sin garantías de pureza y sin supervisión médica.",
            },
          ],
        },
        {
          h2: "Por qué los péptidos de internet son tan peligrosos",
          blocks: [
            { type: "p", text: "Comprar estos productos es jugar a la ruleta rusa con tu salud:" },
            { type: "list", items: GRAY_DANGERS },
          ],
        },
        {
          h2: "La alternativa legal y segura",
          blocks: [
            {
              type: "p",
              text: "Si lo que buscas es perder peso con un GLP‑1, la vía correcta es una consulta médica. Un endocrino puede prescribirte el fármaco original (Wegovy, Mounjaro u Ozempic), con la dosis adecuada y seguimiento real.",
            },
            links,
          ],
        },
      ],
      faqs: [
        {
          q: "¿Son seguros los péptidos para adelgazar que se venden online?",
          a: "No. Son productos sin control sanitario, a menudo etiquetados «solo para investigación», y pueden estar falsificados o contaminados. No deben usarse en personas.",
        },
        {
          q: "¿Es legal comprar péptidos GLP‑1?",
          a: "Vender estos productos para consumo humano sin aprobación ni receta es ilegal en España. Lo legal es obtener el medicamento aprobado con receta médica.",
        },
        {
          q: "¿Qué puedo usar en su lugar?",
          a: "Fármacos aprobados como Wegovy, Mounjaro u Ozempic, prescritos por un médico. En DoctorLife un endocrino valora tu caso por videoconsulta.",
        },
      ],
    },
    {
      slug: "semaglutida-compuesta-formula-magistral",
      title: "Semaglutida compuesta",
      h1: "Semaglutida compuesta o de fórmula magistral: qué debes saber",
      metaTitle: "Semaglutida compuesta / fórmula magistral: qué es y riesgos | DoctorLife",
      metaDescription:
        "La «semaglutida compuesta» o de fórmula magistral que se ofrece online no equivale a Wegovy u Ozempic aprobados. Te explicamos los riesgos y la alternativa legal.",
      excerpt:
        "La «semaglutida compuesta» se promociona como una alternativa barata a Wegovy u Ozempic. Te explicamos qué es realmente, sus riesgos y cómo acceder al tratamiento aprobado.",
      category: CAT_NORX,
      keyword: "semaglutida compuesta",
      readMins: 6,
      date: isoDate(901),
      updated: isoDate(1101),
      cover: wegovy.cover,
      coverAlt: "Semaglutida compuesta o de fórmula magistral",
      sections: [
        {
          h2: "¿Qué es la semaglutida «compuesta»?",
          blocks: [
            {
              type: "p",
              text: "Se denomina así a preparados de semaglutida elaborados al margen de los laboratorios autorizados (Novo Nordisk), que se promocionan como versiones más baratas de Wegovy u Ozempic. En España, los medicamentos GLP‑1 aprobados se fabrican y comercializan de forma industrial y regulada: estos preparados no equivalen a ellos.",
            },
            {
              type: "p",
              text: "Muchas de estas ofertas proceden de canales online no autorizados y carecen de las garantías de calidad, dosis y conservación de un medicamento aprobado.",
            },
          ],
        },
        {
          h2: "Riesgos de la semaglutida no aprobada",
          blocks: [
            { type: "p", text: "Los problemas son los mismos que con cualquier producto del mercado gris:" },
            { type: "list", items: GRAY_DANGERS },
          ],
        },
        {
          h2: "Cómo acceder a la semaglutida de forma legal",
          blocks: [
            {
              type: "p",
              text: "La única forma segura de usar semaglutida para perder peso es con el medicamento aprobado (Wegovy) y receta médica. Un endocrino valora si es adecuado para ti y supervisa el tratamiento.",
            },
            links,
          ],
        },
      ],
      faqs: [
        {
          q: "¿La semaglutida compuesta es igual que Wegovy u Ozempic?",
          a: "No. Los medicamentos aprobados se fabrican de forma regulada y con garantías; los preparados «compuestos» que se venden online no equivalen a ellos y pueden no ser seguros.",
        },
        {
          q: "¿Es legal comprar semaglutida compuesta online?",
          a: "Comprar semaglutida sin receta o de canales no autorizados es ilegal y arriesgado. Lo correcto es obtener el medicamento aprobado con prescripción médica.",
        },
        {
          q: "¿Cómo consigo semaglutida legalmente?",
          a: "Con una consulta médica. En DoctorLife un endocrino colegiado valora tu caso y, si procede, te receta Wegovy con seguimiento.",
        },
      ],
    },
  ];
}

/* ── pillar pages del cluster ── */
function buildResearchPillar(): Post {
  const items: { label: string; href: string }[] = INVESTIGATIONAL.map((d) => ({
    label: tpl("Qué es {Name}", { Name: d.Name }),
    href: `/blog/que-es-${d.key.toLowerCase()}`,
  }));
  return {
    slug: "glp1-en-investigacion",
    title: "Nuevos GLP‑1 en investigación",
    h1: "Nuevos GLP‑1 en investigación: retatrutide, CagriSema, orforglipron y más",
    metaTitle: "Nuevos GLP‑1 en investigación 2025: retatrutide, CagriSema y más | DoctorLife",
    metaDescription:
      "Guía de los nuevos fármacos GLP‑1 en investigación (retatrutide, CagriSema, orforglipron, survodutida): qué son, cuándo podrían llegar y alternativas aprobadas.",
    excerpt:
      "Retatrutide, CagriSema, orforglipron, survodutida… La próxima generación de fármacos para adelgazar promete mucho, pero aún no está disponible. Esto es lo que se sabe y lo que puedes usar hoy.",
    category: CAT_RESEARCH,
    keyword: "nuevos glp1 en investigación",
    readMins: 8,
    date: isoDate(950),
    updated: isoDate(1150),
    cover: getAlt("mounjaro").cover,
    coverAlt: "Nuevos fármacos GLP‑1 en investigación",
    sections: [
      {
        h2: "La nueva generación de fármacos para adelgazar",
        blocks: [
          {
            type: "p",
            text: "Tras el éxito de Wegovy y Mounjaro, varios laboratorios trabajan en fármacos aún más potentes: triples agonistas, combinaciones y hasta pastillas orales. Aquí tienes un resumen honesto de los más buscados, su estado y, sobre todo, qué puedes usar mientras llegan.",
          },
        ],
      },
      {
        h2: "Fármacos GLP‑1 en investigación",
        blocks: [
          {
            type: "table",
            caption: "Principales GLP‑1 en investigación",
            head: ["Fármaco", "Laboratorio", "Tipo", "Estado"],
            rows: INVESTIGATIONAL.map((d) => [d.Name, d.maker, d.klass, "En investigación"]),
          },
          { type: "links", title: "Guías por fármaco", items },
        ],
      },
      {
        h2: "¿Cuándo llegarán a España?",
        blocks: [
          { type: "p", text: pick(APPROVAL_EXPLAIN, "pillar-ap") },
          {
            type: "p",
            text: "Ninguno tiene fecha confirmada de comercialización en España. Desconfía de los calendarios que circulan por internet: hasta la decisión de la EMA y la AEMPS, todo son estimaciones.",
          },
        ],
      },
      {
        h2: "Qué puedes usar hoy",
        blocks: [
          {
            type: "p",
            text: "Mientras tanto, hay GLP‑1 aprobados y disponibles con receta. En DoctorLife, un endocrino colegiado valora tu caso y, si procede, te prescribe el tratamiento adecuado con seguimiento desde la app.",
          },
          {
            type: "links",
            title: "Alternativas disponibles hoy",
            items: [
              { label: "Comprar Mounjaro online en España", href: "/blog/comprar-mounjaro-online" },
              { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
              { label: "Comparativa de GLP‑1: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
              { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuál es el GLP‑1 en investigación más potente?",
        a: "En los ensayos de fase II, retatrutide (un triple agonista de Eli Lilly) ha mostrado algunas de las mayores pérdidas de peso registradas, pendientes de confirmar en fase III.",
      },
      {
        q: "¿Puedo comprar estos fármacos ya?",
        a: "No. Ninguno está aprobado todavía en España. Solo están disponibles dentro de ensayos clínicos; comprarlos online es ilegal y peligroso.",
      },
      {
        q: "¿Qué alternativa tengo mientras llegan?",
        a: "Fármacos aprobados como Wegovy, Mounjaro u Ozempic, con receta médica. Un endocrino puede valorar cuál encaja mejor en tu caso.",
      },
    ],
  };
}

function buildNoRxPillar(): Post {
  return {
    slug: "comprar-glp1-sin-receta",
    title: "Comprar GLP‑1 sin receta",
    h1: "Comprar GLP‑1 sin receta: la verdad y la alternativa legal",
    metaTitle: "Comprar GLP‑1 sin receta: riesgos y cómo hacerlo legal | DoctorLife",
    metaDescription:
      "¿Se puede comprar Wegovy, Ozempic o Mounjaro sin receta? No, y es peligroso. Te explicamos los riesgos del mercado gris y cómo conseguirlo legalmente online.",
    excerpt:
      "Wegovy, Ozempic, Mounjaro, semaglutida… ninguno se puede comprar legalmente sin receta. Te explicamos por qué y cómo obtener tu tratamiento de forma legal y segura.",
    category: CAT_NORX,
    keyword: "comprar glp1 sin receta",
    readMins: 6,
    date: isoDate(951),
    updated: isoDate(1151),
    cover: getAlt("wegovy").cover,
    coverAlt: "Comprar GLP‑1 sin receta en España",
    sections: [
      {
        h2: "¿Se puede comprar un GLP‑1 sin receta?",
        blocks: [
          {
            type: "p",
            text: "No. Todos los fármacos GLP‑1 (Wegovy, Ozempic, Mounjaro, Saxenda…) son medicamentos de prescripción. Por ley solo pueden dispensarse en farmacias y con receta médica; venderlos «sin receta» es ilegal.",
          },
          {
            type: "p",
            text: "Que te pidan receta es la mejor señal de que estás ante un canal legal. Si una web no la exige, huye: es una estafa o producto del mercado gris.",
          },
        ],
      },
      {
        h2: "Los riesgos de saltarse la receta",
        blocks: [
          { type: "p", text: "Comprar un GLP‑1 sin receta te expone a riesgos serios:" },
          { type: "list", items: GRAY_DANGERS },
        ],
      },
      {
        h2: "Cómo conseguir tu GLP‑1 de forma legal",
        blocks: [
          {
            type: "p",
            text: "La alternativa legal es rápida y segura: una videoconsulta con un endocrino colegiado que, si es adecuado, te da la receta electrónica para tu farmacia.",
          },
          {
            type: "links",
            title: "Guías sin receta por fármaco",
            items: [
              { label: "Comprar Wegovy sin receta", href: "/blog/comprar-wegovy-sin-receta" },
              { label: "Comprar Ozempic sin receta", href: "/blog/comprar-ozempic-sin-receta" },
              { label: "Comprar Mounjaro sin receta", href: "/blog/comprar-mounjaro-sin-receta" },
              { label: "Comprar semaglutida sin receta", href: "/blog/comprar-semaglutida-sin-receta" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es legal comprar Wegovy u Ozempic sin receta?",
        a: "No. Son medicamentos de prescripción y venderlos sin receta es ilegal en España.",
      },
      {
        q: "¿Cómo consigo la receta?",
        a: "Con una consulta médica. En DoctorLife un endocrino valora tu caso por videoconsulta y, si procede, emite la receta electrónica.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Reservas tu primera visita gratis y, si el médico lo considera adecuado, puedes tener la receta el mismo día.",
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   CLUSTER "MODIFICADORES" (nivel nacional)
   Capta el enorme long‑tail informativo y transaccional de cada
   fármaco: opiniones, resultados, cuánto se adelgaza, dosis,
   alcohol, efecto rebote, cómo se pincha, en ayunas, foro…
   Cada página es sustanciosa (no thin) y redirige al funnel.
   ═══════════════════════════════════════════════════════════ */

type Modifier =
  | "opiniones"
  | "resultados"
  | "cuanto-se-adelgaza"
  | "dosis"
  | "alcohol"
  | "efectos-largo-plazo"
  | "como-se-pone"
  | "efecto-rebote"
  | "ayunas"
  | "no-funciona";

const MODIFIERS: Modifier[] = [
  "opiniones",
  "resultados",
  "cuanto-se-adelgaza",
  "dosis",
  "alcohol",
  "efectos-largo-plazo",
  "como-se-pone",
  "efecto-rebote",
  "ayunas",
  "no-funciona",
];

// Solo para fármacos de control de peso (los de mayor búsqueda).
const MODIFIER_DRUG_KEYS = new Set(["wegovy", "mounjaro", "ozempic", "saxenda", "semaglutida", "tirzepatida"]);

function modifierSlug(drug: Drug, mod: Modifier): string {
  switch (mod) {
    case "opiniones":
      return `${drug.key}-opiniones`;
    case "resultados":
      return `${drug.key}-resultados-antes-despues`;
    case "cuanto-se-adelgaza":
      return `cuanto-se-adelgaza-con-${drug.key}`;
    case "dosis":
      return `${drug.key}-dosis-escalado`;
    case "alcohol":
      return `${drug.key}-y-alcohol`;
    case "efectos-largo-plazo":
      return `${drug.key}-efectos-a-largo-plazo`;
    case "como-se-pone":
      return `como-se-pone-${drug.key}`;
    case "efecto-rebote":
      return `que-pasa-al-dejar-${drug.key}`;
    case "ayunas":
      return `${drug.key}-en-ayunas`;
    case "no-funciona":
      return `${drug.key}-no-funciona-que-hacer`;
  }
}

function modLinks(drug: Drug): Block {
  return {
    type: "links",
    title: "Sigue informándote",
    items: [
      { label: tpl("Comprar {Drug} online en España", { Drug: cap(drug.name) }), href: `/blog/${drug.pillarBuy}` },
      { label: tpl("{Drug} precio en España por dosis", { Drug: cap(drug.name) }), href: `/blog/${drug.pillarPrice}` },
      { label: tpl("{Drug}: opiniones y experiencias", { Drug: cap(drug.name) }), href: `/blog/${drug.key}-opiniones` },
      { label: "Comparativa de GLP‑1: cuál elegir", href: `/blog/${drug.compare}` },
    ],
  };
}

const MOD_DISCLAIMER =
  "Este artículo es informativo y no sustituye el consejo médico. La respuesta a {Drug} es individual: empieza siempre con valoración y seguimiento de un médico colegiado.";

function buildModifierPost(drug: Drug, mod: Modifier, index: number): Post {
  const slug = modifierSlug(drug, mod);
  const vars = {
    Drug: cap(drug.name),
    drug: drug.name,
    inn: drug.inn,
    BRAND,
    frequency: drug.frequency,
    low: drug.priceLow,
    high: drug.priceHigh,
  };
  const links = modLinks(drug);
  const ctaP: Block = {
    type: "p",
    text: tpl(
      "En {BRAND}, un endocrino colegiado valora tu caso por videoconsulta y, si {Drug} es adecuado para ti, te prescribe el tratamiento con seguimiento desde la app. La primera visita es gratis.",
      vars,
    ),
  };

  let h1: string, title: string, metaTitle: string, metaDescription: string, excerpt: string, keyword: string;
  let sections: Section[];
  let faqs: Faq[];

  switch (mod) {
    case "opiniones":
      h1 = tpl("{Drug}: opiniones y experiencias reales", vars);
      title = tpl("{Drug} opiniones", vars);
      keyword = tpl("{drug} opiniones", vars);
      metaTitle = tpl("{Drug} opiniones: experiencias reales y qué esperar (2026) | {BRAND}", vars);
      metaDescription = tpl(
        "Opiniones y experiencias reales con {Drug}: qué cuentan los pacientes sobre resultados, efectos secundarios y cómo empezar de forma segura con receta médica.",
        vars,
      );
      excerpt = tpl(
        "Qué dicen las opiniones y experiencias con {Drug}: resultados, efectos secundarios y consejos para empezar con seguridad y seguimiento médico.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Qué opinan quienes usan {Drug}?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Las opiniones sobre {Drug} ({inn}) suelen coincidir en un punto: reduce mucho el apetito y el «ruido alimentario», lo que facilita comer menos sin pasar hambre. La mayoría describe una pérdida de peso progresiva a lo largo de los meses, más que cambios bruscos.",
                vars,
              ),
            },
            {
              type: "p",
              text: tpl(
                "También es habitual leer sobre molestias digestivas las primeras semanas (náuseas, digestiones lentas) que tienden a mejorar al adaptarse. Las experiencias más positivas son casi siempre las de personas que siguieron un escalado de dosis bien pautado y con seguimiento médico.",
                vars,
              ),
            },
          ],
        },
        {
          h2: "Lo positivo y lo negativo según las experiencias",
          blocks: [
            {
              type: "list",
              items: [
                "A favor: menos hambre, saciedad temprana y pérdida de peso sostenida.",
                "A favor: mejora de marcadores metabólicos y de la relación con la comida.",
                "En contra: efectos digestivos al inicio y tras cada subida de dosis.",
                "En contra: el peso puede recuperarse si se abandona sin estrategia de mantenimiento.",
              ],
            },
            { type: "p", text: tpl(pick(SIDE_OUTRO, slug + "so"), { ...vars, City: "tu ciudad" }) },
          ],
        },
        {
          h2: tpl("Cómo tener una buena experiencia con {Drug}", vars),
          blocks: [ctaP, links],
        },
      ];
      faqs = [
        {
          q: tpl("¿Son fiables las opiniones de {Drug} en foros?", vars),
          a: "Sirven de orientación, pero cada caso es distinto. La dosis, el punto de partida y los hábitos cambian mucho el resultado; por eso conviene una valoración médica individual.",
        },
        {
          q: tpl("¿La mayoría de opiniones de {Drug} son positivas?", vars),
          a: tpl(
            "En general sí en cuanto a pérdida de peso y control del apetito. Las quejas suelen centrarse en los efectos digestivos iniciales, que mejoran con un escalado progresivo.",
            vars,
          ),
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis. Un endocrino valora tu caso y, si procede, te prescribe el tratamiento con seguimiento.",
        },
      ];
      break;

    case "resultados":
      h1 = tpl("{Drug}: resultados y antes y después", vars);
      title = tpl("{Drug} resultados", vars);
      keyword = tpl("{drug} resultados antes y después", vars);
      metaTitle = tpl("{Drug} resultados: antes y después y cuánto se pierde | {BRAND}", vars);
      metaDescription = tpl(
        "Resultados reales con {Drug}: cuánto peso se pierde, en cuánto tiempo y qué influye en el antes y después. Cómo maximizarlos con seguimiento médico.",
        vars,
      );
      excerpt = tpl(
        "Qué resultados da {Drug} de verdad: cuánto se pierde, en cuánto tiempo y cómo es el antes y después según los estudios y la práctica clínica.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Qué resultados da {Drug}?", vars),
          blocks: [
            { type: "p", text: tpl(pick(RESULTS_WEIGHT, slug + "res"), vars) },
            {
              type: "p",
              text: tpl(
                "El «antes y después» con {Drug} no es inmediato: el apetito baja en las primeras semanas, pero la pérdida de peso visible se construye mes a mes. La constancia, el escalado de dosis y los hábitos marcan la diferencia entre un buen resultado y uno mediocre.",
                vars,
              ),
            },
          ],
        },
        {
          h2: "Qué influye en tus resultados",
          blocks: [
            {
              type: "list",
              items: [
                "La dosis alcanzada y la velocidad del escalado.",
                "Tu punto de partida (peso e IMC iniciales).",
                "La alimentación y la actividad física que acompañen al tratamiento.",
                "La adherencia: saltarse dosis frena el progreso.",
                "El seguimiento médico para ajustar la pauta a tu evolución.",
              ],
            },
          ],
        },
        {
          h2: "Cómo maximizar tu antes y después",
          blocks: [ctaP, links],
        },
      ];
      faqs = [
        {
          q: tpl("¿Cuánto peso se pierde con {Drug}?", vars),
          a: "Depende del fármaco, la dosis y los hábitos. En los estudios, los análogos del GLP��1 logran pérdidas medias relevantes a lo largo de varios meses con seguimiento.",
        },
        {
          q: tpl("¿En cuánto tiempo se ven resultados con {Drug}?", vars),
          a: "El efecto sobre el apetito se nota en semanas; la pérdida de peso es progresiva durante meses. No es realista esperar grandes cambios en pocos días.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y, si procede, empiezas con seguimiento médico desde la app.",
        },
      ];
      break;

    case "cuanto-se-adelgaza":
      h1 = tpl("¿Cuánto se adelgaza con {Drug}?", vars);
      title = tpl("Cuánto se adelgaza con {Drug}", vars);
      keyword = tpl("cuánto se adelgaza con {drug}", vars);
      metaTitle = tpl("¿Cuánto se adelgaza con {Drug}? Pérdida de peso real | {BRAND}", vars);
      metaDescription = tpl(
        "¿Cuánto peso se pierde con {Drug} y en cuánto tiempo? Cifras orientativas de los estudios, qué influye y cómo lograr una pérdida sostenible con control médico.",
        vars,
      );
      excerpt = tpl(
        "Cuánto se adelgaza con {Drug}, en cuánto tiempo y de qué depende. Cifras orientativas y cómo conseguir una pérdida de peso sostenible.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Cuánto peso se pierde con {Drug}?", vars),
          blocks: [
            { type: "p", text: tpl(pick(RESULTS_WEIGHT, slug + "res"), vars) },
            {
              type: "p",
              text: "Conviene desconfiar de las cifras «milagro»: la pérdida real es gradual y muy individual. Lo importante no es la velocidad, sino mantener el peso a largo plazo, y ahí el seguimiento médico y los hábitos son decisivos.",
            },
          ],
        },
        {
          h2: "Cómo perder peso de forma sostenible",
          blocks: [
            {
              type: "list",
              items: [
                "Escala la dosis de forma progresiva según indique el médico.",
                "Acompaña el tratamiento con una alimentación rica en proteína.",
                "Incluye actividad física para preservar masa muscular.",
                "Planifica desde el inicio el mantenimiento para evitar el rebote.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Cuánto se adelgaza al mes con {Drug}?", vars),
          a: "Es muy variable y depende de la dosis y los hábitos. La pérdida tiende a ser progresiva; un médico puede darte una expectativa realista para tu caso.",
        },
        {
          q: tpl("¿Se recupera el peso al dejar {Drug}?", vars),
          a: "Puede recuperarse si se abandona sin estrategia de mantenimiento. Por eso es clave planificar esa fase con el médico.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y empiezas con seguimiento médico real.",
        },
      ];
      break;

    case "dosis":
      h1 = tpl("Dosis de {Drug}: escalado y cómo se ajusta", vars);
      title = tpl("Dosis de {Drug}", vars);
      keyword = tpl("{drug} dosis", vars);
      metaTitle = tpl("Dosis de {Drug}: escalado paso a paso y precios | {BRAND}", vars);
      metaDescription = tpl(
        "Guía de dosis de {Drug}: cómo es el escalado, cada cuánto sube y por qué debe ajustarlo un médico. Precios orientativos por dosis y cómo empezar.",
        vars,
      );
      excerpt = tpl(
        "Cómo es el escalado de dosis de {Drug}, por qué debe pautarlo un médico y cuánto cuesta cada dosis. Todo lo que necesitas para empezar bien.",
        vars,
      );
      sections = [
        {
          h2: tpl("Escalado de dosis de {Drug}", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "{Drug} ({inn}) se administra mediante {frequency} y la dosis se sube de forma gradual. Empezar con la dosis mínima y escalarla poco a poco es lo que minimiza los efectos digestivos y permite que el cuerpo se adapte.",
                vars,
              ),
            },
            priceTable(drug, { name: "España", slug: "espana" }),
            { type: "quote", text: PRICE_NOTE },
          ],
        },
        {
          h2: "Por qué la dosis debe ajustarla un médico",
          blocks: [
            {
              type: "p",
              text: tpl(
                "La pauta no es igual para todos: el médico la adapta a tu tolerancia, tus objetivos y tu evolución. Subir demasiado rápido aumenta los efectos adversos; quedarse corto reduce los resultados. Por eso el ajuste profesional es clave con {Drug}.",
                vars,
              ),
            },
            { type: "list", items: STORAGE_LIST.map((s) => tpl(s, { ...vars, City: "tu ciudad" })) },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Cada cuánto se sube la dosis de {Drug}?", vars),
          a: "El escalado suele hacerse por etapas de varias semanas, pero lo define el médico según tu tolerancia y respuesta. No conviene acelerarlo por tu cuenta.",
        },
        {
          q: tpl("¿Qué pasa si me salto una dosis de {Drug}?", vars),
          a: "Sigue las instrucciones del prospecto y consulta con tu médico. No dupliques dosis para «compensar».",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y recibes una pauta de dosis personalizada si el tratamiento es adecuado.",
        },
      ];
      break;

    case "alcohol":
      h1 = tpl("{Drug} y alcohol: ¿se puede beber?", vars);
      title = tpl("{Drug} y alcohol", vars);
      keyword = tpl("{drug} y alcohol", vars);
      metaTitle = tpl("{Drug} y alcohol: ¿se puede beber? Lo que debes saber | {BRAND}", vars);
      metaDescription = tpl(
        "¿Se puede tomar alcohol con {Drug}? Cómo interactúan, por qué puede sentar peor y recomendaciones para tu tratamiento. Consulta siempre con tu médico.",
        vars,
      );
      excerpt = tpl(
        "¿Se puede beber alcohol con {Drug}? Cómo interactúan, por qué puede sentar peor y qué recomiendan los médicos durante el tratamiento.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Se puede tomar alcohol con {Drug}?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "No existe una prohibición absoluta, pero combinar alcohol con {Drug} no es buena idea. El alcohol aporta calorías vacías, puede intensificar las náuseas y las molestias digestivas, y dificulta el objetivo de perder peso.",
                vars,
              ),
            },
            {
              type: "p",
              text: tpl(
                "Como {Drug} ralentiza la digestión, beber con el estómago «más lleno» de lo habitual puede sentar peor. Además, el alcohol puede afectar al azúcar en sangre, algo a vigilar especialmente si tienes diabetes.",
                vars,
              ),
            },
          ],
        },
        {
          h2: "Recomendaciones si bebes durante el tratamiento",
          blocks: [
            {
              type: "list",
              items: [
                "Modera mucho la cantidad y evita el alcohol los días de subida de dosis.",
                "Hidrátate bien y no bebas con el estómago vacío.",
                "Vigila las náuseas: si empeoran, suspende y consulta.",
                "Coméntalo con tu médico, sobre todo si tomas otra medicación.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿El alcohol corta el efecto de {Drug}?", vars),
          a: "No lo «corta», pero aporta calorías y puede intensificar las molestias digestivas, dificultando la pérdida de peso.",
        },
        {
          q: tpl("¿Puedo tomar una copa puntual con {Drug}?", vars),
          a: "Con moderaci��n suele ser tolerable, pero depende de cada persona. Coméntalo con tu médico, sobre todo al subir de dosis.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y resuelves estas dudas con un endocrino.",
        },
      ];
      break;

    case "efectos-largo-plazo":
      h1 = tpl("{Drug}: efectos a largo plazo", vars);
      title = tpl("{Drug} efectos a largo plazo", vars);
      keyword = tpl("{drug} efectos a largo plazo", vars);
      metaTitle = tpl("{Drug} efectos a largo plazo: qué se sabe y seguridad | {BRAND}", vars);
      metaDescription = tpl(
        "Efectos a largo plazo de {Drug}: qué dicen los estudios sobre seguridad, mantenimiento del peso y por qué el seguimiento médico continuado es clave.",
        vars,
      );
      excerpt = tpl(
        "Qué se sabe de los efectos a largo plazo de {Drug}: seguridad, mantenimiento del peso y la importancia del seguimiento médico continuado.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Es seguro {Drug} a largo plazo?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Los análogos del GLP‑1 como {Drug} llevan años usándose y cuentan con amplia experiencia clínica. A largo plazo, el objetivo es doble: mantener la pérdida de peso y vigilar la tolerancia, siempre con seguimiento médico.",
                vars,
              ),
            },
            { type: "p", text: tpl(pick(SIDE_INTRO, slug + "si"), { ...vars, City: "tu ciudad" }) },
          ],
        },
        {
          h2: "Qué vigilar con el tiempo",
          blocks: [
            { type: "list", items: SIDE_LIST.map((s) => tpl(s, vars)) },
            {
              type: "p",
              text: "El seguimiento periódico permite ajustar la dosis, detectar a tiempo cualquier efecto y planificar la fase de mantenimiento para que los resultados perduren.",
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Se puede usar {Drug} durante años?", vars),
          a: "La duración la decide el médico según tu evolución. Muchos tratamientos del peso se plantean a largo plazo con revisiones periódicas.",
        },
        {
          q: tpl("¿{Drug} tiene efectos graves a largo plazo?", vars),
          a: "Los efectos frecuentes son digestivos y leves. El médico valora tus contraindicaciones y vigila tu evolución para minimizar riesgos.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y haces el seguimiento desde la app.",
        },
      ];
      break;

    case "como-se-pone":
      h1 = tpl("Cómo se pone {Drug} paso a paso", vars);
      title = tpl("Cómo se pone {Drug}", vars);
      keyword = tpl("cómo se pone {drug}", vars);
      metaTitle = tpl("Cómo se pone {Drug}: inyección paso a paso y consejos | {BRAND}", vars);
      metaDescription = tpl(
        "Cómo se pone {Drug} paso a paso: zonas de inyección, conservación, errores frecuentes y consejos. Hazlo de forma segura con seguimiento médico.",
        vars,
      );
      excerpt = tpl(
        "Guía práctica de cómo se pone {Drug}: zonas de inyección, conservación y errores a evitar para hacerlo bien y de forma segura.",
        vars,
      );
      sections = [
        {
          h2: tpl("Cómo administrar {Drug}", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "{Drug} se administra mediante {frequency} con una pluma precargada. Se inyecta bajo la piel (subcutánea) en el abdomen, el muslo o la parte superior del brazo, rotando el punto cada vez para cuidar la piel.",
                vars,
              ),
            },
            { type: "list", items: STORAGE_LIST.map((s) => tpl(s, { ...vars, City: "tu ciudad" })) },
          ],
        },
        {
          h2: "Errores frecuentes a evitar",
          blocks: [
            {
              type: "list",
              items: [
                "Reutilizar agujas o no rotar la zona de inyección.",
                "Inyectar la pluma fría recién sacada de la nevera (puede molestar más).",
                "Saltarse el escalado de dosis pautado por el médico.",
                "No conservar las plumas correctamente.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Dónde se pincha {Drug}?", vars),
          a: "En abdomen, muslo o parte superior del brazo, por vía subcutánea, rotando el punto de inyección en cada dosis.",
        },
        {
          q: tpl("¿Duele ponerse {Drug}?", vars),
          a: "Las plumas usan agujas muy finas y la mayoría de personas apenas nota molestia. Dejar atemperar la pluma puede ayudar.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y te explicamos la pauta y la técnica de inyección.",
        },
      ];
      break;

    case "efecto-rebote":
      h1 = tpl("¿Qué pasa al dejar {Drug}? Efecto rebote", vars);
      title = tpl("Qué pasa al dejar {Drug}", vars);
      keyword = tpl("dejar {drug} efecto rebote", vars);
      metaTitle = tpl("¿Qué pasa al dejar {Drug}? Efecto rebote y cómo evitarlo | {BRAND}", vars);
      metaDescription = tpl(
        "¿Se recupera el peso al dejar {Drug}? Te explicamos el efecto rebote, por qué ocurre y cómo planificar el mantenimiento para conservar tus resultados.",
        vars,
      );
      excerpt = tpl(
        "Qué pasa cuando dejas {Drug}: por qué puede aparecer el efecto rebote y cómo planificar el mantenimiento para no recuperar el peso.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Se recupera el peso al dejar {Drug}?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Puede ocurrir. Al suspender {Drug}, el apetito tiende a volver a su nivel previo, y sin una estrategia de mantenimiento es posible recuperar parte del peso perdido. No es un fallo del fármaco, sino la consecuencia de retirar el tratamiento sin un plan.",
                vars,
              ),
            },
            {
              type: "p",
              text: "La clave está en la transición: reforzar hábitos, cuidar la masa muscular y, en muchos casos, mantener una pauta de seguimiento o de dosis reducida según indique el médico.",
            },
          ],
        },
        {
          h2: "Cómo evitar el efecto rebote",
          blocks: [
            {
              type: "list",
              items: [
                "Planifica la retirada con tu médico, nunca de golpe por tu cuenta.",
                "Consolida hábitos de alimentación y actividad antes de bajar la dosis.",
                "Mantén el seguimiento durante la fase de mantenimiento.",
                "Vigila el peso para actuar pronto si empieza a subir.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Hay que tomar {Drug} para siempre?", vars),
          a: "No necesariamente, pero la retirada debe planificarse. El médico define cuándo y cómo reducir o suspender para minimizar el rebote.",
        },
        {
          q: tpl("¿Por qué se recupera peso al dejar {Drug}?", vars),
          a: "Porque vuelve el apetito previo. Sin hábitos consolidados ni mantenimiento, es fácil recuperar parte del peso.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y planificamos también la fase de mantenimiento.",
        },
      ];
      break;

    case "ayunas":
      h1 = tpl("¿{Drug} se pone en ayunas? Mitos y verdades", vars);
      title = tpl("{Drug} en ayunas", vars);
      keyword = tpl("{drug} en ayunas", vars);
      metaTitle = tpl("¿{Drug} se pone en ayunas? Cuándo y cómo administrarlo | {BRAND}", vars);
      metaDescription = tpl(
        "¿Hay que ponerse {Drug} en ayunas? Te explicamos cuándo administrarlo, si depende de las comidas y cómo encajarlo en tu rutina con seguridad.",
        vars,
      );
      excerpt = tpl(
        "¿{Drug} se pone en ayunas o da igual? Aclaramos cuándo administrarlo y cómo encajarlo en tu día a día de forma cómoda y segura.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Hay que ponerse {Drug} en ayunas?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "No es obligatorio. {Drug} se administra mediante {frequency} y puede ponerse con o sin alimentos, a la hora que mejor se adapte a tu rutina. Lo importante es la regularidad: hacerlo siempre el mismo día (o a la misma hora) ayuda a no olvidarlo.",
                vars,
              ),
            },
            {
              type: "p",
              text: "Algunas personas prefieren inyectarse por la mañana y otras por la noche; lo que mejor toleres es lo correcto. Si tienes dudas sobre el momento ideal en tu caso, consúltalo con tu médico.",
            },
          ],
        },
        {
          h2: "Consejos para encajarlo en tu rutina",
          blocks: [
            {
              type: "list",
              items: [
                "Elige un día fijo de la semana y márcalo como recordatorio.",
                "Puedes ponerlo con o sin comida, según lo que mejor toleres.",
                "Si notas náuseas, prueba a comer ligero y despacio ese día.",
                "Mantén la pluma bien conservada hasta el momento de usarla.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿{Drug} se pone antes o después de comer?", vars),
          a: "Da igual: puede administrarse con o sin alimentos. Lo importante es la regularidad y seguir la pauta del médico.",
        },
        {
          q: tpl("¿A qué hora es mejor ponerse {Drug}?", vars),
          a: "A la que mejor se adapte a tu rutina y mejor toleres. Mantener un horario fijo ayuda a no olvidar la dosis.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y resolvemos estas dudas prácticas.",
        },
      ];
      break;

    case "no-funciona":
      h1 = tpl("{Drug} no me funciona: por qué y qué hacer", vars);
      title = tpl("{Drug} no funciona", vars);
      keyword = tpl("{drug} no funciona", vars);
      metaTitle = tpl("{Drug} no me funciona: causas y qué hacer | {BRAND}", vars);
      metaDescription = tpl(
        "¿{Drug} no te funciona o se ha estancado el peso? Causas frecuentes (dosis, hábitos, expectativas) y qué hacer. Revisa tu pauta con un médico.",
        vars,
      );
      excerpt = tpl(
        "Si {Drug} no te funciona o el peso se ha estancado, estas son las causas más frecuentes y qué puedes hacer con ayuda médica.",
        vars,
      );
      sections = [
        {
          h2: tpl("¿Por qué {Drug} no me hace efecto?", vars),
          blocks: [
            {
              type: "p",
              text: tpl(
                "Que {Drug} «no funcione» suele tener explicación. Las causas más habituales son una dosis aún baja (falta escalar), poco tiempo de tratamiento, expectativas poco realistas o hábitos que no acompañan. También influye que cada persona responde de forma distinta.",
                vars,
              ),
            },
            {
              type: "p",
              text: "Antes de abandonar, merece la pena revisar la pauta con un médico: muchas veces el problema se resuelve ajustando la dosis o el enfoque, no cambiando de fármaco.",
            },
          ],
        },
        {
          h2: "Qué hacer si el peso se estanca",
          blocks: [
            {
              type: "list",
              items: [
                "Revisa con el médico si toca subir la dosis.",
                "Da tiempo: la pérdida es progresiva, no lineal.",
                "Ajusta alimentación y actividad para romper el estancamiento.",
                "Valora con el médico si otra opción de GLP‑1 encaja mejor en tu caso.",
              ],
            },
            ctaP,
            links,
          ],
        },
      ];
      faqs = [
        {
          q: tpl("¿Por qué he dejado de perder peso con {Drug}?", vars),
          a: "Los estancamientos son normales. Pueden deberse a la dosis, a adaptaciones del cuerpo o a los hábitos. Un médico puede ayudarte a reajustar.",
        },
        {
          q: tpl("¿Debo cambiar de fármaco si {Drug} no funciona?", vars),
          a: "No necesariamente. Muchas veces basta con ajustar la dosis o el enfoque. La decisión debe ser médica e individual.",
        },
        {
          q: "¿Cómo empiezo con DoctorLife?",
          a: "Reservas la primera visita gratis y un endocrino revisa tu caso y tu pauta.",
        },
      ];
      break;
  }

  return {
    slug,
    title,
    h1,
    metaTitle,
    metaDescription,
    excerpt,
    category: drug.category,
    keyword,
    readMins: 6 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: drug.cover,
    coverAlt: tpl("{Drug}: información sobre el tratamiento", vars),
    sections: [
      ...sections,
      { h2: "Aviso", blocks: [{ type: "p", text: tpl(MOD_DISCLAIMER, vars) }] },
    ],
    faqs,
  };
}

/* ═══════════════════════��═══════════════════════════════════
   CLUSTERS DE ALTA INTENCIÓN DE COMPRA (nivel nacional)
   - Comparativas cruzadas (Wegovy vs Ozempic, etc.)
   - "{fármaco} con receta online"
   - Servicio / clínica online (endocrino online, obesidad online)
   - Desabastecimiento / dónde conseguir
   - Tope de embudo (pastillas para adelgazar, inyección, bajar X kg)
   - Por condición/perfil (diabetes, menopausia, posparto)
   Todos venden el SERVICIO MÉDICO (consulta + receta + seguimiento),
   no el medicamento, y redirigen al funnel de DoctorLife.
   ═══════════════════════════════════════════════════════════ */

const CAT_COMPARE = "Comparativas";
const CAT_GUIDE = "Guías";
const CAT_SLIM = "Adelgazar";

const SERVICE_CTA =
  "En {BRAND}, un endocrino colegiado valora tu caso por videoconsulta y, si el tratamiento es adecuado para ti, te lo prescribe con receta electrónica y seguimiento desde la app. La primera visita es gratis.";

function glp1Links(): Block {
  return {
    type: "links",
    title: "Sigue informándote",
    items: [
      { label: "Comprar GLP‑1 online en España", href: "/blog/comprar-glp1-online-espana" },
      { label: "Wegovy: precio en España por dosis", href: "/blog/wegovy-precio-espana" },
      { label: "Comparativa de GLP‑1: cuál elegir", href: "/blog/wegovy-vs-mounjaro" },
      { label: "Endocrino online: cómo funciona", href: "/blog/endocrino-online" },
    ],
  };
}

function mkPost(
  p: {
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
    cover?: string;
    coverAlt?: string;
    readMins?: number;
  },
  index: number,
): Post {
  return {
    slug: p.slug,
    title: p.title,
    h1: p.h1,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    excerpt: p.excerpt,
    category: p.category,
    keyword: p.keyword,
    readMins: p.readMins ?? 6 + (hash(p.slug) % 3),
    date: isoDate(index),
    updated: "2026-06-18",
    cover: p.cover ?? getAlt("wegovy").cover,
    coverAlt: p.coverAlt ?? p.title,
    sections: p.sections,
    faqs: p.faqs,
  };
}

/* ── 1) comparativas cruzadas ── */
const COMPARE_PAIRS: [string, string][] = [
  ["wegovy", "mounjaro"],
  ["wegovy", "ozempic"],
  ["wegovy", "saxenda"],
  ["mounjaro", "ozempic"],
  ["mounjaro", "saxenda"],
  ["ozempic", "saxenda"],
];

function kindLabel(d: Drug): string {
  return d.kind === "weight" ? "Control del peso (obesidad/sobrepeso)" : "Diabetes tipo 2";
}

function buildComparePost(aKey: string, bKey: string, index: number): Post {
  const a = getAlt(aKey);
  const b = getAlt(bKey);
  const slug = `${a.key}-vs-${b.key}`;
  const vars = { A: cap(a.name), B: cap(b.name), a: a.name, b: b.name, BRAND };

  const sections: Section[] = [
    {
      h2: tpl("{A} vs {B}: ¿cuál es mejor para adelgazar?", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "{A} ({inA}) y {B} ({inB}) son dos análogos del GLP‑1 que se usan en el tratamiento del peso y la diabetes. Se parecen en su mecanismo —reducen el apetito y mejoran el control del azúcar— pero tienen diferencias de potencia, indicación, frecuencia y precio que conviene conocer.",
            { ...vars, inA: a.inn, inB: b.inn },
          ),
        },
        {
          type: "p",
          text: "No existe un «mejor» universal: el más adecuado depende de tu objetivo, tu historial y tu tolerancia. Por eso la elección debe ser siempre médica e individual, nunca basada en lo que le funcionó a otra persona.",
        },
      ],
    },
    {
      h2: tpl("Diferencias entre {A} y {B}", vars),
      blocks: [
        {
          type: "table",
          caption: tpl("Comparativa de {A} y {B}", vars),
          head: ["", cap(a.name), cap(b.name)],
          rows: [
            ["Principio activo", a.inn, b.inn],
            ["Indicación principal", kindLabel(a), kindLabel(b)],
            ["Administración", a.frequency, b.frequency],
            ["Precio orientativo/mes", `${a.priceLow}–${a.priceHigh}`, `${b.priceLow}–${b.priceHigh}`],
            ["Necesita receta", "Sí", "Sí"],
          ],
        },
      ],
    },
    {
      h2: tpl("¿Cuál elegir, {A} o {B}?", vars),
      blocks: [
        {
          type: "list",
          items: [
            tpl("Si buscas control del peso, el médico valora cuál de los dos está indicado y encaja mejor contigo.", vars),
            "La tolerancia digestiva y tu historial pueden inclinar la balanza hacia uno u otro.",
            "La disponibilidad en farmacia y el precio también influyen en la decisión.",
            "En ambos casos, el escalado de dosis debe ser progresivo y supervisado.",
          ],
        },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
        glp1Links(),
      ],
    },
    {
      h2: "Seguridad y efectos secundarios",
      blocks: [
        {
          type: "p",
          text: tpl(
            "Tanto {A} como {B} comparten efectos secundarios similares, sobre todo digestivos (náuseas, digestiones lentas) al inicio y tras subir la dosis. Suelen ser leves y mejoran con la adaptación. Un seguimiento médico permite ajustar la pauta si aparecen molestias.",
            vars,
          ),
        },
      ],
    },
  ];

  const faqs: Faq[] = [
    {
      q: tpl("¿Es más eficaz {A} o {B} para perder peso?", vars),
      a: "Depende del caso. Ambos son eficaces dentro de su indicación; la potencia, la tolerancia y los objetivos individuales determinan cuál conviene. La decisión debe ser médica.",
    },
    {
      q: tpl("¿Puedo cambiar de {A} a {B}?", vars),
      a: "Solo bajo indicación médica. Un endocrino valora si el cambio tiene sentido en tu caso y cómo hacerlo de forma segura.",
    },
    {
      q: tpl("¿{A} y {B} necesitan receta?", vars),
      a: "Sí, ambos son medicamentos de prescripción. Comprarlos sin receta es ilegal y peligroso.",
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: "Reservas la primera visita gratis. El médico valora tu caso y, si procede, te prescribe el tratamiento más adecuado con seguimiento.",
    },
  ];

  return mkPost(
    {
      slug,
      title: tpl("{A} vs {B}", vars),
      h1: tpl("{A} vs {B}: diferencias, eficacia y cuál elegir", vars),
      metaTitle: tpl("{A} vs {B}: diferencias, eficacia y cuál elegir (2026) | {BRAND}", vars),
      metaDescription: tpl(
        "Comparativa de {A} y {B}: principio activo, indicación, precio, eficacia y efectos secundarios. Descubre cuál encaja mejor en tu caso con valoración médica.",
        vars,
      ),
      excerpt: tpl(
        "{A} frente a {B}: en qué se diferencian, cuál es más eficaz según el caso y cómo elegir con criterio médico el tratamiento adecuado.",
        vars,
      ),
      category: CAT_COMPARE,
      keyword: tpl("{a} vs {b}", vars),
      cover: a.cover,
      coverAlt: tpl("Comparativa entre {A} y {B}", vars),
      sections,
      faqs,
    },
    index,
  );
}

/* ── 2) "{fármaco} con receta online" ── */
const RX_ONLINE_KEYS = ["wegovy", "mounjaro", "ozempic", "saxenda", "semaglutida", "tirzepatida"];

function buildRxOnlinePost(drug: Drug, index: number): Post {
  const slug = `receta-${drug.key}-online`;
  const vars = { Drug: cap(drug.name), drug: drug.name, inn: drug.inn, BRAND, frequency: drug.frequency };
  const sections: Section[] = [
    {
      h2: tpl("¿Cómo conseguir la receta de {Drug} online?", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "{Drug} ({inn}) es un medicamento de prescripción: solo se dispensa en farmacia y con receta médica. La buena noticia es que esa receta puedes conseguirla online, mediante una videoconsulta con un médico colegiado, sin listas de espera ni desplazamientos.",
            vars,
          ),
        },
        {
          type: "p",
          text: tpl(
            "Ojo: «receta online» no significa rellenar un formulario y recibir el fármaco. Significa una valoración médica real, en la que el profesional revisa tu historial y decide si {Drug} es adecuado y seguro para ti.",
            vars,
          ),
        },
      ],
    },
    {
      h2: tpl("Paso a paso para tu receta de {Drug}", vars),
      blocks: [
        {
          type: "list",
          items: [
            "Reservas tu primera visita online gratis.",
            tpl("Completas tu historial clínico y tus objetivos desde la app.", vars),
            tpl("Un médico colegiado valora si {Drug} encaja contigo.", vars),
            "Si procede, recibes la receta electrónica válida en toda España.",
            tpl("Retiras {Drug} en tu farmacia y haces el seguimiento desde la app.", vars),
          ],
        },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
        glp1Links(),
      ],
    },
    {
      h2: "Cómo distinguir una receta online legal de una estafa",
      blocks: [
        {
          type: "list",
          items: [
            "Una consulta legal SIEMPRE incluye valoración médica antes de la receta.",
            "El médico está colegiado y se identifica.",
            tpl("No te «venden» {Drug} directamente: te prescriben y tú lo compras en farmacia.", vars),
            "Desconfía de cualquier web que ofrezca el fármaco «sin receta» o sin consulta.",
          ],
        },
      ],
    },
  ];
  const faqs: Faq[] = [
    {
      q: tpl("¿Es legal conseguir la receta de {Drug} online?", vars),
      a: tpl(
        "Sí, siempre que la emita un médico colegiado tras una valoración real. La telemedicina es legal en España y la receta electrónica es válida en toda la red de farmacias.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuánto tarda la receta de {Drug}?", vars),
      a: "Tras la videoconsulta, si el médico lo considera adecuado, puedes recibir la receta electrónica el mismo día.",
    },
    {
      q: tpl("¿Puedo comprar {Drug} sin receta?", vars),
      a: tpl("No. {Drug} es de prescripción; comprarlo sin receta es ilegal y peligroso.", vars),
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: "Reservas la primera visita gratis y, si procede, recibes tu receta con seguimiento.",
    },
  ];
  return mkPost(
    {
      slug,
      title: tpl("Receta de {Drug} online", vars),
      h1: tpl("Receta de {Drug} online: cómo conseguirla legalmente", vars),
      metaTitle: tpl("Receta de {Drug} Online en 24h con Médico Colegiado", vars),
      metaDescription: tpl(
        "Consigue tu receta de {Drug} online de forma legal: videoconsulta con médico colegiado, receta electrónica en 24h y seguimiento. Sin esperas. ¡Primera consulta gratis!",
        vars,
      ),
      excerpt: tpl(
        "Cómo conseguir la receta de {Drug} online de forma legal y sin esperas: valoración médica, receta electrónica válida en toda España y seguimiento.",
        vars,
      ),
      category: drug.category,
      keyword: tpl("receta {drug} online", vars),
      cover: drug.cover,
      coverAlt: tpl("Receta de {Drug} online con médico colegiado", vars),
      sections,
      faqs,
    },
    index,
  );
}

/* ── 3) servicio / clínica online (bespoke) ── */
function buildServicePosts(startIndex: number): Post[] {
  let i = startIndex;
  const posts: Post[] = [];

  posts.push(
    mkPost(
      {
        slug: "endocrino-online",
        title: "Endocrino online",
        h1: "Endocrino online: consulta de endocrinología por videollamada",
        metaTitle: "Endocrino online: consulta de endocrinología sin esperas | DoctorLife",
        metaDescription:
          "Consulta con un endocrino online colegiado para peso, diabetes y tiroides. Videoconsulta, receta electrónica si procede y seguimiento. ¡Primera consulta gratis!",
        excerpt:
          "Cómo funciona una consulta de endocrinología online: para qué sirve, qué puede recetar el médico y cómo empezar sin listas de espera.",
        category: CAT_GUIDE,
        keyword: "endocrino online",
        sections: [
          {
            h2: "¿Qué es una consulta de endocrino online?",
            blocks: [
              {
                type: "p",
                text: "Un endocrino online es un médico especialista en endocrinología que te atiende por videoconsulta. Puede valorar problemas de peso, diabetes, tiroides o metabolismo, revisar tu historial y, si procede, emitir una receta electrónica válida en toda España.",
              },
              {
                type: "p",
                text: "Es la vía más rápida para acceder a un especialista sin las largas listas de espera de la endocrinología, y con la comodidad de hacerlo desde casa.",
              },
            ],
          },
          {
            h2: "¿Para qué sirve y qué puede recetar?",
            blocks: [
              {
                type: "list",
                items: [
                  "Valoración de sobrepeso y obesidad, con tratamiento GLP‑1 si está indicado.",
                  "Control de diabetes tipo 2 y ajuste de tratamiento.",
                  "Orientación en problemas de tiroides y metabolismo.",
                  "Seguimiento continuo y ajustes de dosis desde la app.",
                ],
              },
              { type: "p", text: tpl(SERVICE_CTA, { BRAND }) },
              glp1Links(),
            ],
          },
          {
            h2: "Ventajas frente a la consulta presencial",
            blocks: [
              {
                type: "list",
                items: [
                  "Sin listas de espera: cita en poco tiempo.",
                  "Sin desplazamientos: todo desde el móvil.",
                  "Seguimiento continuo por chat, no solo en la visita.",
                  "Receta electrónica válida en cualquier farmacia de España.",
                ],
              },
            ],
          },
        ],
        faqs: [
          {
            q: "¿Un endocrino online puede recetar?",
            a: "Sí. Si está colegiado y tras una valoración médica, puede emitir receta electrónica válida en toda España.",
          },
          {
            q: "¿Es fiable la endocrinología online?",
            a: "Sí, siempre que la realice un médico colegiado con valoraci��n real. La telemedicina está reconocida y regulada en España.",
          },
          {
            q: "¿Cuánto cuesta la primera consulta?",
            a: "En DoctorLife la primera visita es gratis.",
          },
        ],
        cover: getAlt("ozempic").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "clinica-adelgazar-online",
        title: "Clínica para adelgazar online",
        h1: "Clínica para adelgazar online: cómo elegir y qué esperar",
        metaTitle: "Clínica para adelgazar online: cómo funciona y cuál elegir | DoctorLife",
        metaDescription:
          "Qué es una clínica para adelgazar online, cómo funciona el tratamiento médico del peso con GLP‑1 y cómo elegir un servicio serio y legal. ¡Primera consulta gratis!",
        excerpt:
          "Qué ofrece una clínica para adelgazar online, cómo distinguir una seria de una dudosa y cómo es el tratamiento médico del peso paso a paso.",
        category: CAT_SLIM,
        keyword: "clínica para adelgazar online",
        sections: [
          {
            h2: "¿Cómo funciona una clínica para adelgazar online?",
            blocks: [
              {
                type: "p",
                text: "Una clínica para adelgazar online ofrece tratamiento médico del peso por videoconsulta: valoración por un médico, plan personalizado y, si está indicado, prescripción de fármacos GLP‑1 con seguimiento. Todo sin desplazamientos.",
              },
              {
                type: "p",
                text: "A diferencia de los productos «milagro», un servicio médico serio se basa en evidencia, valora tu salud y acompaña el proceso con seguimiento real.",
              },
            ],
          },
          {
            h2: "Cómo distinguir una clínica seria",
            blocks: [
              {
                type: "list",
                items: [
                  "Médicos colegiados que valoran tu caso antes de recetar.",
                  "No vende el medicamento directamente: lo prescribe y tú lo compras en farmacia.",
                  "Ofrece seguimiento, no solo una receta puntual.",
                  "Es transparente con los precios y sin permanencia.",
                ],
              },
              { type: "p", text: tpl(SERVICE_CTA, { BRAND }) },
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Es seguro adelgazar con una clínica online?",
            a: "Sí, si es un servicio con médicos colegiados, valoración real y seguimiento. Desconfía de quien vende fármacos sin consulta.",
          },
          {
            q: "¿Qué incluye el tratamiento?",
            a: "Valoración médica, prescripción si procede, y seguimiento con ajustes de dosis desde la app.",
          },
          {
            q: "¿Cuánto cuesta empezar?",
            a: "La primera valoración es gratis. Después eliges tu plan: 139 €/mes sin permanencia, pack de 5 meses por 449 € o nutricionista + GLP1 por 649 €.",
          },
        ],
        cover: getAlt("wegovy").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "tratamiento-obesidad-online",
        title: "Tratamiento de la obesidad online",
        h1: "Tratamiento de la obesidad online: opciones médicas y cómo empezar",
        metaTitle: "Tratamiento de la obesidad online: opciones médicas reales | DoctorLife",
        metaDescription:
          "Tratamiento m��dico de la obesidad online: valoración por endocrino, fármacos GLP‑1 cuando están indicados y seguimiento. La primera visita es gratis.",
        excerpt:
          "Qué opciones médicas existen para tratar la obesidad online, cuándo se indican los GLP‑1 y cómo es el acompañamiento médico.",
        category: CAT_SLIM,
        keyword: "tratamiento obesidad online",
        sections: [
          {
            h2: "La obesidad es una enfermedad, y tiene tratamiento médico",
            blocks: [
              {
                type: "p",
                text: "La obesidad no es una cuestión de fuerza de voluntad: es una enfermedad crónica con base biológica. Por eso el tratamiento más eficaz combina cambios de hábitos con apoyo médico y, cuando está indicado, fármacos como los análogos del GLP‑1.",
              },
            ],
          },
          {
            h2: "Opciones de tratamiento médico",
            blocks: [
              {
                type: "list",
                items: [
                  "Valoración por un endocrino y plan individualizado.",
                  "Fármacos GLP‑1 (Wegovy, Mounjaro) si están indicados.",
                  "Acompañamiento en hábitos de alimentación y actividad.",
                  "Seguimiento continuo para mantener resultados y evitar el rebote.",
                ],
              },
              { type: "p", text: tpl(SERVICE_CTA, { BRAND }) },
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Cuál es el mejor tratamiento para la obesidad?",
            a: "El que indique tu médico según tu caso. Hoy los GLP‑1 son una de las opciones más eficaces cuando están indicados, siempre con seguimiento.",
          },
          {
            q: "¿Puedo tratar la obesidad sin ir a una clínica?",
            a: "Sí. La valoración, la prescripción y el seguimiento pueden hacerse online con un médico colegiado.",
          },
          {
            q: "¿Cómo empiezo?",
            a: "Reservas la primera visita gratis y el médico define tu plan.",
          },
        ],
        cover: getAlt("mounjaro").cover,
      },
      i++,
    ),
  );

  return posts;
}

/* ── 4) desabastecimiento / dónde conseguir ── */
const STOCK_KEYS = ["ozempic", "wegovy", "mounjaro"];

function buildStockPost(drug: Drug, index: number): Post {
  const slug = `${drug.key}-desabastecimiento-donde-comprar`;
  const vars = { Drug: cap(drug.name), drug: drug.name, inn: drug.inn, BRAND };
  const sections: Section[] = [
    {
      h2: tpl("¿Por qué hay desabastecimiento de {Drug}?", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "La altísima demanda de los análogos del GLP‑1 ha provocado problemas de suministro de {Drug} en muchas farmacias de España. No es un problema de tu farmacia concreta: es una situación global que afecta de forma intermitente a la disponibilidad.",
            vars,
          ),
        },
      ],
    },
    {
      h2: tpl("Qué hacer si no encuentras {Drug}", vars),
      blocks: [
        {
          type: "list",
          items: [
            tpl("Pregunta en varias farmacias: el stock de {Drug} varía mucho de un día a otro.", vars),
            "Tu farmacia puede consultar la disponibilidad con la distribuidora.",
            tpl("Habla con tu médico: puede valorar una alternativa equivalente si {Drug} no está disponible.", vars),
            "Desconf��a de las webs que «siempre tienen stock» sin receta: es producto ilegal y peligroso.",
          ],
        },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
        glp1Links(),
      ],
    },
    {
      h2: "Alternativas cuando hay desabastecimiento",
      blocks: [
        {
          type: "p",
          text: tpl(
            "Si {Drug} está agotado, un médico puede valorar otras opciones de GLP‑1 con indicación similar y ajustar la pauta. Nunca cambies de tratamiento por tu cuenta: cada fármaco tiene su dosis y su escalado.",
            vars,
          ),
        },
      ],
    },
  ];
  const faqs: Faq[] = [
    {
      q: tpl("¿Hasta cuándo durará el desabastecimiento de {Drug}?", vars),
      a: "Es intermitente y depende de la demanda y la producción. La disponibilidad mejora y empeora por temporadas; tu farmacia tiene la información más actualizada.",
    },
    {
      q: tpl("¿Puedo comprar {Drug} en webs que dicen tener stock?", vars),
      a: tpl("No. Las webs que venden {Drug} sin receta son ilegales y el producto no tiene garantías. Es peligroso.", vars),
    },
    {
      q: tpl("¿Hay alternativas a {Drug}?", vars),
      a: "Sí, un médico puede valorar otros GLP‑1 según tu caso si hay problemas de suministro.",
    },
    {
      q: "¿Cómo empiezo con DoctorLife?",
      a: "Reservas la primera visita gratis y el médico valora la mejor opción disponible para ti.",
    },
  ];
  return mkPost(
    {
      slug,
      title: tpl("{Drug} desabastecimiento: dónde comprar", vars),
      h1: tpl("Desabastecimiento de {Drug}: dónde comprar y qué hacer", vars),
      metaTitle: tpl("{Drug} desabastecimiento: dónde comprar y alternativas (2026) | {BRAND}", vars),
      metaDescription: tpl(
        "¿{Drug} agotado? Por qué hay desabastecimiento, qué hacer para encontrarlo, alternativas con receta y cómo evitar las webs ilegales. Valoración médica online.",
        vars,
      ),
      excerpt: tpl(
        "{Drug} está agotado en muchas farmacias. Te explicamos por qué, qué hacer para conseguirlo y qué alternativas con receta puede valorar tu médico.",
        vars,
      ),
      category: drug.category,
      keyword: tpl("{drug} desabastecimiento", vars),
      cover: drug.cover,
      coverAlt: tpl("Desabastecimiento de {Drug} en farmacias de España", vars),
      sections,
      faqs,
    },
    index,
  );
}

/* ── 5) tope de embudo + 6) por condición (bespoke) ── */
function buildFunnelPosts(startIndex: number): Post[] {
  let i = startIndex;
  const posts: Post[] = [];
  const cta: Block = { type: "p", text: tpl(SERVICE_CTA, { BRAND }) };

  posts.push(
    mkPost(
      {
        slug: "pastillas-para-adelgazar-que-funcionan",
        title: "Pastillas para adelgazar que funcionan",
        h1: "Pastillas para adelgazar que funcionan: qué dice la evidencia",
        metaTitle: "Pastillas para adelgazar que funcionan de verdad (2026) | DoctorLife",
        metaDescription:
          "��Qué pastillas para adelgazar funcionan de verdad? Diferencia entre productos sin evidencia y los tratamientos médicos como los GLP‑1. Valoración médica online.",
        excerpt:
          "La mayoría de «pastillas milagro» no funcionan. Te explicamos qué tratamientos sí tienen evidencia y cómo acceder a ellos de forma segura.",
        category: CAT_SLIM,
        keyword: "pastillas para adelgazar que funcionan",
        sections: [
          {
            h2: "¿Funcionan las pastillas para adelgazar?",
            blocks: [
              {
                type: "p",
                text: "La gran mayoría de «pastillas para adelgazar» que se venden sin receta (quemagrasas, complementos, infusiones) carecen de evidencia sólida y no producen una pérdida de peso significativa ni sostenible. Muchas solo aligeran tu cartera.",
              },
              {
                type: "p",
                text: "Lo que sí ha demostrado eficacia son los tratamientos médicos, especialmente los análogos del GLP‑1 (como semaglutida o tirzepatida), que actúan sobre el apetito y se usan bajo prescripción y seguimiento.",
              },
            ],
          },
          {
            h2: "Qué sí funciona, según la evidencia",
            blocks: [
              {
                type: "list",
                items: [
                  "Fármacos GLP‑1 (Wegovy, Mounjaro) cuando están indicados.",
                  "Cambios de hábitos sostenibles en alimentación y actividad.",
                  "Acompañamiento médico para ajustar el tratamiento y mantener resultados.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Hay alguna pastilla para adelgazar realmente eficaz?",
            a: "Los tratamientos con evidencia son fármacos de prescripción como los GLP‑1, no los complementos de venta libre. Deben usarse con valoración médica.",
          },
          {
            q: "¿Los quemagrasas funcionan?",
            a: "No de forma significativa ni sostenible. La mayoría carece de evidencia sólida.",
          },
          {
            q: "¿Cómo accedo a un tratamiento que funcione?",
            a: "Con una consulta médica. En DoctorLife la primera visita es gratis.",
          },
        ],
        cover: getAlt("wegovy").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "inyeccion-para-adelgazar",
        title: "Inyección para adelgazar",
        h1: "Inyección para adelgazar: qué es, cómo funciona y cuáles hay",
        metaTitle: "Inyección para adelgazar: cuáles funcionan y cómo conseguirlas | DoctorLife",
        metaDescription:
          "Qué es la inyección para adelgazar (GLP‑1 como Wegovy o Mounjaro), cómo funciona, qué resultados da y cómo conseguirla de forma legal con receta médica.",
        excerpt:
          "Las «inyecciones para adelgazar» son los fármacos GLP‑1. Te explicamos cómo funcionan, qué esperar y cómo conseguirlas de forma legal y segura.",
        category: CAT_SLIM,
        keyword: "inyección para adelgazar",
        sections: [
          {
            h2: "¿Qué es la inyección para adelgazar?",
            blocks: [
              {
                type: "p",
                text: "Cuando se habla de «la inyección para adelgazar» se hace referencia a los análogos del GLP‑1: fármacos como Wegovy (semaglutida) o Mounjaro (tirzepatida) que se administran mediante una inyección subcutánea, normalmente semanal.",
              },
              {
                type: "p",
                text: "Actúan reduciendo el apetito y la sensación de hambre, lo que ayuda a comer menos sin esfuerzo constante. No son un producto estético: son medicamentos de prescripción con indicación médica.",
              },
            ],
          },
          {
            h2: "Cómo conseguirla de forma legal",
            blocks: [
              {
                type: "list",
                items: [
                  "Requiere receta médica: no se vende sin prescripción.",
                  "Un médico valora si está indicada en tu caso.",
                  "Se administra con un escalado de dosis progresivo.",
                  "El seguimiento médico es clave para resultados y seguridad.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Cuál es la mejor inyección para adelgazar?",
            a: "Depende del caso. Wegovy y Mounjaro son las opciones aprobadas más usadas; el médico valora cuál encaja contigo.",
          },
          {
            q: "¿La inyección para adelgazar necesita receta?",
            a: "Sí, siempre. Son medicamentos de prescripción y comprarlos sin receta es ilegal y peligroso.",
          },
          {
            q: "¿Cómo empiezo?",
            a: "Reservas la primera visita gratis y, si procede, el médico te la prescribe con seguimiento.",
          },
        ],
        cover: getAlt("wegovy").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "alternativa-natural-a-ozempic",
        title: "Alternativa natural a Ozempic",
        h1: "Alternativa natural a Ozempic: ¿existe de verdad?",
        metaTitle: "Alternativa natural a Ozempic: qué hay de cierto | DoctorLife",
        metaDescription:
          "¿Existe una alternativa natural a Ozempic? Te explicamos qué hay de cierto, por qué nada iguala al GLP‑1 y qué opciones médicas reales tienes para adelgazar.",
        excerpt:
          "Muchos buscan una «alternativa natural a Ozempic». Te explicamos con honestidad qué funciona, qué no y qué opciones médicas reales existen.",
        category: CAT_SLIM,
        keyword: "alternativa natural a ozempic",
        sections: [
          {
            h2: "¿Existe una alternativa natural a Ozempic?",
            blocks: [
              {
                type: "p",
                text: "No existe ningún suplemento, infusión ni alimento «natural» que reproduzca el efecto de Ozempic (semaglutida). Productos que se venden como «Ozempic natural» no tienen evidencia de que produzcan una pérdida de peso comparable.",
              },
              {
                type: "p",
                text: "Sí hay hábitos que apoyan el control del apetito (proteína suficiente, fibra, buen descanso, actividad física), pero su efecto es modesto comparado con un tratamiento médico indicado.",
              },
            ],
          },
          {
            h2: "Qué opciones reales tienes",
            blocks: [
              {
                type: "list",
                items: [
                  "Hábitos de alimentación y actividad como base imprescindible.",
                  "Tratamiento médico con GLP‑1 si está indicado, con receta y seguimiento.",
                  "Valoración por un endocrino para elegir la opción adecuada.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Qué es lo más parecido a Ozempic natural?",
            a: "Nada natural iguala su efecto. Los hábitos ayudan, pero el tratamiento eficaz es médico y de prescripción.",
          },
          {
            q: "¿Los suplementos «Ozempic natural» funcionan?",
            a: "No hay evidencia de que produzcan una pérdida de peso comparable. Cuidado con la publicidad engañosa.",
          },
          {
            q: "¿Cómo accedo a un tratamiento real?",
            a: "Con una consulta médica. En DoctorLife la primera visita es gratis.",
          },
        ],
        cover: getAlt("ozempic").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "como-bajar-10-kilos",
        title: "Cómo bajar 10 kilos",
        h1: "Cómo bajar 10 kilos de forma saludable y sostenible",
        metaTitle: "Cómo bajar 10 kilos de forma saludable y mantenerlos | DoctorLife",
        metaDescription:
          "Cómo bajar 10 kilos de forma realista y sostenible: hábitos, cuándo ayuda un tratamiento médico GLP‑1 y cómo evitar recuperar el peso. Valoración médica online.",
        excerpt:
          "Bajar 10 kilos es posible con un enfoque realista. Te explicamos qué funciona, cuándo ayuda un tratamiento médico y cómo no recuperar el peso.",
        category: CAT_SLIM,
        keyword: "cómo bajar 10 kilos",
        sections: [
          {
            h2: "¿Es realista bajar 10 kilos?",
            blocks: [
              {
                type: "p",
                text: "Sí, pero no de un día para otro. Una pérdida de peso saludable es progresiva y sostenible en el tiempo. Las dietas extremas suelen fallar porque provocan el efecto rebote: se recupera lo perdido (y a veces más).",
              },
              {
                type: "p",
                text: "Cuando el sobrepeso es relevante o las dietas no funcionan, un tratamiento médico puede marcar la diferencia. Los análogos del GLP‑1 ayudan a controlar el apetito y facilitan mantener el déficit.",
              },
            ],
          },
          {
            h2: "Claves para bajar 10 kilos y mantenerlos",
            blocks: [
              {
                type: "list",
                items: [
                  "Prioriza proteína y alimentos saciantes.",
                  "Incluye actividad física para preservar masa muscular.",
                  "Plantéalo a medio plazo, no como un sprint.",
                  "Si cuesta, valora con un médico si un tratamiento GLP‑1 está indicado.",
                  "Planifica el mantenimiento desde el principio.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Cuánto se tarda en bajar 10 kilos?",
            a: "De forma saludable, varios meses. La velocidad depende de tu punto de partida, tus hábitos y, en su caso, el tratamiento.",
          },
          {
            q: "¿Ayuda un GLP‑1 a bajar 10 kilos?",
            a: "Puede ayudar cuando está indicado, controlando el apetito. Debe usarse con valoración y seguimiento médico.",
          },
          {
            q: "¿Cómo empiezo?",
            a: "Reservas la primera visita gratis y el médico define tu plan.",
          },
        ],
        cover: getAlt("wegovy").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "adelgazar-con-diabetes-tipo-2",
        title: "Adelgazar con diabetes tipo 2",
        h1: "Adelgazar con diabetes tipo 2: tratamiento y opciones",
        metaTitle: "Adelgazar con diabetes tipo 2: opciones médicas reales | DoctorLife",
        metaDescription:
          "Cómo adelgazar con diabetes tipo 2 de forma segura: por qué importa, qué papel juegan los GLP‑1 y cómo abordarlo con seguimiento médico. ¡Primera consulta gratis!",
        excerpt:
          "Perder peso con diabetes tipo 2 mejora el control de la enfermedad. Te explicamos las opciones médicas y cómo abordarlo con seguridad.",
        category: CAT_SLIM,
        keyword: "adelgazar con diabetes tipo 2",
        sections: [
          {
            h2: "Por qué adelgazar mejora la diabetes tipo 2",
            blocks: [
              {
                type: "p",
                text: "En la diabetes tipo 2, perder peso mejora el control del azúcar en sangre y puede reducir la necesidad de medicación. Por eso el abordaje del peso es una parte central del tratamiento, no un objetivo estético.",
              },
            ],
          },
          {
            h2: "Opciones médicas para perder peso con diabetes",
            blocks: [
              {
                type: "p",
                text: "Algunos fármacos para la diabetes, como los análogos del GLP‑1, ayudan además a perder peso. Un endocrino puede valorar cuál encaja en tu caso, teniendo en cuenta tu control glucémico y tu medicación actual.",
              },
              {
                type: "list",
                items: [
                  "Valoración conjunta de la diabetes y el peso.",
                  "Tratamiento GLP‑1 cuando está indicado.",
                  "Ajuste del resto de medicación si es necesario.",
                  "Seguimiento continuo de glucosa y peso.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Puedo usar Ozempic para adelgazar si tengo diabetes?",
            a: "Ozempic está indicado para la diabetes tipo 2 y puede favorecer la pérdida de peso. El médico valora la pauta adecuada a tu caso.",
          },
          {
            q: "¿Es seguro adelgazar con diabetes?",
            a: "Sí, con seguimiento médico. De hecho, perder peso suele mejorar el control de la enfermedad.",
          },
          {
            q: "¿Cómo empiezo?",
            a: "Reservas la primera visita gratis y un endocrino valora tu caso.",
          },
        ],
        cover: getAlt("ozempic").cover,
      },
      i++,
    ),
  );

  posts.push(
    mkPost(
      {
        slug: "adelgazar-en-la-menopausia",
        title: "Adelgazar en la menopausia",
        h1: "Adelgazar en la menopausia: por qué cuesta más y qué ayuda",
        metaTitle: "Adelgazar en la menopausia: por qué cuesta y qué funciona | DoctorLife",
        metaDescription:
          "Por qué se gana peso en la menopausia y cómo adelgazar de forma realista: hábitos, cuándo ayuda un tratamiento médico GLP‑1 y seguimiento. ¡Primera consulta gratis!",
        excerpt:
          "En la menopausia cuesta más perder peso por los cambios hormonales. Te explicamos qué funciona y cuándo un tratamiento médico puede ayudar.",
        category: CAT_SLIM,
        keyword: "adelgazar en la menopausia",
        sections: [
          {
            h2: "¿Por qué cuesta más adelgazar en la menopausia?",
            blocks: [
              {
                type: "p",
                text: "Los cambios hormonales de la menopausia (sobre todo la caída de estrógenos) favorecen la acumulación de grasa abdominal y reducen el metabolismo. A eso se suma la pérdida de masa muscular con la edad. Por eso muchas mujeres notan que «lo de siempre» ya no funciona.",
              },
            ],
          },
          {
            h2: "Qué ayuda de verdad",
            blocks: [
              {
                type: "list",
                items: [
                  "Refuerzo de proteína y entrenamiento de fuerza para preservar músculo.",
                  "Hábitos sostenibles más que dietas restrictivas.",
                  "Valoración médica: a veces un tratamiento GLP‑1 está indicado.",
                  "Acompañamiento para mantener resultados a largo plazo.",
                ],
              },
              cta,
              glp1Links(),
            ],
          },
        ],
        faqs: [
          {
            q: "¿Funcionan los GLP‑1 en la menopausia?",
            a: "Pueden ayudar cuando están indicados, igual que en otras etapas. El médico valora tu caso de forma individual.",
          },
          {
            q: "¿Es normal ganar peso en la menopausia?",
            a: "Es frecuente por los cambios hormonales, pero se puede abordar con hábitos y, si procede, tratamiento médico.",
          },
          {
            q: "¿Cómo empiezo?",
            a: "Reservas la primera visita gratis y el médico define tu plan.",
          },
        ],
        cover: getAlt("wegovy").cover,
      },
      i++,
    ),
  );

  return posts;
}

/* ═══════════════════════════════════════════════════════════
   CLUSTERS LOCALES DE SERVICIO (fármaco-agnósticos, por ciudad)
   Intención de compra local muy alta y ángulo legalmente limpio:
   venden la CONSULTA médica (no el medicamento).
   - clinica-adelgazar-{ciudad}
   - endocrino-{ciudad}
   - tratamiento-para-adelgazar-{ciudad}
   Cada cluster tiene su propia copia; las variantes por ciudad
   (pick por slug) hacen único cada artículo.
   ═══════════════════════════════════════════════════════════ */

type LocalCluster = {
  id: string;
  slug: (c: City) => string;
  category: string;
  keyword: (c: City) => string;
  title: (c: City) => string;
  h1: (c: City) => string;
  metaTitle: (c: City) => string;
  metaDescription: (c: City) => string;
  excerpt: (c: City) => string;
  cover: string;
  // Pools de texto (se elige variante por ciudad para unicidad).
  introH2: string;
  intros: string[][]; // cada variante = varios párrafos
  whyH2: string;
  why: string[];
  optionsH2: string;
  optionsIntro: string[];
  localH2: string;
  local: string[];
  faqs: (c: City) => Faq[];
};

// Tabla de opciones de tratamiento del peso reutilizada por los clusters locales.
function weightOptionsTable(): Block {
  const w = getAlt("wegovy");
  const m = getAlt("mounjaro");
  const s = getAlt("saxenda");
  return {
    type: "table",
    caption: "Tratamientos médicos del peso que el endocrino puede valorar",
    head: ["Tratamiento", "Principio activo", "Pauta", "Precio orientativo/mes"],
    rows: [
      [cap(w.name), w.inn, w.frequency, `${w.priceLow}–${w.priceHigh}`],
      [cap(m.name), m.inn, m.frequency, `${m.priceLow}–${m.priceHigh}`],
      [cap(s.name), s.inn, s.frequency, `${s.priceLow}–${s.priceHigh}`],
    ],
  };
}

const LOCAL_STEPS: string[][] = [
  [
    "Reservas tu primera visita online gratis desde {City}.",
    "Completas tu historial clínico y tus objetivos desde la app, sin desplazarte.",
    "Un endocrino colegiado valora tu caso y, si procede, define el tratamiento.",
    "Recibes la receta electrónica válida en cualquier farmacia de {City}.",
    "Haces el seguimiento y los ajustes de dosis desde la app, sin nuevas esperas.",
  ],
  [
    "Haces la consulta online gratis desde cualquier punto de {City}.",
    "Respondes a un cuestionario médico sobre tu salud, tu peso y tus objetivos.",
    "El médico revisa tu caso y decide el plan más adecuado para ti.",
    "Si procede, te llega la prescripción y la pauta de inicio.",
    "Recoges el tratamiento en tu farmacia de {City} y te acompañamos en cada ajuste.",
  ],
];

const LOCAL_CLUSTERS: LocalCluster[] = [
  {
    id: "clinica-adelgazar",
    slug: (c) => `clinica-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `clínica para adelgazar ${c.name}`,
    title: (c) => `Clínica para adelgazar en ${c.name}`,
    h1: (c) => `Clínica para adelgazar en ${c.name}: tratamiento médico del peso`,
    metaTitle: (c) =>
      `Clínica para adelgazar en ${c.name}: tratamiento médico online | DoctorLife`,
    metaDescription: (c) =>
      `Clínica para adelgazar en ${c.name} con endocrino colegiado: valoración online, tratamiento GLP‑1 si procede y seguimiento. ¡Primera consulta gratis, sin esperas!`,
    excerpt: (c) =>
      `Cómo funciona una clínica para adelgazar en ${c.name}: valoración médica, tratamiento del peso con GLP‑1 cuando está indicado y seguimiento, todo online.`,
    cover: getAlt("wegovy").cover,
    introH2: "¿Cómo funciona una clínica para adelgazar en {City}?",
    intros: [
      [
        "En {City} cada vez más personas buscan una clínica para adelgazar que ofrezca un enfoque médico real, no productos «milagro». La pérdida de peso sostenible empieza por una valoración profesional que descarte causas de fondo y defina un plan a tu medida.",
        "Con {BRAND} accedes a ese acompañamiento médico sin desplazarte por {City}: la consulta es online, con endocrino colegiado, y si el tratamiento con GLP‑1 está indicado, recibes la receta y el seguimiento desde la app.",
      ],
      [
        "Una clínica para adelgazar seria en {City} no te vende una caja y te deja solo: valora tu salud, define un plan y te acompaña. Ese es el modelo de {BRAND}, con la ventaja de que todo se hace online y sin listas de espera.",
        "Un endocrino colegiado revisa tu caso, decide si un fármaco GLP‑1 es adecuado para ti y ajusta la dosis a lo largo del tratamiento. Tú solo recoges la medicación en tu farmacia de {City}.",
      ],
    ],
    whyH2: "Por qué elegir un enfoque médico para adelgazar",
    why: [
      "El sobrepeso y la obesidad son problemas de salud con base biológica, no una cuestión de fuerza de voluntad. Por eso el abordaje más eficaz combina cambios de hábitos con apoyo médico y, cuando está indicado, fármacos análogos del GLP‑1 con seguimiento.",
      "Frente a los productos sin evidencia, una clínica médica valora tu caso, vigila los efectos secundarios y ajusta el tratamiento. Eso marca la diferencia entre perder peso de forma puntual y mantenerlo en el tiempo.",
    ],
    optionsH2: "Opciones de tratamiento médico del peso",
    optionsIntro: [
      "Si tras la valoración el médico considera que un tratamiento farmacológico es adecuado, en {City} puede valorar distintas opciones de GLP‑1 según tu objetivo, tu tolerancia y tu presupuesto:",
      "No todos los tratamientos encajan en todos los casos. El endocrino elige, si procede, entre las opciones disponibles la más adecuada para ti:",
    ],
    localH2: "Adelgazar en {City} sin listas de espera",
    local: [
      "El principal obstáculo en {City} no suele ser el precio, sino conseguir una valoración médica seria sin esperar semanas. {BRAND} resuelve precisamente eso: consulta online con endocrino y receta electrónica válida en toda España.",
      "Muchos pacientes de {City} descubren que la cita con el especialista tarda demasiado. Con la consulta online de {BRAND} obtienes la valoración en poco tiempo y empiezas, si procede, con seguimiento real.",
    ],
    faqs: (c) => [
      {
        q: `¿Es fiable una clínica para adelgazar online en ${c.name}?`,
        a: "Sí, siempre que la atiendan médicos colegiados con valoración real y seguimiento. Desconfía de quien vende fármacos sin consulta previa.",
      },
      {
        q: `¿Qué incluye el tratamiento en ${c.name}?`,
        a: "Valoración médica, prescripción si está indicada, y seguimiento con ajustes de dosis desde la app. La medicación la recoges en tu farmacia.",
      },
      {
        q: "¿Cuánto cuesta empezar?",
        a: "La primera visita es gratis. Después, una suscripción sin permanencia.",
      },
      {
        q: "¿Tengo que ir presencialmente?",
        a: "No. Toda la valoración y el seguimiento son online; solo acudes a tu farmacia a recoger el tratamiento.",
      },
    ],
  },
  {
    id: "endocrino",
    slug: (c) => `endocrino-${c.slug}`,
    category: "Guías",
    keyword: (c) => `endocrino ${c.name}`,
    title: (c) => `Endocrino en ${c.name}`,
    h1: (c) => `Endocrino en ${c.name}: consulta online sin listas de espera`,
    metaTitle: (c) =>
      `Endocrino en ${c.name}: consulta online sin esperas | DoctorLife`,
    metaDescription: (c) =>
      `Consulta con un endocrino en ${c.name} de forma online: valoración de peso, diabetes y tiroides, receta electrónica si procede y seguimiento. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Cómo acceder a un endocrino en ${c.name} sin listas de espera: consulta online, para qué sirve, qué puede recetar y cómo empezar.`,
    cover: getAlt("ozempic").cover,
    introH2: "¿Cómo conseguir cita con un endocrino en {City}?",
    intros: [
      [
        "Conseguir cita con un endocrino en {City} puede llevar semanas o meses, sobre todo por la vía pública. La consulta online de {BRAND} te conecta con un endocrino colegiado en poco tiempo y sin desplazarte.",
        "El especialista valora problemas de peso, diabetes tipo 2 o metabolismo, revisa tu historial y, si procede, emite una receta electrónica válida en cualquier farmacia de {City}.",
      ],
      [
        "En {City}, el acceso a endocrinología suele estar saturado. Por eso muchas personas recurren a la consulta online: misma especialidad, médico colegiado y sin esperas interminables.",
        "Con {BRAND}, el endocrino revisa tu caso por videoconsulta y define un plan. Si necesitas tratamiento, recibes la prescripción y el seguimiento desde la app.",
      ],
    ],
    whyH2: "¿Para qué sirve un endocrino y qué puede recetar?",
    why: [
      "Un endocrino es el especialista en hormonas y metabolismo. Atiende el sobrepeso y la obesidad, la diabetes tipo 2, los problemas de tiroides y otras alteraciones metabólicas, y puede prescribir el tratamiento adecuado a cada caso.",
      "En el control del peso, el endocrino valora si un fármaco GLP‑1 (como Wegovy o Mounjaro) está indicado, define la dosis y supervisa la evolución para que el tratamiento sea seguro y eficaz.",
    ],
    optionsH2: "Tratamientos del peso que puede valorar el endocrino",
    optionsIntro: [
      "Si tu objetivo es perder peso y el endocrino lo considera adecuado, en {City} puede valorar distintas opciones de GLP‑1:",
      "Cuando está indicado, el endocrino elige entre las opciones disponibles la que mejor encaja en tu caso:",
    ],
    localH2: "Ventajas de la consulta de endocrino online en {City}",
    local: [
      "Sin listas de espera, sin desplazamientos por {City} y con seguimiento continuo por chat, no solo en la visita. La receta electrónica es válida en cualquier farmacia de España.",
      "La endocrinología online no sustituye una urgencia, pero para valorar el peso, ajustar tratamiento y hacer seguimiento es una vía cómoda, rápida y reconocida en {City}.",
    ],
    faqs: (c) => [
      {
        q: `¿Un endocrino online puede recetar en ${c.name}?`,
        a: "Sí. Si está colegiado y tras una valoración médica, emite receta electrónica válida en toda España, incluida cualquier farmacia de tu ciudad.",
      },
      {
        q: `¿Cuánto tarda la cita con el endocrino en ${c.name}?`,
        a: "Por la vía online de DoctorLife, en poco tiempo, frente a las semanas habituales de la lista de espera.",
      },
      {
        q: "¿Cuánto cuesta la primera consulta?",
        a: "La primera visita es gratis.",
      },
      {
        q: "¿Es fiable la endocrinología online?",
        a: "Sí, siempre que la realice un médico colegiado con valoración real. La telemedicina está reconocida y regulada en España.",
      },
    ],
  },
  {
    id: "tratamiento-adelgazar",
    slug: (c) => `tratamiento-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `tratamiento para adelgazar ${c.name}`,
    title: (c) => `Tratamiento para adelgazar en ${c.name}`,
    h1: (c) => `Tratamiento para adelgazar en ${c.name}: opciones médicas (GLP‑1)`,
    metaTitle: (c) =>
      `Tratamiento para adelgazar en ${c.name}: opciones médicas reales | DoctorLife`,
    metaDescription: (c) =>
      `Tratamiento médico para adelgazar en ${c.name}: valoración por endocrino, fármacos GLP‑1 cuando están indicados y seguimiento. La primera visita es gratis.`,
    excerpt: (c) =>
      `Qué tratamientos médicos para adelgazar existen en ${c.name}, cuándo se indican los GLP‑1 y cómo empezar con valoración y seguimiento médico.`,
    cover: getAlt("mounjaro").cover,
    introH2: "¿Qué tratamiento para adelgazar puedo seguir en {City}?",
    intros: [
      [
        "En {City} existen tratamientos médicos para adelgazar que van mucho más allá de las dietas y los productos sin evidencia. Los más eficaces hoy son los análogos del GLP‑1, que actúan sobre el apetito y se usan bajo prescripción y seguimiento.",
        "Con {BRAND}, un endocrino colegiado valora tu caso online desde {City} y, si el tratamiento es adecuado, te lo prescribe con seguimiento desde la app. No necesitas desplazarte ni esperar semanas.",
      ],
      [
        "Si en {City} has probado dietas sin resultados duraderos, puede que necesites un enfoque médico. Los tratamientos GLP‑1 ayudan a controlar el apetito y facilitan mantener el déficit, siempre con valoración y seguimiento.",
        "El proceso con {BRAND} es online y sencillo: consulta, valoración del endocrino y, si procede, receta electrónica para recoger el tratamiento en tu farmacia de {City}.",
      ],
    ],
    whyH2: "Cuándo está indicado un tratamiento médico para adelgazar",
    why: [
      "No todo el mundo necesita medicación para perder peso. El médico valora tu índice de masa corporal, tu historial y tus objetivos para decidir si un tratamiento farmacológico está indicado o si basta con cambios de hábitos acompañados.",
      "Cuando el sobrepeso es relevante o las dietas no han funcionado, los análogos del GLP‑1 pueden marcar la diferencia. Su uso debe ser siempre con receta y seguimiento, nunca por cuenta propia.",
    ],
    optionsH2: "Opciones de tratamiento GLP‑1 para adelgazar",
    optionsIntro: [
      "Estas son las opciones que el endocrino puede valorar en {City} si el tratamiento farmacológico está indicado en tu caso:",
      "Según tu objetivo y tu tolerancia, el médico puede elegir, si procede, entre estas opciones disponibles:",
    ],
    localH2: "Empezar tu tratamiento para adelgazar en {City}",
    local: [
      "La clave no es solo el fármaco, sino el seguimiento. En {City}, {BRAND} te acompaña en cada ajuste de dosis y en los hábitos, para que los resultados se mantengan y evites el efecto rebote.",
      "Empezar es sencillo desde {City}: una primera visita gratis y, si procede, el tratamiento con seguimiento continuo. Sin permanencia y sin desplazamientos.",
    ],
    faqs: (c) => [
      {
        q: `¿Cuál es el mejor tratamiento para adelgazar en ${c.name}?`,
        a: "El que indique tu médico según tu caso. Hoy los GLP‑1 son una de las opciones más eficaces cuando están indicados, siempre con seguimiento.",
      },
      {
        q: `¿Necesito receta para el tratamiento en ${c.name}?`,
        a: "Sí. Los fármacos GLP‑1 son de prescripción. Un endocrino valora tu caso y, si procede, emite la receta electrónica.",
      },
      {
        q: "¿Puedo hacerlo sin ir a una clínica presencial?",
        a: "Sí. La valoración, la prescripción y el seguimiento son online; solo recoges el tratamiento en tu farmacia.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el endocrino define tu plan.",
      },
    ],
  },
  {
    id: "medico-para-adelgazar",
    slug: (c) => `medico-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `médico para adelgazar ${c.name}`,
    title: (c) => `Médico para adelgazar en ${c.name}`,
    h1: (c) => `Médico para adelgazar en ${c.name}: consulta online y tratamiento`,
    metaTitle: (c) =>
      `Médico para adelgazar en ${c.name}: consulta online | DoctorLife`,
    metaDescription: (c) =>
      `Habla con un médico para adelgazar en ${c.name} sin esperas: valoración online, tratamiento GLP‑1 si está indicado y seguimiento. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Cómo encontrar un médico para adelgazar en ${c.name}: qué hace, cuándo receta GLP‑1 y cómo empezar con consulta y seguimiento online.`,
    cover: getAlt("wegovy").cover,
    introH2: "¿Por qué acudir a un médico para adelgazar en {City}?",
    intros: [
      [
        "Adelgazar de forma duradera en {City} no depende solo de fuerza de voluntad: el sobrepeso tiene base biológica y muchas veces necesita una valoración médica. Un médico especializado en peso descarta causas de fondo (tiroides, resistencia a la insulina, medicación) y define un plan adaptado a ti.",
        "Con {BRAND} accedes a esa figura sin moverte de {City}: consulta online con médico colegiado y, si el tratamiento con GLP‑1 está indicado, receta electrónica y seguimiento desde la app.",
      ],
      [
        "Cuando las dietas por tu cuenta no funcionan en {City}, el siguiente paso lógico es un médico que valore tu caso a fondo. No se trata de pasar hambre, sino de entender por qué te cuesta perder peso y actuar sobre la causa.",
        "El modelo de {BRAND} hace eso accesible: un médico revisa tu historial online y, si procede, te prescribe el tratamiento más adecuado con acompañamiento continuo.",
      ],
    ],
    whyH2: "Qué hace un médico para adelgazar y cuándo receta",
    why: [
      "Un médico del peso evalúa tu índice de masa corporal, tu composición corporal, tu historial y tus análisis para decidir el abordaje: hábitos, tratamiento farmacológico o ambos. No prescribe a ciegas; indica fármacos GLP‑1 solo cuando hay criterio clínico.",
      "La diferencia frente a soluciones sin control es la seguridad: el médico vigila los efectos secundarios, ajusta la dosis y revisa tu evolución. Eso convierte una pérdida de peso puntual en un cambio sostenible.",
    ],
    optionsH2: "Tratamientos que puede valorar el médico en {City}",
    optionsIntro: [
      "Si el médico considera adecuado un tratamiento farmacológico, en {City} puede valorar distintas opciones de GLP‑1 según tu objetivo y tolerancia:",
      "Cuando está indicado, el médico elige entre las opciones disponibles la que mejor encaja en tu caso:",
    ],
    localH2: "Consulta con un médico para adelgazar en {City} sin esperas",
    local: [
      "El obstáculo en {City} no suele ser el dinero, sino conseguir una cita médica seria en poco tiempo. {BRAND} resuelve eso con consulta online y receta electrónica válida en cualquier farmacia de España.",
      "Muchos pacientes de {City} se cansan de esperar meses por el especialista. Con la videoconsulta de {BRAND} obtienes la valoración rápido y, si procede, empiezas con seguimiento real desde el primer día.",
    ],
    faqs: (c) => [
      {
        q: `¿Qué médico trata el sobrepeso en ${c.name}?`,
        a: "Endocrinos y médicos formados en obesidad. En DoctorLife te atiende un médico colegiado online que valora tu caso y, si procede, prescribe tratamiento.",
      },
      {
        q: `¿El médico online puede recetar para adelgazar en ${c.name}?`,
        a: "Sí. Tras una valoración real, emite receta electrónica válida en toda España, incluida cualquier farmacia de tu ciudad.",
      },
      {
        q: "¿Cuánto cuesta la primera consulta?",
        a: "La primera visita es gratis.",
      },
      {
        q: "¿Necesito desplazarme?",
        a: "No. La valoración y el seguimiento son online; solo acudes a tu farmacia a recoger el tratamiento.",
      },
    ],
  },
  {
    id: "inyeccion-para-adelgazar-ciudad",
    slug: (c) => `inyeccion-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `inyección para adelgazar ${c.name}`,
    title: (c) => `Inyección para adelgazar en ${c.name}`,
    h1: (c) => `Inyección para adelgazar en ${c.name}: qué es y cómo conseguirla`,
    metaTitle: (c) =>
      `Inyección para adelgazar en ${c.name}: cómo conseguirla | DoctorLife`,
    metaDescription: (c) =>
      `Inyección para adelgazar en ${c.name}: qué son los GLP‑1 (Wegovy, Mounjaro), cuándo se indican y cómo conseguirlas con receta y seguimiento. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Qué es la inyección para adelgazar en ${c.name}, cómo funciona, cuánto cuesta y cómo conseguirla de forma segura con valoración médica.`,
    cover: getAlt("mounjaro").cover,
    introH2: "¿Qué es la inyección para adelgazar y funciona en {City}?",
    intros: [
      [
        "La «inyección para adelgazar» de la que se habla en {City} son los fármacos análogos del GLP‑1, como Wegovy (semaglutida) o Mounjaro (tirzepatida). Actúan sobre las señales de apetito y saciedad, ayudando a comer menos sin la ansiedad de las dietas restrictivas.",
        "No son un producto estético ni un atajo sin control: se prescriben tras valoración médica y requieren seguimiento. Con {BRAND} puedes conseguirlas en {City} de forma legal, con receta y acompañamiento desde la app.",
      ],
      [
        "En {City} cada vez más personas preguntan por la inyección semanal para perder peso. Son tratamientos GLP‑1 que reducen el apetito y enlentecen el vaciado del estómago, de modo que te sacias antes y durante más tiempo.",
        "Su eficacia está respaldada por estudios, pero deben usarse con receta y seguimiento médico. {BRAND} te permite acceder a ellas en {City} sin listas de espera, siempre con valoración previa.",
      ],
    ],
    whyH2: "Cómo funciona la inyección y cuándo está indicada",
    why: [
      "Los GLP‑1 imitan una hormona intestinal que regula el hambre y la glucosa. El resultado es menos apetito, menos picoteo y una pérdida de peso clínicamente significativa cuando se combinan con cambios de hábitos.",
      "No están indicados para todo el mundo: el médico valora tu IMC, tu salud y tus antecedentes antes de prescribir. Usarlos sin control, comprados por canales no regulados, es un riesgo real para la salud.",
    ],
    optionsH2: "Qué inyecciones para adelgazar existen en {City}",
    optionsIntro: [
      "Estas son las principales inyecciones GLP‑1 que un médico puede valorar en {City} según tu caso:",
      "Según tu objetivo y tu tolerancia, el médico puede elegir, si procede, entre estas opciones:",
    ],
    localH2: "Cómo conseguir la inyección para adelgazar en {City}",
    local: [
      "El paso clave en {City} es la valoración médica: sin ella, ninguna farmacia seria te dispensará el tratamiento. Con {BRAND} haces la consulta online, recibes la receta si procede y recoges la inyección en tu farmacia.",
      "Desconfía de quien vende la inyección sin consulta en {City}: es ilegal y peligroso. La vía segura es siempre receta médica y seguimiento, que es justo lo que ofrece {BRAND}.",
    ],
    faqs: (c) => [
      {
        q: `¿Dónde consigo la inyección para adelgazar en ${c.name}?`,
        a: "Con receta médica, en cualquier farmacia de tu ciudad. En DoctorLife un médico valora tu caso online y, si procede, emite la receta electrónica.",
      },
      {
        q: "¿Cuánto cuesta la inyección al mes?",
        a: "Depende del fármaco y la dosis, orientativamente entre 200 y 400 € al mes. La primera visita médica es gratis.",
      },
      {
        q: `¿Es segura la inyección para adelgazar en ${c.name}?`,
        a: "Sí, usada con receta y seguimiento médico. Los efectos secundarios más comunes son digestivos y suelen mejorar al ajustar la dosis.",
      },
      {
        q: "¿Necesito receta?",
        a: "Sí. Son fármacos de prescripción; no se pueden comprar legalmente sin receta. Un médico debe valorarte antes.",
      },
    ],
  },
  {
    id: "medicamento-para-adelgazar",
    slug: (c) => `medicamento-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `medicamento para adelgazar ${c.name}`,
    title: (c) => `Medicamento para adelgazar en ${c.name}`,
    h1: (c) => `Medicamento para adelgazar en ${c.name}: opciones con receta`,
    metaTitle: (c) =>
      `Medicamento para adelgazar en ${c.name}: opciones reales | DoctorLife`,
    metaDescription: (c) =>
      `Qué medicamentos para adelgazar existen en ${c.name}, cuáles funcionan de verdad y cómo conseguirlos con receta y seguimiento médico. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Guía de medicamentos para adelgazar en ${c.name}: cuáles tienen evidencia, cuándo se recetan y cómo empezar con valoración médica online.`,
    cover: getAlt("ozempic").cover,
    introH2: "¿Qué medicamento para adelgazar puedo usar en {City}?",
    intros: [
      [
        "En {City} circulan muchos «productos para adelgazar», pero medicamentos con evidencia real hay pocos. Los más eficaces hoy son los análogos del GLP‑1 (semaglutida, tirzepatida), que se usan con receta y seguimiento médico.",
        "Con {BRAND}, un médico colegiado valora tu caso online desde {City} y, si un medicamento está indicado, te lo prescribe con acompañamiento. Olvídate de suplementos sin respaldo: aquí hablamos de tratamiento médico real.",
      ],
      [
        "Buscar un medicamento para adelgazar en {City} sin información acaba muchas veces en productos inútiles o peligrosos. La realidad es que solo unos pocos fármacos están aprobados y demuestran eficacia, y todos requieren prescripción.",
        "El modelo de {BRAND} te conecta con un médico que decide, si procede, el medicamento adecuado y supervisa tu evolución desde {City}, sin que tengas que desplazarte.",
      ],
    ],
    whyH2: "Qué medicamentos para adelgazar funcionan de verdad",
    why: [
      "Los fármacos GLP‑1 reducen el apetito y aumentan la saciedad, con pérdidas de peso clínicamente relevantes en los estudios. Frente a ellos, la mayoría de pastillas «quemagrasa» de venta libre no tienen evidencia y pueden ser un riesgo.",
      "Ningún medicamento sustituye los hábitos: funcionan mejor combinados con alimentación y actividad física. Y siempre deben usarse bajo prescripción, porque tienen contraindicaciones y efectos secundarios que el médico debe controlar.",
    ],
    optionsH2: "Medicamentos para adelgazar que valora el médico en {City}",
    optionsIntro: [
      "Si el tratamiento farmacológico está indicado en tu caso, en {City} el médico puede valorar estas opciones de GLP‑1:",
      "Según tu objetivo, tu salud y tu tolerancia, el médico elige, si procede, entre estas opciones:",
    ],
    localH2: "Cómo conseguir un medicamento para adelgazar en {City}",
    local: [
      "El único camino seguro en {City} es la receta médica. Con {BRAND} haces la consulta online, recibes la prescripción si procede y recoges el medicamento en tu farmacia, con seguimiento desde la app.",
      "Comprar medicamentos para adelgazar por internet sin receta en {City} es ilegal y arriesgado. La vía correcta es valoración médica y receta electrónica, que es lo que ofrece {BRAND}.",
    ],
    faqs: (c) => [
      {
        q: `¿Cuál es el mejor medicamento para adelgazar en ${c.name}?`,
        a: "El que indique tu médico según tu caso. Hoy los GLP‑1 son de los más eficaces cuando están indicados, siempre con receta y seguimiento.",
      },
      {
        q: `¿Puedo comprar el medicamento sin receta en ${c.name}?`,
        a: "No legalmente. Los fármacos eficaces para adelgazar son de prescripción; un médico debe valorarte antes de recetarlos.",
      },
      {
        q: "¿Las pastillas de la farmacia funcionan?",
        a: "La mayoría de productos de venta libre no tienen evidencia sólida. Los tratamientos con respaldo científico requieren prescripción.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el médico define tu plan.",
      },
    ],
  },
  {
    id: "pastillas-para-adelgazar",
    slug: (c) => `pastillas-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `pastillas para adelgazar ${c.name}`,
    title: (c) => `Pastillas para adelgazar en ${c.name}`,
    h1: (c) => `Pastillas para adelgazar en ${c.name}: qué funciona de verdad`,
    metaTitle: (c) =>
      `Pastillas para adelgazar en ${c.name}: qué funciona | DoctorLife`,
    metaDescription: (c) =>
      `Pastillas para adelgazar en ${c.name}: cuáles tienen evidencia, cuáles evitar y qué alternativas médicas funcionan mejor. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `La verdad sobre las pastillas para adelgazar en ${c.name}: qué funciona, qué es marketing y qué tratamientos médicos son más eficaces.`,
    cover: getAlt("saxenda").cover,
    introH2: "¿Funcionan las pastillas para adelgazar en {City}?",
    intros: [
      [
        "En {City} se venden cientos de «pastillas para adelgazar», pero la mayoría no tienen evidencia que respalde su eficacia, y algunas pueden ser un riesgo para la salud. Antes de gastar dinero en suplementos, conviene saber qué funciona de verdad.",
        "Los tratamientos con respaldo científico para perder peso suelen ser inyectables (GLP‑1) o fármacos de prescripción, no pastillas de venta libre. Con {BRAND}, un médico valora tu caso online desde {City} y te orienta hacia lo que realmente puede ayudarte.",
      ],
      [
        "«Pastillas para adelgazar» es una de las búsquedas más frecuentes en {City}, y también una de las que más decepciones genera: la inmensa mayoría de productos milagro no hacen nada o tienen efectos rebote.",
        "La buena noticia es que sí existen tratamientos médicos eficaces. {BRAND} te conecta con un médico que valora tu caso y, si procede, te prescribe la opción adecuada con seguimiento, sin salir de {City}.",
      ],
    ],
    whyH2: "Pastillas de venta libre vs. tratamiento médico",
    why: [
      "Los quemagrasas, drenantes y «bloqueadores» de venta libre rara vez tienen estudios serios detrás. Pueden dar una sensación inicial de pérdida (sobre todo de líquidos), pero no producen una pérdida de grasa sostenible.",
      "Los tratamientos médicos modernos, como los análogos del GLP‑1, actúan sobre el apetito y la saciedad con evidencia clínica. La diferencia es enorme: control médico, eficacia demostrada y seguimiento frente a marketing.",
    ],
    optionsH2: "Alternativas médicas a las pastillas en {City}",
    optionsIntro: [
      "Si buscas algo que funcione de verdad en {City}, estas son las opciones que un médico puede valorar, si están indicadas en tu caso:",
      "En lugar de pastillas sin evidencia, el médico puede considerar, si procede, estos tratamientos con respaldo:",
    ],
    localH2: "Qué hacer en lugar de comprar pastillas en {City}",
    local: [
      "Antes de comprar pastillas en {City}, lo más rentable es una valoración médica que te diga qué necesitas realmente. Con {BRAND} esa consulta es online y es gratis.",
      "Gastar en suplementos sin evidencia rara vez compensa en {City}. Una consulta médica te ahorra dinero y te orienta hacia un tratamiento que funcione, con seguimiento real.",
    ],
    faqs: (c) => [
      {
        q: `¿Qué pastillas para adelgazar funcionan en ${c.name}?`,
        a: "Muy pocas de venta libre tienen evidencia. Los tratamientos eficaces suelen ser de prescripción; un médico debe valorar cuál te conviene.",
      },
      {
        q: "¿Las pastillas de la farmacia son seguras?",
        a: "Las de venta libre no suelen ser peligrosas, pero tampoco eficaces. Los productos comprados por internet sin control sí pueden ser un riesgo.",
      },
      {
        q: `¿Hay alternativa médica en ${c.name}?`,
        a: "Sí. Los tratamientos GLP‑1, cuando están indicados, son mucho más eficaces que las pastillas. Requieren receta y seguimiento médico.",
      },
      {
        q: "¿Cómo sé qué necesito?",
        a: "Con una valoración médica. En DoctorLife la primera visita es gratis y el médico te orienta según tu caso.",
      },
    ],
  },
  {
    id: "bajar-de-peso",
    slug: (c) => `bajar-de-peso-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `bajar de peso ${c.name}`,
    title: (c) => `Bajar de peso en ${c.name}`,
    h1: (c) => `Bajar de peso en ${c.name}: plan médico que sí funciona`,
    metaTitle: (c) =>
      `Bajar de peso en ${c.name}: plan médico que funciona | DoctorLife`,
    metaDescription: (c) =>
      `Cómo bajar de peso en ${c.name} con apoyo médico real: valoración online, tratamiento GLP‑1 si está indicado y seguimiento para no recuperar. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Cómo bajar de peso en ${c.name} de forma sostenible: por qué fallan las dietas, cuándo ayuda el tratamiento médico y cómo empezar online.`,
    cover: getAlt("wegovy").cover,
    introH2: "¿Cómo bajar de peso de forma sostenible en {City}?",
    intros: [
      [
        "Bajar de peso en {City} y, sobre todo, mantenerlo, es más difícil de lo que parece: el cuerpo defiende su peso y muchas dietas terminan en efecto rebote. La clave no es comer menos a cualquier precio, sino un enfoque que actúe sobre el apetito y los hábitos.",
        "Con {BRAND}, un médico valora tu caso online desde {City} y, si está indicado, combina cambios de hábitos con tratamiento GLP‑1 y seguimiento, para que bajes de peso y no lo recuperes.",
      ],
      [
        "Si has intentado bajar de peso en {City} sin éxito duradero, no es falta de voluntad: la biología juega en contra. Por eso el abordaje médico, cuando hace falta, marca la diferencia frente a las dietas por tu cuenta.",
        "El modelo de {BRAND} te da ese apoyo en {City}: valoración médica, plan adaptado y, si procede, tratamiento con seguimiento continuo desde la app.",
      ],
    ],
    whyH2: "Por qué fallan las dietas y qué hace la diferencia",
    why: [
      "Cuando restringes calorías, el cuerpo baja el gasto y aumenta el hambre para recuperar el peso perdido. Ese mecanismo explica por qué la mayoría de dietas fracasan a medio plazo, por mucha disciplina que pongas.",
      "Los tratamientos GLP‑1, cuando están indicados, ayudan a controlar ese hambre y facilitan mantener el déficit sin sufrimiento. Combinados con seguimiento médico, convierten la pérdida de peso en algo sostenible.",
    ],
    optionsH2: "Apoyo médico para bajar de peso en {City}",
    optionsIntro: [
      "Si el médico considera adecuado un tratamiento, en {City} puede valorar estas opciones de GLP‑1 según tu caso:",
      "Cuando está indicado, el médico elige, si procede, entre estas opciones la más adecuada para ti:",
    ],
    localH2: "Empieza a bajar de peso en {City} con seguimiento real",
    local: [
      "Lo que marca la diferencia en {City} no es solo empezar, sino el seguimiento. {BRAND} te acompaña en cada ajuste de dosis y en los hábitos, para que los resultados se mantengan en el tiempo.",
      "Bajar de peso en {City} con {BRAND} es sencillo: una primera visita gratis y, si procede, tratamiento con seguimiento continuo, sin permanencia ni desplazamientos.",
    ],
    faqs: (c) => [
      {
        q: `¿Cuál es la forma más eficaz de bajar de peso en ${c.name}?`,
        a: "Combinar hábitos sostenibles con apoyo médico. Cuando está indicado, el tratamiento GLP‑1 con seguimiento es de lo más eficaz.",
      },
      {
        q: "¿Por qué recupero el peso después de las dietas?",
        a: "Porque el cuerpo se adapta bajando el gasto y aumentando el hambre. El seguimiento médico ayuda a evitar ese efecto rebote.",
      },
      {
        q: `¿Necesito tratamiento para bajar de peso en ${c.name}?`,
        a: "No siempre. El médico valora tu caso y decide si bastan los hábitos o si un tratamiento farmacológico está indicado.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el médico define tu plan.",
      },
    ],
  },
  {
    id: "obesidad-tratamiento",
    slug: (c) => `tratamiento-obesidad-${c.slug}`,
    category: "Guías",
    keyword: (c) => `tratamiento obesidad ${c.name}`,
    title: (c) => `Tratamiento de la obesidad en ${c.name}`,
    h1: (c) => `Tratamiento de la obesidad en ${c.name}: abordaje médico actual`,
    metaTitle: (c) =>
      `Tratamiento de la obesidad en ${c.name}: abordaje médico | DoctorLife`,
    metaDescription: (c) =>
      `Tratamiento médico de la obesidad en ${c.name}: valoración por endocrino, fármacos GLP‑1 cuando están indicados y seguimiento. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Cómo se trata la obesidad hoy en ${c.name}: enfoque médico, papel de los GLP‑1 y cómo acceder a valoración y seguimiento online.`,
    cover: getAlt("mounjaro").cover,
    introH2: "¿Cómo se trata la obesidad en {City} hoy?",
    intros: [
      [
        "La obesidad es una enfermedad crónica, no un fallo personal, y así se aborda en {City} desde la medicina moderna. El tratamiento combina cambios de estilo de vida con apoyo médico y, cuando está indicado, fármacos que actúan sobre el apetito.",
        "Con {BRAND}, un endocrino colegiado valora tu caso online desde {City}, define un plan y, si procede, prescribe tratamiento GLP‑1 con seguimiento desde la app, sin listas de espera.",
      ],
      [
        "Tratar la obesidad en {City} requiere mucho más que «comer menos y moverse más». Es una enfermedad con base hormonal y metabólica, y su abordaje serio es médico, individualizado y con seguimiento.",
        "El modelo de {BRAND} hace accesible ese tratamiento en {City}: valoración por endocrino, plan a medida y, cuando está indicado, fármacos con respaldo científico y acompañamiento.",
      ],
    ],
    whyH2: "Por qué la obesidad necesita tratamiento médico",
    why: [
      "La obesidad aumenta el riesgo de diabetes, hipertensión, problemas cardiovasculares y articulares. Tratarla no es estético: es una cuestión de salud que conviene abordar con criterio médico y seguimiento.",
      "El abordaje actual reconoce que la fuerza de voluntad no basta. Los tratamientos GLP‑1, cuando están indicados, ayudan a controlar el apetito y logran pérdidas de peso clínicamente relevantes, siempre bajo supervisión.",
    ],
    optionsH2: "Opciones de tratamiento de la obesidad en {City}",
    optionsIntro: [
      "Si el endocrino lo considera adecuado, en {City} puede valorar estas opciones de tratamiento farmacológico:",
      "Según tu grado de obesidad y tu salud, el médico elige, si procede, entre estas opciones:",
    ],
    localH2: "Acceso al tratamiento de la obesidad en {City} sin esperas",
    local: [
      "El acceso a endocrinología por la vía pública en {City} suele estar saturado. {BRAND} ofrece valoración online con endocrino en poco tiempo y receta electrónica válida en toda España.",
      "Tratar la obesidad a tiempo en {City} reduce riesgos para tu salud. Con {BRAND} empiezas con una primera visita gratis y, si procede, seguimiento continuo desde la app.",
    ],
    faqs: (c) => [
      {
        q: `¿Quién trata la obesidad en ${c.name}?`,
        a: "El endocrino es el especialista de referencia. En DoctorLife te atiende un endocrino colegiado online que valora tu caso y, si procede, prescribe tratamiento.",
      },
      {
        q: `¿Qué tratamientos para la obesidad hay en ${c.name}?`,
        a: "Cambios de hábitos, fármacos GLP‑1 cuando est��n indicados y, en casos seleccionados, cirugía. El médico decide según tu caso.",
      },
      {
        q: "¿El tratamiento es solo medicación?",
        a: "No. La medicación, cuando se indica, se combina con hábitos y seguimiento. Sin acompañamiento, los resultados no se mantienen.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el endocrino define tu plan.",
      },
    ],
  },
  {
    id: "nutricionista-online",
    slug: (c) => `nutricionista-online-${c.slug}`,
    category: "Guías",
    keyword: (c) => `nutricionista ${c.name}`,
    title: (c) => `Nutricionista online en ${c.name}`,
    h1: (c) => `Nutricionista online en ${c.name}: cuándo necesitas además un médico`,
    metaTitle: (c) =>
      `Nutricionista online en ${c.name}: cómo elegir | DoctorLife`,
    metaDescription: (c) =>
      `Nutricionista online en ${c.name}: qué puede hacer, cuándo necesitas además valoración médica y cómo combinar dieta y tratamiento. Primera visita médica gratis.`,
    excerpt: (c) =>
      `Qué hace un nutricionista en ${c.name}, cuándo conviene sumar valoración médica y cómo combinar alimentación y tratamiento del peso.`,
    cover: getAlt("wegovy").cover,
    introH2: "¿Qué puede hacer un nutricionista en {City} y qué no?",
    intros: [
      [
        "Un nutricionista en {City} te ayuda a mejorar tu alimentación, organizar tus comidas y crear hábitos sostenibles. Es una pieza muy valiosa, pero hay casos en los que la dieta sola no basta para perder peso.",
        "Cuando hay obesidad o factores metabólicos de fondo, conviene sumar una valoración médica. Con {BRAND}, un médico evalúa tu caso online desde {City} y, si está indicado, combina tratamiento y seguimiento con el trabajo nutricional.",
      ],
      [
        "Buscar nutricionista en {City} es un gran primer paso para cuidar tu alimentación. Ahora bien, si el objetivo es perder un peso importante y las dietas no han funcionado, el abordaje puede necesitar también apoyo médico.",
        "El modelo de {BRAND} cubre esa parte médica en {City}: valoración, tratamiento GLP‑1 cuando está indicado y seguimiento, de forma complementaria a la educación nutricional.",
      ],
    ],
    whyH2: "Nutrición y medicina: por qué se complementan",
    why: [
      "La alimentación es la base de cualquier proceso de pérdida de peso, y ahí el nutricionista es clave. Pero en la obesidad influyen hormonas que regulan el apetito, y ahí es donde el tratamiento médico puede ayudar.",
      "Combinar dieta y, cuando está indicado, tratamiento GLP‑1 con seguimiento, da mejores resultados que cualquiera de las dos cosas por separado. La medicación facilita seguir el plan; la nutrición lo hace sostenible.",
    ],
    optionsH2: "Cuándo sumar tratamiento médico en {City}",
    optionsIntro: [
      "Si la alimentación por sí sola no es suficiente, en {City} el médico puede valorar, si está indicado, estas opciones de GLP‑1 como apoyo:",
      "Cuando hay criterio clínico, el médico puede combinar el trabajo nutricional con estas opciones:",
    ],
    localH2: "Combina nutrición y seguimiento médico en {City}",
    local: [
      "Lo ideal en {City} es un enfoque integral: alimentación bien pautada y, si hace falta, apoyo médico. {BRAND} aporta la valoración médica y el seguimiento, complementando el trabajo del nutricionista.",
      "Si en {City} la dieta no te está dando resultados, una valoración médica puede aclarar por qué. La primera visita de {BRAND} es gratis.",
    ],
    faqs: (c) => [
      {
        q: `¿Un nutricionista puede recetar medicamentos en ${c.name}?`,
        a: "No. Recetar es competencia médica. El nutricionista pauta la alimentación; el médico valora y prescribe el tratamiento si procede.",
      },
      {
        q: `¿Necesito nutricionista o médico en ${c.name}?`,
        a: "Depende de tu caso. Para mejorar hábitos, el nutricionista; si hay obesidad o las dietas fallan, conviene sumar valoración médica.",
      },
      {
        q: "¿DoctorLife incluye plan de alimentación?",
        a: "DoctorLife se centra en la valoración y el tratamiento médico del peso, con seguimiento. Funciona muy bien combinado con educación nutricional.",
      },
      {
        q: "¿Cuánto cuesta la valoración médica?",
        a: "La primera visita es gratis.",
      },
    ],
  },
  {
    id: "comprar-inyeccion-adelgazar",
    slug: (c) => `comprar-inyeccion-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `comprar inyección para adelgazar ${c.name}`,
    title: (c) => `Comprar inyección para adelgazar en ${c.name}`,
    h1: (c) => `Comprar inyección para adelgazar en ${c.name}: cómo hacerlo legal`,
    metaTitle: (c) =>
      `Comprar inyección para adelgazar en ${c.name} (legal) | DoctorLife`,
    metaDescription: (c) =>
      `Cómo comprar una inyección para adelgazar en ${c.name} de forma legal: qué son los GLP‑1, por qué necesitan receta y cómo conseguirla online. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Guía para comprar una inyección para adelgazar en ${c.name} sin riesgos: qué pedir, por qué hace falta receta y cómo empezar con seguimiento médico.`,
    cover: getAlt("mounjaro").cover,
    introH2: "¿Se puede comprar una inyección para adelgazar en {City}?",
    intros: [
      [
        "Comprar una inyección para adelgazar en {City} es posible, pero solo por la vía legal: con receta médica. Las «inyecciones para adelgazar» son fármacos GLP‑1 (como Wegovy o Mounjaro) y no se venden sin prescripción en ninguna farmacia seria.",
        "Con {BRAND} el proceso es directo desde {City}: un médico valora tu caso online y, si está indicado, emite la receta electrónica para que compres la inyección en tu farmacia, con seguimiento incluido.",
      ],
      [
        "Mucha gente en {City} busca «comprar inyección para adelgazar» pensando que es un producto de venta libre. No lo es: son medicamentos de prescripción y comprarlos sin receta por internet es ilegal y peligroso.",
        "La forma correcta de comprarlas en {City} pasa por una valoración médica. {BRAND} te la ofrece online, con receta electrónica si procede y recogida en tu farmacia habitual.",
      ],
    ],
    whyH2: "Por qué no puedes comprar la inyección sin receta",
    why: [
      "Los GLP‑1 son fármacos potentes con contraindicaciones y efectos secundarios que deben vigilarse. Por eso exigen receta: un médico debe confirmar que son adecuados para ti antes de que los compres.",
      "Las webs que ofrecen estas inyecciones «sin receta» en {City} venden producto falsificado o no homologado, con un riesgo real para tu salud. Comprar legal significa siempre: valoración, receta y farmacia.",
    ],
    optionsH2: "Qué inyección para adelgazar puedes comprar en {City}",
    optionsIntro: [
      "Estas son las inyecciones GLP‑1 que un médico puede prescribir en {City}, si están indicadas en tu caso:",
      "Según tu objetivo y tu tolerancia, el médico puede recetar, si procede, alguna de estas opciones para que la compres en tu farmacia:",
    ],
    localH2: "Cómo comprar tu inyección para adelgazar en {City} paso a paso",
    local: [
      "El camino en {City} es sencillo: consulta online con {BRAND}, receta electrónica si procede y compra en tu farmacia. Sin desplazamientos al hospital ni listas de espera.",
      "Comprar de forma legal en {City} te garantiza producto auténtico y seguimiento médico. {BRAND} hace la valoración online y te acompaña en cada ajuste de dosis.",
    ],
    faqs: (c) => [
      {
        q: `¿Dónde puedo comprar una inyección para adelgazar en ${c.name}?`,
        a: "Con receta médica, en cualquier farmacia de tu ciudad. En DoctorLife un médico valora tu caso online y, si procede, emite la receta electrónica.",
      },
      {
        q: `¿Puedo comprarla sin receta en ${c.name}?`,
        a: "No legalmente. Son fármacos de prescripción; las webs que las venden sin receta son ilegales y suelen vender falsificaciones.",
      },
      {
        q: "¿Cuánto cuesta la inyección al mes?",
        a: "Orientativamente entre 200 y 400 € al mes según el fármaco y la dosis. La primera visita médica es gratis.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el médico define tu plan y la receta si procede.",
      },
    ],
  },
  {
    id: "comprar-tratamiento-adelgazar",
    slug: (c) => `comprar-tratamiento-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `comprar tratamiento para adelgazar ${c.name}`,
    title: (c) => `Comprar tratamiento para adelgazar en ${c.name}`,
    h1: (c) => `Comprar tratamiento para adelgazar en ${c.name}: opciones reales`,
    metaTitle: (c) =>
      `Comprar tratamiento para adelgazar en ${c.name} | DoctorLife`,
    metaDescription: (c) =>
      `Cómo contratar un tratamiento médico para adelgazar en ${c.name}: valoración online, fármacos GLP‑1 si están indicados y seguimiento. ¡Primera consulta gratis!`,
    excerpt: (c) =>
      `Qué tratamientos para adelgazar puedes contratar en ${c.name}, cuáles funcionan de verdad y cómo empezar con valoración médica online.`,
    cover: getAlt("wegovy").cover,
    introH2: "¿Qué tratamiento para adelgazar puedo contratar en {City}?",
    intros: [
      [
        "Contratar un tratamiento para adelgazar en {City} que funcione de verdad significa elegir un enfoque médico, no un producto milagro. Los tratamientos con evidencia hoy combinan hábitos con fármacos GLP‑1 cuando están indicados.",
        "Con {BRAND}, contratas desde {City} un tratamiento completo: valoración médica online, prescripción si procede y seguimiento continuo, todo por un modelo claro y sin permanencia.",
      ],
      [
        "En {City} hay mucha oferta de «tratamientos para adelgazar», pero pocos con respaldo médico real. Antes de pagar por uno, conviene saber qué incluye: ¿hay un m��dico detrás? ¿Hay seguimiento? ¿Es legal el fármaco?",
        "El tratamiento de {BRAND} responde a todo eso en {City}: médico colegiado, receta electrónica cuando está indicada y acompañamiento desde la app.",
      ],
    ],
    whyH2: "Qué incluye un buen tratamiento para adelgazar",
    why: [
      "Un tratamiento serio no es solo el fármaco: incluye una valoración médica inicial, un plan adaptado, ajustes de dosis y seguimiento. Eso es lo que convierte la pérdida de peso en algo sostenible.",
      "Desconfía de quien te vende solo un producto sin médico detrás. En {City}, el tratamiento que funciona combina supervisión médica con cambios de hábitos, y eso es justo lo que ofrece {BRAND}.",
    ],
    optionsH2: "Tratamientos para adelgazar disponibles en {City}",
    optionsIntro: [
      "Si el tratamiento farmacológico está indicado, en {City} el médico puede valorar estas opciones de GLP‑1:",
      "Según tu caso, el médico elige, si procede, entre estas opciones como parte de tu tratamiento:",
    ],
    localH2: "Cómo contratar tu tratamiento para adelgazar en {City}",
    local: [
      "En {City} empiezas con una primera visita gratis. Si el tratamiento está indicado, recibes la receta y el seguimiento, sin desplazamientos ni esperas.",
      "Contratar el tratamiento de {BRAND} en {City} es transparente: pagas la valoración, y solo continúas si decides empezar. El seguimiento va incluido durante todo el proceso.",
    ],
    faqs: (c) => [
      {
        q: `¿Qué tratamiento para adelgazar puedo contratar en ${c.name}?`,
        a: "Un tratamiento médico con valoración, plan personalizado y, si está indicado, fármacos GLP‑1 con seguimiento. El médico decide qué te conviene.",
      },
      {
        q: "¿Cuánto cuesta el tratamiento?",
        a: "La primera visita es gratis. El tratamiento depende del fármaco y la dosis, orientativamente entre 200 y 400 € al mes.",
      },
      {
        q: `¿Hay permanencia al contratar en ${c.name}?`,
        a: "No. No hay permanencia: continúas solo mientras quieras, con seguimiento médico incluido.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Reservas la primera visita gratis y el médico define tu tratamiento y la receta si procede.",
      },
    ],
  },
  {
    id: "comprar-pastillas-adelgazar",
    slug: (c) => `comprar-pastillas-para-adelgazar-${c.slug}`,
    category: "Adelgazar",
    keyword: (c) => `comprar pastillas para adelgazar ${c.name}`,
    title: (c) => `Comprar pastillas para adelgazar en ${c.name}`,
    h1: (c) => `Comprar pastillas para adelgazar en ${c.name}: qué funciona`,
    metaTitle: (c) =>
      `Comprar pastillas para adelgazar en ${c.name}: guía | DoctorLife`,
    metaDescription: (c) =>
      `Antes de comprar pastillas para adelgazar en ${c.name}, descubre cuáles tienen evidencia, cuáles evitar y qué alternativas médicas funcionan mejor. Valoración gratis.`,
    excerpt: (c) =>
      `Qué pastillas para adelgazar puedes comprar en ${c.name}, cuáles son marketing y qué tratamientos médicos dan mejores resultados.`,
    cover: getAlt("saxenda").cover,
    introH2: "¿Merece la pena comprar pastillas para adelgazar en {City}?",
    intros: [
      [
        "Antes de comprar pastillas para adelgazar en {City}, conviene saber que la mayoría de productos de venta libre no tienen evidencia que respalde su eficacia. Gastar en ellos rara vez compensa.",
        "Los tratamientos que de verdad funcionan suelen ser de prescripción. Con {BRAND}, desde {City}, un médico valora tu caso y te orienta hacia lo que realmente puede ayudarte, en lugar de pastillas sin respaldo.",
      ],
      [
        "«Comprar pastillas para adelgazar» es una búsqueda muy común en {City}, y también una fuente habitual de decepción: los quemagrasas de venta libre apenas funcionan y pueden tener efecto rebote.",
        "La buena noticia es que sí hay alternativas médicas eficaces. {BRAND} te conecta en {City} con un médico que, si procede, prescribe un tratamiento con evidencia y seguimiento.",
      ],
    ],
    whyH2: "Pastillas de venta libre vs. tratamiento médico",
    why: [
      "La mayoría de pastillas para adelgazar de venta libre no tienen estudios serios detrás. Pueden dar una sensación inicial de pérdida (líquidos), pero no producen una pérdida de grasa sostenible.",
      "Los tratamientos médicos modernos, como los GLP‑1, actúan sobre el apetito con evidencia clínica. La diferencia frente a las pastillas es enorme: eficacia demostrada, control médico y seguimiento.",
    ],
    optionsH2: "Alternativas médicas a las pastillas en {City}",
    optionsIntro: [
      "Si buscas algo que funcione de verdad en {City}, estas son las opciones que un médico puede valorar, si están indicadas:",
      "En lugar de pastillas sin evidencia, el médico puede considerar, si procede, estos tratamientos con respaldo:",
    ],
    localH2: "Qué hacer antes de comprar pastillas en {City}",
    local: [
      "Antes de gastar en pastillas en {City}, lo más rentable es una valoración médica que te diga qué necesitas realmente. Con {BRAND} esa consulta es gratis.",
      "Una consulta médica en {City} te ahorra dinero en productos inútiles y te orienta hacia un tratamiento que funcione, con seguimiento real.",
    ],
    faqs: (c) => [
      {
        q: `¿Qué pastillas para adelgazar funcionan en ${c.name}?`,
        a: "Muy pocas de venta libre tienen evidencia. Los tratamientos eficaces suelen ser de prescripción; un médico debe valorar cuál te conviene.",
      },
      {
        q: `¿Puedo comprar pastillas eficaces sin receta en ${c.name}?`,
        a: "Las de venta libre no suelen ser eficaces. Los tratamientos con evidencia requieren receta y valoración médica previa.",
      },
      {
        q: `¿Hay alternativa médica en ${c.name}?`,
        a: "Sí. Los tratamientos GLP‑1, cuando están indicados, son mucho más eficaces que las pastillas. Requieren receta y seguimiento médico.",
      },
      {
        q: "¿Cómo sé qué necesito?",
        a: "Con una valoración médica. En DoctorLife la primera visita es gratis y el médico te orienta según tu caso.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   CONTEXTO LOCAL ÚNICO POR CIUDAD
   Inyecta hechos verificables (CCAA, servicio público de salud
   regional, hospital de referencia, población, carácter de la
   ciudad) para que cada página tenga contenido propio y deje de
   ser thin/doorway content.
   ═══════════════════════════════════════════════════════════ */
function cityFactsVars(city: City): Record<string, string> {
  const f = getCityFacts(city.slug);
  const hs = healthServiceFor(f.community);
  return {
    City: city.name,
    trait: f.trait,
    popText: formatCityPop(f.pop),
    community: f.community,
    province: f.province || f.community,
    healthShort: hs.short,
    healthLong: hs.long,
    hospital: f.hospital,
    BRAND,
  };
}

const LOCAL_CTX_H2 = [
  "{City} y el acceso al tratamiento del peso",
  "Contexto sanitario: adelgazar en {City}",
  "Qué pasa con la obesidad y los GLP‑1 en {City}",
  "Tratamiento del peso en {City}: situación real",
];

const LOCAL_CTX_POP = [
  "{City} es {trait}, con {popText}. En una ciudad de este tamaño, la demanda de tratamientos médicos para perder peso ha crecido con fuerza, y con ella la confusión sobre cómo acceder a ellos de forma legal y segura.",
  "Con {popText}, {City} —{trait}— concentra a miles de personas que buscan adelgazar con apoyo médico. La pregunta habitual no es solo qué tratamiento elegir, sino cómo conseguirlo sin perderse entre listas de espera y webs sin garantías.",
  "{City}, {trait}, reúne {popText}. Ese volumen de población explica por qué cada mes aumentan las búsquedas locales sobre GLP‑1, precios y recetas: hay mucha demanda y poca información fiable adaptada a la ciudad.",
];

const LOCAL_CTX_PUBLIC = [
  "En {community}, la atención pública depende del {healthLong} ({healthShort}). Conseguir cita con endocrinología por esta vía en {City} puede llevar meses, y los GLP‑1 para adelgazar rara vez se financian si no hay diabetes u obesidad grave asociada. El hospital de referencia de la zona, el {hospital}, atiende sobre todo los casos más complejos.",
  "La sanidad pública en {City} se gestiona a través del {healthLong} ({healthShort}). Aunque centros como el {hospital} son una referencia, las listas de espera para endocrinología son largas y la prescripción de Wegovy o Mounjaro con fines de peso no suele estar cubierta por el sistema público.",
  "Quien acude al {healthShort} ({healthLong}) en {City} se encuentra a menudo con esperas prolongadas para el especialista. El {hospital} es el gran hospital de referencia, pero está orientado a la patología hospitalaria, no al seguimiento ágil de un tratamiento para adelgazar.",
];

const LOCAL_CTX_BRAND = [
  "Por eso muchas personas de {City} eligen la vía privada online: con {BRAND} acceden a un médico colegiado por videoconsulta, sin desplazarse ni esperar meses, y con receta electrónica válida en cualquier farmacia de la ciudad. El seguimiento se hace desde la app, con ajustes de dosis cuando hacen falta.",
  "{BRAND} resuelve ese cuello de botella en {City}: valoración médica online en poco tiempo, receta electrónica si está indicada —válida en cualquier farmacia de {City}— y seguimiento continuo desde la app, sin permanencia ni desplazamientos al hospital.",
  "Frente a esa espera, {BRAND} ofrece a los pacientes de {City} una alternativa ágil y legal: consulta online con médico colegiado, prescripción electrónica cuando procede y acompañamiento real, recogiendo el tratamiento en su farmacia habitual.",
];

function localFaqs(city: City): Faq[] {
  const f = getCityFacts(city.slug);
  const hs = healthServiceFor(f.community);
  return [
    {
      q: `¿La sanidad pública cubre el tratamiento para adelgazar en ${city.name}?`,
      a: `En ${city.name} la atención pública depende del ${hs.long} (${hs.short}). Los GLP‑1 con fines de pérdida de peso rara vez se financian si no hay obesidad grave o diabetes asociada, y la espera para endocrinología suele ser larga.`,
    },
    {
      q: `¿Tengo que ir a un hospital como el ${f.hospital}?`,
      a: `No. Centros como el ${f.hospital} atienden la patología hospitalaria, pero para iniciar y seguir un tratamiento del peso no necesitas acudir presencialmente: con DoctorLife la valoración y el seguimiento son online y recoges el tratamiento en tu farmacia.`,
    },
    {
      q: `¿La receta de DoctorLife es válida en las farmacias de ${city.name}?`,
      a: `Sí. La receta electrónica que emite el médico, si el tratamiento está indicado, es válida en cualquier farmacia de ${city.name} y del resto de España.`,
    },
  ];
}

function localContextSection(city: City, seed: string): Section {
  const vars = cityFactsVars(city);
  return {
    h2: tpl(pick(LOCAL_CTX_H2, seed + "ctxh2"), vars),
    blocks: [
      { type: "p", text: tpl(pick(LOCAL_CTX_POP, seed + "ctxpop"), vars) },
      { type: "p", text: tpl(pick(LOCAL_CTX_PUBLIC, seed + "ctxpub"), vars) },
      { type: "p", text: tpl(pick(LOCAL_CTX_BRAND, seed + "ctxbrand"), vars) },
    ],
  };
}

function buildLocalServicePost(cluster: LocalCluster, city: City, index: number): Post {
  const slug = cluster.slug(city);
  const vars = { City: city.name, BRAND };
  const intro = pick(cluster.intros, slug + "intro");
  const steps = pick(LOCAL_STEPS, slug + "steps").map((s) => tpl(s, vars));

  const sections: Section[] = [
    {
      h2: tpl(cluster.introH2, vars),
      blocks: intro.map((p) => ({ type: "p", text: tpl(p, vars) }) as Block),
    },
    {
      h2: tpl(cluster.whyH2, vars),
      blocks: [
        { type: "p", text: tpl(pick(cluster.why, slug + "why"), vars) },
        { type: "p", text: tpl(cluster.why[(hash(slug + "why2") % cluster.why.length)], vars) },
      ],
    },
    localContextSection(city, slug),
    {
      h2: tpl(cluster.optionsH2, vars),
      blocks: [
        { type: "p", text: tpl(pick(cluster.optionsIntro, slug + "opt"), vars) },
        weightOptionsTable(),
        { type: "quote", text: PRICE_NOTE },
      ],
    },
    {
      h2: tpl("Cómo empezar paso a paso en {City}", vars),
      blocks: [{ type: "list", items: steps }, glp1Links()],
    },
    {
      h2: tpl(cluster.localH2, vars),
      blocks: [
        { type: "p", text: tpl(pick(cluster.local, slug + "loc"), vars) },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
        glp1Links(),
      ],
    },
  ];

  return mkPost(
    {
      slug,
      title: cluster.title(city),
      h1: cluster.h1(city),
      metaTitle: cluster.metaTitle(city),
      metaDescription: cluster.metaDescription(city),
      excerpt: cluster.excerpt(city),
      category: cluster.category,
      keyword: cluster.keyword(city),
      cover: cluster.cover,
      coverAlt: cluster.title(city),
      sections,
      faqs: [...cluster.faqs(city), localFaqs(city)[hash(slug) % 3]],
    },
    index,
  );
}

/* ══════════════════════════════════════════════════════��═══���
   CLÍNICA DE TRATAMIENTO POR FÁRMACO + CIUDAD (alta intención)
   "Clínica de tratamiento con {Ozempic|Wegovy|Mounjaro|GLP‑1}
   en {ciudad}". Ángulo 100% comercial: vendemos la CONSULTA y el
   tratamiento con receta, explicando el modelo (1ª visita
   gratis). Contenido único por ciudad vía contexto local.
   ═══════════════════════════════════════════════════════════ */
type ClinicTarget = {
  key: string; // para el slug: wegovy | ozempic | mounjaro | glp1
  label: string; // nombre mostrado: "Wegovy", "Ozempic", "GLP‑1"
  drugKey: string; // Drug del que sacar precio/cover/mecanismo
  generic?: boolean; // true para el paraguas GLP‑1
};

const CLINIC_TARGETS: ClinicTarget[] = [
  { key: "wegovy", label: "Wegovy", drugKey: "wegovy" },
  { key: "ozempic", label: "Ozempic", drugKey: "ozempic" },
  { key: "mounjaro", label: "Mounjaro", drugKey: "mounjaro" },
  { key: "glp1", label: "GLP‑1", drugKey: "wegovy", generic: true },
];

const CLINIC_INTRO_BRAND: string[][] = [
  [
    "Buscas una clínica en {City} para tratarte con {Drug}, pero la buena noticia es que ya no necesitas una clínica presencial. {Drug} ({inn}) es un tratamiento de prescripción que un médico colegiado puede valorarte y recetarte online, y que recoges en tu farmacia de {City}.",
    "En {BRAND} funcionamos como tu clínica de tratamiento con {Drug} en {City}, pero sin salas de espera: reservas tu primera visita gratis —sin compromiso— y, si {Drug} es adecuado para ti, recibes la receta electrónica y el seguimiento desde la app.",
  ],
  [
    "Una clínica seria para tratarte con {Drug} en {City} no te vende una caja y te deja solo: valora tu salud, ajusta la dosis y te acompaña. Ese es el modelo de {BRAND}, con la ventaja de que todo es online y sin listas de espera.",
    "Empezar es sencillo y transparente: la primera visita es gratis y solo pagas si decides continuar. Desde ahí, un médico colegiado supervisa tu evolución con {Drug} y ajusta la pauta cuando hace falta, sin que tengas que desplazarte por {City}.",
  ],
];

const CLINIC_INTRO_GLP1: string[][] = [
  [
    "Buscar una clínica de tratamiento GLP‑1 en {City} suele acabar en listas de espera o en webs sin garantías. En {BRAND} lo resolvemos online: un médico colegiado valora tu caso y, si un GLP‑1 (Wegovy, Ozempic o Mounjaro) está indicado, te lo prescribe con receta electrónica válida en cualquier farmacia de {City}.",
    "Tu primera visita es gratis y solo pagas si decides continuar. Sin permanencia, sin desplazamientos y con seguimiento real desde la app.",
  ],
  [
    "Los análogos del GLP‑1 son hoy lo más eficaz para el control médico del peso, pero necesitan prescripción y seguimiento. En {City}, {BRAND} actúa como tu clínica online: valoración médica, receta si procede y ajustes de dosis, todo sin salir de casa.",
    "El modelo es claro: la primera visita es gratis y solo continúas si decides tratarte. Un endocrino colegiado elige, si procede, el GLP‑1 más adecuado para tu caso.",
  ],
];

const CLINIC_WHY_GLP1 =
  "«GLP‑1» es la familia de fármacos (semaglutida en Wegovy y Ozempic, tirzepatida en Mounjaro) que imita una hormona intestinal que regula el apetito y la saciedad. Reduce el «ruido alimentario», estabiliza el azúcar en sangre y prolonga la sensación de plenitud, de modo que comes menos sin la ansiedad de las dietas restrictivas. No es un quemagrasas: es un tratamiento médico que necesita valoración y seguimiento.";

const CLINIC_BENEFITS: string[] = [
  "Sin listas de espera: valoraci��n médica en poco tiempo, no en meses.",
  "Médicos colegiados y receta electrónica válida en cualquier farmacia de {City}.",
  "¡Primera consulta gratis, sin compromiso!",
  "Seguimiento y ajustes de dosis desde la app, sin nuevas esperas.",
  "Sin permanencia: continúas solo mientras quieras.",
];

function buildDrugClinicPost(target: ClinicTarget, city: City, index: number): Post {
  const drug = getAlt(target.drugKey);
  const slug = `clinica-tratamiento-${target.key}-${city.slug}`;
  const vars = {
    Drug: target.label,
    drug: target.label.toLowerCase(),
    inn: drug.inn,
    City: city.name,
    BRAND,
    frequency: drug.frequency,
  };

  const intro = target.generic
    ? pick(CLINIC_INTRO_GLP1, slug + "intro")
    : pick(CLINIC_INTRO_BRAND, slug + "intro");

  const steps = pick(STEPS, slug + "steps").map((s) => tpl(s, vars));

  const whyBlocks: Block[] = target.generic
    ? [{ type: "p", text: tpl(CLINIC_WHY_GLP1, vars) }]
    : [
        { type: "p", text: tpl(pick(MECH_WEIGHT, slug + "mech"), vars) },
        { type: "p", text: tpl(pick(RESULTS_WEIGHT, slug + "res"), vars) },
      ];

  const priceBlocks: Block[] = target.generic
    ? [weightOptionsTable(), { type: "quote", text: PRICE_NOTE }]
    : [priceTable(drug, city), { type: "quote", text: PRICE_NOTE }];

  const sections: Section[] = [
    {
      h2: tpl("¿Cómo funciona una clínica de tratamiento con {Drug} en {City}?", vars),
      blocks: intro.map((p) => ({ type: "p", text: tpl(p, vars) }) as Block),
    },
    {
      h2: target.generic
        ? tpl("¿Qué son los GLP‑1 y por qué necesitan seguimiento médico?", vars)
        : tpl("¿Qué es {Drug} y por qué necesita seguimiento médico?", vars),
      blocks: whyBlocks,
    },
    localContextSection(city, slug),
    {
      h2: tpl("Precio del tratamiento con {Drug} en {City}", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            "En {BRAND} la es gratis y solo pagas si decides continuar. El resto es un modelo claro y sin permanencia; la medicación se paga aparte en tu farmacia de {City} según la dosis.",
            vars,
          ),
        },
        ...priceBlocks,
      ],
    },
    {
      h2: tpl("Cómo empezar tu tratamiento con {Drug} en {City} paso a paso", vars),
      blocks: [
        { type: "list", items: steps },
        target.generic ? glp1Links() : buyLinks(drug, city, PRICE_DRUG_KEYS.has(drug.key)),
      ],
    },
    {
      h2: tpl("Por qué elegir {BRAND} como tu clínica en {City}", vars),
      blocks: [
        { type: "list", items: CLINIC_BENEFITS.map((s) => tpl(s, vars)) },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
        target.generic ? glp1Links() : buyLinks(drug, city, PRICE_DRUG_KEYS.has(drug.key)),
      ],
    },
  ];

  const faqs: Faq[] = [
    {
      q: tpl("¿Necesito ir a una clínica presencial en {City} para tratarme con {Drug}?", vars),
      a: tpl(
        "No. En {BRAND} la valoración y el seguimiento son online; un médico colegiado te atiende por videoconsulta y, si procede, recoges {Drug} en tu farmacia de {City}.",
        vars,
      ),
    },
    {
      q: tpl("¿Cuánto cuesta empezar el tratamiento con {Drug}?", vars),
      a: "La primera visita es gratis y solo pagas si decides continuar. No hay permanencia.",
    },
    {
      q: tpl("¿La receta es válida en las farmacias de {City}?", vars),
      a: tpl(
        "Sí. La receta electrónica que emite el médico, si el tratamiento está indicado, es válida en cualquier farmacia de {City} y del resto de España.",
        vars,
      ),
    },
    {
      q: tpl("¿En cuánto tiempo puedo empezar en {City}?", vars),
      a: "Sin listas de espera: reservas la primera visita online y, si el médico lo considera adecuado, puedes tener la receta en poco tiempo.",
    },
    localFaqs(city)[hash(slug) % 3],
  ];

  const metaDrug = target.generic ? "GLP‑1" : target.label;

  return mkPost(
    {
      slug,
      title: tpl(`Clínica de tratamiento con ${metaDrug} en {City}`, vars),
      h1: tpl(`Clínica de tratamiento con ${metaDrug} en {City}: consulta y receta online`, vars),
      metaTitle: tpl(`Clínica de tratamiento con ${metaDrug} en {City} | DoctorLife`, vars),
      metaDescription: tpl(
        `Trátate con ${metaDrug} en {City} sin listas de espera: valoración médica online, receta si procede y seguimiento con médicos colegiados. ¡Primera consulta gratis!`,
        vars,
      ),
      excerpt: tpl(
        `Cómo tratarte con ${metaDrug} en {City} a través de una clínica online: valoración médica, receta si procede y seguimiento. ¡Primera consulta gratis!`,
        vars,
      ),
      category: target.generic ? "Adelgazar" : drug.category,
      keyword: `clínica ${metaDrug.toLowerCase()} ${city.name.toLowerCase()}`,
      cover: drug.cover,
      coverAlt: tpl(`Clínica de tratamiento con ${metaDrug} en {City}`, vars),
      sections,
      faqs,
    },
    index,
  );
}

/* ── generador principal ── */
// Fármacos con guía de "precio por ciudad" propia (todas las ciudades).
// Incluye Saxenda y los principios activos (semaglutida, tirzepatida) para
// cubrir también la intención de compra/precio por principio activo.
const PRICE_DRUG_KEYS = new Set([
  "wegovy",
  "mounjaro",
  "ozempic",
  "saxenda",
  "semaglutida",
  "tirzepatida",
  "rybelsus",
  "trulicity",
  "victoza",
  "zepbound",
]);

/* Marca la ubicación objetivo de una página de ciudad, para que el saludo
   local (GeoGreeting) muestre la ciudad DEL ARTÍCULO y no la IP del visitante. */
function withPlace(post: Post, place: string): Post {
  post.place = place;
  return post;
}

export function generatePosts(existing: Set<string>): Post[] {
  const out: Post[] = [];
  const seen = new Set<string>(existing);
  let index = 40; // offset de fechas para no solapar con los manuales

  // 1) comprar {drug} en {city} para todos los fármacos y ciudades
  for (const drug of DRUGS) {
    for (const city of CITIES) {
      const slug = `comprar-${drug.key}-${city.slug}`;
      if (seen.has(slug)) continue;
      const hasPrice = PRICE_DRUG_KEYS.has(drug.key);
      out.push(withPlace(buildBuyPost(drug, city, index++, hasPrice), city.name));
      seen.add(slug);
    }
  }

  // 2) precio de {drug} en {city} para los fármacos con guía de precio en todas las ciudades
  for (const drug of DRUGS.filter((d) => PRICE_DRUG_KEYS.has(d.key))) {
    for (const city of CITIES) {
      const slug = `precio-${drug.key}-${city.slug}`;
      if (seen.has(slug)) continue;
      out.push(withPlace(buildPricePost(drug, city, index++), city.name));
      seen.add(slug);
    }
  }

  // 2b) "{drug} en {city}" (marca + geo, ángulo disponibilidad/desabastecimiento)
  //     para los fármacos de peso (Wegovy, Mounjaro, Ozempic, Saxenda)
  for (const drug of DRUGS.filter((d) => PRICE_DRUG_KEYS.has(d.key))) {
    for (const city of CITIES) {
      const slug = `${drug.key}-${city.slug}`;
      if (seen.has(slug)) continue;
      out.push(withPlace(buildDrugCityPost(drug, city, index++), city.name));
      seen.add(slug);
    }
  }

  // 2c) "receta {drug} online en {city}": intención de conseguir la receta.
  //     No canibaliza el cluster nacional "receta-{key}-online" (slug distinto,
  //     keyword con geo) ni comprar/precio (intención distinta).
  for (const drug of DRUGS.filter((d) => PRICE_DRUG_KEYS.has(d.key))) {
    for (const city of CITIES) {
      const slug = `receta-${drug.key}-online-${city.slug}`;
      if (seen.has(slug)) continue;
      out.push(withPlace(buildRxCityPost(drug, city, index++), city.name));
      seen.add(slug);
    }
  }

  // 3) cluster "en investigación": cada fármaco × intención + pillar
  for (const drug of INVESTIGATIONAL) {
    for (const intent of INTENTS) {
      const slug = researchSlug(drug, intent);
      if (seen.has(slug)) continue;
      out.push(buildResearchPost(drug, intent, index++));
      seen.add(slug);
    }
  }
  if (!seen.has("glp1-en-investigacion")) {
    out.push(buildResearchPillar());
    seen.add("glp1-en-investigacion");
  }

  // 4) cluster "sin receta": por fármaco + bespoke (péptidos, compuesta) + pillar
  for (const d of NORX) {
    const slug = `comprar-${d.key}-sin-receta`;
    if (seen.has(slug)) continue;
    out.push(buildNoRxPost(d, index++));
    seen.add(slug);
  }
  for (const post of buildGrayPosts()) {
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }
  if (!seen.has("comprar-glp1-sin-receta")) {
    out.push(buildNoRxPillar());
    seen.add("comprar-glp1-sin-receta");
  }

  // 5) cluster "modificadores" a nivel nacional para los fármacos de peso
  for (const drug of DRUGS.filter((d) => MODIFIER_DRUG_KEYS.has(d.key))) {
    for (const mod of MODIFIERS) {
      const slug = modifierSlug(drug, mod);
      if (seen.has(slug)) continue;
      out.push(buildModifierPost(drug, mod, index++));
      seen.add(slug);
    }
  }

  // 6) comparativas cruzadas entre fármacos
  for (const [aKey, bKey] of COMPARE_PAIRS) {
    const slug = `${aKey}-vs-${bKey}`;
    if (seen.has(slug)) continue;
    out.push(buildComparePost(aKey, bKey, index++));
    seen.add(slug);
  }

  // 7) "{fármaco} con receta online"
  for (const key of RX_ONLINE_KEYS) {
    const slug = `receta-${key}-online`;
    if (seen.has(slug)) continue;
    out.push(buildRxOnlinePost(getAlt(key), index++));
    seen.add(slug);
  }

  // 8) servicio / clínica online (bespoke)
  for (const post of buildServicePosts(index)) {
    index++;
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }

  // 9) desabastecimiento / dónde conseguir
  for (const key of STOCK_KEYS) {
    const slug = `${key}-desabastecimiento-donde-comprar`;
    if (seen.has(slug)) continue;
    out.push(buildStockPost(getAlt(key), index++));
    seen.add(slug);
  }

  // 10) tope de embudo + por condición (bespoke)
  for (const post of buildFunnelPosts(index)) {
    index++;
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }

  // 11) clusters locales de servicio por ciudad (clínica, endocrino, tratamiento)
  for (const cluster of LOCAL_CLUSTERS) {
    for (const city of CITIES) {
      const slug = cluster.slug(city);
      if (seen.has(slug)) continue;
      out.push(withPlace(buildLocalServicePost(cluster, city, index++), city.name));
      seen.add(slug);
    }
  }

  // 11b) clínica de tratamiento por fármaco + ciudad (alta intención de compra)
  //      "clinica-tratamiento-{wegovy|ozempic|mounjaro|glp1}-{ciudad}"
  for (const target of CLINIC_TARGETS) {
    for (const city of CITIES) {
      const slug = `clinica-tratamiento-${target.key}-${city.slug}`;
      if (seen.has(slug)) continue;
      out.push(withPlace(buildDrugClinicPost(target, city, index++), city.name));
      seen.add(slug);
    }
  }

  // 12) guías por provincia (las 50 de España) con datos reales únicos
  for (const post of buildProvincePosts(index)) {
    index++;
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }

  // 12b) RED DE HUBS GEO por intención × (provincia + comunidad autónoma).
  //      Captan las búsquedas geolocalizadas de alta intención sin escribir
  //      municipio ("clínica ozempic", "comprar wegovy", "endocrino glp1").
  for (const post of buildGeoHubPosts(index)) {
    index++;
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }

  // 13) artículos por cluster de keywords (dosis por mg, ficha técnica,
  //     clicks de Wegovy, Zepbound, semaglutida oral, GLP‑1 natural,
  //     compra en el extranjero, agujas, Amazon)
  for (const post of buildKeywordPosts(index)) {
    index++;
    if (seen.has(post.slug)) continue;
    out.push(post);
    seen.add(post.slug);
  }

  return out;
}
