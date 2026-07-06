/* ═══════════════════════════════════════════════════════════
   DATOS LOCALES REALES POR CIUDAD
   Hechos verificables (CCAA, servicio público de salud regional,
   hospital de referencia, provincia, población aproximada) que se
   tejen en el contenido para que cada página tenga información
   única e imposible de replicar con una plantilla → evita thin content.
   ═══════════════════════════════════════════════════════════ */

export type HealthService = {
  /** Sigla del servicio público de salud autonómico */
  short: string;
  /** Nombre completo del servicio */
  long: string;
};

/* Servicio público de salud por comunidad autónoma (real) */
export const HEALTH_SERVICES: Record<string, HealthService> = {
  "Comunidad de Madrid": { short: "SERMAS", long: "Servicio Madrileño de Salud" },
  Cataluña: { short: "CatSalut", long: "Servei Català de la Salut" },
  "Comunidad Valenciana": {
    short: "Conselleria de Sanitat",
    long: "sanidad pública valenciana (Conselleria de Sanitat)",
  },
  Andalucía: { short: "SAS", long: "Servicio Andaluz de Salud" },
  Aragón: { short: "SALUD", long: "Servicio Aragonés de Salud" },
  "País Vasco": { short: "Osakidetza", long: "Osakidetza (Servicio Vasco de Salud)" },
  Galicia: { short: "SERGAS", long: "Servizo Galego de Saúde" },
  "Castilla-La Mancha": { short: "SESCAM", long: "Servicio de Salud de Castilla-La Mancha" },
  "Castilla y León": { short: "Sacyl", long: "Sanidad de Castilla y León (Sacyl)" },
  "Principado de Asturias": { short: "SESPA", long: "Servicio de Salud del Principado de Asturias" },
  "Islas Baleares": { short: "IB-Salut", long: "Servei de Salut de les Illes Balears" },
  Canarias: { short: "SCS", long: "Servicio Canario de la Salud" },
  Cantabria: { short: "SCS", long: "Servicio Cántabro de Salud" },
  "Comunidad Foral de Navarra": { short: "Osasunbidea", long: "Servicio Navarro de Salud-Osasunbidea" },
  "La Rioja": { short: "Rioja Salud", long: "Servicio Riojano de Salud (Rioja Salud)" },
  "Región de Murcia": { short: "SMS", long: "Servicio Murciano de Salud" },
  Extremadura: { short: "SES", long: "Servicio Extremeño de Salud" },
  "Ciudad Autónoma de Ceuta": { short: "INGESA", long: "Instituto Nacional de Gestión Sanitaria (INGESA) en Ceuta" },
  "Ciudad Autónoma de Melilla": { short: "INGESA", long: "Instituto Nacional de Gestión Sanitaria (INGESA) en Melilla" },
};

export type CityFacts = {
  /** Comunidad autónoma */
  community: string;
  /** Provincia (si difiere o aporta contexto) */
  province: string;
  /** Población aproximada del municipio */
  pop: number;
  /** Hospital público de referencia (real) */
  hospital: string;
  /** Descriptor breve y verídico de la ciudad */
  trait: string;
};

/* Datos por slug de ciudad (coinciden con CITIES en blog-content.ts) */
export const CITY_FACTS: Record<string, CityFacts> = {
  madrid: { community: "Comunidad de Madrid", province: "Madrid", pop: 3280000, hospital: "Hospital Universitario La Paz", trait: "la capital de España y mayor área metropolitana del país" },
  barcelona: { community: "Cataluña", province: "Barcelona", pop: 1660000, hospital: "Hospital Clínic", trait: "segunda ciudad de España y capital mediterránea" },
  valencia: { community: "Comunidad Valenciana", province: "Valencia", pop: 800000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "tercera ciudad del país, en plena costa mediterránea" },
  sevilla: { community: "Andalucía", province: "Sevilla", pop: 685000, hospital: "Hospital Universitario Virgen del Rocío", trait: "la mayor ciudad de Andalucía" },
  zaragoza: { community: "Aragón", province: "Zaragoza", pop: 680000, hospital: "Hospital Universitario Miguel Servet", trait: "capital de Aragón y eje entre Madrid, Barcelona y Bilbao" },
  malaga: { community: "Andalucía", province: "Málaga", pop: 580000, hospital: "Hospital Regional Universitario de Málaga", trait: "capital de la Costa del Sol" },
  murcia: { community: "Región de Murcia", province: "Murcia", pop: 460000, hospital: "Hospital Clínico Universitario Virgen de la Arrixaca", trait: "capital de la Región de Murcia" },
  "palma-de-mallorca": { community: "Islas Baleares", province: "Islas Baleares", pop: 420000, hospital: "Hospital Universitario Son Espases", trait: "capital de las Islas Baleares" },
  "las-palmas": { community: "Canarias", province: "Las Palmas", pop: 380000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "principal ciudad de Gran Canaria" },
  bilbao: { community: "País Vasco", province: "Vizcaya", pop: 345000, hospital: "Hospital Universitario de Cruces", trait: "principal ciudad del País Vasco" },
  alicante: { community: "Comunidad Valenciana", province: "Alicante", pop: 340000, hospital: "Hospital General Universitario Dr. Balmis", trait: "ciudad costera de la Costa Blanca" },
  cordoba: { community: "Andalucía", province: "Córdoba", pop: 320000, hospital: "Hospital Universitario Reina Sofía", trait: "ciudad Patrimonio de la Humanidad en el interior andaluz" },
  valladolid: { community: "Castilla y León", province: "Valladolid", pop: 297000, hospital: "Hospital Clínico Universitario de Valladolid", trait: "capital de Castilla y León" },
  vigo: { community: "Galicia", province: "Pontevedra", pop: 295000, hospital: "Hospital Álvaro Cunqueiro", trait: "la ciudad más poblada de Galicia" },
  gijon: { community: "Principado de Asturias", province: "Asturias", pop: 270000, hospital: "Hospital Universitario de Cabueñes", trait: "la mayor ciudad de Asturias, en la costa cantábrica" },
  hospitalet: { community: "Cataluña", province: "Barcelona", pop: 265000, hospital: "Hospital Universitari de Bellvitge", trait: "segunda ciudad de Cataluña, en el área metropolitana de Barcelona" },
  vitoria: { community: "País Vasco", province: "Álava", pop: 255000, hospital: "Hospital Universitario de Álava (Txagorritxu)", trait: "capital del País Vasco" },
  "a-coruna": { community: "Galicia", province: "A Coruña", pop: 245000, hospital: "Complexo Hospitalario Universitario de A Coruña (CHUAC)", trait: "ciudad atlántica del noroeste gallego" },
  elche: { community: "Comunidad Valenciana", province: "Alicante", pop: 235000, hospital: "Hospital General Universitario de Elche", trait: "segunda ciudad de la provincia de Alicante" },
  granada: { community: "Andalucía", province: "Granada", pop: 230000, hospital: "Hospital Universitario Virgen de las Nieves", trait: "ciudad universitaria a los pies de Sierra Nevada" },
  badalona: { community: "Cataluña", province: "Barcelona", pop: 225000, hospital: "Hospital Universitari Germans Trias i Pujol (Can Ruti)", trait: "ciudad costera del área metropolitana de Barcelona" },
  terrassa: { community: "Cataluña", province: "Barcelona", pop: 225000, hospital: "Hospital Universitari Mútua Terrassa", trait: "ciudad del Vallès Occidental, en la provincia de Barcelona" },
  oviedo: { community: "Principado de Asturias", province: "Asturias", pop: 219000, hospital: "Hospital Universitario Central de Asturias (HUCA)", trait: "capital del Principado de Asturias" },
  cartagena: { community: "Región de Murcia", province: "Murcia", pop: 218000, hospital: "Hospital General Universitario Santa Lucía", trait: "ciudad portuaria del Mediterr��neo murciano" },
  sabadell: { community: "Cataluña", province: "Barcelona", pop: 216000, hospital: "Hospital Universitari Parc Taulí", trait: "capital del Vallès Occidental, en la provincia de Barcelona" },
  jerez: { community: "Andalucía", province: "Cádiz", pop: 213000, hospital: "Hospital Universitario de Jerez", trait: "la mayor ciudad de la provincia de Cádiz" },
  mostoles: { community: "Comunidad de Madrid", province: "Madrid", pop: 210000, hospital: "Hospital Universitario de Móstoles", trait: "ciudad del sur del área metropolitana de Madrid" },
  "santa-cruz-de-tenerife": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 210000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "capital de Tenerife" },
  pamplona: { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 205000, hospital: "Hospital Universitario de Navarra (HUN)", trait: "capital de Navarra" },
  almeria: { community: "Andalucía", province: "Almería", pop: 200000, hospital: "Hospital Universitario Torrecárdenas", trait: "ciudad del sureste mediterráneo andaluz" },
  "alcala-de-henares": { community: "Comunidad de Madrid", province: "Madrid", pop: 195000, hospital: "Hospital Universitario Príncipe de Asturias", trait: "ciudad universitaria del Corredor del Henares" },
  fuenlabrada: { community: "Comunidad de Madrid", province: "Madrid", pop: 190000, hospital: "Hospital Universitario de Fuenlabrada", trait: "ciudad del sur metropolitano de Madrid" },
  leganes: { community: "Comunidad de Madrid", province: "Madrid", pop: 190000, hospital: "Hospital Universitario Severo Ochoa", trait: "ciudad del sur del área metropolitana de Madrid" },
  "san-sebastian": { community: "País Vasco", province: "Gipuzkoa", pop: 188000, hospital: "Hospital Universitario Donostia", trait: "capital de Gipuzkoa, en la costa cantábrica" },
  getafe: { community: "Comunidad de Madrid", province: "Madrid", pop: 185000, hospital: "Hospital Universitario de Getafe", trait: "ciudad del sur metropolitano de Madrid" },
  burgos: { community: "Castilla y León", province: "Burgos", pop: 175000, hospital: "Hospital Universitario de Burgos (HUBU)", trait: "ciudad histórica del norte de Castilla y León" },
  castellon: { community: "Comunidad Valenciana", province: "Castellón", pop: 175000, hospital: "Hospital General Universitario de Castellón", trait: "capital de la provincia de Castellón" },
  albacete: { community: "Castilla-La Mancha", province: "Albacete", pop: 174000, hospital: "Complejo Hospitalario Universitario de Albacete", trait: "la mayor ciudad de Castilla-La Mancha" },
  santander: { community: "Cantabria", province: "Cantabria", pop: 172000, hospital: "Hospital Universitario Marqués de Valdecilla", trait: "capital de Cantabria, en la costa cantábrica" },
  alcorcon: { community: "Comunidad de Madrid", province: "Madrid", pop: 170000, hospital: "Hospital Universitario Fundación Alcorcón", trait: "ciudad del suroeste metropolitano de Madrid" },
  marbella: { community: "Andalucía", province: "Málaga", pop: 156000, hospital: "Hospital Costa del Sol", trait: "ciudad turística de la Costa del Sol" },
  logrono: { community: "La Rioja", province: "La Rioja", pop: 152000, hospital: "Hospital San Pedro", trait: "capital de La Rioja" },
  badajoz: { community: "Extremadura", province: "Badajoz", pop: 150000, hospital: "Hospital Universitario de Badajoz", trait: "la mayor ciudad de Extremadura, junto a la frontera portuguesa" },
  salamanca: { community: "Castilla y León", province: "Salamanca", pop: 143000, hospital: "Complejo Asistencial Universitario de Salamanca", trait: "ciudad universitaria Patrimonio de la Humanidad" },
  huelva: { community: "Andalucía", province: "Huelva", pop: 143000, hospital: "Hospital Universitario Juan Ramón Jiménez", trait: "capital del suroeste atlántico andaluz" },
  lleida: { community: "Cataluña", province: "Lleida", pop: 140000, hospital: "Hospital Universitari Arnau de Vilanova", trait: "principal ciudad del interior de Cataluña" },
  tarragona: { community: "Cataluña", province: "Tarragona", pop: 137000, hospital: "Hospital Universitari Joan XXIII", trait: "ciudad costera y portuaria de la Costa Daurada" },
  leon: { community: "Castilla y León", province: "León", pop: 122000, hospital: "Complejo Asistencial Universitario de León", trait: "ciudad histórica del noroeste de Castilla y León" },
  cadiz: { community: "Andalucía", province: "Cádiz", pop: 113000, hospital: "Hospital Universitario Puerta del Mar", trait: "ciudad atlántica y portuaria del sur de Andalucía" },
  jaen: { community: "Andalucía", province: "Jaén", pop: 112000, hospital: "Complejo Hospitalario de Jaén", trait: "capital del olivar andaluz" },
  ourense: { community: "Galicia", province: "Ourense", pop: 105000, hospital: "Complexo Hospitalario Universitario de Ourense (CHUO)", trait: "principal ciudad del interior de Galicia" },
  girona: { community: "Cataluña", province: "Girona", pop: 103000, hospital: "Hospital Universitari Doctor Josep Trueta", trait: "ciudad del nordeste catalán, cerca de la Costa Brava" },
  lugo: { community: "Galicia", province: "Lugo", pop: 98000, hospital: "Hospital Universitario Lucus Augusti (HULA)", trait: "ciudad amurallada del interior gallego" },
  caceres: { community: "Extremadura", province: "Cáceres", pop: 96000, hospital: "Hospital Universitario de Cáceres", trait: "ciudad Patrimonio de la Humanidad de Extremadura" },
  guadalajara: { community: "Castilla-La Mancha", province: "Guadalajara", pop: 87000, hospital: "Hospital Universitario de Guadalajara", trait: "ciudad del Corredor del Henares, próxima a Madrid" },
  toledo: { community: "Castilla-La Mancha", province: "Toledo", pop: 86000, hospital: "Hospital Universitario de Toledo", trait: "capital de Castilla-La Mancha y ciudad Patrimonio de la Humanidad" },
  pontevedra: { community: "Galicia", province: "Pontevedra", pop: 83000, hospital: "Complexo Hospitalario Universitario de Pontevedra", trait: "capital de las Rías Baixas gallegas" },

  // Batch 2
  "dos-hermanas": { community: "Andalucía", province: "Sevilla", pop: 134000, hospital: "Hospital del Río Hortega (derivaciones al HU Virgen del Rocío)", trait: "segunda ciudad de la provincia de Sevilla" },
  parla: { community: "Comunidad de Madrid", province: "Madrid", pop: 130000, hospital: "Hospital Universitario Infanta Cristina", trait: "ciudad del sur metropolitano de Madrid" },
  "torrejon-de-ardoz": { community: "Comunidad de Madrid", province: "Madrid", pop: 128000, hospital: "Hospital Universitario Infanta Sofía", trait: "ciudad del Corredor del Henares, al este de Madrid" },
  alcobendas: { community: "Comunidad de Madrid", province: "Madrid", pop: 116000, hospital: "Hospital La Paz (área norte de Madrid)", trait: "ciudad del norte metropolitano de Madrid" },
  "pozuelo-de-alarcon": { community: "Comunidad de Madrid", province: "Madrid", pop: 84000, hospital: "Hospital Puerta de Hierro Majadahonda", trait: "municipio residencial del oeste metropolitano de Madrid" },
  "san-sebastian-de-los-reyes": { community: "Comunidad de Madrid", province: "Madrid", pop: 80000, hospital: "Hospital Universitario Infanta Sofía", trait: "ciudad del norte del área metropolitana de Madrid" },
  torrent: { community: "Comunidad Valenciana", province: "Valencia", pop: 83000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "segunda ciudad de la provincia de Valencia" },
  mataro: { community: "Cataluña", province: "Barcelona", pop: 127000, hospital: "Hospital de Mataró (Consorci Sanitari del Maresme)", trait: "capital del Maresme, en la costa norte de Barcelona" },
  cornella: { community: "Cataluña", province: "Barcelona", pop: 87000, hospital: "Hospital Universitari de Bellvitge", trait: "ciudad del área metropolitana sur de Barcelona" },
  "sant-boi": { community: "Cataluña", province: "Barcelona", pop: 83000, hospital: "Hospital Moisès Broggi", trait: "ciudad del Baix Llobregat, área metropolitana de Barcelona" },
  manresa: { community: "Cataluña", province: "Barcelona", pop: 77000, hospital: "Hospital Universitari de Sant Joan de Déu", trait: "capital de la comarca del Bages, en el interior catalán" },
  reus: { community: "Cataluña", province: "Tarragona", pop: 104000, hospital: "Hospital Universitari Sant Joan de Reus", trait: "segunda ciudad de la provincia de Tarragona" },
  granollers: { community: "Cataluña", province: "Barcelona", pop: 61000, hospital: "Hospital General de Granollers", trait: "capital del Vallès Oriental, en la provincia de Barcelona" },
  rubi: { community: "Cataluña", province: "Barcelona", pop: 77000, hospital: "Hospital Universitari Mútua Terrassa", trait: "ciudad del Vallès Occidental, en la provincia de Barcelona" },
  "sant-cugat": { community: "Cataluña", province: "Barcelona", pop: 90000, hospital: "Hospital General de Catalunya", trait: "ciudad residencial del Vallès Occidental, cerca de Barcelona" },
  castelldefels: { community: "Cataluña", province: "Barcelona", pop: 67000, hospital: "Hospital de la Santa Creu i Sant Pau (área Barcelona)", trait: "ciudad costera del Baix Llobregat, sur de Barcelona" },
  barakaldo: { community: "País Vasco", province: "Vizcaya", pop: 99000, hospital: "Hospital Universitario de Cruces", trait: "segunda ciudad de Vizcaya, en la margen izquierda del Nervión" },
  getxo: { community: "País Vasco", province: "Vizcaya", pop: 78000, hospital: "Hospital de Gorliz", trait: "municipio costero del Gran Bilbao, en el País Vasco" },
  irun: { community: "País Vasco", province: "Gipuzkoa", pop: 62000, hospital: "Hospital Universitario Donostia", trait: "ciudad fronteriza con Francia, en la desembocadura del Bidasoa" },
  fuengirola: { community: "Andalucía", province: "Málaga", pop: 79000, hospital: "Hospital Costa del Sol", trait: "ciudad turística de la Costa del Sol occidental" },
  torremolinos: { community: "Andalucía", province: "Málaga", pop: 68000, hospital: "Hospital Costa del Sol", trait: "ciudad turística en la Costa del Sol, junto a Málaga" },
  benalmadena: { community: "Andalucía", province: "Málaga", pop: 69000, hospital: "Hospital Costa del Sol", trait: "ciudad costera de la Costa del Sol, entre Málaga y Fuengirola" },
  "velez-malaga": { community: "Andalucía", province: "Málaga", pop: 78000, hospital: "Hospital Comarcal de la Axarquía", trait: "capital de la comarca de la Axarquía, en Málaga" },
  estepona: { community: "Andalucía", province: "Málaga", pop: 70000, hospital: "Hospital de la Costa del Sol", trait: "ciudad costera del extremo occidental de la Costa del Sol" },
  torrevieja: { community: "Comunidad Valenciana", province: "Alicante", pop: 101000, hospital: "Hospital Universitario de Torrevieja", trait: "ciudad costera del sur de la Costa Blanca alicantina" },
  orihuela: { community: "Comunidad Valenciana", province: "Alicante", pop: 82000, hospital: "Hospital Vega Baja", trait: "ciudad histórica del Bajo Segura, en el sur alicantino" },
  benidorm: { community: "Comunidad Valenciana", province: "Alicante", pop: 72000, hospital: "Hospital Comarcal Marina Baixa", trait: "destino turístico internacional de la Costa Blanca" },
  lorca: { community: "Región de Murcia", province: "Murcia", pop: 91000, hospital: "Hospital Rafael Méndez", trait: "segunda ciudad de la Región de Murcia" },
  "roquetas-de-mar": { community: "Andalucía", province: "Almería", pop: 97000, hospital: "Hospital de Poniente", trait: "ciudad costera del Poniente Almeriense" },
  "el-puerto-de-santa-maria": { community: "Andalucía", province: "Cádiz", pop: 88000, hospital: "Hospital Universitario Puerto Real", trait: "ciudad de la Bahía de Cádiz, con puerto histórico" },
  chiclana: { community: "Andalucía", province: "Cádiz", pop: 83000, hospital: "Hospital Universitario Puerto Real", trait: "ciudad costera de la Bahía de Cádiz" },
  algeciras: { community: "Andalucía", province: "Cádiz", pop: 120000, hospital: "Hospital Punta de Europa", trait: "principal puerto del sur de España, en el Estrecho de Gibraltar" },
  merida: { community: "Extremadura", province: "Badajoz", pop: 62000, hospital: "Hospital de Mérida", trait: "capital de Extremadura y ciudad Patrimonio de la Humanidad" },
  "talavera-de-la-reina": { community: "Castilla-La Mancha", province: "Toledo", pop: 83000, hospital: "Hospital Nuestra Señora del Prado", trait: "segunda ciudad de la provincia de Toledo, en la vega del Tajo" },
  cuenca: { community: "Castilla-La Mancha", province: "Cuenca", pop: 55000, hospital: "Hospital Virgen de la Luz", trait: "ciudad Patrimonio de la Humanidad en el interior manchego" },
  "ciudad-real": { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 74000, hospital: "Hospital General Universitario de Ciudad Real", trait: "capital de la provincia manchega de Ciudad Real" },
  palencia: { community: "Castilla y León", province: "Palencia", pop: 79000, hospital: "Hospital Universitario de Palencia (Río Carrión)", trait: "ciudad histórica del norte de Castilla y León" },
  zamora: { community: "Castilla y León", province: "Zamora", pop: 64000, hospital: "Hospital Universitario de Zamora", trait: "ciudad histórica del noroeste de Castilla y León" },
  avila: { community: "Castilla y León", province: "Ávila", pop: 58000, hospital: "Hospital Nuestra Señora de Sonsoles", trait: "ciudad amurallada Patrimonio de la Humanidad, en el centro peninsular" },
  segovia: { community: "Castilla y León", province: "Segovia", pop: 54000, hospital: "Hospital General de Segovia", trait: "ciudad Patrimonio de la Humanidad a los pies de la sierra madrileña" },
  soria: { community: "Castilla y León", province: "Soria", pop: 40000, hospital: "Hospital Santa Bárbara", trait: "ciudad del norte de Castilla con la menor densidad de España" },

  // Batch 3 — 100 ciudades adicionales con datos reales
  pinto: { community: "Comunidad de Madrid", province: "Madrid", pop: 52000, hospital: "Hospital Universitario Infanta Cristina", trait: "municipio del sur metropolitano de Madrid, en el corredor A-4" },
  "rivas-vaciamadrid": { community: "Comunidad de Madrid", province: "Madrid", pop: 90000, hospital: "Hospital del Sureste", trait: "ciudad de nueva creación del sureste metropolitano de Madrid" },
  majadahonda: { community: "Comunidad de Madrid", province: "Madrid", pop: 72000, hospital: "Hospital Puerta de Hierro Majadahonda", trait: "municipio residencial del noroeste del área metropolitana de Madrid" },
  "las-rozas": { community: "Comunidad de Madrid", province: "Madrid", pop: 95000, hospital: "Hospital Puerta de Hierro Majadahonda", trait: "ciudad del noroeste metropolitano de Madrid, junto a la A-6" },
  "collado-villalba": { community: "Comunidad de Madrid", province: "Madrid", pop: 62000, hospital: "Hospital El Escorial", trait: "ciudad serrana del noroeste de la Comunidad de Madrid" },
  "alcala-de-guadaira": { community: "Andalucía", province: "Sevilla", pop: 76000, hospital: "Hospital Universitario Virgen del Rocío", trait: "ciudad del área metropolitana de Sevilla, junto al Guadaíra" },
  utrera: { community: "Andalucía", province: "Sevilla", pop: 52000, hospital: "Hospital de Valme", trait: "ciudad del sur de la campiña sevillana" },
  "san-fernando": { community: "Andalucía", province: "Cádiz", pop: 95000, hospital: "Hospital Universitario Puerto Real", trait: "ciudad de la Bahía de Cádiz, ligada a la historia naval española" },
  "la-linea": { community: "Andalucía", province: "Cádiz", pop: 62000, hospital: "Hospital Punta de Europa", trait: "ciudad fronteriza con Gibraltar, en el extremo sur de la Península" },
  motril: { community: "Andalucía", province: "Granada", pop: 60000, hospital: "Hospital Santa Ana de Motril", trait: "principal ciudad de la Costa Tropical granadina" },
  linares: { community: "Andalucía", province: "Jaén", pop: 57000, hospital: "Hospital San Agustín", trait: "ciudad industrial del norte de la provincia de Jaén" },
  andujar: { community: "Andalucía", province: "Jaén", pop: 38000, hospital: "Hospital San Juan de la Cruz", trait: "ciudad del Valle del Guadalquivir en el norte jienense" },
  ubeda: { community: "Andalucía", province: "Jaén", pop: 34000, hospital: "Hospital San Juan de la Cruz", trait: "ciudad Patrimonio de la Humanidad en la campiña de Jaén" },
  baeza: { community: "Andalucía", province: "Jaén", pop: 16000, hospital: "Hospital San Juan de la Cruz", trait: "ciudad Patrimonio de la Humanidad junto a Úbeda en Jaén" },
  ecija: { community: "Andalucía", province: "Sevilla", pop: 39000, hospital: "Hospital de Écija", trait: "ciudad de la campiña sevillana, conocida como la sartén de Andalucía" },
  lucena: { community: "Andalucía", province: "Córdoba", pop: 43000, hospital: "Hospital Infanta Margarita", trait: "ciudad industrial del sur de la provincia de Córdoba" },
  "puente-genil": { community: "Andalucía", province: "Córdoba", pop: 30000, hospital: "Hospital Infanta Margarita", trait: "ciudad cordobesa a orillas del Genil, conocida por su Semana Santa" },
  antequera: { community: "Andalucía", province: "Málaga", pop: 43000, hospital: "Hospital de Antequera", trait: "ciudad histórica del interior de la provincia de Málaga" },
  ronda: { community: "Andalucía", province: "Málaga", pop: 35000, hospital: "Hospital Comarcal de la Serranía", trait: "ciudad serrana malagueña sobre el Tajo, destino turístico icónico" },
  nerja: { community: "Andalucía", province: "Málaga", pop: 22000, hospital: "Hospital Comarcal de la Axarquía", trait: "ciudad costera de la Costa Tropical Oriental malagueña" },
  "la-laguna": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 156000, hospital: "Hospital Universitario de Canarias", trait: "ciudad universitaria de Tenerife y Patrimonio de la Humanidad" },
  arona: { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 80000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "municipio turístico del sur de Tenerife, con Costa Adeje y Los Cristianos" },
  adeje: { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 48000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "destino turístico premium del sur de Tenerife" },
  arrecife: { community: "Canarias", province: "Las Palmas", pop: 62000, hospital: "Hospital Doctor José Molina Orosa", trait: "capital de Lanzarote y principal ciudad de la isla" },
  "puerto-del-rosario": { community: "Canarias", province: "Las Palmas", pop: 40000, hospital: "Hospital General de Fuerteventura", trait: "capital de Fuerteventura y ciudad administrativa de la isla" },
  telde: { community: "Canarias", province: "Las Palmas", pop: 100000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "segunda ciudad de Gran Canaria, en la costa este de la isla" },
  "santa-lucia": { community: "Canarias", province: "Las Palmas", pop: 68000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "municipio del sur de Gran Canaria con gran crecimiento poblacional" },
  manacor: { community: "Islas Baleares", province: "Islas Baleares", pop: 42000, hospital: "Hospital de Manacor", trait: "segunda ciudad de Mallorca y capital del Llevant mallorquín" },
  ibiza: { community: "Islas Baleares", province: "Islas Baleares", pop: 50000, hospital: "Hospital Can Misses", trait: "capital de la isla de Ibiza y destino turístico internacional" },
  mahon: { community: "Islas Baleares", province: "Islas Baleares", pop: 29000, hospital: "Hospital Mateu Orfila", trait: "capital de Menorca y ciudad portuaria del Mediterráneo" },
  ciutadella: { community: "Islas Baleares", province: "Islas Baleares", pop: 29000, hospital: "Hospital Mateu Orfila", trait: "antigua capital de Menorca, en el extremo occidental de la isla" },
  gandia: { community: "Comunidad Valenciana", province: "Valencia", pop: 74000, hospital: "Hospital Francesc de Borja", trait: "ciudad costera de la Safor valenciana, en la Costa de Valencia" },
  sagunto: { community: "Comunidad Valenciana", province: "Valencia", pop: 66000, hospital: "Hospital de Sagunto", trait: "ciudad histórica del Camp de Morvedre, norte del área metropolitana de Valencia" },
  paterna: { community: "Comunidad Valenciana", province: "Valencia", pop: 68000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "ciudad del área metropolitana de Valencia, polo tecnológico y empresarial" },
  burjassot: { community: "Comunidad Valenciana", province: "Valencia", pop: 38000, hospital: "Hospital Universitari Doctor Peset", trait: "ciudad universitaria del área metropolitana de Valencia" },
  alzira: { community: "Comunidad Valenciana", province: "Valencia", pop: 44000, hospital: "Hospital La Ribera", trait: "capital de La Ribera Alta, en el interior valenciano" },
  ontinyent: { community: "Comunidad Valenciana", province: "Valencia", pop: 36000, hospital: "Hospital d'Ontinyent", trait: "ciudad textil del interior valenciano, en el Vinalopó" },
  denia: { community: "Comunidad Valenciana", province: "Alicante", pop: 42000, hospital: "Hospital de Dénia (Marina Salud)", trait: "ciudad marinera de la Marina Alta, norte de la Costa Blanca" },
  calpe: { community: "Comunidad Valenciana", province: "Alicante", pop: 22000, hospital: "Hospital de Dénia (Marina Salud)", trait: "ciudad costera junto al Peñón de Ifach, en la Marina Alta" },
  villena: { community: "Comunidad Valenciana", province: "Alicante", pop: 34000, hospital: "Hospital Virgen de los Lirios", trait: "ciudad del interior alicantino, en el Alto Vinalopó" },
  petrer: { community: "Comunidad Valenciana", province: "Alicante", pop: 35000, hospital: "Hospital Virgen de los Lirios", trait: "ciudad industrial del Vinalopó Mitjà, junto a Elda" },
  novelda: { community: "Comunidad Valenciana", province: "Alicante", pop: 27000, hospital: "Hospital Vinalopó", trait: "ciudad conocida como la capital mundial del mármol" },
  crevillent: { community: "Comunidad Valenciana", province: "Alicante", pop: 29000, hospital: "Hospital General Universitario de Elche", trait: "ciudad industrial del Baix Vinalopó, junto a Elche" },
  alcoy: { community: "Comunidad Valenciana", province: "Alicante", pop: 59000, hospital: "Hospital Virgen de los Lirios", trait: "ciudad industrial del interior alicantino, capital del Comtat" },
  ibi: { community: "Comunidad Valenciana", province: "Alicante", pop: 23000, hospital: "Hospital Virgen de los Lirios", trait: "ciudad del interior alicantino, conocida por su industria del juguete" },
  mollet: { community: "Cataluña", province: "Barcelona", pop: 52000, hospital: "Hospital de Mollet", trait: "ciudad del Vallès Oriental, en el área metropolitana de Barcelona" },
  vilafranca: { community: "Cataluña", province: "Barcelona", pop: 40000, hospital: "Hospital Comarcal de l'Alt Penedès", trait: "capital del Alt Penedès, corazón de la producción vinícola catalana" },
  vilanova: { community: "Cataluña", province: "Barcelona", pop: 67000, hospital: "Hospital Sant Antoni Abat", trait: "ciudad costera del Garraf, entre Barcelona y Tarragona" },
  sitges: { community: "Cataluña", province: "Barcelona", pop: 29000, hospital: "Hospital Sant Antoni Abat", trait: "ciudad costera del Garraf, destino turístico cultural y de playa" },
  cerdanyola: { community: "Cataluña", province: "Barcelona", pop: 58000, hospital: "Hospital Universitari Germans Trias i Pujol", trait: "ciudad universitaria del Vallès Occidental, sede de la UAB" },
  "el-prat": { community: "Cataluña", province: "Barcelona", pop: 63000, hospital: "Hospital Universitari de Bellvitge", trait: "ciudad del Delta del Llobregat, junto al aeropuerto de Barcelona" },
  ripollet: { community: "Cataluña", province: "Barcelona", pop: 37000, hospital: "Hospital Universitari Germans Trias i Pujol", trait: "ciudad del Vallès Occidental, en el área metropolitana de Barcelona" },
  vic: { community: "Cataluña", province: "Barcelona", pop: 45000, hospital: "Hospital Universitari de Vic", trait: "capital de Osona, ciudad histórica del interior catalán" },
  igualada: { community: "Cataluña", province: "Barcelona", pop: 39000, hospital: "Hospital Universitari d'Igualada", trait: "capital de la Anoia, ciudad industrial del interior catalán" },
  figueres: { community: "Cataluña", province: "Girona", pop: 46000, hospital: "Hospital de Figueres", trait: "capital de l'Alt Empordà y ciudad natal de Salvador Dalí" },
  blanes: { community: "Cataluña", province: "Girona", pop: 38000, hospital: "Hospital de Calella", trait: "primera ciudad de la Costa Brava, al sur de la provincia de Girona" },
  "lloret-de-mar": { community: "Cataluña", province: "Girona", pop: 40000, hospital: "Hospital de Calella", trait: "principal destino turístico de la Costa Brava" },
  calafell: { community: "Cataluña", province: "Tarragona", pop: 23000, hospital: "Hospital Universitari Joan XXIII", trait: "ciudad costera del Baix Penedès, en la Costa Daurada" },
  tortosa: { community: "Cataluña", province: "Tarragona", pop: 33000, hospital: "Hospital de Tortosa Verge de la Cinta", trait: "capital del Baix Ebre, ciudad histórica del sur catalán" },
  cambrils: { community: "Cataluña", province: "Tarragona", pop: 32000, hospital: "Hospital Universitari Joan XXIII", trait: "ciudad costera de la Costa Daurada, conocida por su gastronomía" },
  salou: { community: "Cataluña", province: "Tarragona", pop: 26000, hospital: "Hospital Universitari Joan XXIII", trait: "principal destino turístico de la Costa Daurada" },
  "bilbao-la-vieja": { community: "País Vasco", province: "Vizcaya", pop: 345000, hospital: "Hospital Universitario de Basurto", trait: "barrio histórico de Bilbao en proceso de transformación urbana" },
  basauri: { community: "País Vasco", province: "Vizcaya", pop: 40000, hospital: "Hospital Universitario de Cruces", trait: "ciudad del Gran Bilbao, en la margen izquierda del Nervión" },
  sestao: { community: "País Vasco", province: "Vizcaya", pop: 27000, hospital: "Hospital Universitario de Cruces", trait: "ciudad industrial de la margen izquierda del Nervión" },
  eibar: { community: "País Vasco", province: "Gipuzkoa", pop: 26000, hospital: "Hospital de Mendaro", trait: "ciudad industrial del Valle del Deba, conocida por su industria armera" },
  mondragon: { community: "País Vasco", province: "Gipuzkoa", pop: 22000, hospital: "Hospital de Mondragón (Arrasate)", trait: "ciudad del Alto Deba, sede de la cooperativa Mondragón" },
  zarautz: { community: "País Vasco", province: "Gipuzkoa", pop: 23000, hospital: "Hospital Universitario Donostia", trait: "ciudad costera de Gipuzkoa, conocida por su surf" },
  tolosa: { community: "País Vasco", province: "Gipuzkoa", pop: 19000, hospital: "Hospital Universitario Donostia", trait: "ciudad histórica del interior de Gipuzkoa, en el Oria" },
  renteria: { community: "País Vasco", province: "Gipuzkoa", pop: 38000, hospital: "Hospital Universitario Donostia", trait: "ciudad industrial de la bahía de Pasaia, junto a San Sebastián" },
  durango: { community: "País Vasco", province: "Vizcaya", pop: 28000, hospital: "Hospital de Galdakao", trait: "capital del Duranguesado, en el interior de Vizcaya" },
  portugalete: { community: "País Vasco", province: "Vizcaya", pop: 44000, hospital: "Hospital Universitario de Cruces", trait: "ciudad histórica de la margen izquierda del Nervión, con el Puente Colgante" },
  santurce: { community: "País Vasco", province: "Vizcaya", pop: 42000, hospital: "Hospital Universitario de Cruces", trait: "ciudad portuaria de la margen izquierda del Nervión" },
  tudela: { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 36000, hospital: "Hospital Reina Sofía de Tudela", trait: "segunda ciudad de Navarra, capital de la Ribera del Ebro navarra" },
  estella: { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 14000, hospital: "Hospital García Orcoyen", trait: "ciudad histórica de la Estella-Lizarra, en el Camino de Santiago" },
  calahorra: { community: "La Rioja", province: "La Rioja", pop: 23000, hospital: "Hospital de Calahorra", trait: "ciudad riojana de la ribera del Ebro, conocida por sus pimientos" },
  arnedo: { community: "La Rioja", province: "La Rioja", pop: 14000, hospital: "Hospital de Arnedo", trait: "ciudad riojana conocida como la capital del calzado de España" },
  huesca: { community: "Aragón", province: "Huesca", pop: 53000, hospital: "Hospital San Jorge", trait: "capital de la provincia de Huesca, puerta de los Pirineos aragoneses" },
  teruel: { community: "Aragón", province: "Teruel", pop: 35000, hospital: "Hospital Obispo Polanco", trait: "capital de la provincia de Teruel y símbolo del amor romántico" },
  calatayud: { community: "Aragón", province: "Zaragoza", pop: 20000, hospital: "Hospital Ernest Lluch", trait: "ciudad del Jalón aragonés, segunda ciudad de la provincia de Zaragoza" },
  barbastro: { community: "Aragón", province: "Huesca", pop: 17000, hospital: "Hospital de Barbastro", trait: "ciudad histórica del Somontano oscense, capital del vino Somontano" },
  monzon: { community: "Aragón", province: "Huesca", pop: 17000, hospital: "Hospital de Barbastro", trait: "ciudad del Cinca Medio, en el cruce entre Huesca y Zaragoza" },
  aviles: { community: "Principado de Asturias", province: "Asturias", pop: 78000, hospital: "Hospital San Agustín", trait: "ciudad industrial de la ría de Avilés, tercera ciudad de Asturias" },
  langreo: { community: "Principado de Asturias", province: "Asturias", pop: 42000, hospital: "Hospital Álvaro Cunqueiro (referencia)", trait: "ciudad industrial del Valle del Nalón, en la cuenca minera asturiana" },
  mieres: { community: "Principado de Asturias", province: "Asturias", pop: 39000, hospital: "Hospital Valle del Nalón", trait: "ciudad de la cuenca del Caudal, histórico centro minero asturiano" },
  siero: { community: "Principado de Asturias", province: "Asturias", pop: 52000, hospital: "Hospital Universitario Central de Asturias", trait: "municipio del área central asturiana, junto a Oviedo" },
  ferrol: { community: "Galicia", province: "A Coruña", pop: 67000, hospital: "Complexo Hospitalario Universitario de Ferrol (CHUF)", trait: "ciudad marinera y naval del noroeste de Galicia" },
  "santiago-de-compostela": { community: "Galicia", province: "A Coruña", pop: 97000, hospital: "Complexo Hospitalario Universitario de Santiago (CHUS)", trait: "capital de Galicia y destino del Camino de Santiago" },
  vilagarcia: { community: "Galicia", province: "Pontevedra", pop: 37000, hospital: "Complexo Hospitalario Universitario de Pontevedra", trait: "ciudad costera de las Rías Baixas, capital del Salnés" },
  naron: { community: "Galicia", province: "A Coruña", pop: 40000, hospital: "Complexo Hospitalario Universitario de Ferrol", trait: "municipio de la comarca de Ferrolterra, junto a Ferrol" },
  oleiros: { community: "Galicia", province: "A Coruña", pop: 35000, hospital: "Complexo Hospitalario Universitario de A Coruña", trait: "municipio residencial del área metropolitana de A Coruña" },
  torrelavega: { community: "Cantabria", province: "Cantabria", pop: 50000, hospital: "Hospital Sierrallana", trait: "segunda ciudad de Cantabria, capital de la comarca del Besaya" },
  "miranda-de-ebro": { community: "Castilla y León", province: "Burgos", pop: 36000, hospital: "Hospital Miranda de Ebro", trait: "ciudad industrial del norte de Burgos, en el corredor del Ebro" },
  "aranda-de-duero": { community: "Castilla y León", province: "Burgos", pop: 32000, hospital: "Hospital Santos Reyes", trait: "ciudad de la Ribera del Duero burgalesa, capital del vino" },
  ponferrada: { community: "Castilla y León", province: "León", pop: 65000, hospital: "Hospital El Bierzo", trait: "capital del Bierzo leonés, ciudad de castillos y viñedos" },
  "medina-del-campo": { community: "Castilla y León", province: "Valladolid", pop: 21000, hospital: "Hospital Medina del Campo", trait: "histórica ciudad mercantil de la meseta castellana" },
  "avila-ciudad": { community: "Castilla y León", province: "Ávila", pop: 58000, hospital: "Hospital Nuestra Señora de Sonsoles", trait: "ciudad amurallada Patrimonio de la Humanidad en el centro peninsular" },
  plasencia: { community: "Extremadura", province: "Cáceres", pop: 40000, hospital: "Hospital Campo Arañuelo", trait: "ciudad del norte extremeño, capital de la comarca cacereña del Norte" },
  "don-benito": { community: "Extremadura", province: "Badajoz", pop: 36000, hospital: "Hospital Don Benito-Villanueva", trait: "ciudad de la Vega del Guadiana, corazón agrícola de Extremadura" },
  "villanueva-de-la-serena": { community: "Extremadura", province: "Badajoz", pop: 26000, hospital: "Hospital Don Benito-Villanueva", trait: "ciudad extremeña de la Vega del Guadiana, junto a Don Benito" },
  ceuta: { community: "Ciudad Autónoma de Ceuta", province: "Ceuta", pop: 85000, hospital: "Hospital Universitario de Ceuta", trait: "ciudad autónoma española en el norte de África, puerta del Estrecho" },
  melilla: { community: "Ciudad Autónoma de Melilla", province: "Melilla", pop: 87000, hospital: "Hospital Comarcal de Melilla", trait: "ciudad autónoma española en el norte de África, enclave mediterráneo" },

  // ── Batch 4 — municipios de 30.000+ habitantes ──
  // Comunidad de Madrid
  coslada: { community: "Comunidad de Madrid", province: "Madrid", pop: 82000, hospital: "Hospital Universitario del Henares", trait: "ciudad del Corredor del Henares, al este de Madrid" },
  valdemoro: { community: "Comunidad de Madrid", province: "Madrid", pop: 79000, hospital: "Hospital Universitario Infanta Elena", trait: "ciudad del sur del área metropolitana de Madrid" },
  aranjuez: { community: "Comunidad de Madrid", province: "Madrid", pop: 60000, hospital: "Hospital del Tajo", trait: "ciudad Patrimonio de la Humanidad al sur de Madrid, a orillas del Tajo" },
  "arganda-del-rey": { community: "Comunidad de Madrid", province: "Madrid", pop: 56000, hospital: "Hospital Universitario del Sureste", trait: "ciudad del sureste metropolitano de Madrid" },
  "boadilla-del-monte": { community: "Comunidad de Madrid", province: "Madrid", pop: 60000, hospital: "Hospital Universitario Puerta de Hierro Majadahonda", trait: "municipio residencial del oeste metropolitano de Madrid" },
  "colmenar-viejo": { community: "Comunidad de Madrid", province: "Madrid", pop: 51000, hospital: "Hospital Universitario Infanta Sofía", trait: "ciudad del norte de la Comunidad de Madrid" },
  "tres-cantos": { community: "Comunidad de Madrid", province: "Madrid", pop: 48000, hospital: "Hospital Universitario Infanta Sofía", trait: "ciudad tecnológica del norte metropolitano de Madrid" },
  galapagar: { community: "Comunidad de Madrid", province: "Madrid", pop: 34000, hospital: "Hospital General de Villalba", trait: "municipio de la sierra noroeste de Madrid" },
  "san-fernando-de-henares": { community: "Comunidad de Madrid", province: "Madrid", pop: 40000, hospital: "Hospital Universitario del Henares", trait: "ciudad del Corredor del Henares, al este de Madrid" },
  // Cataluña
  "santa-coloma-de-gramenet": { community: "Cataluña", province: "Barcelona", pop: 120000, hospital: "Hospital Universitari Germans Trias i Pujol (Can Ruti)", trait: "ciudad del área metropolitana norte de Barcelona" },
  "sant-adria-de-besos": { community: "Cataluña", province: "Barcelona", pop: 37000, hospital: "Hospital Universitari Germans Trias i Pujol", trait: "ciudad costera del área metropolitana de Barcelona" },
  viladecans: { community: "Cataluña", province: "Barcelona", pop: 67000, hospital: "Hospital de Viladecans", trait: "ciudad del Baix Llobregat, sur de Barcelona" },
  gava: { community: "Cataluña", province: "Barcelona", pop: 47000, hospital: "Hospital de Viladecans", trait: "ciudad costera del Baix Llobregat, sur de Barcelona" },
  "barbera-del-valles": { community: "Cataluña", province: "Barcelona", pop: 33000, hospital: "Hospital Universitari Parc Taulí", trait: "ciudad del Vallès Occidental, en la provincia de Barcelona" },
  "montcada-i-reixac": { community: "Cataluña", province: "Barcelona", pop: 37000, hospital: "Hospital Universitari Germans Trias i Pujol", trait: "ciudad del Vallès Occidental, junto a Barcelona" },
  "sant-feliu-de-llobregat": { community: "Cataluña", province: "Barcelona", pop: 45000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "capital del Baix Llobregat, área metropolitana de Barcelona" },
  "esplugues-de-llobregat": { community: "Cataluña", province: "Barcelona", pop: 47000, hospital: "Hospital Universitari de Bellvitge", trait: "ciudad del Baix Llobregat, junto a Barcelona" },
  "sant-joan-despi": { community: "Cataluña", province: "Barcelona", pop: 34000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "ciudad del Baix Llobregat, área metropolitana de Barcelona" },
  olot: { community: "Cataluña", province: "Girona", pop: 36000, hospital: "Hospital d'Olot i Comarcal de la Garrotxa", trait: "capital de la Garrotxa, en el interior de Girona" },
  "el-vendrell": { community: "Cataluña", province: "Tarragona", pop: 38000, hospital: "Hospital del Vendrell", trait: "capital del Baix Penedès, en la Costa Daurada" },
  "sant-pere-de-ribes": { community: "Cataluña", province: "Barcelona", pop: 31000, hospital: "Hospital Residència Sant Camil", trait: "ciudad del Garraf, cerca de Sitges y Vilanova" },
  // Comunidad Valenciana
  elda: { community: "Comunidad Valenciana", province: "Alicante", pop: 52000, hospital: "Hospital General Universitario de Elda", trait: "ciudad industrial del Vinalopó, en el interior de Alicante" },
  mislata: { community: "Comunidad Valenciana", province: "Valencia", pop: 43000, hospital: "Hospital General Universitario de Valencia", trait: "ciudad del área metropolitana de Valencia" },
  "san-vicente-del-raspeig": { community: "Comunidad Valenciana", province: "Alicante", pop: 59000, hospital: "Hospital Universitario de Sant Joan d'Alacant", trait: "ciudad universitaria del área metropolitana de Alicante" },
  "vila-real": { community: "Comunidad Valenciana", province: "Castellón", pop: 51000, hospital: "Hospital Universitario de la Plana", trait: "segunda ciudad de la provincia de Castellón" },
  villajoyosa: { community: "Comunidad Valenciana", province: "Alicante", pop: 34000, hospital: "Hospital Marina Baixa", trait: "ciudad costera de la Costa Blanca, junto a Benidorm" },
  manises: { community: "Comunidad Valenciana", province: "Valencia", pop: 31000, hospital: "Hospital de Manises", trait: "ciudad del área metropolitana de Valencia, junto al aeropuerto" },
  aldaia: { community: "Comunidad Valenciana", province: "Valencia", pop: 32000, hospital: "Hospital de Manises", trait: "ciudad de l'Horta Sud, área metropolitana de Valencia" },
  alaquas: { community: "Comunidad Valenciana", province: "Valencia", pop: 30000, hospital: "Hospital de Manises", trait: "ciudad de l'Horta Sud, área metropolitana de Valencia" },
  "santa-pola": { community: "Comunidad Valenciana", province: "Alicante", pop: 34000, hospital: "Hospital General Universitario de Elche", trait: "ciudad costera y pesquera del sur de Alicante" },
  // Andalucía
  mijas: { community: "Andalucía", province: "Málaga", pop: 92000, hospital: "Hospital Costa del Sol", trait: "ciudad turística de la Costa del Sol occidental" },
  "el-ejido": { community: "Andalucía", province: "Almería", pop: 87000, hospital: "Hospital de Poniente", trait: "capital agrícola del Poniente Almeriense" },
  "sanlucar-de-barrameda": { community: "Andalucía", province: "Cádiz", pop: 69000, hospital: "Hospital de la Merced (área sanitaria de Cádiz)", trait: "ciudad de la desembocadura del Guadalquivir, en la provincia de Cádiz" },
  "mairena-del-aljarafe": { community: "Andalucía", province: "Sevilla", pop: 50000, hospital: "Hospital San Juan de Dios del Aljarafe", trait: "ciudad del Aljarafe sevillano, junto a Sevilla" },
  "rincon-de-la-victoria": { community: "Andalucía", province: "Málaga", pop: 50000, hospital: "Hospital Regional Universitario de Málaga", trait: "ciudad costera de la Axarquía, junto a Málaga" },
  "alhaurin-de-la-torre": { community: "Andalucía", province: "Málaga", pop: 44000, hospital: "Hospital Regional Universitario de Málaga", trait: "ciudad del valle del Guadalhorce, junto a Málaga" },
  "puerto-real": { community: "Andalucía", province: "Cádiz", pop: 41000, hospital: "Hospital Universitario Puerto Real", trait: "ciudad de la Bahía de Cádiz" },
  "la-rinconada": { community: "Andalucía", province: "Sevilla", pop: 40000, hospital: "Hospital Universitario Virgen Macarena (área de Sevilla)", trait: "ciudad de la Vega del Guadalquivir, junto a Sevilla" },
  "los-palacios-y-villafranca": { community: "Andalucía", province: "Sevilla", pop: 39000, hospital: "Hospital Universitario Virgen de Valme", trait: "ciudad de la campiña sevillana, al sur de Sevilla" },
  "arcos-de-la-frontera": { community: "Andalucía", province: "Cádiz", pop: 31000, hospital: "Hospital Universitario de Jerez", trait: "ciudad de los Pueblos Blancos, en la provincia de Cádiz" },
  cartama: { community: "Andalucía", province: "Málaga", pop: 30000, hospital: "Hospital Regional Universitario de Málaga", trait: "ciudad del valle del Guadalhorce, en la provincia de Málaga" },
  "coria-del-rio": { community: "Andalucía", province: "Sevilla", pop: 31000, hospital: "Hospital Universitario Virgen del Rocío (área de Sevilla)", trait: "ciudad ribereña del Guadalquivir, junto a Sevilla" },
  nijar: { community: "Andalucía", province: "Almería", pop: 31000, hospital: "Hospital Universitario Torrecárdenas", trait: "extenso municipio del Levante almeriense, junto al Cabo de Gata" },
  // Región de Murcia
  "molina-de-segura": { community: "Región de Murcia", province: "Murcia", pop: 73000, hospital: "Hospital Clínico Universitario Virgen de la Arrixaca", trait: "segunda ciudad del área metropolitana de Murcia" },
  alcantarilla: { community: "Región de Murcia", province: "Murcia", pop: 43000, hospital: "Hospital Clínico Universitario Virgen de la Arrixaca", trait: "ciudad del área metropolitana de Murcia" },
  cieza: { community: "Región de Murcia", province: "Murcia", pop: 35000, hospital: "Hospital Lorenzo Guirao", trait: "ciudad de la Vega Alta del Segura, en el norte murciano" },
  aguilas: { community: "Región de Murcia", province: "Murcia", pop: 35000, hospital: "Hospital Rafael Méndez (Lorca)", trait: "ciudad costera del sur de la Región de Murcia" },
  yecla: { community: "Región de Murcia", province: "Murcia", pop: 35000, hospital: "Hospital Virgen del Castillo", trait: "ciudad del Altiplano murciano, tierra de vinos" },
  totana: { community: "Región de Murcia", province: "Murcia", pop: 32000, hospital: "Hospital Rafael Méndez (Lorca)", trait: "ciudad del Bajo Guadalentín, en el suroeste murciano" },
  mazarron: { community: "Región de Murcia", province: "Murcia", pop: 32000, hospital: "Hospital General Universitario Santa Lucía (Cartagena)", trait: "ciudad costera del litoral murciano" },
  "san-javier": { community: "Región de Murcia", province: "Murcia", pop: 33000, hospital: "Hospital Los Arcos del Mar Menor", trait: "ciudad ribereña del Mar Menor" },
  "torre-pacheco": { community: "Región de Murcia", province: "Murcia", pop: 36000, hospital: "Hospital Los Arcos del Mar Menor", trait: "ciudad del Campo de Cartagena, junto al Mar Menor" },
  // País Vasco
  leioa: { community: "País Vasco", province: "Vizcaya", pop: 31000, hospital: "Hospital Universitario de Cruces", trait: "municipio del Gran Bilbao, sede del campus de la UPV/EHU" },
  // Galicia
  arteixo: { community: "Galicia", province: "A Coruña", pop: 32000, hospital: "Complexo Hospitalario Universitario de A Coruña (CHUAC)", trait: "ciudad industrial del área metropolitana de A Coruña" },
  ames: { community: "Galicia", province: "A Coruña", pop: 32000, hospital: "Complexo Hospitalario Universitario de Santiago (CHUS)", trait: "municipio en expansión junto a Santiago de Compostela" },
  culleredo: { community: "Galicia", province: "A Coruña", pop: 31000, hospital: "Complexo Hospitalario Universitario de A Coruña (CHUAC)", trait: "municipio del área metropolitana de A Coruña" },
  // Castilla y León
  "san-andres-del-rabanedo": { community: "Castilla y León", province: "León", pop: 31000, hospital: "Complejo Asistencial Universitario de León", trait: "ciudad del alfoz de León" },
  // Castilla-La Mancha
  puertollano: { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 46000, hospital: "Hospital Santa Bárbara", trait: "ciudad industrial del sur de Ciudad Real" },
  tomelloso: { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 36000, hospital: "Hospital General de Tomelloso", trait: "ciudad manchega, tierra de vinos" },
  "alcazar-de-san-juan": { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 30000, hospital: "Hospital General Mancha Centro", trait: "nudo ferroviario de La Mancha, en Ciudad Real" },
  valdepenas: { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 30000, hospital: "Hospital Gutiérrez Ortega", trait: "ciudad del vino en el sur de Ciudad Real" },
  "azuqueca-de-henares": { community: "Castilla-La Mancha", province: "Guadalajara", pop: 35000, hospital: "Hospital Universitario de Guadalajara", trait: "ciudad del Corredor del Henares, en Guadalajara" },
  hellin: { community: "Castilla-La Mancha", province: "Albacete", pop: 30000, hospital: "Hospital de Hellín", trait: "segunda ciudad de la provincia de Albacete" },
  illescas: { community: "Castilla-La Mancha", province: "Toledo", pop: 30000, hospital: "Hospital Universitario de Toledo", trait: "ciudad de la comarca de La Sagra, entre Madrid y Toledo" },
  // Extremadura
  almendralejo: { community: "Extremadura", province: "Badajoz", pop: 35000, hospital: "Hospital de Almendralejo", trait: "capital de Tierra de Barros, ciudad del vino y el cava extremeño" },
  // Cantabria
  camargo: { community: "Cantabria", province: "Cantabria", pop: 32000, hospital: "Hospital Universitario Marqués de Valdecilla", trait: "municipio de la bahía de Santander" },
  "castro-urdiales": { community: "Cantabria", province: "Cantabria", pop: 32000, hospital: "Hospital Comarcal de Laredo", trait: "ciudad costera del oriente de Cantabria, cerca de Vizcaya" },
  // Islas Baleares
  calvia: { community: "Islas Baleares", province: "Islas Baleares", pop: 52000, hospital: "Hospital Universitario Son Espases", trait: "municipio turístico del suroeste de Mallorca" },
  marratxi: { community: "Islas Baleares", province: "Islas Baleares", pop: 40000, hospital: "Hospital Son Llàtzer", trait: "municipio del área metropolitana de Palma" },
  llucmajor: { community: "Islas Baleares", province: "Islas Baleares", pop: 38000, hospital: "Hospital Son Llàtzer", trait: "extenso municipio del sur de Mallorca" },
  "santa-eularia-des-riu": { community: "Islas Baleares", province: "Islas Baleares", pop: 40000, hospital: "Hospital Can Misses (Ibiza)", trait: "municipio turístico del este de Ibiza" },
  inca: { community: "Islas Baleares", province: "Islas Baleares", pop: 35000, hospital: "Hospital Comarcal d'Inca", trait: "capital del Raiguer, centro del interior de Mallorca" },
  // Canarias
  "san-bartolome-de-tirajana": { community: "Canarias", province: "Las Palmas", pop: 54000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "municipio turístico del sur de Gran Canaria (Maspalomas)" },
  "granadilla-de-abona": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 50000, hospital: "Hospital del Sur (Tenerife)", trait: "municipio del sur de Tenerife, junto al aeropuerto" },
  "la-orotava": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 42000, hospital: "Hospital Universitario de Canarias", trait: "villa histórica del norte de Tenerife" },
  "los-realejos": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 37000, hospital: "Hospital Universitario de Canarias", trait: "municipio del valle de La Orotava, norte de Tenerife" },
  arucas: { community: "Canarias", province: "Las Palmas", pop: 38000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "ciudad del norte de Gran Canaria, tierra del ron y el plátano" },
  aguimes: { community: "Canarias", province: "Las Palmas", pop: 32000, hospital: "Hospital Universitario Insular de Gran Canaria", trait: "municipio del sureste de Gran Canaria" },
  ingenio: { community: "Canarias", province: "Las Palmas", pop: 32000, hospital: "Hospital Universitario Insular de Gran Canaria", trait: "municipio del sureste de Gran Canaria" },
  "puerto-de-la-cruz": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 30000, hospital: "Hospital Universitario de Canarias", trait: "ciudad turística del norte de Tenerife" },

  // ── Batch 5 — municipios de ~20.000–30.000 habitantes ──
  // Andalucía
  adra: { community: "Andalucía", province: "Almería", pop: 25000, hospital: "Hospital de Poniente (El Ejido)", trait: "ciudad costera de la Alpujarra almeriense" },
  vicar: { community: "Andalucía", province: "Almería", pop: 27000, hospital: "Hospital de Poniente (El Ejido)", trait: "municipio del Poniente Almeriense" },
  baza: { community: "Andalucía", province: "Granada", pop: 20000, hospital: "Hospital de Baza", trait: "cabecera de la comarca del Altiplano granadino" },
  armilla: { community: "Andalucía", province: "Granada", pop: 24000, hospital: "Hospital Universitario Clínico San Cecilio", trait: "ciudad del área metropolitana de Granada" },
  maracena: { community: "Andalucía", province: "Granada", pop: 22000, hospital: "Hospital Universitario Clínico San Cecilio", trait: "ciudad de la Vega de Granada" },
  "las-gabias": { community: "Andalucía", province: "Granada", pop: 22000, hospital: "Hospital Universitario Clínico San Cecilio", trait: "municipio de la Vega de Granada" },
  loja: { community: "Andalucía", province: "Granada", pop: 20000, hospital: "Hospital de Loja", trait: "ciudad del poniente granadino, a orillas del Genil" },
  "alhaurin-el-grande": { community: "Andalucía", province: "Málaga", pop: 24000, hospital: "Hospital Regional Universitario de Málaga", trait: "ciudad del valle del Guadalhorce" },
  coin: { community: "Andalucía", province: "Málaga", pop: 21000, hospital: "Hospital Regional Universitario de Málaga", trait: "ciudad del valle del Guadalhorce" },
  barbate: { community: "Andalucía", province: "Cádiz", pop: 22000, hospital: "Hospital Universitario Puerta del Mar", trait: "ciudad pesquera de la costa de la Janda" },
  rota: { community: "Andalucía", province: "Cádiz", pop: 29000, hospital: "Hospital Universitario Puerto Real", trait: "ciudad de la Bahía de Cádiz" },
  "conil-de-la-frontera": { community: "Andalucía", province: "Cádiz", pop: 22000, hospital: "Hospital Universitario Puerta del Mar", trait: "ciudad de la Costa de la Luz gaditana" },
  "isla-cristina": { community: "Andalucía", province: "Huelva", pop: 21000, hospital: "Hospital Infanta Elena (Huelva)", trait: "ciudad pesquera del litoral onubense" },
  lepe: { community: "Andalucía", province: "Huelva", pop: 27000, hospital: "Hospital Infanta Elena (Huelva)", trait: "ciudad agrícola de la Costa de Huelva" },
  ayamonte: { community: "Andalucía", province: "Huelva", pop: 21000, hospital: "Hospital Infanta Elena (Huelva)", trait: "ciudad fronteriza con Portugal, en la desembocadura del Guadiana" },
  moguer: { community: "Andalucía", province: "Huelva", pop: 22000, hospital: "Hospital Juan Ramón Jiménez (Huelva)", trait: "ciudad del Condado de Huelva, cuna del poeta Juan Ramón Jiménez" },
  cartaya: { community: "Andalucía", province: "Huelva", pop: 20000, hospital: "Hospital Infanta Elena (Huelva)", trait: "municipio del litoral onubense" },
  bormujos: { community: "Andalucía", province: "Sevilla", pop: 22000, hospital: "Hospital San Juan de Dios del Aljarafe", trait: "ciudad del Aljarafe sevillano" },
  camas: { community: "Andalucía", province: "Sevilla", pop: 27000, hospital: "Hospital Universitario Virgen del Rocío", trait: "ciudad del Aljarafe, junto a Sevilla" },
  tomares: { community: "Andalucía", province: "Sevilla", pop: 25000, hospital: "Hospital San Juan de Dios del Aljarafe", trait: "ciudad del Aljarafe sevillano" },
  "moron-de-la-frontera": { community: "Andalucía", province: "Sevilla", pop: 28000, hospital: "Hospital Universitario Virgen de Valme", trait: "ciudad de la campiña sevillana" },
  lebrija: { community: "Andalucía", province: "Sevilla", pop: 27000, hospital: "Hospital Universitario Virgen de Valme", trait: "ciudad del Bajo Guadalquivir" },
  carmona: { community: "Andalucía", province: "Sevilla", pop: 28000, hospital: "Hospital Universitario Virgen Macarena", trait: "ciudad histórica de la campiña sevillana" },
  cabra: { community: "Andalucía", province: "Córdoba", pop: 20000, hospital: "Hospital Infanta Margarita (Cabra)", trait: "ciudad del corazón de la Subbética cordobesa" },
  "priego-de-cordoba": { community: "Andalucía", province: "Córdoba", pop: 22000, hospital: "Hospital Infanta Margarita (Cabra)", trait: "ciudad barroca de la Subbética cordobesa" },
  montilla: { community: "Andalucía", province: "Córdoba", pop: 23000, hospital: "Hospital Infanta Margarita (Cabra)", trait: "ciudad de la Campiña Sur, tierra de vinos" },
  "palma-del-rio": { community: "Andalucía", province: "Córdoba", pop: 21000, hospital: "Hospital Universitario Reina Sofía", trait: "ciudad de la Vega del Guadalquivir" },
  "alcala-la-real": { community: "Andalucía", province: "Jaén", pop: 21000, hospital: "Complejo Hospitalario de Jaén", trait: "ciudad de la Sierra Sur de Jaén" },
  martos: { community: "Andalucía", province: "Jaén", pop: 24000, hospital: "Complejo Hospitalario de Jaén", trait: "ciudad olivarera de la campiña de Jaén" },
  // Comunidad Valenciana
  almassora: { community: "Comunidad Valenciana", province: "Castellón", pop: 26000, hospital: "Hospital General Universitario de Castellón", trait: "ciudad de la Plana Alta, junto a Castellón" },
  burriana: { community: "Comunidad Valenciana", province: "Castellón", pop: 26000, hospital: "Hospital Universitario de la Plana", trait: "ciudad citrícola de la Plana Baixa" },
  vinaros: { community: "Comunidad Valenciana", province: "Castellón", pop: 28000, hospital: "Hospital Comarcal de Vinaròs", trait: "ciudad costera del Baix Maestrat" },
  "la-vall-duixo": { community: "Comunidad Valenciana", province: "Castellón", pop: 32000, hospital: "Hospital Universitario de la Plana", trait: "ciudad de la Plana Baixa castellonense" },
  onda: { community: "Comunidad Valenciana", province: "Castellón", pop: 25000, hospital: "Hospital Universitario de la Plana", trait: "ciudad azulejera de la Plana Baixa" },
  alboraya: { community: "Comunidad Valenciana", province: "Valencia", pop: 24000, hospital: "Hospital Clínico Universitario de Valencia", trait: "ciudad de l'Horta Nord, cuna de la chufa y la horchata" },
  xirivella: { community: "Comunidad Valenciana", province: "Valencia", pop: 29000, hospital: "Hospital General Universitario de Valencia", trait: "ciudad de l'Horta Sud, junto a Valencia" },
  catarroja: { community: "Comunidad Valenciana", province: "Valencia", pop: 28000, hospital: "Hospital Universitario Doctor Peset", trait: "ciudad de l'Horta Sud, junto a la Albufera" },
  paiporta: { community: "Comunidad Valenciana", province: "Valencia", pop: 26000, hospital: "Hospital Universitario Doctor Peset", trait: "ciudad de l'Horta Sud, área metropolitana de Valencia" },
  cullera: { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Universitario de la Ribera (Alzira)", trait: "ciudad costera de la Ribera Baixa" },
  xativa: { community: "Comunidad Valenciana", province: "Valencia", pop: 29000, hospital: "Hospital Lluís Alcanyís de Xàtiva", trait: "ciudad histórica de la comarca de la Costera" },
  oliva: { community: "Comunidad Valenciana", province: "Valencia", pop: 25000, hospital: "Hospital Francesc de Borja de Gandia", trait: "ciudad costera de la Safor" },
  algemesi: { community: "Comunidad Valenciana", province: "Valencia", pop: 27000, hospital: "Hospital Universitario de la Ribera (Alzira)", trait: "ciudad de la Ribera Alta valenciana" },
  betera: { community: "Comunidad Valenciana", province: "Valencia", pop: 24000, hospital: "Hospital Arnau de Vilanova", trait: "municipio del Camp de Túria" },
  "riba-roja-de-turia": { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Arnau de Vilanova", trait: "ciudad del Camp de Túria, junto al río Turia" },
  almoradi: { community: "Comunidad Valenciana", province: "Alicante", pop: 21000, hospital: "Hospital Vega Baja (Orihuela)", trait: "ciudad de la Vega Baja del Segura" },
  xabia: { community: "Comunidad Valenciana", province: "Alicante", pop: 28000, hospital: "Hospital de Dénia", trait: "ciudad costera de la Marina Alta" },
  mutxamel: { community: "Comunidad Valenciana", province: "Alicante", pop: 26000, hospital: "Hospital Universitario de Sant Joan d'Alacant", trait: "ciudad del área metropolitana de Alicante" },
  "el-campello": { community: "Comunidad Valenciana", province: "Alicante", pop: 29000, hospital: "Hospital Universitario de Sant Joan d'Alacant", trait: "ciudad costera al norte de Alicante" },
  aspe: { community: "Comunidad Valenciana", province: "Alicante", pop: 20000, hospital: "Hospital General Universitario de Elche", trait: "ciudad del Medio Vinalopó" },
  // Cataluña
  "premia-de-mar": { community: "Cataluña", province: "Barcelona", pop: 28000, hospital: "Hospital de Mataró", trait: "ciudad costera del Maresme" },
  "el-masnou": { community: "Cataluña", province: "Barcelona", pop: 23000, hospital: "Hospital de Mataró", trait: "ciudad marinera del Maresme" },
  "vilassar-de-mar": { community: "Cataluña", province: "Barcelona", pop: 21000, hospital: "Hospital de Mataró", trait: "ciudad costera del Maresme" },
  "pineda-de-mar": { community: "Cataluña", province: "Barcelona", pop: 28000, hospital: "Hospital Comarcal de Calella", trait: "ciudad turística del Alt Maresme" },
  "sant-vicenc-dels-horts": { community: "Cataluña", province: "Barcelona", pop: 28000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "ciudad del Baix Llobregat" },
  "molins-de-rei": { community: "Cataluña", province: "Barcelona", pop: 26000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "ciudad del Baix Llobregat, a orillas del río" },
  "sant-andreu-de-la-barca": { community: "Cataluña", province: "Barcelona", pop: 27000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "ciudad del Baix Llobregat" },
  martorell: { community: "Cataluña", province: "Barcelona", pop: 28000, hospital: "Hospital de Martorell", trait: "ciudad industrial del Baix Llobregat" },
  esparreguera: { community: "Cataluña", province: "Barcelona", pop: 22000, hospital: "Hospital de Martorell", trait: "ciudad del Baix Llobregat Nord" },
  "olesa-de-montserrat": { community: "Cataluña", province: "Barcelona", pop: 24000, hospital: "Hospital de Martorell", trait: "ciudad al pie de Montserrat, en el Baix Llobregat" },
  "sant-just-desvern": { community: "Cataluña", province: "Barcelona", pop: 20000, hospital: "Hospital de Sant Joan Despí Moisès Broggi", trait: "ciudad del Baix Llobregat, junto a Barcelona" },
  manlleu: { community: "Cataluña", province: "Barcelona", pop: 21000, hospital: "Hospital Universitari de Vic", trait: "ciudad de la comarca de Osona" },
  banyoles: { community: "Cataluña", province: "Girona", pop: 20000, hospital: "Hospital Universitari Doctor Josep Trueta", trait: "ciudad del Pla de l'Estany, junto a su famoso lago" },
  salt: { community: "Cataluña", province: "Girona", pop: 32000, hospital: "Hospital Universitari Doctor Josep Trueta", trait: "ciudad del Gironès, junto a Girona" },
  palafrugell: { community: "Cataluña", province: "Girona", pop: 23000, hospital: "Hospital de Palamós", trait: "ciudad del Baix Empordà, en la Costa Brava" },
  amposta: { community: "Cataluña", province: "Tarragona", pop: 21000, hospital: "Hospital de Tortosa Verge de la Cinta", trait: "capital del Montsià, en el delta del Ebro" },
  valls: { community: "Cataluña", province: "Tarragona", pop: 25000, hospital: "Hospital Universitari Sant Joan de Reus", trait: "capital de l'Alt Camp, tierra de los castellers" },
  "vila-seca": { community: "Cataluña", province: "Tarragona", pop: 22000, hospital: "Hospital Universitari Sant Joan de Reus", trait: "ciudad del Tarragonès, en la Costa Daurada" },
  // Comunidad de Madrid
  ciempozuelos: { community: "Comunidad de Madrid", province: "Madrid", pop: 24000, hospital: "Hospital Universitario Infanta Elena", trait: "ciudad del sur de la Comunidad de Madrid" },
  navalcarnero: { community: "Comunidad de Madrid", province: "Madrid", pop: 30000, hospital: "Hospital Universitario de Móstoles", trait: "ciudad del suroeste metropolitano de Madrid" },
  "villaviciosa-de-odon": { community: "Comunidad de Madrid", province: "Madrid", pop: 28000, hospital: "Hospital Universitario Fundación Alcorcón", trait: "municipio residencial del oeste de Madrid" },
  "mejorada-del-campo": { community: "Comunidad de Madrid", province: "Madrid", pop: 23000, hospital: "Hospital Universitario del Sureste", trait: "ciudad del sureste metropolitano de Madrid" },
  "paracuellos-de-jarama": { community: "Comunidad de Madrid", province: "Madrid", pop: 26000, hospital: "Hospital Universitario del Henares", trait: "municipio del este de Madrid, junto al Jarama" },
  "villanueva-de-la-canada": { community: "Comunidad de Madrid", province: "Madrid", pop: 22000, hospital: "Hospital Universitario Puerta de Hierro Majadahonda", trait: "municipio del oeste metropolitano de Madrid" },
  "humanes-de-madrid": { community: "Comunidad de Madrid", province: "Madrid", pop: 20000, hospital: "Hospital Universitario de Fuenlabrada", trait: "ciudad del sur metropolitano de Madrid" },
  // País Vasco
  galdakao: { community: "País Vasco", province: "Vizcaya", pop: 29000, hospital: "Hospital Galdakao-Usansolo", trait: "ciudad del Gran Bilbao, en el valle del Ibaizabal" },
  erandio: { community: "País Vasco", province: "Vizcaya", pop: 24000, hospital: "Hospital Universitario de Cruces", trait: "municipio de la ría del Nervión, en el Gran Bilbao" },
  hernani: { community: "País Vasco", province: "Guipúzcoa", pop: 20000, hospital: "Hospital Universitario Donostia", trait: "ciudad del área de San Sebastián, en el valle del Urumea" },
  "lasarte-oria": { community: "País Vasco", province: "Guipúzcoa", pop: 19000, hospital: "Hospital Universitario Donostia", trait: "ciudad del área metropolitana de San Sebastián" },
  "amorebieta-etxano": { community: "País Vasco", province: "Vizcaya", pop: 19000, hospital: "Hospital Galdakao-Usansolo", trait: "ciudad de la comarca de Durangaldea" },
  llodio: { community: "País Vasco", province: "Álava", pop: 18000, hospital: "Hospital Universitario de Álava", trait: "ciudad del valle de Ayala, norte de Álava" },
  // Galicia
  redondela: { community: "Galicia", province: "Pontevedra", pop: 29000, hospital: "Hospital Álvaro Cunqueiro (Vigo)", trait: "ciudad de la ría de Vigo, conocida por sus viaductos" },
  cangas: { community: "Galicia", province: "Pontevedra", pop: 26000, hospital: "Hospital Álvaro Cunqueiro (Vigo)", trait: "ciudad del Morrazo, en la ría de Vigo" },
  marin: { community: "Galicia", province: "Pontevedra", pop: 24000, hospital: "Complexo Hospitalario Universitario de Pontevedra", trait: "ciudad marinera de la ría de Pontevedra" },
  ponteareas: { community: "Galicia", province: "Pontevedra", pop: 23000, hospital: "Hospital Álvaro Cunqueiro (Vigo)", trait: "ciudad de la comarca del Condado, en el Baixo Miño" },
  lalin: { community: "Galicia", province: "Pontevedra", pop: 20000, hospital: "Complexo Hospitalario Universitario de Pontevedra", trait: "capital de la comarca del Deza, centro geográfico de Galicia" },
  "a-estrada": { community: "Galicia", province: "Pontevedra", pop: 20000, hospital: "Complexo Hospitalario Universitario de Santiago (CHUS)", trait: "ciudad de la comarca de Tabeirós" },
  carballo: { community: "Galicia", province: "A Coruña", pop: 31000, hospital: "Complexo Hospitalario Universitario de A Coruña (CHUAC)", trait: "capital de la comarca de Bergantiños, en la Costa da Morte" },
  ribeira: { community: "Galicia", province: "A Coruña", pop: 27000, hospital: "Hospital do Barbanza", trait: "ciudad pesquera de la comarca del Barbanza" },
  cambre: { community: "Galicia", province: "A Coruña", pop: 24000, hospital: "Complexo Hospitalario Universitario de A Coruña (CHUAC)", trait: "municipio del área metropolitana de A Coruña" },
  // Castilla y León
  "laguna-de-duero": { community: "Castilla y León", province: "Valladolid", pop: 23000, hospital: "Hospital Universitario Río Hortega", trait: "ciudad del alfoz de Valladolid" },
  "arroyo-de-la-encomienda": { community: "Castilla y León", province: "Valladolid", pop: 20000, hospital: "Hospital Universitario Río Hortega", trait: "municipio en expansión del alfoz de Valladolid" },
  villaquilambre: { community: "Castilla y León", province: "León", pop: 19000, hospital: "Complejo Asistencial Universitario de León", trait: "municipio del alfoz de León" },
  // Castilla-La Mancha
  villarrobledo: { community: "Castilla-La Mancha", province: "Albacete", pop: 26000, hospital: "Hospital General de Villarrobledo", trait: "ciudad manchega del norte de Albacete" },
  almansa: { community: "Castilla-La Mancha", province: "Albacete", pop: 25000, hospital: "Hospital General de Almansa", trait: "ciudad del corredor de Almansa, este de Albacete" },
  manzanares: { community: "Castilla-La Mancha", province: "Ciudad Real", pop: 19000, hospital: "Hospital General de Ciudad Real", trait: "ciudad manchega, nudo de comunicaciones de Ciudad Real" },
  sesena: { community: "Castilla-La Mancha", province: "Toledo", pop: 26000, hospital: "Hospital Universitario de Toledo", trait: "ciudad de La Sagra, junto a la Comunidad de Madrid" },
  // Aragón
  utebo: { community: "Aragón", province: "Zaragoza", pop: 19000, hospital: "Hospital Universitario Miguel Servet", trait: "ciudad del área metropolitana de Zaragoza" },
  // Extremadura
  zafra: { community: "Extremadura", province: "Badajoz", pop: 16000, hospital: "Hospital de Zafra", trait: "capital comercial del sur de Badajoz, en Tierra de Barros" },
  "navalmoral-de-la-mata": { community: "Extremadura", province: "Cáceres", pop: 17000, hospital: "Hospital Campo Arañuelo", trait: "ciudad de la comarca del Campo Arañuelo, este de Cáceres" },
  // Región de Murcia
  "caravaca-de-la-cruz": { community: "Región de Murcia", province: "Murcia", pop: 26000, hospital: "Hospital Comarcal del Noroeste", trait: "ciudad santa del noroeste murciano" },
  jumilla: { community: "Región de Murcia", province: "Murcia", pop: 26000, hospital: "Hospital Virgen del Castillo (Yecla)", trait: "ciudad vinícola del Altiplano murciano" },
  archena: { community: "Región de Murcia", province: "Murcia", pop: 19000, hospital: "Hospital Clínico Universitario Virgen de la Arrixaca", trait: "ciudad del valle de Ricote, tierra de balnearios" },
  "las-torres-de-cotillas": { community: "Región de Murcia", province: "Murcia", pop: 22000, hospital: "Hospital Clínico Universitario Virgen de la Arrixaca", trait: "ciudad de la Vega Media del Segura" },
  "alhama-de-murcia": { community: "Región de Murcia", province: "Murcia", pop: 22000, hospital: "Hospital Rafael Méndez (Lorca)", trait: "ciudad del valle del Guadalentín" },
  // Islas Baleares
  "sant-antoni-de-portmany": { community: "Islas Baleares", province: "Islas Baleares", pop: 26000, hospital: "Hospital Can Misses (Ibiza)", trait: "municipio turístico del oeste de Ibiza" },
  "sant-josep-de-sa-talaia": { community: "Islas Baleares", province: "Islas Baleares", pop: 28000, hospital: "Hospital Can Misses (Ibiza)", trait: "extenso municipio del suroeste de Ibiza" },
  // Canarias
  candelaria: { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 28000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "ciudad mariana del sureste de Tenerife" },
  tacoronte: { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 24000, hospital: "Hospital Universitario de Canarias", trait: "ciudad del norte de Tenerife, comarca de Acentejo" },
  "icod-de-los-vinos": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 22000, hospital: "Hospital Universitario de Canarias", trait: "ciudad del norte de Tenerife, hogar del Drago Milenario" },
  guimar: { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 20000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "ciudad del valle de Güímar, sureste de Tenerife" },
  "los-llanos-de-aridane": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 20000, hospital: "Hospital General de La Palma", trait: "ciudad del valle de Aridane, en La Palma" },
  galdar: { community: "Canarias", province: "Las Palmas", pop: 24000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "ciudad histórica del norte de Gran Canaria" },
  "la-oliva": { community: "Canarias", province: "Las Palmas", pop: 27000, hospital: "Hospital General de Fuerteventura", trait: "municipio del norte de Fuerteventura (Corralejo)" },
  pajara: { community: "Canarias", province: "Las Palmas", pop: 21000, hospital: "Hospital General de Fuerteventura", trait: "municipio turístico del sur de Fuerteventura (Jandía)" },
  teguise: { community: "Canarias", province: "Las Palmas", pop: 23000, hospital: "Hospital Doctor José Molina Orosa", trait: "extenso municipio del norte de Lanzarote (Costa Teguise)" },
  tias: { community: "Canarias", province: "Las Palmas", pop: 20000, hospital: "Hospital Doctor José Molina Orosa", trait: "municipio turístico de Lanzarote (Puerto del Carmen)" },
  // Asturias
  castrillon: { community: "Asturias", province: "Asturias", pop: 22000, hospital: "Hospital San Agustín (Avilés)", trait: "concejo costero del centro de Asturias, junto a Avilés" },
  // Cantabria
  pielagos: { community: "Cantabria", province: "Cantabria", pop: 25000, hospital: "Hospital Universitario Marqués de Valdecilla", trait: "municipio del área de Santander, en el valle del Pas" },
  "el-astillero": { community: "Cantabria", province: "Cantabria", pop: 18000, hospital: "Hospital Universitario Marqués de Valdecilla", trait: "municipio de la bahía de Santander" },
  // Navarra
  baranain: { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 20000, hospital: "Hospital Universitario de Navarra", trait: "ciudad del área metropolitana de Pamplona" },
  burlada: { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 19000, hospital: "Hospital Universitario de Navarra", trait: "ciudad de la comarca de Pamplona, junto al río Arga" },

  // Batch 6 — municipios >20.000 hab. que faltaban
  // Comunidad de Madrid
  arroyomolinos: { community: "Comunidad de Madrid", province: "Madrid", pop: 38000, hospital: "Hospital Universitario de Móstoles", trait: "municipio del suroeste metropolitano de Madrid" },
  torrelodones: { community: "Comunidad de Madrid", province: "Madrid", pop: 25000, hospital: "Hospital Universitario Puerta de Hierro Majadahonda", trait: "municipio residencial de la sierra noroeste de Madrid" },
  algete: { community: "Comunidad de Madrid", province: "Madrid", pop: 21000, hospital: "Hospital Universitario Infanta Sofía", trait: "municipio del norte del área metropolitana de Madrid" },
  "san-martin-de-la-vega": { community: "Comunidad de Madrid", province: "Madrid", pop: 21000, hospital: "Hospital Universitario del Sureste (Arganda del Rey)", trait: "municipio del sureste metropolitano de Madrid" },
  // Comunidad Valenciana
  benicarlo: { community: "Comunidad Valenciana", province: "Castellón", pop: 30000, hospital: "Hospital Comarcal de Vinaròs", trait: "ciudad costera del Baix Maestrat, al norte de Castellón" },
  sueca: { community: "Comunidad Valenciana", province: "Valencia", pop: 29000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "capital de la Ribera Baixa, junto a la Albufera de Valencia" },
  "puebla-de-vallbona": { community: "Comunidad Valenciana", province: "Valencia", pop: 27000, hospital: "Hospital Arnau de Vilanova (Valencia)", trait: "municipio del Camp de Túria, en el interior de Valencia" },
  "quart-de-poblet": { community: "Comunidad Valenciana", province: "Valencia", pop: 27000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "ciudad de l'Horta Oest, en el área metropolitana de Valencia" },
  "san-juan-de-alicante": { community: "Comunidad Valenciana", province: "Alicante", pop: 27000, hospital: "Hospital Universitario de Sant Joan d'Alacant", trait: "municipio del área metropolitana de Alicante" },
  altea: { community: "Comunidad Valenciana", province: "Alicante", pop: 25000, hospital: "Hospital Comarcal Marina Baixa (La Vila Joiosa)", trait: "ciudad costera de la Marina Baixa alicantina" },
  "pilar-de-la-horadada": { community: "Comunidad Valenciana", province: "Alicante", pop: 24000, hospital: "Hospital Universitario de Torrevieja", trait: "municipio del extremo sur de la Costa Blanca" },
  picasent: { community: "Comunidad Valenciana", province: "Valencia", pop: 23000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "municipio de l'Horta Sud, en la provincia de Valencia" },
  alfafar: { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Universitari i Politècnic La Fe", trait: "municipio de l'Horta Sud, junto a la ciudad de Valencia" },
  moncada: { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Clínico Universitario de Valencia", trait: "municipio de l'Horta Nord, en la provincia de Valencia" },
  carcaixent: { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Universitari de la Ribera (Alzira)", trait: "municipio de la Ribera Alta, en la provincia de Valencia" },
  puzol: { community: "Comunidad Valenciana", province: "Valencia", pop: 22000, hospital: "Hospital Clínico Universitario de Valencia", trait: "municipio costero de l'Horta Nord, en la provincia de Valencia" },
  liria: { community: "Comunidad Valenciana", province: "Valencia", pop: 25000, hospital: "Hospital Arnau de Vilanova (Valencia)", trait: "capital del Camp de Túria, en el interior valenciano" },
  requena: { community: "Comunidad Valenciana", province: "Valencia", pop: 21000, hospital: "Hospital General de Requena", trait: "capital de la comarca Requena-Utiel, en el interior de Valencia" },
  "alfaz-del-pi": { community: "Comunidad Valenciana", province: "Alicante", pop: 21000, hospital: "Hospital Comarcal Marina Baixa (La Vila Joiosa)", trait: "municipio de la Marina Baixa, junto a Benidorm" },
  benicasim: { community: "Comunidad Valenciana", province: "Castellón", pop: 21000, hospital: "Hospital General Universitario de Castellón", trait: "ciudad turística de la costa de Castellón" },
  // Andalucía
  "san-roque": { community: "Andalucía", province: "Cádiz", pop: 35000, hospital: "Hospital Punta de Europa (Algeciras)", trait: "municipio del Campo de Gibraltar, en el sur de Cádiz" },
  almunecar: { community: "Andalucía", province: "Granada", pop: 28000, hospital: "Hospital Santa Ana de Motril", trait: "principal ciudad de la Costa Tropical granadina" },
  almonte: { community: "Andalucía", province: "Huelva", pop: 25000, hospital: "Hospital Universitario Juan Ramón Jiménez (Huelva)", trait: "municipio del entorno de Doñana y la aldea de El Rocío" },
  "los-barrios": { community: "Andalucía", province: "Cádiz", pop: 24000, hospital: "Hospital Punta de Europa (Algeciras)", trait: "municipio del Campo de Gibraltar, en el sur de Cádiz" },
  "mairena-del-alcor": { community: "Andalucía", province: "Sevilla", pop: 24000, hospital: "Hospital Universitario Virgen del Rocío (Sevilla)", trait: "municipio de la comarca de Los Alcores, en Sevilla" },
  "san-juan-de-aznalfarache": { community: "Andalucía", province: "Sevilla", pop: 23000, hospital: "Hospital Universitario Virgen del Rocío (Sevilla)", trait: "ciudad del Aljarafe, en el área metropolitana de Sevilla" },
  aljaraque: { community: "Andalucía", province: "Huelva", pop: 23000, hospital: "Hospital Universitario Juan Ramón Jiménez (Huelva)", trait: "municipio del área metropolitana de Huelva" },
  torrox: { community: "Andalucía", province: "Málaga", pop: 22000, hospital: "Hospital Comarcal de la Axarquía (Vélez-Málaga)", trait: "municipio costero de la Axarquía malagueña" },
  atarfe: { community: "Andalucía", province: "Granada", pop: 21000, hospital: "Hospital Universitario San Cecilio (Granada)", trait: "municipio de la Vega de Granada" },
  "huercal-overa": { community: "Andalucía", province: "Almería", pop: 21000, hospital: "Hospital La Inmaculada (Huércal-Overa)", trait: "municipio del norte de la provincia de Almería" },
  // Cataluña
  "santa-perpetua-de-mogoda": { community: "Cataluña", province: "Barcelona", pop: 26000, hospital: "Hospital Universitari Parc Taulí (Sabadell)", trait: "ciudad del Vallès Occidental, en la provincia de Barcelona" },
  "castellar-del-valles": { community: "Cataluña", province: "Barcelona", pop: 25000, hospital: "Hospital Universitari Parc Taulí (Sabadell)", trait: "municipio del Vallès Occidental, en la provincia de Barcelona" },
  "sant-feliu-de-guixols": { community: "Cataluña", province: "Girona", pop: 23000, hospital: "Hospital de Palamós", trait: "ciudad costera de la Costa Brava, en Girona" },
  "les-franqueses-del-valles": { community: "Cataluña", province: "Barcelona", pop: 21000, hospital: "Hospital General de Granollers", trait: "municipio del Vallès Oriental, en la provincia de Barcelona" },
  roses: { community: "Cataluña", province: "Girona", pop: 20000, hospital: "Hospital de Figueres", trait: "ciudad costera del norte de la Costa Brava" },
  "sant-quirze-del-valles": { community: "Cataluña", province: "Barcelona", pop: 20000, hospital: "Hospital Universitari Parc Taulí (Sabadell)", trait: "municipio del Vallès Occidental, en la provincia de Barcelona" },
  // Región de Murcia
  "san-pedro-del-pinatar": { community: "Región de Murcia", province: "Murcia", pop: 30000, hospital: "Hospital Los Arcos del Mar Menor", trait: "municipio costero del norte del Mar Menor" },
  "la-union": { community: "Región de Murcia", province: "Murcia", pop: 21000, hospital: "Hospital General Universitario Santa Lucía (Cartagena)", trait: "municipio de la comarca de Cartagena, cuna del cante minero" },
  // Canarias
  "san-miguel-de-abona": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 24000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "municipio del sur de Tenerife" },
  "guia-de-isora": { community: "Canarias", province: "Santa Cruz de Tenerife", pop: 23000, hospital: "Hospital Universitario Nuestra Señora de Candelaria", trait: "municipio del suroeste de Tenerife" },
  mogan: { community: "Canarias", province: "Las Palmas", pop: 21000, hospital: "Hospital Universitario de Gran Canaria Doctor Negrín", trait: "municipio turístico del suroeste de Gran Canaria" },
  // Islas Baleares
  alcudia: { community: "Islas Baleares", province: "Islas Baleares", pop: 22000, hospital: "Hospital Universitario Son Espases (Palma)", trait: "municipio turístico del norte de Mallorca" },
  // Comunidad Foral de Navarra
  "valle-de-egues": { community: "Comunidad Foral de Navarra", province: "Navarra", pop: 23000, hospital: "Hospital Universitario de Navarra", trait: "municipio de la comarca de Pamplona" },
  // Galicia
  porrino: { community: "Galicia", province: "Pontevedra", pop: 21000, hospital: "Hospital Álvaro Cunqueiro (Vigo)", trait: "municipio industrial del área metropolitana de Vigo" },
};

/* Fallback seguro por si falta una ciudad */
const FALLBACK: CityFacts = {
  community: "España",
  province: "",
  pop: 0,
  hospital: "el hospital público de referencia",
  trait: "una de las principales ciudades de España",
};

export function getCityFacts(slug: string): CityFacts {
  return CITY_FACTS[slug] ?? FALLBACK;
}

export function healthServiceFor(community: string): HealthService {
  return (
    HEALTH_SERVICES[community] ?? {
      short: "el servicio público de salud",
      long: "el servicio público de salud de tu comunidad",
    }
  );
}

/* Formato de población en español */
export function formatCityPop(n: number): string {
  if (n <= 0) return "su población";
  if (n >= 1000000) {
    const m = (n / 1000000).toFixed(2).replace(/0$/, "").replace(".", ",");
    return `cerca de ${m} millones de habitantes`;
  }
  return `unos ${Math.round(n / 1000)}.000 habitantes`;
}

/* ═══════════════════════════════════════════════════════════
   CONTENIDO PROFUNDO Y ÚNICO — SOLO CIUDADES TIER 1
   Las ciudades grandes tienen competencia SEO real (clínicas
   físicas, otras webs). Para ganar ahí no basta con la plantilla:
   añadimos contenido escrito a mano y verídico (distritos reales,
   municipios del área metropolitana, logística de entrega y una
   FAQ local específica) que ninguna plantilla puede replicar.
   El resto de ciudades ya posicionan con el contexto local base.
   ═══════════════════════════════════════════════════════════ */
export type Tier1Content = {
  /** Distritos/zonas reales de la ciudad (para intención hiperlocal). */
  districts: string[];
  /** Municipios del área metropolitana (amplían la cobertura de búsqueda). */
  metro: string[];
  /** Párrafo sobre la entrega/recogida del tratamiento en la ciudad. */
  delivery: string;
  /** Párrafo sobre el panorama de la sanidad privada local. */
  privateScene: string;
  /** Pregunta y respuesta locales, específicas y no replicables. */
  faq: { q: string; a: string };
};

export const TIER1_CONTENT: Record<string, Tier1Content> = {
  madrid: {
    districts: ["Centro", "Salamanca", "Chamberí", "Retiro", "Chamartín", "Tetuán", "Arganzuela", "Moncloa-Aravaca"],
    metro: ["Móstoles", "Alcalá de Henares", "Fuenlabrada", "Leganés", "Getafe", "Alcorcón"],
    delivery:
      "En Madrid capital la receta electrónica llega al móvil normalmente el mismo día de la consulta, y puedes recogerla en cualquier farmacia de la ciudad —desde el centro (Sol, Malasaña, Chamberí) hasta los barrios de Salamanca o Chamartín— o en toda la Comunidad. Si la farmacia de tu barrio no tiene stock de Wegovy o Mounjaro, el sistema de receta electrónica te permite recogerlo en otra sin repetir trámite.",
    privateScene:
      "Madrid concentra la mayor oferta de clínicas privadas de obesidad y endocrinología de España, sobre todo en la zona de Nuevos Ministerios, Salamanca y el eje de la Castellana. Esa oferta presencial suele implicar precios altos por consulta y semanas de espera para primera visita; la vía online de DoctorLife evita el desplazamiento y acorta los tiempos manteniendo al mismo médico durante todo el seguimiento.",
    faq: {
      q: "¿Puedo recoger el tratamiento en una farmacia de mi distrito en Madrid?",
      a: "Sí. La receta electrónica es válida en cualquier farmacia de la Comunidad de Madrid, tanto en distritos del centro (Centro, Chamberí, Salamanca) como en barrios periféricos o en municipios del área metropolitana como Móstoles, Getafe o Alcalá de Henares.",
    },
  },
  barcelona: {
    districts: ["Eixample", "Ciutat Vella", "Gràcia", "Sarrià-Sant Gervasi", "Sants-Montjuïc", "Les Corts", "Sant Martí"],
    metro: ["L'Hospitalet de Llobregat", "Badalona", "Terrassa", "Sabadell", "Santa Coloma de Gramenet"],
    delivery:
      "En Barcelona la receta electrónica está integrada con CatSalut, de modo que el documento emitido por el médico de DoctorLife es válido en cualquier farmacia de la ciudad —del Eixample a Gràcia, Sants o Sant Martí— y de toda Cataluña. La recogida es inmediata una vez el médico emite la prescripción, sin necesidad de pasar por un CAP.",
    privateScene:
      "Barcelona tiene una densa red de clínicas privadas de medicina estética y endocrinología, concentrada en el Eixample y la zona alta (Sarrià-Sant Gervasi). La consulta presencial ahí suele ser cara y con lista de espera; la alternativa online mantiene la valoración con médico colegiado y añade seguimiento continuo desde la app, algo que la consulta puntual presencial no siempre ofrece.",
    faq: {
      q: "¿La receta de DoctorLife funciona con la farmacia y CatSalut en Barcelona?",
      a: "Sí. La receta electrónica privada es válida en todas las farmacias de Barcelona y Cataluña. No sustituye a tu tarjeta sanitaria pública, pero te permite recoger el tratamiento en cualquier farmacia del Eixample, Gràcia o del área metropolitana como L'Hospitalet o Badalona.",
    },
  },
  valencia: {
    districts: ["Ciutat Vella", "L'Eixample", "Extramurs", "Campanar", "Quatre Carreres", "Algirós", "Benimaclet"],
    metro: ["Torrent", "Paterna", "Mislata", "Burjassot", "Alaquàs"],
    delivery:
      "En Valencia la receta electrónica emitida tras la videoconsulta se puede canjear en cualquier farmacia de la ciudad, desde Ciutat Vella y L'Eixample hasta Benimaclet o Quatre Carreres, y en toda la Comunitat. No hace falta desplazarse a un centro de salud: recibes la prescripción en el móvil y recoges el tratamiento donde te resulte cómodo.",
    privateScene:
      "La sanidad privada en Valencia ha crecido mucho en torno a la obesidad y la nutrición, con clínicas concentradas en L'Eixample y el centro. Aun así, la primera visita presencial con endocrino privado suele tener demora; DoctorLife resuelve la valoración online y mantiene el seguimiento por la app, evitando desplazamientos por la ciudad.",
    faq: {
      q: "¿Cuánto tardo en tener la receta si vivo en Valencia?",
      a: "Tras la videoconsulta, si el médico considera el tratamiento adecuado, la receta electrónica suele estar disponible el mismo día. Es válida en cualquier farmacia de Valencia y de la Comunitat Valenciana, incluidos municipios del área como Torrent, Paterna o Mislata.",
    },
  },
  sevilla: {
    districts: ["Casco Antiguo", "Triana", "Los Remedios", "Nervión", "Macarena", "Este-Alcosa", "Cerro-Amate"],
    metro: ["Dos Hermanas", "Alcalá de Guadaíra", "Mairena del Aljarafe", "Utrera"],
    delivery:
      "En Sevilla la receta electrónica del médico de DoctorLife es válida en cualquier farmacia de la ciudad —de Triana y Los Remedios a Nervión o la Macarena— y de toda Andalucía. La recogida es inmediata tras la consulta, sin pasar por el centro de salud ni por listas de espera del SAS.",
    privateScene:
      "Sevilla cuenta con una oferta privada notable en Nervión y Los Remedios, pero el acceso a endocrinología para el peso sigue siendo caro y lento presencialmente. La consulta online con DoctorLife permite iniciar el tratamiento sin desplazarse y con seguimiento real, algo especialmente útil en verano por el calor de la ciudad.",
    faq: {
      q: "¿Necesito ir a una clínica en Sevilla para empezar?",
      a: "No. Toda la valoración es online con médico colegiado. Si el tratamiento está indicado, recibes la receta electrónica y la recoges en cualquier farmacia de Sevilla o de su área metropolitana, como Dos Hermanas o Mairena del Aljarafe.",
    },
  },
  malaga: {
    districts: ["Centro", "Ensanche Centro", "El Palo", "Teatinos", "Churriana", "Carretera de Cádiz", "Cruz de Humilladero"],
    metro: ["Torremolinos", "Rincón de la Victoria", "Fuengirola", "Marbella"],
    delivery:
      "En Málaga la receta electrónica se canjea en cualquier farmacia de la ciudad y de la Costa del Sol. Recibes la prescripción en el móvil tras la videoconsulta y la recoges donde prefieras, del Centro a Teatinos o El Palo, sin depender de la cita presencial.",
    privateScene:
      "Málaga y la Costa del Sol tienen una densa oferta de clínicas privadas orientadas al peso y la estética, sobre todo hacia Marbella. Los precios ahí son de los más altos de España; la vía online de DoctorLife ofrece la misma valoración médica colegiada sin la prima de precio de la zona turística.",
    faq: {
      q: "¿Sirve la receta si vivo en la Costa del Sol y no en Málaga capital?",
      a: "Sí. La receta electrónica es válida en toda Andalucía, así que puedes recogerla igual en Málaga capital que en Torremolinos, Fuengirola o Marbella, sin desplazarte a la ciudad.",
    },
  },
  zaragoza: {
    districts: ["Centro", "Delicias", "Universidad", "Actur-Rey Fernando", "Las Fuentes", "San José", "Casablanca"],
    metro: ["Utebo", "Cuarte de Huerva", "Villanueva de Gállego"],
    delivery:
      "En Zaragoza la receta electrónica emitida tras la consulta es válida en cualquier farmacia de la ciudad —de Delicias al Centro o el Actur— y de todo Aragón. La recogida es inmediata, sin pasar por el centro de salud del SALUD.",
    privateScene:
      "Al ser el gran núcleo urbano de Aragón, Zaragoza concentra casi toda la oferta privada de la comunidad, pero fuera de la ciudad el acceso presencial es limitado. La consulta online de DoctorLife iguala el acceso para toda la provincia sin obligar a desplazarse a la capital.",
    faq: {
      q: "¿Puedo hacer el seguimiento sin volver a desplazarme en Zaragoza?",
      a: "Sí. Todo el seguimiento se realiza desde la app: ajustes de dosis, dudas y renovación de receta sin acudir presencialmente. Solo necesitas ir a tu farmacia habitual de Zaragoza a recoger el tratamiento.",
    },
  },
  murcia: {
    districts: ["Centro", "El Carmen", "La Flota", "Vistabella", "Santa María de Gracia", "Infante Juan Manuel"],
    metro: ["Molina de Segura", "Alcantarilla", "Santomera", "Beniel"],
    delivery:
      "En Murcia la receta electrónica es válida en cualquier farmacia de la ciudad y de toda la Región. Tras la videoconsulta recibes la prescripción en el móvil y la recoges sin pasar por el centro de salud del SMS.",
    privateScene:
      "La oferta privada de endocrinología en Murcia se concentra en el centro y en torno a los grandes hospitales, con demoras habituales para primera visita. DoctorLife permite iniciar el tratamiento online y mantener el seguimiento por la app, útil también para quienes viven en la huerta y el área metropolitana.",
    faq: {
      q: "¿La receta vale para las farmacias de la Región de Murcia?",
      a: "Sí. La receta electrónica es válida en toda la Región de Murcia, tanto en la capital como en municipios como Molina de Segura o Alcantarilla, sin necesidad de desplazarte a un hospital.",
    },
  },
  alicante: {
    districts: ["Centro", "Ensanche-Diputación", "Carolinas", "San Blas", "Playa de San Juan", "Vistahermosa"],
    metro: ["Elche", "San Vicente del Raspeig", "San Juan de Alicante", "Mutxamel"],
    delivery:
      "En Alicante la receta electrónica del médico de DoctorLife se canjea en cualquier farmacia de la ciudad y de la provincia, de la Playa de San Juan al centro. La recibes el mismo día de la consulta y la recoges sin trámites presenciales.",
    privateScene:
      "La Costa Blanca tiene una oferta privada amplia y muy orientada al turismo de salud, con precios elevados en temporada. La consulta online de DoctorLife ofrece valoración médica colegiada estable todo el año, sin la variabilidad de precios de las clínicas de zona turística.",
    faq: {
      q: "¿Puedo recoger el tratamiento en Elche o San Vicente si no estoy en Alicante capital?",
      a: "Sí. La receta electrónica es válida en toda la provincia de Alicante y la Comunitat Valenciana, así que puedes recogerla en Elche, San Vicente del Raspeig o San Juan igual que en la capital.",
    },
  },
  bilbao: {
    districts: ["Abando", "Indautxu", "Casco Viejo", "Deusto", "Begoña", "Rekalde", "Basurto-Zorroza"],
    metro: ["Barakaldo", "Getxo", "Portugalete", "Santurtzi", "Leioa"],
    delivery:
      "En Bilbao la receta electrónica es válida en cualquier farmacia de la villa —de Abando e Indautxu al Casco Viejo o Deusto— y de todo el País Vasco. La recogida es inmediata tras la videoconsulta, sin pasar por el ambulatorio de Osakidetza.",
    privateScene:
      "Bilbao y el Gran Bilbao concentran buena parte de la sanidad privada vasca, con clínicas en Abando e Indautxu. Aun con esa oferta, la primera visita presencial suele demorarse; DoctorLife resuelve la valoración online y cubre por igual a quienes viven en la margen izquierda o en Getxo sin desplazarse al centro.",
    faq: {
      q: "¿La receta sirve en las farmacias de Bilbao y el Gran Bilbao?",
      a: "Sí. La receta electrónica es válida en todo el País Vasco, así que la puedes recoger tanto en Bilbao (Abando, Indautxu, Deusto) como en Barakaldo, Getxo o Portugalete.",
    },
  },
};

export function getTier1Content(slug: string): Tier1Content | null {
  return TIER1_CONTENT[slug] ?? null;
}

/** Lista de slugs Tier 1 (ciudades con contenido profundo). */
export const TIER1_SLUGS = Object.keys(TIER1_CONTENT);
