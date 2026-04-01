export interface UnconnectedCourse {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  holes: number;
  description: string;
}

// All Costa del Sol courses NOT yet connected to TeeRadar
// Source: TeeRadar Klubblista v2
export const unconnectedCourses: UnconnectedCourse[] = [
  {
    id: 'u01', name: 'Benalmádena Golf', location: 'Benalmádena',
    lat: 36.5989, lng: -4.5241, holes: 18,
    description: 'Välkänd bana i Benalmádena med panoramavyer mot Medelhavet och Málaga stad. Populär bland lokalbefolkning och turister.',
  },
  {
    id: 'u02', name: 'Cabopino Golf', location: 'Marbella',
    lat: 36.5019, lng: -4.8012, holes: 18,
    description: 'Charmig bana nära Cabopino-naturhamnens tallskogar. Kuperad terräng med vyer mot havet.',
  },
  {
    id: 'u03', name: 'La Cala Campo America', location: 'Mijas',
    lat: 36.5328, lng: -4.7378, holes: 18,
    description: 'En av tre banor på det enorma La Cala Resort. America-banan är den mest utmanande med dramatiska höjdskillnader.',
  },
  {
    id: 'u04', name: 'La Cala Campo Asia', location: 'Mijas',
    lat: 36.5312, lng: -4.7401, holes: 18,
    description: 'La Calas populäraste bana med spektakulär utsikt och väldesignade hål längs bergssluttningarna.',
  },
  {
    id: 'u05', name: 'La Cala Campo Europa', location: 'Mijas',
    lat: 36.5298, lng: -4.7355, holes: 18,
    description: 'La Calas flaggskeppsbana med panoramavyer och klassisk design. Värd för flera professionella turneringar.',
  },
  {
    id: 'u06', name: 'Calanova Golf', location: 'Marbella',
    lat: 36.5141, lng: -4.8189, holes: 18,
    description: 'Modern bana med vattenhinder och väldesignade hål i östra Marbella. Bra standard och trevliga faciliteter.',
  },
  {
    id: 'u07', name: 'El Campanario Golf', location: 'Estepona',
    lat: 36.4551, lng: -5.0978, holes: 9,
    description: 'Pittoresk 9-hålsbana i Estepona med välskötta greener och avslappnad atmosfär. Del av El Campanario-resorten.',
  },
  {
    id: 'u08', name: 'El Candado', location: 'Málaga',
    lat: 36.7134, lng: -4.3612, holes: 9,
    description: 'Klassisk 9-hålsbana öster om Málaga stad, omgiven av tallskog med vyer mot havet.',
  },
  {
    id: 'u09', name: 'Casares Golf', location: 'Casares',
    lat: 36.4441, lng: -5.2689, holes: 18,
    description: 'Välskött bana nära den vita byn Casares med spektakulära vyer mot Gibraltar och Medelhavet.',
  },
  {
    id: 'u10', name: 'Cerrado del Águila', location: 'Mijas',
    lat: 36.5489, lng: -4.7012, holes: 18,
    description: 'Välskött resort-bana i Mijas med bergsvy och moderna faciliteter. Populär bland boende på Costa del Sol.',
  },
  {
    id: 'u11', name: 'El Chaparral Golf', location: 'Mijas Costa',
    lat: 36.5601, lng: -4.6512, holes: 18,
    description: 'Kustnärbana med direkta havsvyer och relativt platt terräng. Utmärkt för nybörjare och seniorgolfare.',
  },
  {
    id: 'u12', name: 'Coto de la Serena', location: 'Marbella',
    lat: 36.5098, lng: -4.8572, holes: 18,
    description: 'Lugn och välskött bana i östra Marbella med mogen vegetation och tillgängliga starttider.',
  },
  {
    id: 'u13', name: 'Doña Julia Golf', location: 'Casares',
    lat: 36.3934, lng: -5.2434, holes: 18,
    description: 'Vacker bana nära Manilva med utsikt mot Gibraltar och Marocko. Nära hamnen Puerto de la Duquesa.',
  },
  {
    id: 'u14', name: 'La Duquesa Golf', location: 'Manilva',
    lat: 36.3712, lng: -5.2312, holes: 18,
    description: 'Välkomnande bana med havsvy och kuperad terräng. Bra prisläge och trevliga faciliteter nära Puerto de la Duquesa.',
  },
  {
    id: 'u15', name: 'Villa Padierna Flamingos', location: 'Benahavís',
    lat: 36.5074, lng: -5.0461, holes: 18,
    description: 'Exklusiv bana kopplad till det berömda Villa Padierna-hotellet. Palmkantade fairways och mediterrant landskap.',
  },
  {
    id: 'u16', name: 'Villa Padierna Tramores', location: 'Benahavís',
    lat: 36.5054, lng: -5.0443, holes: 18,
    description: 'Villa Padiernaresortens andra bana med mer naturlig och kuperad terräng längs bergssluttningarna.',
  },
  {
    id: 'u17', name: 'Greenlife Golf', location: 'Marbella',
    lat: 36.4972, lng: -4.9134, holes: 9,
    description: 'Kompakt 9-hålsbana i Nueva Andalucía. Bra träningsanläggning nära flera av Costa del Sols toppbanor.',
  },
  {
    id: 'u18', name: 'Real Club de Golf Guadalmina Norte', location: 'San Pedro de Alcántara',
    lat: 36.4721, lng: -5.0834, holes: 18,
    description: 'Den norra av Guadalminas två klassiska banor – mer kuperad med vacker medelhavsvegitation och havsvyer.',
  },
  {
    id: 'u19', name: 'Real Club de Golf Guadalmina Sur', location: 'San Pedro de Alcántara',
    lat: 36.4698, lng: -5.0812, holes: 18,
    description: 'Kustnärbanan på Guadalmina med direkt havsvy. En av Costa del Sols äldsta och mest respekterade banor.',
  },
  {
    id: 'u20', name: 'Guadalhorce Golf', location: 'Málaga',
    lat: 36.6789, lng: -4.5112, holes: 18,
    description: 'Välskött kommunal bana nära Málaga stad vid floden Guadalhorce. Prisvärd och populär bland lokalbefolkningen.',
  },
  {
    id: 'u21', name: 'La Hacienda Links', location: 'Casares',
    lat: 36.3881, lng: -5.2789, holes: 18,
    description: 'Unik länksbana i Casares med direkt havsutsikt och öppen terräng. En av få äkta links-banor på Costa del Sol.',
  },
  {
    id: 'u22', name: 'La Hacienda Heathland', location: 'Casares',
    lat: 36.3867, lng: -5.2768, holes: 18,
    description: 'La Haciendas heathland-bana med naturlig vegetation och varierad terräng. Bra komplement till systerbanans links-design.',
  },
  {
    id: 'u23', name: 'La Cañada Golf', location: 'Sotogrande',
    lat: 36.2934, lng: -5.3012, holes: 27,
    description: '27-hålskomplex i hjärtat av Sotogrande. Utmärkt träningsfacilitet med stor drivingrange och pro shop.',
  },
  {
    id: 'u24', name: 'La Noria Golf', location: 'Marbella',
    lat: 36.5187, lng: -5.0134, holes: 9,
    description: 'Kompakt 9-hålsbana i västra Marbella med enkel design och trevlig atmosfär. Bra för en snabb runda.',
  },
  {
    id: 'u25', name: 'La Reserva Club Sotogrande', location: 'Sotogrande',
    lat: 36.3101, lng: -5.2891, holes: 18,
    description: 'Exklusiv privatbana på La Reserva-resorten i Sotogrande. Spektakulärt landskap och toppklassiga faciliteter.',
  },
  {
    id: 'u26', name: 'Mijas Golf Los Lagos', location: 'Mijas Costa',
    lat: 36.5711, lng: -4.6398, holes: 18,
    description: 'En av Mijas Golfs två banor – Los Lagos är känd för sina välskötta vattenhinder och greener.',
  },
  {
    id: 'u27', name: 'Mijas Golf Los Olivos', location: 'Mijas Costa',
    lat: 36.5698, lng: -4.6421, holes: 18,
    description: 'Los Olivos syskonbana på Mijas Golf International med olivlundar och mer naturlig terräng.',
  },
  {
    id: 'u28', name: 'Parador de Málaga Golf', location: 'Málaga',
    lat: 36.7012, lng: -4.3891, holes: 18,
    description: 'Spektakulär kustnärbana vid Paradores hotell. Hål 2 spelas direkt längs Medelhavsstranden – unik upplevelse.',
  },
  {
    id: 'u29', name: 'San Roque Club New Course', location: 'San Roque',
    lat: 36.3112, lng: -5.3912, holes: 18,
    description: 'Den moderna kompletteringsbanan på San Roque Club med öppnare design och något lättare spelbarhet.',
  },
  {
    id: 'u30', name: 'Santa Clara Golf', location: 'Marbella',
    lat: 36.5201, lng: -4.8534, holes: 18,
    description: 'Välskött bana i östra Marbella nära Santa Clara Marina. Fin standard med stor träningsanläggning.',
  },
  {
    id: 'u31', name: 'Santana Golf', location: 'Marbella',
    lat: 36.4823, lng: -4.9167, holes: 18,
    description: 'Välbelägen bana i västra Marbella med bergsbakdrop och välskötta fairways. Lugn och välkomnande atmosfär.',
  },
  {
    id: 'u32', name: 'El Soto de Marbella', location: 'Marbella',
    lat: 36.5071, lng: -4.9778, holes: 18,
    description: 'Populär bana i Nueva Andalucía med kuperad terräng och havsvyer. Välskött med bra service och faciliteter.',
  },
  {
    id: 'u33', name: 'Villa Padierna Alferini', location: 'Benahavís',
    lat: 36.5278, lng: -5.0634, holes: 18,
    description: 'Den tredje banan på Villa Padiernas lyxresort – mer avlägsen och naturlig med dramatisk bergsterräng.',
  },
  {
    id: 'u34', name: 'Alcaidesa Links', location: 'La Línea de la Concepción',
    lat: 36.1712, lng: -5.3421, holes: 18,
    description: 'Unik links-bana med direkt utsikt mot Gibraltarklippan och Nordafrikas kust. En av Europas mest spektakulära platser.',
  },
  {
    id: 'u35', name: 'Alcaidesa Heathland', location: 'La Línea de la Concepción',
    lat: 36.1698, lng: -5.3441, holes: 18,
    description: 'Alcaidesas andra bana med mer kuperad heathland-terräng och dramatiska vyer mot Gibraltar från höjderna.',
  },
  {
    id: 'u36', name: 'La Zagaleta Old Course', location: 'Benahavís',
    lat: 36.5452, lng: -5.0789, holes: 18,
    description: 'Ultraprivat bana i Europas mest exklusiva privatresort. Tillgänglig enbart för medlemmar och deras inbjudna gäster.',
  },
  {
    id: 'u37', name: 'La Zagaleta New Course', location: 'Benahavís',
    lat: 36.5431, lng: -5.0812, holes: 18,
    description: 'La Zagaletas andra bana – lika exklusiv och privat. Fantastisk natur med korkekskogar och vildblommor.',
  },
  {
    id: 'u38', name: 'Marbella Club Golf', location: 'Benahavís',
    lat: 36.5361, lng: -5.0172, holes: 18,
    description: 'Exklusiv bana kopplad till det ikoniska Marbella Club-hotellet sedan 1954. Enastående service och andalusisk atmosfär.',
  },
  {
    id: 'u39', name: 'Real Club de Campo de Málaga', location: 'Málaga',
    lat: 36.7123, lng: -4.4301, holes: 18,
    description: 'Historisk privatbana grundad 1925 – en av Spaniens äldsta golfklubbar med rik historia och exklusiv atmosfär.',
  },
  {
    id: 'u40', name: 'Alferini Golf', location: 'Benahavís',
    lat: 36.5241, lng: -5.0601, holes: 18,
    description: 'Naturskön bana i Benahavísdalen med olivlundar och bergsvy. Lugn atmosfär och välkomnande klubbhus.',
  },
  {
    id: 'u41', name: 'Casares Costa Golf', location: 'Casares',
    lat: 36.4081, lng: -5.2661, holes: 18,
    description: 'Välskött bana nära kusten vid Casares med vacker utsikt mot Gibraltar och Afrikas kust på klara dagar.',
  },
  {
    id: 'u42', name: 'El Higueral Golf', location: 'Ronda',
    lat: 36.7434, lng: -5.1512, holes: 18,
    description: 'Bergsbana nära den dramatiska klippstaden Ronda. Svalt klimat och fantastisk andalusisk landskapsmiljö.',
  },
  {
    id: 'u43', name: 'Los Flamingos Golf', location: 'Benahavís',
    lat: 36.5123, lng: -5.0412, holes: 18,
    description: 'Vackert belägen bana i Benahavís bergslandskap med palmkantade fairways och utsikt mot Medelhavet.',
  },
];
