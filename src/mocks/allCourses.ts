export interface CourseEntry {
  id: number;
  slug: string;
  name: string;
  location: string;
  area: string;
  lat: number;
  lng: number;
  fromPrice: number;
  rating: number;
  reviews: number;
  holes: number;
  par: number;
  difficulty: string;
  hasLastMinute: boolean;
  lastMinuteFrom?: number;
  image: string;
}

export const AREAS = ['Alla', 'Sotogrande', 'Marbella', 'Benahavís', 'Estepona', 'Nerja', 'Benalmádena', 'Málaga'];
export const DIFFICULTIES = ['Alla', 'Lätt', 'Medel', 'Utmanande', 'Expert'];

export const allCourses: CourseEntry[] = [
  {
    id: 1, slug: 'valderrama-golf-club', name: 'Valderrama Golf Club',
    location: 'Sotogrande', area: 'Sotogrande', lat: 36.2887, lng: -5.3131,
    fromPrice: 185, rating: 4.9, reviews: 312, holes: 18, par: 71,
    difficulty: 'Utmanande', hasLastMinute: true, lastMinuteFrom: 95,
    image: 'https://readdy.ai/api/search-image?query=Valderrama%20golf%20club%20Sotogrande%20Spain%20iconic%20fairway%20cork%20oak%20trees%20manicured%20green%20grass%20prestigious%20championship%20golf%20warm%20golden%20light%20aerial%20view&width=400&height=240&seq=all1&orientation=landscape',
  },
  {
    id: 2, slug: 'finca-cortesin', name: 'Finca Cortesin Golf',
    location: 'Casares', area: 'Estepona', lat: 36.3442, lng: -5.2673,
    fromPrice: 220, rating: 4.9, reviews: 189, holes: 18, par: 72,
    difficulty: 'Expert', hasLastMinute: true, lastMinuteFrom: 120,
    image: 'https://readdy.ai/api/search-image?query=Finca%20Cortesin%20luxury%20golf%20resort%20Casares%20Spain%20panoramic%20Mediterranean%20sea%20views%20elegant%20fairway%20coastal%20cliffs%20golden%20sunset%20premium&width=400&height=240&seq=all2&orientation=landscape',
  },
  {
    id: 3, slug: 'los-naranjos-golf-club', name: 'Los Naranjos Golf Club',
    location: 'Marbella', area: 'Marbella', lat: 36.4963, lng: -4.9537,
    fromPrice: 95, rating: 4.7, reviews: 218, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 45,
    image: 'https://readdy.ai/api/search-image?query=Los%20Naranjos%20golf%20club%20Marbella%20Spain%20fairway%20orange%20trees%20Mediterranean%20vegetation%20golden%20afternoon%20light%20lush%20green%20course%20warm%20sunshine&width=400&height=240&seq=all3&orientation=landscape',
  },
  {
    id: 4, slug: 'la-quinta-golf-cc', name: 'La Quinta Golf & CC',
    location: 'Benahavís', area: 'Benahavís', lat: 36.5132, lng: -5.0231,
    fromPrice: 75, rating: 4.6, reviews: 175, holes: 18, par: 71,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 38,
    image: 'https://readdy.ai/api/search-image?query=La%20Quinta%20golf%20club%20Benahavis%20Spain%20mountain%20valley%20backdrop%20green%20fairways%20scenic%20panorama%20warm%20golden%20light%20Mediterranean%20views&width=400&height=240&seq=all4&orientation=landscape',
  },
  {
    id: 5, slug: 'las-brisas-golf-club', name: 'Las Brisas Golf Club',
    location: 'Marbella', area: 'Marbella', lat: 36.4891, lng: -4.9612,
    fromPrice: 120, rating: 4.8, reviews: 241, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 60,
    image: 'https://readdy.ai/api/search-image?query=Las%20Brisas%20golf%20club%20Nueva%20Andalucia%20Marbella%20Spain%20lush%20green%20fairway%20palm%20trees%20Mediterranean%20sea%20views%20warm%20golden%20sunset%20prestigious&width=400&height=240&seq=all5&orientation=landscape',
  },
  {
    id: 6, slug: 'aloha-golf-club', name: 'Aloha Golf Club',
    location: 'Marbella', area: 'Marbella', lat: 36.5002, lng: -4.9483,
    fromPrice: 55, rating: 4.6, reviews: 198, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Aloha%20golf%20club%20Nueva%20Andalucia%20Marbella%20Spain%20beautifully%20manicured%20fairway%20lake%20water%20hazard%20palm%20trees%20blue%20sky%20warm%20Mediterranean%20sunshine&width=400&height=240&seq=all6&orientation=landscape',
  },
  {
    id: 7, slug: 'los-arqueros-golf', name: 'Los Arqueros Golf & CC',
    location: 'Benahavís', area: 'Benahavís', lat: 36.5220, lng: -5.0120,
    fromPrice: 50, rating: 4.5, reviews: 142, holes: 18, par: 71,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Los%20Arqueros%20golf%20country%20club%20Benahavis%20Spain%20mountain%20views%20green%20fairway%20Mediterranean%20landscape%20warm%20afternoon%20light%20scenic%20valley%20golf%20course&width=400&height=240&seq=all7&orientation=landscape',
  },
  {
    id: 8, slug: 'marbella-golf-cc', name: 'Marbella Golf & CC',
    location: 'Marbella', area: 'Marbella', lat: 36.5068, lng: -4.8953,
    fromPrice: 70, rating: 4.7, reviews: 287, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 42,
    image: 'https://readdy.ai/api/search-image?query=Marbella%20golf%20country%20club%20Spain%20elegant%20championship%20fairway%20lush%20green%20perfectly%20manicured%20grass%20Mediterranean%20palm%20trees%20warm%20sunshine%20prestigious&width=400&height=240&seq=all8&orientation=landscape',
  },
  {
    id: 9, slug: 'rio-real-golf', name: 'Rio Real Golf',
    location: 'Marbella', area: 'Marbella', lat: 36.5094, lng: -4.8631,
    fromPrice: 65, rating: 4.6, reviews: 203, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Rio%20Real%20golf%20club%20Marbella%20Spain%20coastal%20fairway%20Mediterranean%20sea%20views%20lush%20green%20landscape%20warm%20sunny%20day%20premium%20golf%20resort%20scenic&width=400&height=240&seq=all9&orientation=landscape',
  },
  {
    id: 10, slug: 'guadalmina-golf', name: 'Guadalmina Golf Club',
    location: 'San Pedro de Alcántara', area: 'Marbella', lat: 36.4711, lng: -5.0834,
    fromPrice: 48, rating: 4.5, reviews: 167, holes: 36, par: 71,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 32,
    image: 'https://readdy.ai/api/search-image?query=Guadalmina%20golf%20club%20San%20Pedro%20Marbella%20Spain%20lush%20green%20double%20course%20fairway%20warm%20golden%20light%20mature%20trees%20Mediterranean%20landscape%20classic&width=400&height=240&seq=all10&orientation=landscape',
  },
  {
    id: 11, slug: 'el-paraiso-golf', name: 'El Paraíso Golf Club',
    location: 'Estepona', area: 'Estepona', lat: 36.4732, lng: -5.0934,
    fromPrice: 42, rating: 4.4, reviews: 134, holes: 18, par: 71,
    difficulty: 'Lätt', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=El%20Paraiso%20golf%20club%20Estepona%20Spain%20gentle%20fairway%20palm%20trees%20tropical%20garden%20Mediterranean%20sea%20glimpse%20warm%20afternoon%20sunshine%20lush%20green%20affordable&width=400&height=240&seq=all11&orientation=landscape',
  },
  {
    id: 12, slug: 'estepona-golf', name: 'Estepona Golf',
    location: 'Estepona', area: 'Estepona', lat: 36.4268, lng: -5.1623,
    fromPrice: 35, rating: 4.3, reviews: 98, holes: 18, par: 72,
    difficulty: 'Lätt', hasLastMinute: true, lastMinuteFrom: 22,
    image: 'https://readdy.ai/api/search-image?query=Estepona%20golf%20club%20Spain%20wide%20open%20fairway%20blue%20sky%20Mediterranean%20backdrop%20affordable%20community%20golf%20course%20sunny%20day%20green%20grass%20warm%20colors&width=400&height=240&seq=all12&orientation=landscape',
  },
  {
    id: 13, slug: 'real-club-sotogrande', name: 'Real Club de Golf Sotogrande',
    location: 'Sotogrande', area: 'Sotogrande', lat: 36.2999, lng: -5.2978,
    fromPrice: 110, rating: 4.8, reviews: 256, holes: 18, par: 72,
    difficulty: 'Utmanande', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Real%20Club%20de%20Golf%20Sotogrande%20Spain%20prestigious%20classic%20golf%20course%20lush%20manicured%20fairway%20cork%20oak%20trees%20elegant%20historic%20clubhouse%20golden%20light&width=400&height=240&seq=all13&orientation=landscape',
  },
  {
    id: 14, slug: 'san-roque-golf', name: 'San Roque Golf Club',
    location: 'San Roque', area: 'Sotogrande', lat: 36.3102, lng: -5.3891,
    fromPrice: 85, rating: 4.7, reviews: 178, holes: 36, par: 72,
    difficulty: 'Utmanande', hasLastMinute: true, lastMinuteFrom: 55,
    image: 'https://readdy.ai/api/search-image?query=San%20Roque%20golf%20club%20Costa%20del%20Sol%20Spain%20dramatic%20fairway%20rocky%20landscape%20Mediterranean%20views%20championship%20course%20prestigious%20warm%20afternoon%20light&width=400&height=240&seq=all14&orientation=landscape',
  },
  {
    id: 15, slug: 'lauro-golf', name: 'Lauro Golf',
    location: 'Alhaurín de la Torre', area: 'Málaga', lat: 36.5876, lng: -4.7521,
    fromPrice: 30, rating: 4.2, reviews: 89, holes: 18, par: 72,
    difficulty: 'Lätt', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Lauro%20golf%20club%20Alhaurin%20de%20la%20Torre%20Malaga%20Spain%20green%20valley%20fairway%20mountain%20backdrop%20accessible%20family%20golf%20course%20warm%20spring%20day&width=400&height=240&seq=all15&orientation=landscape',
  },
  {
    id: 16, slug: 'torrequebrada-golf', name: 'Torrequebrada Golf',
    location: 'Benalmádena', area: 'Benalmádena', lat: 36.4921, lng: -4.6312,
    fromPrice: 45, rating: 4.4, reviews: 112, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 28,
    image: 'https://readdy.ai/api/search-image?query=Torrequebrada%20golf%20club%20Benalmadena%20Costa%20del%20Sol%20Spain%20coastal%20hilltop%20fairway%20Mediterranean%20sea%20panoramic%20views%20urban%20golf%20resort%20sunny%20blue%20sky&width=400&height=240&seq=all16&orientation=landscape',
  },
  {
    id: 17, slug: 'santa-maria-golf', name: 'Santa María Golf & CC',
    location: 'Marbella', area: 'Marbella', lat: 36.5124, lng: -4.8245,
    fromPrice: 58, rating: 4.5, reviews: 156, holes: 18, par: 71,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Santa%20Maria%20golf%20country%20club%20Marbella%20Spain%20elegant%20green%20fairway%20lake%20reflection%20mature%20trees%20warm%20golden%20afternoon%20Mediterranean%20luxury%20golf&width=400&height=240&seq=all17&orientation=landscape',
  },
  {
    id: 18, slug: 'la-dama-de-noche', name: 'La Dama de Noche',
    location: 'Marbella', area: 'Marbella', lat: 36.4833, lng: -5.0512,
    fromPrice: 40, rating: 4.4, reviews: 103, holes: 9, par: 36,
    difficulty: 'Lätt', hasLastMinute: true, lastMinuteFrom: 25,
    image: 'https://readdy.ai/api/search-image?query=La%20Dama%20de%20Noche%20golf%20club%20Marbella%20Spain%20illuminated%20night%20golf%20lit%20fairway%20unique%20evening%20course%20atmosphere%20warm%20ambient%20lighting%20special&width=400&height=240&seq=all18&orientation=landscape',
  },
  {
    id: 19, slug: 'baviera-golf', name: 'Baviera Golf',
    location: 'Vélez-Málaga', area: 'Nerja', lat: 36.7342, lng: -4.1023,
    fromPrice: 38, rating: 4.4, reviews: 87, holes: 18, par: 72,
    difficulty: 'Lätt', hasLastMinute: true, lastMinuteFrom: 24,
    image: 'https://readdy.ai/api/search-image?query=Baviera%20Golf%20Velez%20Malaga%20Spain%20eastern%20Costa%20del%20Sol%20coastal%20fairway%20lush%20green%20rolling%20hills%20Mediterranean%20sea%20views%20bright%20sunny%20day%20relaxed%20tropical%20landscape%20golf%20course&width=400&height=240&seq=all19&orientation=landscape',
  },
  {
    id: 20, slug: 'anoreta-golf', name: 'Añoreta Golf',
    location: 'Rincón de la Victoria', area: 'Nerja', lat: 36.7189, lng: -4.2781,
    fromPrice: 32, rating: 4.3, reviews: 74, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Anoreta%20golf%20club%20Rincon%20de%20la%20Victoria%20Malaga%20Spain%20coastal%20eastern%20Costa%20del%20Sol%20scenic%20sea%20views%20lush%20green%20fairway%20palm%20trees%20warm%20Mediterranean%20sunshine%20affordable&width=400&height=240&seq=all20&orientation=landscape',
  },
  {
    id: 21, slug: 'nerja-golf-club', name: 'Nerja Golf Club',
    location: 'Nerja', area: 'Nerja', lat: 36.7442, lng: -3.8812,
    fromPrice: 29, rating: 4.2, reviews: 61, holes: 18, par: 71,
    difficulty: 'Lätt', hasLastMinute: true, lastMinuteFrom: 18,
    image: 'https://readdy.ai/api/search-image?query=Nerja%20golf%20club%20Andalusia%20Spain%20relaxed%20fairway%20white%20village%20backdrop%20cliffs%20Mediterranean%20sea%20turquoise%20water%20sunny%20day%20green%20grass%20spectacular%20scenery%20affordable%20eastern%20Costa%20del%20Sol&width=400&height=240&seq=all21&orientation=landscape',
  },
  {
    id: 22, slug: 'atalaya-golf-cc', name: 'Atalaya Golf & CC',
    location: 'Estepona', area: 'Estepona', lat: 36.4641, lng: -5.0523,
    fromPrice: 52, rating: 4.6, reviews: 143, holes: 36, par: 72,
    difficulty: 'Medel', hasLastMinute: true, lastMinuteFrom: 35,
    image: 'https://readdy.ai/api/search-image?query=Atalaya%20Golf%20Country%20Club%20Estepona%20Spain%20twin%20course%20complex%2036%20holes%20fairway%20mountain%20backdrop%20Mediterranean%20sea%20views%20mature%20trees%20warm%20afternoon%20light%20prestigious&width=400&height=240&seq=all22&orientation=landscape',
  },
  {
    id: 23, slug: 'valle-romano-golf', name: 'Valle Romano Golf',
    location: 'Estepona', area: 'Estepona', lat: 36.4123, lng: -5.1884,
    fromPrice: 40, rating: 4.4, reviews: 98, holes: 18, par: 72,
    difficulty: 'Medel', hasLastMinute: false,
    image: 'https://readdy.ai/api/search-image?query=Valle%20Romano%20Golf%20Estepona%20Spain%20modern%20golf%20resort%20wide%20open%20fairway%20sea%20glimpse%20residential%20community%20warm%20sunny%20sky%20lush%20green%20manicured%20grass%20Spanish%20Costa%20del%20Sol&width=400&height=240&seq=all23&orientation=landscape',
  },
  {
    id: 24, slug: 'monte-mayor-golf', name: 'Monte Mayor Golf Club',
    location: 'Benahavís', area: 'Benahavís', lat: 36.5401, lng: -5.0512,
    fromPrice: 45, rating: 4.5, reviews: 88, holes: 18, par: 71,
    difficulty: 'Utmanande', hasLastMinute: true, lastMinuteFrom: 30,
    image: 'https://readdy.ai/api/search-image?query=Monte%20Mayor%20golf%20club%20Benahavis%20Spain%20rugged%20mountain%20landscape%20dramatic%20terrain%20olive%20trees%20Mediterranean%20scrub%20elevated%20fairway%20spectacular%20valley%20views%20warm%20sunset%20golden%20light%20challenging&width=400&height=240&seq=all24&orientation=landscape',
  },
];
