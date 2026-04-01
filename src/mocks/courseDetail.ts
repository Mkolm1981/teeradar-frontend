export interface Timeslot {
  id: number;
  time: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  spotsLeft: number;
  isLastMinute: boolean;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  handicap: number;
}

export interface CourseDetail {
  slug: string;
  name: string;
  location: string;
  country: string;
  rating: number;
  reviews: number;
  holes: number;
  par: number;
  difficulty: string;
  lengthMeters: number;
  designer: string;
  openedYear: number;
  description: string;
  heroImage: string;
  facilities: {
    drivingRange: boolean;
    restaurant: boolean;
    proShop: boolean;
    buggyRental: boolean;
    changingRooms: boolean;
    parking: boolean;
  };
  address: string;
  phone: string;
  mapLat: string;
  mapLng: string;
  timeslots: {
    today: Timeslot[];
    tomorrow: Timeslot[];
    other: Timeslot[];
  };
  userReviews: Review[];
}

export const mockCourses: Record<string, CourseDetail> = {
  'valderrama-golf-club': {
    slug: 'valderrama-golf-club',
    name: 'Valderrama Golf Club',
    location: 'Sotogrande',
    country: 'Spanien',
    rating: 4.9,
    reviews: 312,
    holes: 18,
    par: 71,
    difficulty: 'Utmanande',
    lengthMeters: 6356,
    designer: 'Robert Trent Jones Sr.',
    openedYear: 1975,
    description: 'Valderrama Golf Club är utan tvekan Europas mest prestigefyllda golfbana och har utsetts till "Bästa bana i Europa" av Golf World Magazine ett flertal gånger. Banan är berömd för sina majestätiska korkekskogar, snabbgröna greener och den ökända sjunde hålet. Värd för Ryder Cup 1997 och WGC-Volvo Masters, är detta en bucket-list-upplevelse för alla golfare.',
    heroImage: 'https://readdy.ai/api/search-image?query=Valderrama%20Golf%20Club%20Sotogrande%20Spain%20wide%20panoramic%20view%20iconic%20championship%20course%20cork%20oak%20trees%20lush%20perfectly%20manicured%20fairway%20warm%20golden%20hour%20sunlight%20prestigious%20European%20golf%20destination%20dramatic%20landscape%20full%20width%20hero&width=1600&height=700&seq=hero-val&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Avda. de Los Cortijos s/n, 11310 Sotogrande, Cádiz, Spanien',
    phone: '+34 956 791 200',
    mapLat: '36.2887',
    mapLng: '-5.3131',
    timeslots: {
      today: [
        { id: 101, time: '09:20', originalPrice: 185, discountedPrice: 110, discount: 41, spotsLeft: 2, isLastMinute: true },
        { id: 102, time: '10:00', originalPrice: 185, discountedPrice: 125, discount: 32, spotsLeft: 4, isLastMinute: true },
        { id: 103, time: '15:40', originalPrice: 185, discountedPrice: 95, discount: 49, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '08:00', originalPrice: 185, discountedPrice: 185, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '10:20', originalPrice: 185, discountedPrice: 185, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '13:00', originalPrice: 185, discountedPrice: 150, discount: 19, spotsLeft: 3, isLastMinute: false },
        { id: 204, time: '16:20', originalPrice: 185, discountedPrice: 130, discount: 30, spotsLeft: 2, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:00', originalPrice: 185, discountedPrice: 185, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 302, time: '11:40', originalPrice: 185, discountedPrice: 185, discount: 0, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      {
        id: 1,
        name: 'Henrik Johansson',
        rating: 5,
        text: 'En absolut drömupplevelse. Banan är i perfekt skick, personalen otroligt professionell och atmosfären är svårbeskriven. Sjunde hålet är precis lika skrämmande som alla säger. Värd varje euro!',
        date: '12 mars 2025',
        handicap: 8,
      },
      {
        id: 2,
        name: 'Karin Lindström',
        rating: 5,
        text: 'Valderrama är allt man drömmer om och mer därtill. Korkeksskogarna skapar en magisk atmosfär och greenerna är bland de snabbaste jag spelat på. Restaurangen efter rundan var också utmärkt.',
        date: '3 mars 2025',
        handicap: 14,
      },
      {
        id: 3,
        name: 'Marcus Eriksson',
        rating: 4,
        text: 'Fantastisk bana med en rik historia. Man förstår varför Ryder Cup spelades här. Lite väl dyr för en vanlig golfare men är det värt det för en speciell dag? Absolut ja.',
        date: '18 februari 2025',
        handicap: 12,
      },
    ],
  },
  'finca-cortesin': {
    slug: 'finca-cortesin',
    name: 'Finca Cortesin Golf',
    location: 'Casares',
    country: 'Spanien',
    rating: 4.9,
    reviews: 189,
    holes: 18,
    par: 72,
    difficulty: 'Expert',
    lengthMeters: 6620,
    designer: 'Cabell B. Robinson',
    openedYear: 2007,
    description: 'Finca Cortesin Golf är en av Costa del Sols exklusivaste upplevelser, beläget på ett 215 hektar stort lyxresort med utsikt mot Medelhavet. Banan har arrangerat Volvo World Match Play Championship och är känd för sina dramatiska höjdskillnader och spektakulära havsutsikter. En exklusiv upplevelse av världsklass.',
    heroImage: 'https://readdy.ai/api/search-image?query=Finca%20Cortesin%20luxury%20golf%20resort%20Casares%20Spain%20panoramic%20Mediterranean%20sea%20views%20dramatic%20fairway%20coastal%20cliffs%20elegant%20championship%20course%20warm%20golden%20sunset%20premium%20destination&width=1600&height=700&seq=hero-fc&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Ctra. de Casares, s/n, 29690 Casares, Málaga, Spanien',
    phone: '+34 952 937 900',
    mapLat: '36.3442',
    mapLng: '-5.2673',
    timeslots: {
      today: [
        { id: 101, time: '10:40', originalPrice: 220, discountedPrice: 140, discount: 36, spotsLeft: 4, isLastMinute: true },
        { id: 102, time: '16:00', originalPrice: 220, discountedPrice: 120, discount: 45, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '08:20', originalPrice: 220, discountedPrice: 220, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '11:00', originalPrice: 220, discountedPrice: 180, discount: 18, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '14:40', originalPrice: 220, discountedPrice: 160, discount: 27, spotsLeft: 3, isLastMinute: false },
      ],
      other: [],
    },
    userReviews: [
      {
        id: 1,
        name: 'Peter Magnusson',
        rating: 5,
        text: 'Bästa golfupplevelsen i mitt liv. Utsikten mot Medelhavet på hål 15 är helt otrolig. Service av absolut toppklass och banan i perfekt skick.',
        date: '5 mars 2025',
        handicap: 6,
      },
      {
        id: 2,
        name: 'Anna Bergström',
        rating: 5,
        text: 'Lyxigt, vackert och utmanande. Finca Cortesin levererar på alla plan. Priset är högt men du får definitivt valuta för pengarna.',
        date: '22 februari 2025',
        handicap: 18,
      },
      {
        id: 3,
        name: 'Johan Karlsson',
        rating: 4,
        text: 'Fantastisk bana med spektakulärt läge. Lite svårt för en mellanskicklig golfare men utmaningen är en del av charmen. Restaurangen är fantastisk!',
        date: '10 januari 2025',
        handicap: 20,
      },
    ],
  },
  'los-naranjos-golf-club': {
    slug: 'los-naranjos-golf-club',
    name: 'Los Naranjos Golf Club',
    location: 'Marbella',
    country: 'Spanien',
    rating: 4.7,
    reviews: 218,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    lengthMeters: 6248,
    designer: 'Robert Trent Jones Sr.',
    openedYear: 1977,
    description: 'Los Naranjos Golf Club ligger mitt i hjärtat av Nueva Andalucía, Marbellas golfvalley, omgiven av apelsinlundar och med utsikt mot Sierra Blanca. Banan är känd för sina vackra fairways med kantat av träd och sina välskötta greener. En av Costa del Sols klassiker som passar golfare på alla nivåer.',
    heroImage: 'https://readdy.ai/api/search-image?query=Los%20Naranjos%20golf%20club%20Marbella%20Spain%20lush%20green%20fairway%20surrounded%20by%20orange%20trees%20Mediterranean%20vegetation%20warm%20golden%20afternoon%20light%20panoramic%20full%20width%20hero%20championship%20course%20scenic%20Spanish%20landscape&width=1600&height=700&seq=hero-ln&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Ctra. de Cádiz, km 166, 29660 Nueva Andalucía, Marbella, Spanien',
    phone: '+34 952 812 428',
    mapLat: '36.4963',
    mapLng: '-4.9537',
    timeslots: {
      today: [
        { id: 301, time: '09:00', originalPrice: 95, discountedPrice: 55, discount: 42, spotsLeft: 3, isLastMinute: true },
        { id: 302, time: '11:20', originalPrice: 95, discountedPrice: 65, discount: 32, spotsLeft: 4, isLastMinute: true },
        { id: 303, time: '17:00', originalPrice: 95, discountedPrice: 45, discount: 53, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 401, time: '08:40', originalPrice: 95, discountedPrice: 95, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 402, time: '10:00', originalPrice: 95, discountedPrice: 80, discount: 16, spotsLeft: 4, isLastMinute: false },
        { id: 403, time: '13:20', originalPrice: 95, discountedPrice: 75, discount: 21, spotsLeft: 3, isLastMinute: false },
        { id: 404, time: '15:40', originalPrice: 95, discountedPrice: 70, discount: 26, spotsLeft: 2, isLastMinute: false },
      ],
      other: [
        { id: 501, time: '09:00', originalPrice: 95, discountedPrice: 95, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 502, time: '14:00', originalPrice: 95, discountedPrice: 85, discount: 11, spotsLeft: 3, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Sofia Lindqvist', rating: 5, text: 'Vacker bana i perfekt skick. Apelsinträden längs fairways skapar en fantastisk atmosfär och personalen är mycket hjälpsam. Bra sista minuten-pris via TeeRadar!', date: '8 mars 2025', handicap: 16 },
      { id: 2, name: 'Lars Pettersson', rating: 4, text: 'Solid golfupplevelse i Marbellas bästa golfvalley. Banan är välunderhållen och utmanar utan att vara för svår. Bra för en familjeutflykt.', date: '1 mars 2025', handicap: 22 },
      { id: 3, name: 'Emma Nilsson', rating: 5, text: 'Slog mitt handicap med 4 slag här! Greenerna är bland de bästa jag spelat på och utsikten mot bergen är fantastisk. Väl värt priset.', date: '14 februari 2025', handicap: 12 },
    ],
  },
  'la-quinta-golf-cc': {
    slug: 'la-quinta-golf-cc',
    name: 'La Quinta Golf & CC',
    location: 'Benahavís',
    country: 'Spanien',
    rating: 4.6,
    reviews: 175,
    holes: 18,
    par: 71,
    difficulty: 'Medel',
    lengthMeters: 5987,
    designer: 'Manuel Piñero',
    openedYear: 1989,
    description: 'La Quinta Golf & Country Club är beläget i den dramatiska bergsdalen utanför Benahavís, med panoramautsikt mot Medelhavet och Gibraltar. Banan bjuder på ett spännande terräng med dramatiska höjdskillnader och spektakulärt landskap. Perfekt för den golfare som söker naturupplevelse och utmaning i ett.',
    heroImage: 'https://readdy.ai/api/search-image?query=La%20Quinta%20golf%20country%20club%20Benahavis%20Spain%20mountain%20valley%20panoramic%20view%20Mediterranean%20sea%20fairway%20golden%20sunset%20dramatic%20landscape%20spectacular%20scenery%20full%20width%20hero&width=1600&height=700&seq=hero-lq&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Urbanización La Quinta, s/n, 29679 Benahavís, Málaga, Spanien',
    phone: '+34 952 762 390',
    mapLat: '36.5132',
    mapLng: '-5.0231',
    timeslots: {
      today: [
        { id: 601, time: '08:20', originalPrice: 75, discountedPrice: 42, discount: 44, spotsLeft: 4, isLastMinute: true },
        { id: 602, time: '10:40', originalPrice: 75, discountedPrice: 50, discount: 33, spotsLeft: 3, isLastMinute: true },
        { id: 603, time: '16:40', originalPrice: 75, discountedPrice: 38, discount: 49, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 701, time: '08:00', originalPrice: 75, discountedPrice: 75, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 702, time: '10:20', originalPrice: 75, discountedPrice: 65, discount: 13, spotsLeft: 4, isLastMinute: false },
        { id: 703, time: '13:40', originalPrice: 75, discountedPrice: 60, discount: 20, spotsLeft: 3, isLastMinute: false },
      ],
      other: [
        { id: 801, time: '09:00', originalPrice: 75, discountedPrice: 75, discount: 0, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Anders Bergman', rating: 5, text: 'Spektakulär utsikt mot Medelhavet och Gibraltar – man tappar nästan koncentrationen på fairway av att titta på vyn. Priset via TeeRadar är oslagbart!', date: '10 mars 2025', handicap: 18 },
      { id: 2, name: 'Maria Holm', rating: 4, text: 'Utmanade och naturvacker bana. Höjdskillnaderna gör det lite knepigt men det är en del av charmen. Restaurangen på clubhouse är riktigt bra.', date: '25 februari 2025', handicap: 24 },
      { id: 3, name: 'Erik Strand', rating: 5, text: 'Bästa sista minuten-köpet vi gjort. Banan var i topp skick och vi fick en hel runda med utsikt mot Medelhavet för under 40€ per person.', date: '3 mars 2025', handicap: 15 },
    ],
  },
  'las-brisas-golf-club': {
    slug: 'las-brisas-golf-club',
    name: 'Las Brisas Golf Club',
    location: 'Marbella',
    country: 'Spanien',
    rating: 4.8,
    reviews: 241,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    lengthMeters: 6100,
    designer: 'Robert Trent Jones Sr.',
    openedYear: 1968,
    description: 'Las Brisas Golf Club, beläget i Nueva Andalucías hjärta, är en av Costa del Sols äldsta och mest respekterade banor. Värd för flera Spanish Open och välkänd för sina välskötta fairways kantade av palmer och pinjeträd. En klassisk bana med moderna faciliteter och en otrolig atmosfär.',
    heroImage: 'https://readdy.ai/api/search-image?query=Las%20Brisas%20golf%20club%20Nueva%20Andalucia%20Marbella%20Spain%20lush%20green%20fairway%20with%20palm%20trees%20and%20pine%20trees%20Mediterranean%20sea%20views%20warm%20golden%20sunset%20prestigious%20classic%20golf%20course%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-lb&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Urb. Nueva Andalucía, s/n, 29660 Marbella, Málaga, Spanien',
    phone: '+34 952 810 875',
    mapLat: '36.4891',
    mapLng: '-4.9612',
    timeslots: {
      today: [
        { id: 901, time: '09:40', originalPrice: 120, discountedPrice: 70, discount: 42, spotsLeft: 3, isLastMinute: true },
        { id: 902, time: '14:20', originalPrice: 120, discountedPrice: 60, discount: 50, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 1001, time: '08:00', originalPrice: 120, discountedPrice: 120, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 1002, time: '10:00', originalPrice: 120, discountedPrice: 100, discount: 17, spotsLeft: 4, isLastMinute: false },
        { id: 1003, time: '13:00', originalPrice: 120, discountedPrice: 90, discount: 25, spotsLeft: 3, isLastMinute: false },
      ],
      other: [
        { id: 1101, time: '09:20', originalPrice: 120, discountedPrice: 120, discount: 0, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Tobias Lindgren', rating: 5, text: 'En klassiker på Costa del Sol som lever upp till sitt rykte. Palmer och pinjeträd kantar fairways och skapar en fantastisk atmosfär. Fantastiskt bra pris via TeeRadar.', date: '7 mars 2025', handicap: 11 },
      { id: 2, name: 'Lena Svensson', rating: 5, text: 'Värd för Spanish Open – och man förstår varför. Greenerna är i toppskick och banan är lagom utmanande för oss medelspelade. Kan varmt rekommendera!', date: '20 februari 2025', handicap: 20 },
      { id: 3, name: 'Fredrik Öberg', rating: 4, text: 'Klassisk bana med bra service och trevlig clubhouse. Deras sista minuten-tider via TeeRadar är ett kap om man är flexibel med tiderna.', date: '12 mars 2025', handicap: 14 },
    ],
  },
  'baviera-golf': {
    slug: 'baviera-golf',
    name: 'Baviera Golf',
    location: 'Vélez-Málaga',
    country: 'Spanien',
    rating: 4.4,
    reviews: 87,
    holes: 18,
    par: 72,
    difficulty: 'Lätt',
    lengthMeters: 5760,
    designer: 'Justo Quesada',
    openedYear: 1994,
    description: 'Baviera Golf ligger i den östra delen av Costa del Sol nära Nerja, omgivet av vindgårdar och avokadoplanteringar med vacker utsikt mot Medelhavet. Banan är relativt platt och välkomnande för nybörjare och mellannivåspelare, men har tillräckligt med strategiska utmaningar för att hålla erfarna golfare engagerade. En dold pärla i en del av Costa del Sol som fortfarande är relativt ostörd av turism.',
    heroImage: 'https://readdy.ai/api/search-image?query=Baviera%20Golf%20Velez%20Malaga%20eastern%20Costa%20del%20Sol%20Spain%20lush%20green%20fairway%20vineyard%20avocado%20plantation%20Mediterranean%20sea%20views%20rolling%20hills%20warm%20golden%20light%20relaxed%20scenic%20landscape%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-bav&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Urb. Baviera Golf, s/n, 29700 Vélez-Málaga, Málaga, Spanien',
    phone: '+34 952 550 015',
    mapLat: '36.7342',
    mapLng: '-4.1023',
    timeslots: {
      today: [
        { id: 101, time: '09:00', originalPrice: 38, discountedPrice: 24, discount: 37, spotsLeft: 4, isLastMinute: true },
        { id: 102, time: '11:40', originalPrice: 38, discountedPrice: 28, discount: 26, spotsLeft: 3, isLastMinute: true },
        { id: 103, time: '16:20', originalPrice: 38, discountedPrice: 18, discount: 53, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '08:20', originalPrice: 38, discountedPrice: 38, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '10:00', originalPrice: 38, discountedPrice: 32, discount: 16, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '13:20', originalPrice: 38, discountedPrice: 30, discount: 21, spotsLeft: 3, isLastMinute: false },
        { id: 204, time: '15:40', originalPrice: 38, discountedPrice: 28, discount: 26, spotsLeft: 2, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:40', originalPrice: 38, discountedPrice: 38, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 302, time: '14:00', originalPrice: 38, discountedPrice: 34, discount: 11, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Gunnar Holm', rating: 5, text: 'En otroligt avslappnad bana i en vacker del av Costa del Sol. Vinodlingarna runt banan skapar en unik atmosfär. Perfekt om man vill undvika trängseln vid Marbella.', date: '5 mars 2025', handicap: 24 },
      { id: 2, name: 'Ingrid Carlsson', rating: 4, text: 'Trevlig bana med fantastisk utsikt mot havet. Lite blåsig men det är en del av charmen. Bra prisläge och trevlig personal.', date: '18 februari 2025', handicap: 19 },
      { id: 3, name: 'Mikael Strand', rating: 4, text: 'Bra bana för den som vill ha en lugn golfdag utan stress. Greenerna var i bra skick och vi fick komma ut nästan direkt. Hittade hit via TeeRadar – toppen!', date: '2 mars 2025', handicap: 21 },
    ],
  },

  'anoreta-golf': {
    slug: 'anoreta-golf',
    name: 'Añoreta Golf',
    location: 'Rincón de la Victoria',
    country: 'Spanien',
    rating: 4.3,
    reviews: 74,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    lengthMeters: 5990,
    designer: 'Juan Ligues',
    openedYear: 1990,
    description: 'Añoreta Golf är beläget precis öster om Málaga stad i den pittoreska kuststaden Rincón de la Victoria. Banan kombinerar kustnära läge med en varierad design som erbjuder vackra havsvyer på flera av de 18 hålen. Med mogen vegetation och välskötta greener är detta ett populärt val för lokala golfare och besökare som utforskar den östra delen av Costa del Sol.',
    heroImage: 'https://readdy.ai/api/search-image?query=Anoreta%20golf%20club%20Rincon%20de%20la%20Victoria%20Spain%20eastern%20Costa%20del%20Sol%20coastal%20views%20palm%20trees%20Mediterranean%20sea%20lush%20green%20fairway%20warm%20afternoon%20sunshine%20scenic%20mature%20vegetation%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-ano&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: false,
      changingRooms: true,
      parking: true,
    },
    address: 'Urb. Añoreta Golf, s/n, 29730 Rincón de la Victoria, Málaga, Spanien',
    phone: '+34 952 404 000',
    mapLat: '36.7189',
    mapLng: '-4.2781',
    timeslots: {
      today: [],
      tomorrow: [
        { id: 201, time: '08:40', originalPrice: 32, discountedPrice: 32, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '10:20', originalPrice: 32, discountedPrice: 27, discount: 16, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '13:00', originalPrice: 32, discountedPrice: 25, discount: 22, spotsLeft: 3, isLastMinute: false },
        { id: 204, time: '16:00', originalPrice: 32, discountedPrice: 22, discount: 31, spotsLeft: 2, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:00', originalPrice: 32, discountedPrice: 32, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 302, time: '12:00', originalPrice: 32, discountedPrice: 29, discount: 9, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Susanne Björk', rating: 5, text: 'Fantastisk liten pärla öster om Málaga. Inga köer, bra service och greener i toppskick. Utsikten mot havet på hål 7 och 8 är värd resan i sig.', date: '10 mars 2025', handicap: 26 },
      { id: 2, name: 'Hans Bengtsson', rating: 4, text: 'Bra lagd bana med bra flöde. Lite ojämn på några hålen men totalt sett en riktigt trevlig upplevelse. Prisvärd och trevlig personal.', date: '24 februari 2025', handicap: 16 },
      { id: 3, name: 'Pernilla Sjögren', rating: 4, text: 'Bra val om man bor i Málaga-området och söker en snabb runda utan krångel. Lite äldre anläggning men välskött och välkomnande.', date: '8 mars 2025', handicap: 22 },
    ],
  },

  'nerja-golf-club': {
    slug: 'nerja-golf-club',
    name: 'Nerja Golf Club',
    location: 'Nerja',
    country: 'Spanien',
    rating: 4.2,
    reviews: 61,
    holes: 18,
    par: 71,
    difficulty: 'Lätt',
    lengthMeters: 5580,
    designer: 'Eduardo Cándido',
    openedYear: 2001,
    description: 'Nerja Golf Club är beläget i det dramatiska landskapet runt den berömda turiststaden Nerja, känd för sina vita klippor och turkosa vikar. Banan erbjuder en avslappnad golfupplevelse med fantastisk utsikt mot havet och de omgivande andalusiska bergen. Med ett prisvärt greenfee och ett välkomnande klimat är detta perfekt för familjer och nybörjare.',
    heroImage: 'https://readdy.ai/api/search-image?query=Nerja%20golf%20club%20Andalusia%20Spain%20coastal%20cliffs%20white%20village%20Mediterranean%20sea%20turquoise%20water%20sunny%20relaxed%20fairway%20green%20hills%20dramatic%20scenery%20eastern%20Costa%20del%20Sol%20holiday%20golf%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-nerja&orientation=landscape',
    facilities: {
      drivingRange: false,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Ctra. de Frigiliana, km 3, 29780 Nerja, Málaga, Spanien',
    phone: '+34 952 524 120',
    mapLat: '36.7442',
    mapLng: '-3.8812',
    timeslots: {
      today: [
        { id: 101, time: '10:00', originalPrice: 29, discountedPrice: 18, discount: 38, spotsLeft: 4, isLastMinute: true },
        { id: 102, time: '15:00', originalPrice: 29, discountedPrice: 15, discount: 48, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '09:00', originalPrice: 29, discountedPrice: 29, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '11:20', originalPrice: 29, discountedPrice: 24, discount: 17, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '14:40', originalPrice: 29, discountedPrice: 22, discount: 24, spotsLeft: 3, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '10:00', originalPrice: 29, discountedPrice: 29, discount: 0, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Bertil Hedman', rating: 4, text: 'Absolut det billigaste greenfee jag betalat på Costa del Sol och ändå en riktigt trevlig runda. Utsikten mot klipporna och havet är spektakulär. Rekommenderas!', date: '6 mars 2025', handicap: 28 },
      { id: 2, name: 'Marianne Öst', rating: 4, text: 'Charmig liten bana med massor av personlighet. Inte lika välskött som banorna vid Marbella men priset är oslagbart och naturen runtomkring är otrolig.', date: '20 februari 2025', handicap: 30 },
      { id: 3, name: 'Claes Nygren', rating: 5, text: 'Bästa kombinationen av semester och golf vi haft. Spelat härifrån tre dagar i rad och gillar att det aldrig är stressigt. Enkelt att boka via TeeRadar.', date: '11 mars 2025', handicap: 25 },
    ],
  },

  'atalaya-golf-cc': {
    slug: 'atalaya-golf-cc',
    name: 'Atalaya Golf & CC',
    location: 'Estepona',
    country: 'Spanien',
    rating: 4.6,
    reviews: 143,
    holes: 36,
    par: 72,
    difficulty: 'Medel',
    lengthMeters: 6020,
    designer: 'Bernhard von Limburger',
    openedYear: 1968,
    description: 'Atalaya Golf & Country Club är en av Costa del Sols äldsta anläggningar med inte mindre än 36 hål fördelade på två banor – Old Course och New Course. Beläget mellan Marbella och Estepona erbjuder komplexet en komplett golfupplevelse med magnifik utsikt mot havet och Sierra Bermeja. En klassisk destination för golfare som söker variation och historia.',
    heroImage: 'https://readdy.ai/api/search-image?query=Atalaya%20Golf%20Country%20Club%20Estepona%20Spain%20twin%2036%20hole%20complex%20historic%20classic%20fairway%20mountain%20backdrop%20Mediterranean%20sea%20views%20mature%20trees%20golden%20afternoon%20warm%20light%20prestigious%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-atal&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Urb. Atalaya Park, s/n, 29680 Estepona, Málaga, Spanien',
    phone: '+34 952 882 812',
    mapLat: '36.4641',
    mapLng: '-5.0523',
    timeslots: {
      today: [
        { id: 101, time: '09:20', originalPrice: 52, discountedPrice: 35, discount: 33, spotsLeft: 4, isLastMinute: true },
        { id: 102, time: '13:40', originalPrice: 52, discountedPrice: 30, discount: 42, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '08:00', originalPrice: 52, discountedPrice: 52, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '09:40', originalPrice: 52, discountedPrice: 45, discount: 13, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '12:20', originalPrice: 52, discountedPrice: 42, discount: 19, spotsLeft: 4, isLastMinute: false },
        { id: 204, time: '15:00', originalPrice: 52, discountedPrice: 38, discount: 27, spotsLeft: 3, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:00', originalPrice: 52, discountedPrice: 52, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 302, time: '13:00', originalPrice: 52, discountedPrice: 48, discount: 8, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Rolf Lindström', rating: 5, text: 'Spelade Old Course och New Course på samma dag – otroligt bra valuta för pengarna. Båda banorna är i toppskick och har sin egen karaktär. Historisk golfupplevelse!', date: '9 mars 2025', handicap: 13 },
      { id: 2, name: 'Annika Persson', rating: 5, text: 'En av mina favoriter på Costa del Sol. 36 hål att välja på, trevlig restaurant och bra service. Sista minuten-priset via TeeRadar var ett kap!', date: '1 mars 2025', handicap: 18 },
      { id: 3, name: 'Jörgen Åkerman', rating: 4, text: 'Klassisk bana med riktigt bra greener. New Course är lite lättare om man är nybörjare, Old Course ger mer motstånd. Båda är värda ett besök.', date: '15 februari 2025', handicap: 20 },
    ],
  },

  'valle-romano-golf': {
    slug: 'valle-romano-golf',
    name: 'Valle Romano Golf',
    location: 'Estepona',
    country: 'Spanien',
    rating: 4.4,
    reviews: 98,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    lengthMeters: 6100,
    designer: 'Cabell B. Robinson',
    openedYear: 2005,
    description: 'Valle Romano Golf är en modern golfbana i södra Estepona med panoramautsikt mot Medelhavet och Gibraltar. Banan kombinerar tekniska utmaningar med vackert landskap och har snabbt etablerat sig som ett populärt val för golfare som söker en välskött och moderna upplevelse i Esteponas nya golfquarter. Tydlig siktlinje mot Afrikas kust på klara dagar gör det till en verkligt spektakulär upplevelse.',
    heroImage: 'https://readdy.ai/api/search-image?query=Valle%20Romano%20Golf%20Estepona%20Spain%20modern%20golf%20resort%20panoramic%20Mediterranean%20sea%20view%20Gibraltar%20Africa%20distant%20horizon%20green%20manicured%20fairway%20warm%20sunny%20day%20residential%20landscape%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-vr&orientation=landscape',
    facilities: {
      drivingRange: true,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Ctra. de Cancelada, s/n, 29680 Estepona, Málaga, Spanien',
    phone: '+34 952 882 020',
    mapLat: '36.4123',
    mapLng: '-5.1884',
    timeslots: {
      today: [],
      tomorrow: [
        { id: 201, time: '08:40', originalPrice: 40, discountedPrice: 40, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '10:20', originalPrice: 40, discountedPrice: 34, discount: 15, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '13:40', originalPrice: 40, discountedPrice: 32, discount: 20, spotsLeft: 4, isLastMinute: false },
        { id: 204, time: '16:00', originalPrice: 40, discountedPrice: 28, discount: 30, spotsLeft: 2, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:20', originalPrice: 40, discountedPrice: 40, discount: 0, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Cecilia Borg', rating: 5, text: 'Ny och fräsch bana med enastående utsikt mot Gibraltar och – på klara dagar – Marocko. Perfekt skick på greener och fairways. Definitivt ett återbesök!', date: '12 mars 2025', handicap: 16 },
      { id: 2, name: 'Tommy Andersson', rating: 4, text: 'Modern anläggning med bra service. Banan har lite av allt – vattenhinder, doglegs och vackra utblickar. Prisvärt och bra flöde på banan.', date: '26 februari 2025', handicap: 22 },
      { id: 3, name: 'Lisbeth Forsberg', rating: 4, text: 'Nyare bana som håller hög standard. Utsikten är den bästa jag sett på Costa del Sol – man kan bokstavligen se Afrika! Boka via TeeRadar så får man bra pris.', date: '4 mars 2025', handicap: 24 },
    ],
  },

  'monte-mayor-golf': {
    slug: 'monte-mayor-golf',
    name: 'Monte Mayor Golf Club',
    location: 'Benahavís',
    country: 'Spanien',
    rating: 4.5,
    reviews: 88,
    holes: 18,
    par: 71,
    difficulty: 'Utmanande',
    lengthMeters: 5870,
    designer: 'Robert Trent Jones Jr.',
    openedYear: 1999,
    description: 'Monte Mayor Golf Club är beläget högt i bergen ovanför Benahavís i ett av Costa del Sols mest natursköna reservat. Banan slingrar sig genom en dramatisk terräng med korkekskogar, vilda blommor och klippformationer med hisnande utsikt mot Medelhavet och Gibraltar. Kortare än många banor men extremt teknisk – varje hål kräver precision och god boll-positionering.',
    heroImage: 'https://readdy.ai/api/search-image?query=Monte%20Mayor%20golf%20club%20Benahavis%20Spain%20mountain%20rugged%20terrain%20cork%20oak%20forest%20wild%20flowers%20dramatic%20landscape%20elevated%20fairway%20Mediterranean%20sea%20Gibraltar%20view%20golden%20sunset%20panoramic%20full%20width%20hero%20banner&width=1600&height=700&seq=hero-mm&orientation=landscape',
    facilities: {
      drivingRange: false,
      restaurant: true,
      proShop: true,
      buggyRental: true,
      changingRooms: true,
      parking: true,
    },
    address: 'Urb. Monte Mayor, s/n, 29679 Benahavís, Málaga, Spanien',
    phone: '+34 952 937 420',
    mapLat: '36.5401',
    mapLng: '-5.0512',
    timeslots: {
      today: [
        { id: 101, time: '09:40', originalPrice: 45, discountedPrice: 30, discount: 33, spotsLeft: 3, isLastMinute: true },
        { id: 102, time: '16:00', originalPrice: 45, discountedPrice: 25, discount: 44, spotsLeft: 2, isLastMinute: true },
      ],
      tomorrow: [
        { id: 201, time: '08:20', originalPrice: 45, discountedPrice: 45, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 202, time: '10:40', originalPrice: 45, discountedPrice: 38, discount: 16, spotsLeft: 4, isLastMinute: false },
        { id: 203, time: '13:20', originalPrice: 45, discountedPrice: 35, discount: 22, spotsLeft: 3, isLastMinute: false },
      ],
      other: [
        { id: 301, time: '09:00', originalPrice: 45, discountedPrice: 45, discount: 0, spotsLeft: 4, isLastMinute: false },
        { id: 302, time: '12:40', originalPrice: 45, discountedPrice: 40, discount: 11, spotsLeft: 4, isLastMinute: false },
      ],
    },
    userReviews: [
      { id: 1, name: 'Björn Wahlberg', rating: 5, text: 'Den mest spektakulära naturbanan jag spelat på Costa del Sol. Korkeksskogarna, klipporna och utsikten mot Gibraltar skapar en overklig atmosfär. Utmanande men fantastisk.', date: '7 mars 2025', handicap: 9 },
      { id: 2, name: 'Helena Cronqvist', rating: 5, text: 'Varje hål är en ny vy och ett nytt pussel. Banan belönar tänkande golf – det handlar om rätt position, inte bara längd. En av mina absoluta favoriter!', date: '21 februari 2025', handicap: 14 },
      { id: 3, name: 'Sven Arvidsson', rating: 4, text: 'Tog hit min golfkompis från Sverige och han var totalt mållös. Inte den lättaste banan men utsikten och naturen gör att man glömmer alla bogeyer. Väl värt det!', date: '3 mars 2025', handicap: 17 },
    ],
  },
};

export const defaultCourse = mockCourses['valderrama-golf-club'];
